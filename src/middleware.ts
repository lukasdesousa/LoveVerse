import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookies = request.cookies;

  // aplica apenas na rota /failure
  if (pathname === '/failure') {
    const token = cookies.get('failure_token')

    const isValid = token?.value

    if (!isValid) {
      return NextResponse.redirect(new URL('/create', request.url))
    }
  }

  return;
}

export const config = {
  matcher: ['/failure'],
}
