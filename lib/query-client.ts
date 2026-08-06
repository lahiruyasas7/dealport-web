// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,      // data considered fresh for 30s — avoids refetch storms on nav
        retry: 1,                   // one retry on failure, not React Query's default of 3
        refetchOnWindowFocus: false, // avoid surprising refetches during a live demo/review
      },
      mutations: {
        retry: 0,                   // never auto-retry a POST/PATCH/DELETE — could double-submit
      },
    },
  });
}