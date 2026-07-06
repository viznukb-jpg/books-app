import React from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getFavorites } from "@/features/favorites/actions/favorites";
import { FavoritesList } from "@/features/favorites/components/FavoritesList";

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const pageParam = resolvedParams.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;

  const queryClient = new QueryClient();

  // Завантажуємо на сервері список обраних книг поточного юзера
  await queryClient.prefetchQuery({
    queryKey: ["favorite-books", page],
    queryFn: () => getFavorites(page),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FavoritesList />
      </HydrationBoundary>
    </div>
  );
}
