"use client";

import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../actions/get-books";
import Link from "next/link";

export function BooksList() {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        Failed to load books. Please try again later.
      </div>
    );
  }

  if (!books?.length) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
        <p className="text-gray-500">No books found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <div key={book.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-200">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 sm:aspect-[2/3]">
            {book.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                No cover
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              <Link href={`/books/${book.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {book.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {book.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
