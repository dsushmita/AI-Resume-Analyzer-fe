'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLogout } from '@/features/auth/hook/useLogout';
import { useMe } from '@/features/auth/hook/useMe';

export default function DashboardPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useMe();
  const logout = useLogout();

  // If not logged in, the /me call 401s → go to login
  useEffect(() => {
    if (isError) router.replace('/login');
  }, [isError, router]);

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
              <p><span className="text-muted-foreground">User ID:</span> {data?.sub}</p>
              <p><span className="text-muted-foreground">Organization:</span> {data?.organizationId}</p>
              <p><span className="text-muted-foreground">Role:</span> {data?.role}</p>
            </div>
          )}
          <Button variant="outline" className="w-full" onClick={logout}>
            Log out
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
