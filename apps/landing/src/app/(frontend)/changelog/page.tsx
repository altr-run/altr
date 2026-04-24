import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'
import { CHANGELOG } from '@/content'
import ChangelogPage from '@/ui/changelog/changelog-page'

export const metadata: Metadata = {
	title: 'Changelog — Altr',
	description: 'What changed, when it changed, and why it matters for engineering teams.',
	openGraph: {
		title: 'Changelog — Altr',
		description: 'What changed, when it changed, and why it matters for engineering teams.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.changelog}`,
	},
}

export default async function () {
	const entries = await getEntries()
	return <ChangelogPage entries={entries} />
}

type ChangelogEntryResult = {
	_id: string
	title: string
	version: string | null
	releaseDate: string
	type: string | null
	summary: string | null
	body: unknown[] | null
	metadata: { slug: { current: string } | null } | null
}

async function getEntries(): Promise<ChangelogEntryResult[]> {
	const sanityEntries = await sanityFetchLive<ChangelogEntryResult[]>({
		query: CHANGELOG_ENTRIES_QUERY,
	})

	// Merge: Sanity entries take precedence; content map fills in any not already present
	const sanityIds = new Set(sanityEntries.map((e) => e._id))
	const contentEntries = Object.values(CHANGELOG)
		.filter((e) => !sanityIds.has(e._id))
		.map((e) => ({ ...e, body: null, metadata: null }))

	const merged = [...sanityEntries, ...contentEntries]

	// Sort by releaseDate descending
	merged.sort(
		(a, b) =>
			new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
	)
	return merged
}

const CHANGELOG_ENTRIES_QUERY = groq`*[_type == 'changelog.entry'] | order(releaseDate desc){
	_id,
	title,
	version,
	releaseDate,
	type,
	summary,
	body,
	metadata{ slug }
}`
