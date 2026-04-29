import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'

export const dynamic = 'force-dynamic'

type SeoEntry = {
	section: string
	title?: string | null
	description?: string | null
	url?: string | null
	priority?: number | null
}

type LlmData = {
	site?: { title?: string | null } | null
	pages?: SeoEntry[] | null
	posts?: SeoEntry[] | null
	comparePages?: SeoEntry[] | null
	useCases?: SeoEntry[] | null
	integrations?: SeoEntry[] | null
	legalPages?: SeoEntry[] | null
}

export async function GET() {
	const data = await sanityFetchLive<LlmData>({
		query: groq`{
			'site': *[_type == 'site'][0]{ title },
			'pages': *[
				_type == 'page'
				&& defined(metadata.slug.current)
				&& !(metadata.slug.current in ['404'])
				&& metadata.noIndex != true
			]{
				'sortPriority': select(metadata.slug.current == 'index' => 1, 0),
				'section': select(
					string::startsWith(metadata.slug.current, 'product') => 'Product',
					string::startsWith(metadata.slug.current, 'security') => 'Trust and legal',
					string::startsWith(metadata.slug.current, 'legal') => 'Trust and legal',
					string::startsWith(metadata.slug.current, 'blog') => 'Blog',
					'Core pages'
				),
				'title': coalesce(metadata.title, title),
				'description': metadata.description,
				'url': $baseUrl + select(
					metadata.slug.current == 'index' => '',
					'/' + metadata.slug.current
				),
				'priority': select(metadata.slug.current == 'index' => 1, 0.6)
			}|order(sortPriority desc, title asc),
			'posts': *[
				_type == 'blog.post'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(publishDate desc)[0...12]{
				'section': 'Blog',
				'title': coalesce(metadata.title, title),
				'description': metadata.description,
				'url': $baseUrl + '/' + $blogDir + '/' + metadata.slug.current,
				'priority': 0.35
			},
			'comparePages': *[
				_type == 'compare.page'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(competitor asc){
				'section': 'Comparisons',
				'title': coalesce(metadata.title, headline, 'Altr vs ' + competitor),
				'description': coalesce(metadata.description, subhead),
				'url': $baseUrl + '/' + $compareDir + '/' + metadata.slug.current,
				'priority': 0.55
			},
			'useCases': *[
				_type == 'use-case'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(title asc){
				'section': 'Use cases',
				'title': coalesce(metadata.title, headline, title),
				'description': coalesce(metadata.description, subhead, problem),
				'url': $baseUrl + '/' + $useCasesDir + '/' + metadata.slug.current,
				'priority': 0.55
			},
			'integrations': *[
				_type == 'integration'
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
			]|order(tool asc){
				'section': 'Integrations',
				'title': coalesce(metadata.title, headline, 'Altr + ' + tool),
				'description': coalesce(metadata.description, subhead, howItWorks),
				'url': $baseUrl + '/' + $integrationsDir + '/' + metadata.slug.current,
				'priority': 0.5
			},
			'legalPages': *[
				_type == 'legal.page'
				&& defined(slug.current)
				&& noIndex != true
			]|order(category asc, title asc){
				'section': 'Trust and legal',
				title,
				'description': summary,
				'url': $baseUrl + '/' + $legalDir + '/' + slug.current,
				'priority': 0.3
			}
		}`,
		params: {
			baseUrl: getBaseUrl(),
			blogDir: ROUTES.blog,
			compareDir: ROUTES.compare,
			useCasesDir: ROUTES.useCases,
			integrationsDir: ROUTES.integrations,
			legalDir: ROUTES.legal,
		},
	})

	return new Response(renderLlmsTxt(data), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=0, s-maxage=3600',
		},
	})
}

function renderLlmsTxt(data: LlmData) {
	const entries = getEntries(data)
	const home = entries.find((entry) => entry.url === getBaseUrl())
	const title = cleanText(data.site?.title) || 'Altr'
	const summary = cleanText(home?.description) || cleanText(entries[0]?.description)
	const sections = groupBySection(entries)

	return `${[
		`# ${[title, summary].filter(Boolean).join(' ')}`,
		'',
		`Important topics covered across the site include: ${formatSeries(getTopics(entries))}.`,
		'',
		'The site is organized into key sections:',
		...Array.from(sections.entries()).map(
			([section, sectionEntries]) =>
				`- **${section}**: ${formatSeries(sectionEntries.slice(0, 4).map((entry) => cleanText(entry.title)))}`,
		),
		'',
		'These are the most useful starting points:',
		...formatLinks(entries.slice(0, 18)),
	]
		.filter(Boolean)
		.join('\n')}\n`
}

function getEntries(data: LlmData) {
	const sanityEntries = [
		...(data.pages ?? []),
		...(data.integrations ?? []),
		...(data.useCases ?? []),
		...(data.comparePages ?? []),
		...(data.posts ?? []),
		...(data.legalPages ?? []),
	]

	return dedupeByUrl(sanityEntries.filter(isCompleteEntry))
		.map((entry) => ({
			...entry,
			title: cleanText(entry.title),
			description: cleanText(entry.description),
			url: normalizeUrl(entry.url),
			priority: entry.priority ?? 0,
		}))
		.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
}

function dedupeByUrl(entries: SeoEntry[]) {
	const seen = new Set<string>()

	return entries.filter((entry) => {
		const url = normalizeUrl(entry.url)
		if (!url || seen.has(url)) return false

		seen.add(url)
		return true
	})
}

function groupBySection(entries: SeoEntry[]) {
	const sections = new Map<string, SeoEntry[]>()

	for (const entry of entries) {
		const section = cleanText(entry.section) || 'Core pages'
		sections.set(section, [...(sections.get(section) ?? []), entry])
	}

	return sections
}

function getTopics(entries: SeoEntry[]) {
	const sections = Array.from(groupBySection(entries).keys())

	return sections.slice(0, 8)
}

function formatLinks(entries: SeoEntry[]) {
	return entries.map(
		(entry) =>
			`- [${cleanText(entry.title)}](${toMarkdownUrl(entry.url)}): ${cleanText(entry.description)}`,
	)
}

function formatSeries(items: string[]) {
	if (items.length <= 1) return items.join('')
	if (items.length === 2) return `${items[0]} and ${items[1]}`

	return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

function isCompleteEntry(entry: SeoEntry) {
	return Boolean(
		cleanText(entry.section) &&
			cleanText(entry.title) &&
			cleanText(entry.description) &&
			normalizeUrl(entry.url),
	)
}

function cleanText(value?: string | null) {
	return (value ?? '').replace(/\s+/g, ' ').trim()
}

function normalizeUrl(value?: string | null) {
	const url = cleanText(value)
	if (!url) return ''
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url.replace(/\/$/, '')
	}
	if (url.startsWith('/')) return url === '/' ? getBaseUrl() : `${getBaseUrl()}${url}`

	return `${getBaseUrl()}/${url}`
}

function toMarkdownUrl(value?: string | null) {
	const url = normalizeUrl(value)
	if (!url) return ''
	if (url === getBaseUrl()) return `${getBaseUrl()}/index.md`
	if (url.endsWith('.md')) return url

	return `${url}.md`
}

function getBaseUrl() {
	return (process.env.NEXT_PUBLIC_BASE_URL || 'https://altr.run').replace(
		/\/$/,
		'',
	)
}
