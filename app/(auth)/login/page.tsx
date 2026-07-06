"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/shared/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const { error: signInError } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        setError(signInError.message || "Invalid email or password");
        return;
      }

      router.push("/");
      router.refresh(); // Оновлюємо роутер, щоб макет підтягнув актуальну сесію
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-2 text-left">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 hover:underline">
            <span className="mr-1">&larr;</span> Stay unauthorized
          </Link>
        </div>
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-900">Login</h1>
        
        {error && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-500 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
