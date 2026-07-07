import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/get-query-client";

import { Metadata } from "next";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Favorites",
};

import { getFavorites } from "@/features/favorites/services/favorites.service";
import { safe } from "@/shared/lib/safe";
import { FavoritesList } from "@/features/favorites/components/FavoritesList";

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }
  const resolvedParams = await searchParams;
  const pageParam = resolvedParams.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;

  const queryClient = getQueryClient();

  const [error, favorites] = await safe(getFavorites(session.user.id, page));

  if (error) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 max-w-7xl">
        <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-3xl text-center">
          Your Favorites
        </h1>
        <div className="bg-red-50 shadow-sm p-6 border border-red-200 rounded-lg text-red-600 text-center">
          <h2 className="mb-2 font-bold text-xl">Failed to load favorites</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  await queryClient.prefetchQuery({
    queryKey: ["favorite-books", page],
    queryFn: () => favorites,
  });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 max-w-7xl">
      <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-3xl text-center">
        Your Favorites
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FavoritesList />
      </HydrationBoundary>
    </div>
  );
}
