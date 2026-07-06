"use server";

import { db } from "@/db";
import { favorites, items } from "@/db/schema";
import { eq, and, count, desc } from "drizzle-orm";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { ITEMS_PER_PAGE } from "@/shared/config/constants";
import { PaginatedResponse, Book } from "@/shared/types";

export async function getUserFavoriteIds(): Promise<string[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return [];
  }

  const userFavorites = await db
    .select({ itemId: favorites.itemId })
    .from(favorites)
    .where(eq(favorites.userId, session.user.id));

  return userFavorites.map((f) => f.itemId);
}

export async function toggleFavorite(itemId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

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

/**
 * Отримує всі улюблені книги поточного користувача з пагінацією.
 */
export async function getFavorites(pageParam: number = 1): Promise<PaginatedResponse<Book>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { data: [], meta: { currentPage: 1, totalPages: 1, totalCount: 0 } };
  }

  // Отримуємо загальну кількість
  const [{ totalCount }] = await db
    .select({ totalCount: count() })
    .from(favorites)
    .where(eq(favorites.userId, session.user.id));

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  let safePage = Math.max(1, Math.floor(pageParam));
  if (safePage > totalPages) {
    safePage = totalPages;
  }

  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  // Робимо JOIN між items та favorites з лімітом та зсувом
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
    .where(eq(favorites.userId, session.user.id))
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
