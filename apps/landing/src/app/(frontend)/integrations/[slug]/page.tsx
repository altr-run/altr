import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import { INTEGRATIONS } from '@/content'
import type { IntegrationPage } from '@/ui/integrations/integration-page'
import IntegrationPageComponent from '@/ui/integrations/integration-page'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function ({ params }: Props) {
	const { slug } = await params
	const page = await getPage(slug)
	if (!page) notFound()

	return <IntegrationPageComponent page={page} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const page = await getPage(slug)
	const meta = (page as IntegrationPageSanity | null)?.metadata ?? null
	const { title, description, image, noIndex } = meta ?? {}

	return {
		title: title ?? `Altr + ${page?.tool ?? slug}`,
		description: description ?? page?.subhead ?? undefined,
		openGraph: {
			title: title ?? `Altr + ${page?.tool ?? slug}`,
			description: description ?? page?.subhead ?? undefined,
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
	const sanitySlugs = await client.fetch<{ slug: string }[]>(
		groq`*[_type == 'integration' && defined(metadata.slug.current)]{
			'slug': metadata.slug.current
		}`,
	)
	const contentSlugs = Object.keys(INTEGRATIONS).map((slug) => ({ slug }))
	const allSlugs = [
		...sanitySlugs,
		...contentSlugs.filter(
			(cs) => !sanitySlugs.some((ss) => ss.slug === cs.slug),
		),
	]
	return allSlugs
}

// Sanity raw shape — relatedUseCases are nested objects
type IntegrationPageSanity = {
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
}

// Normalize Sanity result into the flat IntegrationPage shape the UI expects
function normalizeSanity(raw: IntegrationPageSanity): IntegrationPage {
	return {
		...raw,
		relatedUseCases:
			raw.relatedUseCases
				?.map((uc) => uc.metadata?.slug?.current)
				.filter((s): s is string => Boolean(s)) ?? null,
		metadata: raw.metadata,
	}
}

async function getPage(slug: string): Promise<IntegrationPage | null> {
	const fromSanity = await sanityFetchLive<IntegrationPageSanity | null>({
		query: INTEGRATION_PAGE_QUERY,
		params: { slug },
	})
	if (fromSanity) return normalizeSanity(fromSanity)
	return INTEGRATIONS[slug] ?? null
}

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
