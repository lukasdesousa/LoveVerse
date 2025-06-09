// middleware.ts (na raiz do projeto)
'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', "frame-src 'self' https://open.spotify.com");

  if (pathname === '/success') {
    const token = cookies.get('success_token');
    if (!token?.value) {
      // Redireciona para /create se não houver token válido
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (pathname === '/pending-payment') {
    const token = cookies.get('pending_token');
    if (!token?.value) {
      // Redireciona para /create se não houver token válido
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (pathname === '/failure') {
    const token = cookies.get('failure_token');
    if (!token?.value) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Continua normalmente para todas as outras requisições
  return NextResponse.next();
}

export const config = {
  matcher: ['/failure', '/pending-payment'],
};
