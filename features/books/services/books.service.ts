import { db } from "@/db";
import { items } from "@/db/schema";
import { desc, count, eq } from "drizzle-orm";
import { ITEMS_PER_PAGE } from "@/shared/config/constants";
import { PaginatedResponse, Book } from "@/shared/types";
import { AppError } from "@/shared/lib/errors";

export async function getBooks(
  pageParam: number = 1,
): Promise<PaginatedResponse<Book>> {
  const [{ totalCount }] = await db.select({ totalCount: count() }).from(items);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  let safePage = Math.max(1, Math.floor(pageParam));
  if (Number.isNaN(safePage)) {
    throw new AppError("VALIDATION_ERROR", "Invalid page parameter");
  }
  if (safePage > totalPages && totalPages > 0) {
    safePage = totalPages;
  }

  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  const books = await db
    .select()
    .from(items)
    .orderBy(desc(items.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  return {
    data: books,
    meta: {
      currentPage: safePage,
      totalPages,
      totalCount,
    },
  };
}

export async function getBookById(id: string): Promise<Book> {
  if (!id || typeof id !== "string") {
    throw new AppError("VALIDATION_ERROR", "Invalid ID format");
  }

  const [book] = await db.select().from(items).where(eq(items.id, id));

  if (!book) {
    throw new AppError("NOT_FOUND", "Book not found");
  }

  return book;
}
