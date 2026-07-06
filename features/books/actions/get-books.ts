"use server";

import { db } from "@/db";
import { items } from "@/db/schema";
import { desc, count } from "drizzle-orm";
import { ITEMS_PER_PAGE } from "@/shared/config/constants";

export async function getBooks(pageParam: number = 1) {
  const [{ totalCount }] = await db.select({ totalCount: count() }).from(items);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  let safePage = Math.max(1, Math.floor(pageParam));
  if (safePage > totalPages) {
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
