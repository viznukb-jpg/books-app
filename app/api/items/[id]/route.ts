import { NextResponse } from "next/server";
import { getBookById } from "@/features/books/services/books.service";
import { withErrorHandler } from "@/shared/lib/api-handler";

async function getBookHandler(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const book = await getBookById(resolvedParams.id);
  return NextResponse.json(book);
}

export const GET = withErrorHandler(getBookHandler);
