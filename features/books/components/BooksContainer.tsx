import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getBooks } from "../actions/get-books";
import { BooksList } from "./BooksList";

interface BooksContainerProps {
  page: number;
}

export async function BooksContainer({ page }: BooksContainerProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["books", page],
    queryFn: () => getBooks(page),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BooksList />
      </HydrationBoundary>
    </div>
  );
}
