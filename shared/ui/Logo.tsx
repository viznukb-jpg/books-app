import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/books"
      className="flex items-center gap-2 hover:opacity-80 font-bold text-gray-900 text-xl transition-opacity"
    >
      <div className="flex justify-center items-center bg-blue-600 shadow-sm rounded-lg w-8 h-8 text-white">
        {/* Simple book icon (SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      </div>
      <span>BooksApp</span>
    </Link>
  );
}
