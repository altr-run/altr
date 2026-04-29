import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { sanityFetchLive } from '@/sanity/lib/live'
import LegalPage, { type LegalPageData } from '@/ui/legal/legal-page'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function ({ params }: Props) {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) notFound()

	return <LegalPage page={page} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) return {}

	return {
		title: page.title,
		description: page.summary ?? undefined,
		openGraph: {
			title: page.title,
			description: page.summary ?? undefined,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.legal}/${slug}`,
		},
		robots: {
			index: ('noIndex' in page && page.noIndex) ? false : undefined,
		},
	}
}

export async function generateStaticParams() {
	const sanitySlugs = await client.fetch<{ slug: string }[]>(
		groq`*[_type == 'legal.page' && defined(slug.current)]{
			'slug': slug.current
		}`,
	)
	return sanitySlugs
}

const LEGAL_PAGE_QUERY = groq`*[_type == 'legal.page' && slug.current == $slug][0]{
	title,
	category,
	'lastUpdated': lastUpdated,
	summary,
	body,
	noIndex
}`

async function getPage(slug: string): Promise<LegalPageData | null> {
	return sanityFetchLive<LegalPageData | null>({
		query: LEGAL_PAGE_QUERY,
		params: { slug },
	})
}
