import { db } from "@/db";
import { favorites, items } from "@/db/schema";
import { eq, and, count, desc } from "drizzle-orm";
import { ITEMS_PER_PAGE } from "@/shared/config/constants";
import { PaginatedResponse, Book } from "@/shared/types";
import { AppError } from "@/shared/lib/errors";

export async function getUserFavoriteIds(userId: string): Promise<string[]> {
  if (!userId) {
    throw new AppError('UNAUTHORIZED', 'User ID is required');
  }

  const userFavorites = await db
    .select({ itemId: favorites.itemId })
    .from(favorites)
    .where(eq(favorites.userId, userId));

  return userFavorites.map((f) => f.itemId);
}

export async function toggleFavorite(userId: string, itemId: string) {
  if (!userId) {
    throw new AppError('UNAUTHORIZED', 'User ID is required');
  }
  if (!itemId) {
    throw new AppError('VALIDATION_ERROR', 'Item ID is required');
  }

  const [existing] = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.itemId, itemId)));

  if (existing) {
    await db.delete(favorites).where(eq(favorites.id, existing.id));
    return { status: "removed", itemId };
  } else {
    await db.insert(favorites).values({
      userId,
      itemId,
    });
    return { status: "added", itemId };
  }
}

export async function getFavorites(userId: string, pageParam: number = 1): Promise<PaginatedResponse<Book>> {
  if (!userId) {
    throw new AppError('UNAUTHORIZED', 'User ID is required');
  }

  const [{ totalCount }] = await db
    .select({ totalCount: count() })
    .from(favorites)
    .where(eq(favorites.userId, userId));

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  let safePage = Math.max(1, Math.floor(pageParam));
  if (Number.isNaN(safePage)) {
    throw new AppError('VALIDATION_ERROR', 'Invalid page parameter');
  }
  if (safePage > totalPages && totalPages > 0) {
    safePage = totalPages;
  }

  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  const favoriteBooks = await db
    .select({
      id: items.id,
      title: items.title,
      description: items.description,
      imageUrl: items.imageUrl,
      createdAt: items.createdAt,
    })
    .from(items)
    .innerJoin(favorites, eq(items.id, favorites.itemId))
    .where(eq(favorites.userId, userId))
    .orderBy(desc(favorites.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  return {
    data: favoriteBooks,
    meta: {
      currentPage: safePage,
      totalPages,
      totalCount,
    },
  };
}
