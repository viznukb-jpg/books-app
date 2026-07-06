import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { favorites, items } from "@/db/schema";
import { auth } from "@/shared/lib/auth";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get favorites for user, joining with items table
    const userFavorites = await db.select({
      id: favorites.id,
      itemId: favorites.itemId,
      createdAt: favorites.createdAt,
      item: items,
    })
    .from(favorites)
    .innerJoin(items, eq(favorites.itemId, items.id))
    .where(eq(favorites.userId, session.user.id));

    return NextResponse.json(userFavorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    // Check if already in favorites
    const existing = await db.query.favorites.findFirst({
      where: and(
        eq(favorites.userId, session.user.id),
        eq(favorites.itemId, itemId)
      ),
    });

    if (existing) {
      return NextResponse.json({ error: "Already in favorites" }, { status: 400 });
    }

    const [newFavorite] = await db.insert(favorites).values({
      userId: session.user.id,
      itemId,
    }).returning();

    return NextResponse.json(newFavorite);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json({ error: "Failed to add to favorites" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    const [deleted] = await db.delete(favorites)
      .where(
        and(
          eq(favorites.userId, session.user.id),
          eq(favorites.itemId, itemId)
        )
      )
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.json({ error: "Failed to remove from favorites" }, { status: 500 });
  }
}
