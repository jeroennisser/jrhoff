import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get password from environment
  const PASSWORD = process.env.PASSWORD;

  // Skip protection if no password is set
  if (!PASSWORD) {
    return NextResponse.next();
  }

  // Skip in development unless FORCE_AUTH is set
  const FORCE_AUTH = process.env.FORCE_AUTH;
  if (process.env.NODE_ENV === 'development' && !FORCE_AUTH) {
    return NextResponse.next();
  }

  // Check authentication cookie
  const authCookie = request.cookies.get('auth');

  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Allow access to login page, API routes, form helpers, and static assets
  if (
    pathname === '/login' ||
    pathname === '/__forms.html' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/uploads/')
  ) {
    return NextResponse.next();
  }

  // Redirect to login
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
