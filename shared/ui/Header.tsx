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
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 md:gap-0 mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-0 max-w-7xl min-h-[4rem]">
        {/* Logo and Main Nav */}
        <div className="flex sm:flex-row flex-col items-center gap-4 sm:gap-6 lg:gap-8 w-full md:w-auto">
          <div className="flex justify-center sm:justify-start w-full sm:w-auto">
            <Logo />
          </div>

          <nav className="flex justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link
              href="/books"
              className="font-semibold text-gray-700 hover:text-blue-600 text-sm sm:text-base transition-colors"
            >
              Books
            </Link>
            <Link
              href="/favorites"
              className="font-semibold text-gray-700 hover:text-blue-600 text-sm sm:text-base transition-colors"
            >
              Favorites
            </Link>
          </nav>
        </div>

        {/* User Auth Section */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 sm:gap-4 w-full md:w-auto">
          {session ? (
            <>
              <div className="hidden lg:block">
                <ProfileWidget
                  name={session.user.name}
                  email={session.user.email}
                />
              </div>
              <div className="lg:hidden block px-2 w-full sm:w-auto font-semibold text-gray-700 text-sm text-center">
                Hi, {session.user.name}
              </div>
              <div className="flex items-center gap-2">
                <DeleteAccountButton />
                <LogoutButton />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                href="/login"
                variant="ghost"
                size="md"
                className="px-3 sm:px-4 text-sm sm:text-base"
              >
                Login
              </Button>
              <Button
                href="/register"
                variant="primary"
                size="md"
                className="px-3 sm:px-4 text-sm sm:text-base"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
