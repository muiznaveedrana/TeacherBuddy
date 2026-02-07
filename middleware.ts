import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Skip for localhost/development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return NextResponse.next()
  }

  // 1. Redirect www to non-www (301)
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '')
    url.host = newHostname
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  // 2. Force HTTPS (301)
  const proto = request.headers.get('x-forwarded-proto')
  if (proto === 'http') {
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  // 3. Remove trailing slashes (except root)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes that don't need redirects
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}
