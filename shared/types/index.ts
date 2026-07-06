import { InferSelectModel } from "drizzle-orm";
import { items, favorites, user } from "@/db/schema";

export type Book = InferSelectModel<typeof items>;
export type Favorite = InferSelectModel<typeof favorites>;
export type User = InferSelectModel<typeof user>;

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}
