"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-[70vh] text-center">
      <div className="bg-red-50 dark:bg-red-500/10 mb-6 p-4 rounded-full text-red-500 dark:text-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="mb-2 font-bold text-gray-900 dark:text-white text-2xl">
        Something went wrong!
      </h2>
      <p className="mb-8 max-w-md text-gray-500 dark:text-gray-400">
        An unexpected error occurred while trying to process your request.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 px-6 py-2.5 rounded-lg font-medium text-white dark:text-gray-900 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/books"
          className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 px-6 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-200 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
