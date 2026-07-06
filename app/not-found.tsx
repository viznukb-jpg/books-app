import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-[70vh] text-center">
      <h1 className="mb-4 font-bold text-blue-600 dark:text-blue-400 text-6xl">
        404
      </h1>
      <h2 className="mb-2 font-semibold text-gray-900 dark:text-white text-2xl">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-gray-500 dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or deleted.
      </p>
      <Link
        href="/books"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium text-white transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
