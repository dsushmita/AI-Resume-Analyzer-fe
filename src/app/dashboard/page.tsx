'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';

interface Me {
  sub: string;
  organizationId: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Me>({
    queryKey: ['me'],
    queryFn: () => api<Me>('/auth/me'),
    retry: false, // a 401 shouldn't be retried
  });

  // If the guard rejected us, leave for login
  useEffect(() => {
    if (isError) router.replace('/login');
  }, [isError, router]);

  async function handleLogout() {
    try {
      await api('/auth/logout', { method: 'POST' });
    } catch {
      // clearing the session regardless of the response
    }
    toast.success('Logged out');
    router.replace('/login');
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">User ID:</span> {data?.sub}
              </p>
              <p>
                <span className="text-muted-foreground">Organization:</span>{' '}
                {data?.organizationId}
              </p>
              <p>
                <span className="text-muted-foreground">Role:</span> {data?.role}
              </p>
            </div>
          )}
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Log out
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
