"use server";

import { db } from "@/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Book } from "@/shared/types";

export async function getBookById(id: string): Promise<Book> {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID");
  }

  const [book] = await db.select().from(items).where(eq(items.id, id));

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}
