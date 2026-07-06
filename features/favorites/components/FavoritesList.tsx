"use client";

import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../actions/favorites";
import { BookItem } from "@/features/books/components/BookItem";
import { Button } from "@/shared/ui/Button";

export function FavoritesList() {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["favorite-books"],
    queryFn: () => getFavorites(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-600">Failed to load favorites.</div>;
  }

  if (!books?.length) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center flex flex-col items-center">
        <p className="text-gray-500 mb-4">You have no favorite books yet.</p>
        <Button href="/books" variant="outline">Explore Catalog</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookItem key={book.id} book={book} fromPage={1} /> 
      ))}
    </div>
  );
}
