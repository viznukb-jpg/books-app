import { NextResponse } from "next/server";
import { getUserFavoriteIds } from "@/features/favorites/services/favorites.service";
import { withErrorHandler } from "@/shared/lib/api-handler";
import { AppError } from "@/shared/lib/errors";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

async function getSessionUserId(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new AppError('UNAUTHORIZED', 'You must be logged in');
  }
  return session.user.id;
}

async function getFavoriteIdsHandler() {
  const userId = await getSessionUserId();
  const ids = await getUserFavoriteIds(userId);
  return NextResponse.json(ids);
}

export const GET = withErrorHandler(getFavoriteIdsHandler);
