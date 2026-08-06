'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logoutUser } from '../auth.api';

export function useLogout() {
  const router = useRouter();
  return async function logout() {
    try {
      await logoutUser();
    } catch {
      // clear the session regardless of the response
    }
    toast.success('Logged out');
    router.replace('/login');
  };
}
