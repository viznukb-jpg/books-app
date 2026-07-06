"use client";

import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../actions/get-books";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/shared/ui/Pagination";

export function BooksList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", page],
    queryFn: () => getBooks(page),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="border-4 border-blue-600 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        Failed to load books. Please try again later.
      </div>
    );
  }

  const books = data?.data || [];
  const meta = data?.meta;

  if (!books.length) {
    return (
      <div className="p-12 border-2 border-gray-300 border-dashed rounded-lg text-center">
        <p className="text-gray-500">No books found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="group relative flex flex-col bg-white shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-200 rounded-xl overflow-hidden transition-all"
          >
            <div className="relative bg-gray-100 w-full aspect-[3/4] sm:aspect-[2/3] overflow-hidden">
              {book.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex justify-center items-center bg-gray-200 w-full h-full text-gray-400">
                  No cover
                </div>
              )}
            </div>
            <div className="flex flex-col flex-1 p-4">
              <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                <Link href={`/books/${book.id}?from=${page}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {book.title}
                </Link>
              </h3>
              <p className="mt-1 text-gray-500 text-sm line-clamp-2">
                {book.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {meta && (
        <div className="right-0 bottom-0 left-0 z-40 fixed flex justify-center bg-white/90 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-md p-4 border-gray-200 border-t">
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
          />
        </div>
      )}
    </>
  );
}
