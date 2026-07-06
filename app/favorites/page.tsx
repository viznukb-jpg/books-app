import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Favorites",
};

import { getFavorites } from "@/features/favorites/actions/favorites";
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

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["favorite-books", page],
    queryFn: () => getFavorites(page),
  });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 max-w-7xl">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FavoritesList />
      </HydrationBoundary>
    </div>
  );
}
