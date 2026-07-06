import React from "react";

export function BooksContainer() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Books Catalog</h1>
      </div>
      
      {/* Тимчасовий плейсхолдер */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
        <p className="text-gray-500">Books list will be rendered here...</p>
      </div>
    </div>
  );
}
