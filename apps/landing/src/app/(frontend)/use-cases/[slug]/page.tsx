import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import UseCasePage from '@/ui/use-cases/use-case-page'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function ({ params }: Props) {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) notFound()

	return <UseCasePage page={page} />
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
	return await client.fetch<{ slug: string }[]>(
		groq`*[_type == 'use-case' && defined(metadata.slug.current)]{
			'slug': metadata.slug.current
		}`,
	)
}

async function getPage(slug: string) {
	return await sanityFetchLive<USE_CASE_PAGE_RESULT>({
		query: USE_CASE_PAGE_QUERY,
		params: { slug },
	})
}

type USE_CASE_PAGE_RESULT = {
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
} | null

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
