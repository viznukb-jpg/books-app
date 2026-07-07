import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { getBookById } from "@/features/books/services/books.service";
import { safe } from "@/shared/lib/safe";
import { BookDetails } from "@/features/books/components/BookDetails";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const queryClient = getQueryClient();

  const [error, book] = await safe(getBookById(id));

  if (error) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        <div className="bg-red-50 shadow-sm p-6 border border-red-200 rounded-lg text-red-600 text-center">
          <h2 className="mb-2 font-bold text-xl">Failed to load book</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  await queryClient.prefetchQuery({
    queryKey: ["book", id],
    queryFn: () => book,
  });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 max-w-7xl">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookDetails id={id} />
      </HydrationBoundary>
    </div>
  );
}
