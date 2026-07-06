import Link from "next/link";

export default function Header() {
  return (
    <div className="flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/books">Books</Link>
      <Link href="/favorites">Favorite</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}
