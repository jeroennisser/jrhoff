import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));

  // Clear authentication cookie
  response.cookies.delete('auth');

  return response;
}

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear authentication cookie
  response.cookies.delete('auth');

  return response;
}
