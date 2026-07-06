"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Не показуємо пагінацію, якщо сторінка всього одна
  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Розумна генерація сторінок: [1, 2, '...', 7, 8, 9, '...', 15]
  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center gap-2">
      {/* Кнопка Prev */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-blue-600 shadow-sm"
          aria-label="Previous page"
        >
          &larr;
        </Link>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed">
          &larr;
        </div>
      )}

      {/* Номери сторінок */}
      {allPages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="flex h-10 w-10 items-center justify-center text-gray-500">
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <Link
            key={`page-${page}`}
            href={createPageURL(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors shadow-sm ${
              isCurrent
                ? "border-blue-600 bg-blue-600 text-white font-bold"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`}
            aria-current={isCurrent ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}

      {/* Кнопка Next */}
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-blue-600 shadow-sm"
          aria-label="Next page"
        >
          &rarr;
        </Link>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed">
          &rarr;
        </div>
      )}
    </div>
  );
}
