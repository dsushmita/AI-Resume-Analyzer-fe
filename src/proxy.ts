import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Server-side gate: no auth cookie → never even render the protected page
export function proxy(request: NextRequest) {
  const hasToken = request.cookies.has('access_token');
  if (!hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
