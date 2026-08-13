import { QueryClient } from '@tanstack/react-query';

// One factory so caching/retry policy is defined in a single place
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // data is "fresh" for 1 min before refetch
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
