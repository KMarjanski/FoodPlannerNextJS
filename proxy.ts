import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // TODO: Zamień na dynamiczne userId (np. z cookies/session)
  // Pobierz motyw z API (nie bezpośrednio z bazy, bo proxy nie obsługuje node-only)
  let theme = 'dark'
  try {
    const res = await fetch(`${request.nextUrl.origin}/api/settings`, {
      headers: { cookie: request.headers.get('cookie') || '' },
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      if (data.theme === 'light' || data.theme === 'dark') {
        theme = data.theme
      }
    }
  } catch {}
  const response = NextResponse.next()
  response.cookies.set('theme', theme, { path: '/' })
  return response
}

export const config = {
  matcher: [
    '/',
    '/(lista|koszyk|przepisy)(.*)',
    // Dodaj inne ścieżki jeśli trzeba
  ],
}
