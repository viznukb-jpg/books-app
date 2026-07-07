import { NextResponse } from "next/server";
import { getBooks } from "@/features/books/services/books.service";
import { withErrorHandler } from "@/shared/lib/api-handler";

async function getBooksHandler(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const books = await getBooks(page);
  return NextResponse.json(books);
}

export const GET = withErrorHandler(getBooksHandler);
