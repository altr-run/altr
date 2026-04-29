import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (!pathname.endsWith('.md')) return NextResponse.next()

	const url = request.nextUrl.clone()
	const path = pathname.slice(1, -3) || 'index'

	url.pathname = '/api/markdown'
	url.searchParams.set('path', path)

	return NextResponse.rewrite(url)
}
