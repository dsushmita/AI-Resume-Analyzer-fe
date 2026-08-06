'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../auth.api';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: false, // a 401 shouldn't be retried
  });
}
