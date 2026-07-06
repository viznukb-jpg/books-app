"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFavoriteIds, toggleFavorite } from "../actions/favorites";
import { authClient } from "@/shared/lib/auth-client";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  bookId: string;
}

export function FavoriteButton({ bookId }: FavoriteButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();

  // Отримуємо глобальний список улюблених ID (якщо юзер авторизований)
  const { data: favoriteIds = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getUserFavoriteIds(),
    enabled: !!session?.user,
  });

  const isFavorite = favoriteIds.includes(bookId);

  const mutation = useMutation({
    mutationFn: () => toggleFavorite(bookId),
    // Оптимістичне оновлення
    onMutate: async () => {
      // 1. Скасовуємо активні запити на "favorites"
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      // 2. Зберігаємо старий стан для можливого відкату
      const previousFavorites = queryClient.getQueryData<string[]>(["favorites"]);

      // 3. Оновлюємо кеш миттєво
      queryClient.setQueryData<string[]>(["favorites"], (old = []) => {
        if (old.includes(bookId)) {
          return old.filter((id) => id !== bookId); // видаляємо
        } else {
          return [...old, bookId]; // додаємо
        }
      });

      return { previousFavorites };
    },
    onError: (err, variables, context) => {
      // Відкат при помилці
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
    },
    onSettled: () => {
      // Для певності після всього робимо інвалідацію
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Запобігаємо кліку по карточці (Link), якщо кнопка всередині

    if (!session?.user) {
      router.push("/login");
      return;
    }

    mutation.mutate();
  };

  // Щоб уникнути блимання під час завантаження сесії, показуємо пустий квадратик/кружечок того ж розміру
  if (isSessionLoading) {
    return <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse"></div>;
  }

  return (
    <button
      onClick={handleToggle}
      disabled={mutation.isPending}
      className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all active:scale-90 ${
        isFavorite
          ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
          : "border-gray-200 bg-white text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-400"
      }`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
