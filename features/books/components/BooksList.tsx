"use client";

import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../actions/get-books";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/shared/ui/Pagination";
import { BookItem } from "./BookItem";

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
          <BookItem key={book.id} book={book} fromPage={page} />
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
