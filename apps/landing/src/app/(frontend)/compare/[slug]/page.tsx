import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import ComparePage from '@/ui/compare/compare-page'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function ({ params }: Props) {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) notFound()

	return <ComparePage page={page} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const page = await getPage(slug)
	const { title, description, image, noIndex } = page?.metadata ?? {}

	return {
		title,
		description,
		openGraph: {
			title: title ?? undefined,
			description: description ?? undefined,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.compare}/${slug}`,
			images: [
				image
					? urlFor(image).width(1200).url()
					: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?slug=${ROUTES.compare}/${slug}`,
			],
		},
		robots: { index: noIndex ? false : undefined },
	}
}

export async function generateStaticParams() {
	return await client.fetch<{ slug: string }[]>(
		groq`*[_type == 'compare.page' && defined(metadata.slug.current)]{
			'slug': metadata.slug.current
		}`,
	)
}

async function getPage(slug: string) {
	return await sanityFetchLive<COMPARE_PAGE_RESULT>({
		query: COMPARE_PAGE_QUERY,
		params: { slug },
	})
}

type COMPARE_PAGE_RESULT = {
	competitor: string
	headline: string | null
	subhead: string | null
	painPoints: Array<{ title: string; body: string }> | null
	featureTable: Array<{
		feature: string
		altr: boolean
		them: boolean
		altrNote: string | null
		themNote: string | null
	}> | null
	counterParagraph: string | null
	ctaLabel: string | null
	metadata: {
		title: string | null
		description: string | null
		image: unknown
		noIndex: boolean | null
	} | null
} | null

const COMPARE_PAGE_QUERY = groq`*[_type == 'compare.page' && metadata.slug.current == $slug][0]{
	competitor,
	headline,
	subhead,
	painPoints,
	featureTable,
	counterParagraph,
	ctaLabel,
	metadata
}`
