// middleware.ts (na raiz do projeto)
'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  if (pathname === '/success') {
    const token = cookies.get('success_token');
    if (!token?.value) {
      // Redireciona para /create se não houver token válido
      return NextResponse.redirect(new URL('/create', request.url));
    }
  }

  if (pathname === '/failure') {
    const token = cookies.get('failure_token');
    if (!token?.value) {
      return NextResponse.redirect(new URL('/create', request.url));
    }
  }

  // Continua normalmente para todas as outras requisições
  return NextResponse.next();
}

export const config = {
  matcher: ['/success', '/failure'],
};
