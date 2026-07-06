import Link from "next/link";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { Logo } from "@/shared/ui/Logo";
import { Button } from "@/shared/ui/Button";
import { ProfileWidget } from "@/features/auth/components/ProfileWidget";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { DeleteAccountButton } from "@/features/auth/components/DeleteAccountButton";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="top-0 z-50 sticky bg-white/80 shadow-sm backdrop-blur-md border-gray-200 border-b w-full">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16">
        <div className="flex items-center gap-8">
          <Logo />

          <nav className="flex items-center gap-6">
            <Link
              href="/books"
              className="font-semibold text-gray-700 hover:text-blue-600 text-base transition-colors"
            >
              Books
            </Link>
            <Link
              href="/favorites"
              className="font-semibold text-gray-700 hover:text-blue-600 text-base transition-colors"
            >
              Favorites
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <ProfileWidget
                name={session.user.name}
                email={session.user.email}
              />
              <DeleteAccountButton />
              <LogoutButton />
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="md">
                Login
              </Button>
              <Button href="/register" variant="primary" size="md">
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
