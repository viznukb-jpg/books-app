"use server";

import { db } from "@/db";
import { items } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getBooks() {
  const books = await db.select().from(items).orderBy(desc(items.createdAt));
  return books;
}
