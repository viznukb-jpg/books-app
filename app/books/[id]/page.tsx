import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getBookById } from "@/features/books/actions/get-book-by-id";
import { BookDetails } from "@/features/books/components/BookDetails";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
  });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 max-w-7xl">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookDetails id={id} />
      </HydrationBoundary>
    </div>
  );
}
