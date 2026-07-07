"use client";

import { useQuery } from "@tanstack/react-query";
import { BookItem } from "@/features/books/components/BookItem";
import { Button } from "@/shared/ui/Button";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/shared/ui/Pagination";
const fetchFavorites = async (page: number) => {
  const res = await fetch(`/api/favorites?page=${page}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch favorites");
  }
  return res.json();
};

export function FavoritesList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["favorite-books", page],
    queryFn: () => fetchFavorites(page),
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

  const books = data?.data || [];
  const meta = data?.meta;

  if (!books.length) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center flex flex-col items-center">
        <p className="text-gray-500 mb-4">You have no favorite books yet.</p>
        <Button href="/books" variant="outline">Explore Catalog</Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookItem key={book.id} book={book} fromPage={page} source="favorites" /> 
        ))}
      </div>
      
      {meta && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/90 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-md flex justify-center">
          <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} />
        </div>
      )}
    </>
  );
}
