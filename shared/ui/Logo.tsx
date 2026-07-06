import Link from "next/link";
import React from "react";

export function Logo() {
  return (
    <Link href="/books" className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-opacity hover:opacity-80">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
        {/* Simple book icon (SVG) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      </div>
      <span>BooksApp</span>
    </Link>
  );
}
