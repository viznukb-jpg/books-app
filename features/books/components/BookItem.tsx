import Link from "next/link";
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
}

export function BookItem({ book, fromPage }: BookItemProps) {
  return (
    <div className="group relative flex flex-col bg-white shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-200 rounded-xl overflow-hidden transition-all">
      <div className="relative bg-gray-100 w-full aspect-[3/4] sm:aspect-[2/3] overflow-hidden">
        {book.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex justify-center items-center bg-gray-200 w-full h-full text-gray-400">
            No cover
          </div>
        )}
        
        {/* Кнопка Обране (поверх обкладинки) */}
        <div className="absolute right-3 top-3 z-10">
          <FavoriteButton bookId={book.id} />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
          <Link href={`/books/${book.id}?from=${fromPage}`}>
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
