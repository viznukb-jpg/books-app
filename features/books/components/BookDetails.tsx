"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../actions/get-book-by-id";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/Button";
import { useSearchParams } from "next/navigation";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";

interface BookDetailsProps {
  id: string;
}

export function BookDetails({ id }: BookDetailsProps) {
  const searchParams = useSearchParams();
  const fromPage = searchParams.get("from");
  const source = searchParams.get("source") || "books";
  
  const basePath = source === "favorites" ? "/favorites" : "/books";
  const backUrl = fromPage ? `${basePath}?page=${fromPage}` : basePath;
  const backText = source === "favorites" ? "Back to favorites" : "Back to catalog";

  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
        <h2 className="text-xl font-bold">Error loading book</h2>
        <p className="mt-2 text-sm">The book you are looking for might not exist.</p>
        <div className="mt-4">
          <Button href={backUrl} variant="outline">{backText}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-10">
      <div className="mb-8">
        <Link 
          href={backUrl} 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          &larr; {backText}
        </Link>
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Ліва колонка: Обкладинка */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-md">
            {book.imageUrl ? (
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                No cover
              </div>
            )}
          </div>
        </div>

        {/* Права колонка: Інформація */}
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{book.title}</h1>
          <div className="mt-2 text-sm text-gray-500">
            Added: {new Date(book.createdAt || Date.now()).toLocaleDateString("en-GB")}
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <div className="mt-4 prose prose-blue text-gray-600">
              <p>{book.description || "No description available."}</p>
            </div>
          </div>

          <div className="mt-auto pt-8 flex items-center gap-4">
            <FavoriteButton bookId={book.id} />
            <span className="text-sm font-medium text-gray-500">
              Add to your favorites
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
