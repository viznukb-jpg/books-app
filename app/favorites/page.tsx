import React from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getFavorites } from "@/features/favorites/actions/favorites";
import { FavoritesList } from "@/features/favorites/components/FavoritesList";

export default async function FavoritesPage() {
  const queryClient = new QueryClient();

  // Завантажуємо на сервері список обраних книг поточного юзера
  await queryClient.prefetchQuery({
    queryKey: ["favorite-books"],
    queryFn: () => getFavorites(),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-24">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
      </div>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FavoritesList />
      </HydrationBoundary>
    </div>
  );
}
