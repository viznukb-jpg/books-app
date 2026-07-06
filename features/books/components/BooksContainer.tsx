import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getBooks } from "../actions/get-books";
import { BooksList } from "./BooksList";

export async function BooksContainer() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-gray-900 text-3xl">Books Catalog</h1>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <BooksList />
      </HydrationBoundary>
    </div>
  );
}
