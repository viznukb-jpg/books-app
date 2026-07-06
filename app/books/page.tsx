import { BooksContainer } from "@/features/books/components/BooksContainer";

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
