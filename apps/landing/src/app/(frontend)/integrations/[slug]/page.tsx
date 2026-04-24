import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import IntegrationPage from '@/ui/integrations/integration-page'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function ({ params }: Props) {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) notFound()

	return <IntegrationPage page={page} />
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
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.integrations}/${slug}`,
			images: [
				image
					? urlFor(image).width(1200).url()
					: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?slug=${ROUTES.integrations}/${slug}`,
			],
		},
		robots: { index: noIndex ? false : undefined },
	}
}

export async function generateStaticParams() {
	return await client.fetch<{ slug: string }[]>(
		groq`*[_type == 'integration' && defined(metadata.slug.current)]{
			'slug': metadata.slug.current
		}`,
	)
}

async function getPage(slug: string) {
	return await sanityFetchLive<INTEGRATION_PAGE_RESULT>({
		query: INTEGRATION_PAGE_QUERY,
		params: { slug },
	})
}

type INTEGRATION_PAGE_RESULT = {
	tool: string
	category: string | null
	logo: unknown
	headline: string | null
	subhead: string | null
	howItWorks: string | null
	signals: Array<{ signal: string; description: string }> | null
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

const INTEGRATION_PAGE_QUERY = groq`*[_type == 'integration' && metadata.slug.current == $slug][0]{
	tool,
	category,
	logo,
	headline,
	subhead,
	howItWorks,
	signals,
	relatedUseCases[]->{
		title,
		metadata{ slug }
	},
	metadata
}`
