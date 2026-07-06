import { BooksContainer } from "@/features/books/components/BooksContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books Catalog",
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const pageParam = resolvedParams.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;

  return <BooksContainer page={page} />;
}
