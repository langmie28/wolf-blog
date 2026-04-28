import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function hash(s: string): Promise<string> {
  const data = new TextEncoder().encode(s)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  const session = request.cookies.get('admin_session')?.value
  const expected = await hash(process.env.ADMIN_PASSWORD || '')

  if (session !== expected) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
