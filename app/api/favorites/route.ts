import { NextResponse } from "next/server";
import { getFavorites, toggleFavorite } from "@/features/favorites/services/favorites.service";
import { withErrorHandler } from "@/shared/lib/api-handler";
import { AppError } from "@/shared/lib/errors";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

async function getSessionUserId(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new AppError('UNAUTHORIZED', 'You must be logged in to access favorites');
  }
  return session.user.id;
}

async function getFavoritesHandler(request: Request) {
  const userId = await getSessionUserId();
  
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const favorites = await getFavorites(userId, page);
  return NextResponse.json(favorites);
}

async function postFavoritesHandler(request: Request) {
  const userId = await getSessionUserId();
  
  const body = await request.json();
  const { itemId } = body;
  
  if (!itemId) {
    throw new AppError('VALIDATION_ERROR', 'itemId is required in the request body');
  }

  const result = await toggleFavorite(userId, itemId);
  return NextResponse.json(result);
}

export const GET = withErrorHandler(getFavoritesHandler);
export const POST = withErrorHandler(postFavoritesHandler);
