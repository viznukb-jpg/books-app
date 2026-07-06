# Books Catalog App

A modern, full-stack Next.js 16 application for exploring and saving favorite books.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Data Fetching:** TanStack Query + SSR Hydration
- **Auth:** Better Auth
- **Database:** Supabase (Postgres)
- **ORM:** Drizzle ORM + Drizzle Kit
- **Styling:** Tailwind CSS
- **Forms:** react-hook-form + Zod

## Features
- **Server-Side Rendering:** Initial catalog load is fast and SEO-friendly.
- **Pagination:** URL-based pagination that preserves state when navigating back.
- **Favorites System:** Authenticated users can save books with instant Optimistic UI updates.
- **Security:** Protected routes using middleware/server component checks.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase `DATABASE_URL` and generate a `BETTER_AUTH_SECRET`.

3. **Database Migration:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Seed the Database:**
   Generate test data (100 books):
   ```bash
   npm run seed
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
