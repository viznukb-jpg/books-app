import Link from "next/link";
import React from "react";

interface AuthContainerProps {
  title: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthContainer({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthContainerProps) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-2 text-left">
          <Link href="/books" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 hover:underline">
            <span className="mr-1">&larr;</span> Stay unauthorized
          </Link>
        </div>
        
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {title}
        </h1>

        {children}

        <p className="mt-6 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link
            href={footerLinkHref}
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
