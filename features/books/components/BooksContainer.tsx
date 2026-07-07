import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/get-query-client";

import { getBooks } from "../services/books.service";
import { safe } from "@/shared/lib/safe";
import { BooksList } from "./BooksList";

interface BooksContainerProps {
  page: number;
}

export async function BooksContainer({ page }: BooksContainerProps) {
  const queryClient = getQueryClient();

  const [error, books] = await safe(getBooks(page));

  if (error) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 max-w-7xl">
        <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-3xl text-center">
          Books Catalog
        </h1>
        <div className="bg-red-50 shadow-sm p-6 border border-red-200 rounded-lg text-red-600 text-center">
          <h2 className="mb-2 font-bold text-xl">Failed to load catalog</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  await queryClient.prefetchQuery({
    queryKey: ["books", page],
    queryFn: () => books,
  });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 max-w-7xl">
      <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-3xl text-center">
        Books Catalog
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BooksList />
      </HydrationBoundary>
    </div>
  );
}
