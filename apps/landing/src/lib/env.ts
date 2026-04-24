export const dev =
	process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'

export const ROUTES = {
	blog: 'blog',
	compare: 'compare',
	useCases: 'use-cases',
	integrations: 'integrations',
	changelog: 'changelog',
	legal: 'legal',
	product: 'product',
} as const
