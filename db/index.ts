import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Вимикаємо prefetch, оскільки ми працюємо через пулінг з'єднань Supabase/PostgreSQL
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
