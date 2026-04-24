import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'
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

async function getEntries() {
	return await sanityFetchLive<CHANGELOG_ENTRIES_RESULT>({
		query: CHANGELOG_ENTRIES_QUERY,
	})
}

type CHANGELOG_ENTRIES_RESULT = Array<{
	_id: string
	title: string
	version: string | null
	releaseDate: string
	type: string | null
	summary: string | null
	body: unknown[] | null
	metadata: { slug: { current: string } | null } | null
}>

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
