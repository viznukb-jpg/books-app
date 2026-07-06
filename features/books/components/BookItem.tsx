import Link from "next/link";
import Image from "next/image";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";

// Це тимчасовий тип, поки ми не винесемо типи БД окремо (або можна просто передати потрібні поля)
interface BookItemProps {
  book: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
  };
  fromPage: number;
  source?: "books" | "favorites";
}

export function BookItem({ book, fromPage, source = "books" }: BookItemProps) {
  return (
    <div className="group relative flex flex-col bg-white shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-200 rounded-xl overflow-hidden transition-all">
      <div className="relative bg-gray-100 w-full aspect-[3/4] sm:aspect-[3/3] overflow-hidden">
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex justify-center items-center bg-gray-200 w-full h-full text-gray-400">
            No cover
          </div>
        )}

        <div className="top-3 right-3 z-10 absolute">
          <FavoriteButton bookId={book.id} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
          <Link href={`/books/${book.id}?from=${fromPage}&source=${source}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 text-gray-500 text-sm line-clamp-2">
          {book.description}
        </p>
      </div>
    </div>
  );
}
