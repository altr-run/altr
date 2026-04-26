import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import { USE_CASES } from '@/content'
import type { UseCasePage } from '@/ui/use-cases/use-case-page'
import UseCasePageComponent from '@/ui/use-cases/use-case-page'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function ({ params }: Props) {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) notFound()

	return <UseCasePageComponent page={page} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const page = await getPage(slug)
	const meta = (page as UseCasePageSanity | null)?.metadata ?? null
	const { title, description, image, noIndex } = meta ?? {}

	return {
		title: title ?? page?.title ?? undefined,
		description: description ?? page?.subhead ?? undefined,
		openGraph: {
			title: title ?? page?.title ?? undefined,
			description: description ?? page?.subhead ?? undefined,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.useCases}/${slug}`,
			images: [
				image
					? urlFor(image).width(1200).url()
					: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?slug=${ROUTES.useCases}/${slug}`,
			],
		},
		robots: { index: noIndex ? false : undefined },
	}
}

export async function generateStaticParams() {
	const sanitySlugs = await client.fetch<{ slug: string }[]>(
		groq`*[_type == 'use-case' && defined(metadata.slug.current)]{
			'slug': metadata.slug.current
		}`,
	)
	const contentSlugs = Object.keys(USE_CASES).map((slug) => ({ slug }))
	const allSlugs = [
		...sanitySlugs,
		...contentSlugs.filter(
			(cs) => !sanitySlugs.some((ss) => ss.slug === cs.slug),
		),
	]
	return allSlugs
}

// Sanity raw shape — relatedUseCases are nested objects
type UseCasePageSanity = {
	title: string
	headline: string | null
	subhead: string | null
	problem: string | null
	steps: Array<{ step: number; label: string; body: string }> | null
	tools: string[] | null
	testimonial: {
		quote: string
		name: string
		title: string
		company: string
	} | null
	relatedUseCases: Array<{
		title: string
		metadata: { slug: { current: string } | null } | null
	}> | null
	metadata: {
		title: string | null
		description: string | null
		image: unknown
		noIndex: boolean | null
	} | null
}

// Normalize Sanity result into the flat UseCasePage shape the UI expects
function normalizeSanity(raw: UseCasePageSanity): UseCasePage {
	return {
		...raw,
		relatedUseCases:
			raw.relatedUseCases
				?.map((uc) => uc.metadata?.slug?.current)
				.filter((s): s is string => Boolean(s)) ?? null,
		metadata: raw.metadata,
	}
}

async function getPage(slug: string): Promise<UseCasePage | null> {
	const fromSanity = await sanityFetchLive<UseCasePageSanity | null>({
		query: USE_CASE_PAGE_QUERY,
		params: { slug },
	})
	if (fromSanity) return normalizeSanity(fromSanity)
	return USE_CASES[slug] ?? null
}

const USE_CASE_PAGE_QUERY = groq`*[_type == 'use-case' && metadata.slug.current == $slug][0]{
	title,
	headline,
	subhead,
	problem,
	steps,
	tools,
	testimonial,
	relatedUseCases[]->{
		title,
		metadata{ slug }
	},
	metadata
}`
