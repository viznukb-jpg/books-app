import { QueryClient } from "@tanstack/react-query";
import { STALE_TIME_MS } from "../config/constants";

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
      },
    },
  });
}
