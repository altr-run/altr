import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const url = request.nextUrl.clone()
	const path = pathname.slice(1, -3) || 'index'

	url.pathname = `/api/markdown/${path}`

	return NextResponse.rewrite(url)
}

export const config = {
	// Only intercept .md-suffixed paths; skip Next.js internals, API routes, and studio
	matcher: ['/((?!_next/|api/|studio/).+)\\.md$'],
}
