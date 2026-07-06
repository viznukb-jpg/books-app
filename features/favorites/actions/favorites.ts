"use server";

import { db } from "@/db";
import { favorites } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

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
