import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'

export const dynamic = 'force-dynamic'

type LinkEntry = {
	title?: string | null
	description?: string | null
	url?: string | null
}

type ModuleEntry = {
	_type?: string | null
	title?: string | null
	headline?: string | null
	label?: string | null
	eyebrow?: string | null
	introText?: string | null
	contentText?: string | null
	body?: string | null
	description?: string | null
	cards?: Array<{
		title?: string | null
		body?: string | null
		description?: string | null
		contentText?: string | null
	}> | null
	steps?: Array<{
		label?: string | null
		body?: string | null
		contentText?: string | null
	}> | null
	items?: Array<{
		title?: string | null
		label?: string | null
		body?: string | null
		description?: string | null
		contentText?: string | null
	}> | null
	stats?: Array<{
		value?: string | number | null
		label?: string | null
		contentText?: string | null
	}> | null
}

type MarkdownDoc = {
	_type?: string | null
	title?: string | null
	seoTitle?: string | null
	description?: string | null
	canonicalUrl?: string | null
	contentPlainText?: string | null
	headline?: string | null
	subhead?: string | null
	problem?: string | null
	howItWorks?: string | null
	counterParagraph?: string | null
	summary?: string | null
	bodyText?: string | null
	modules?: ModuleEntry[] | null
	steps?: Array<{ label?: string | null; body?: string | null }> | null
	signals?: Array<{ signal?: string | null; description?: string | null }> | null
	painPoints?: Array<{ title?: string | null; body?: string | null }> | null
}

type MarkdownData = {
	page?: MarkdownDoc | null
	post?: MarkdownDoc | null
	comparePage?: MarkdownDoc | null
	useCase?: MarkdownDoc | null
	integration?: MarkdownDoc | null
	legalPage?: MarkdownDoc | null
	related?: LinkEntry[] | null
}

export async function GET(request: Request) {
	const path = normalizePath(new URL(request.url).searchParams.get('path'))
	const data = await getMarkdownData(path)
	const doc = pickDocument(data, path)

	if (!doc) {
		return new Response('Not found\n', {
			status: 404,
			headers: { 'content-type': 'text/plain; charset=utf-8' },
		})
	}

	return new Response(renderMarkdown(doc, data.related ?? []), {
		headers: {
			'content-type': 'text/markdown; charset=utf-8',
			'cache-control': 'public, max-age=0, s-maxage=3600',
		},
	})
}

async function getMarkdownData(path: string) {
	return await sanityFetchLive<MarkdownData>({
		query: groq`{
			'page': *[
				_type == 'page'
				&& metadata.slug.current == $slug
				&& metadata.noIndex != true
			][0]{
				_type,
				title,
				'seoTitle': coalesce(metadata.title, title),
				'description': metadata.description,
				'canonicalUrl': $baseUrl + select(
					metadata.slug.current == 'index' => '',
					'/' + metadata.slug.current
				),
				modules[]{
					_type,
					title,
					headline,
					label,
					eyebrow,
					body,
					description,
					'introText': pt::text(intro),
					'contentText': pt::text(content),
					cards[]{
						title,
						body,
						description,
						'contentText': pt::text(content)
					},
					steps[]{
						label,
						body,
						'contentText': pt::text(content)
					},
					items[]{
						title,
						label,
						body,
						description,
						'contentText': pt::text(content)
					},
					stats[]{
						value,
						label,
						'contentText': pt::text(content)
					}
				}
			},
			'post': *[
				_type == 'blog.post'
				&& metadata.slug.current == $blogSlug
				&& metadata.noIndex != true
			][0]{
				_type,
				title,
				'seoTitle': coalesce(metadata.title, title),
				'description': metadata.description,
				'canonicalUrl': $baseUrl + '/' + $blogDir + '/' + metadata.slug.current,
				'contentPlainText': pt::text(content)
			},
			'comparePage': *[
				_type == 'compare.page'
				&& metadata.slug.current == $compareSlug
				&& metadata.noIndex != true
			][0]{
				_type,
				'seoTitle': coalesce(metadata.title, headline, 'Altr vs ' + competitor),
				'description': coalesce(metadata.description, subhead),
				'canonicalUrl': $baseUrl + '/' + $compareDir + '/' + metadata.slug.current,
				headline,
				subhead,
				counterParagraph,
				painPoints[]{ title, body }
			},
			'useCase': *[
				_type == 'use-case'
				&& metadata.slug.current == $useCaseSlug
				&& metadata.noIndex != true
			][0]{
				_type,
				title,
				'seoTitle': coalesce(metadata.title, headline, title),
				'description': coalesce(metadata.description, subhead, problem),
				'canonicalUrl': $baseUrl + '/' + $useCasesDir + '/' + metadata.slug.current,
				headline,
				subhead,
				problem,
				steps[]{ label, body }
			},
			'integration': *[
				_type == 'integration'
				&& metadata.slug.current == $integrationSlug
				&& metadata.noIndex != true
			][0]{
				_type,
				'seoTitle': coalesce(metadata.title, headline, 'Altr + ' + tool),
				'description': coalesce(metadata.description, subhead, howItWorks),
				'canonicalUrl': $baseUrl + '/' + $integrationsDir + '/' + metadata.slug.current,
				headline,
				subhead,
				howItWorks,
				signals[]{ signal, description }
			},
			'legalPage': *[
				_type == 'legal.page'
				&& slug.current == $legalSlug
				&& noIndex != true
			][0]{
				_type,
				'seoTitle': title,
				'description': summary,
				'canonicalUrl': $baseUrl + '/' + $legalDir + '/' + slug.current,
				'bodyText': pt::text(body)
			},
			'related': *[
				_type in ['page', 'blog.post', 'compare.page', 'use-case', 'integration']
				&& defined(metadata.slug.current)
				&& metadata.noIndex != true
				&& !(metadata.slug.current in ['404', $slug])
			]|order(_updatedAt desc)[0...8]{
				'title': coalesce(metadata.title, title, headline, tool, competitor),
				'description': coalesce(metadata.description, subhead, howItWorks, problem),
				'url': $baseUrl + select(
					_type == 'blog.post' => '/' + $blogDir + '/' + metadata.slug.current,
					_type == 'compare.page' => '/' + $compareDir + '/' + metadata.slug.current,
					_type == 'use-case' => '/' + $useCasesDir + '/' + metadata.slug.current,
					_type == 'integration' => '/' + $integrationsDir + '/' + metadata.slug.current,
					metadata.slug.current == 'index' => '',
					'/' + metadata.slug.current
				)
			}
		}`,
		params: {
			baseUrl: getBaseUrl(),
			slug: path === 'index' ? 'index' : path,
			blogSlug: stripPrefix(path, `${ROUTES.blog}/`),
			compareSlug: stripPrefix(path, `${ROUTES.compare}/`),
			useCaseSlug: stripPrefix(path, `${ROUTES.useCases}/`),
			integrationSlug: stripPrefix(path, `${ROUTES.integrations}/`),
			legalSlug: stripPrefix(path, `${ROUTES.legal}/`),
			blogDir: ROUTES.blog,
			compareDir: ROUTES.compare,
			useCasesDir: ROUTES.useCases,
			integrationsDir: ROUTES.integrations,
			legalDir: ROUTES.legal,
		},
	})
}

function pickDocument(data: MarkdownData, path: string) {
	return (
		data.page ??
		data.post ??
		data.comparePage ??
		data.useCase ??
		data.integration ??
		data.legalPage ??
		null
	)
}

function renderMarkdown(doc: MarkdownDoc, related: LinkEntry[]) {
	const title = cleanText(doc.seoTitle || doc.title) || 'Altr'
	const canonicalUrl = normalizeUrl(doc.canonicalUrl)
	const sections = getSections(doc)
	const links = related.filter(isCompleteLink).slice(0, 8)

	return `${[
		`# ${title}`,
		'',
		canonicalUrl ? `Canonical: ${canonicalUrl}` : '',
		doc.description ? `Description: ${cleanText(doc.description)}` : '',
		'',
		...sections,
		links.length ? '## Relevant links' : '',
		...links.map(
			(link) =>
				`- [${cleanText(link.title)}](${toMarkdownUrl(link.url)}): ${cleanText(link.description)}`,
		),
	]
		.filter(Boolean)
		.join('\n')}\n`
}

function getSections(doc: MarkdownDoc) {
	const sections = [
		...plainSection('Overview', [
			doc.headline,
			doc.subhead,
			doc.problem,
			doc.howItWorks,
			doc.counterParagraph,
			doc.summary,
			doc.contentPlainText,
			doc.bodyText,
		]),
		...moduleSections(doc.modules ?? []),
		...stepSections(doc.steps ?? []),
		...signalSections(doc.signals ?? []),
		...painPointSections(doc.painPoints ?? []),
	]

	if (sections.length) return sections

	return plainSection('Overview', [doc.description])
}

function moduleSections(modules: ModuleEntry[]) {
	return modules.flatMap((module) => {
		const title =
			cleanText(module.headline) ||
			cleanText(module.title) ||
			cleanText(module.label) ||
			formatModuleType(module._type)
		const body = [
			module.introText,
			module.contentText,
			module.body,
			module.description,
			...(module.cards ?? []).flatMap((card) => [
				card.title,
				card.body,
				card.description,
				card.contentText,
			]),
			...(module.steps ?? []).flatMap((step) => [
				step.label,
				step.body,
				step.contentText,
			]),
			...(module.items ?? []).flatMap((item) => [
				item.title,
				item.label,
				item.body,
				item.description,
				item.contentText,
			]),
			...(module.stats ?? []).flatMap((stat) => [
				[stat.value, stat.label].filter(Boolean).join(' '),
				stat.contentText,
			]),
		]

		return plainSection(title, body)
	})
}

function stepSections(steps: MarkdownDoc['steps']) {
	if (!steps?.length) return []

	return [
		'## Steps',
		'',
		...steps
			.map((step) => [cleanText(step.label), cleanText(step.body)].filter(Boolean).join(': '))
			.filter(Boolean)
			.map((step) => `- ${step}`),
		'',
	]
}

function signalSections(signals: MarkdownDoc['signals']) {
	if (!signals?.length) return []

	return [
		'## Signals',
		'',
		...signals
			.map((signal) =>
				[cleanText(signal.signal), cleanText(signal.description)]
					.filter(Boolean)
					.join(': '),
			)
			.filter(Boolean)
			.map((signal) => `- ${signal}`),
		'',
	]
}

function painPointSections(painPoints: MarkdownDoc['painPoints']) {
	if (!painPoints?.length) return []

	return [
		'## Pain points',
		'',
		...painPoints
			.map((point) =>
				[cleanText(point.title), cleanText(point.body)].filter(Boolean).join(': '),
			)
			.filter(Boolean)
			.map((point) => `- ${point}`),
		'',
	]
}

function plainSection(title: string, values: Array<string | null | undefined>) {
	const text = values.map(cleanText).filter(Boolean).join('\n\n')
	if (!text) return []

	return [`## ${title}`, '', text, '']
}

function formatModuleType(value?: string | null) {
	return cleanText(value)
		.replace(/[-.]/g, ' ')
		.replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function isCompleteLink(link: LinkEntry) {
	return Boolean(
		cleanText(link.title) &&
			cleanText(link.description) &&
			normalizeUrl(link.url),
	)
}

function normalizePath(value?: string | null) {
	const path = cleanText(value)
		.replace(/\.md$/, '')
		.replace(/^\/+|\/+$/g, '')

	return path || 'index'
}

function stripPrefix(path: string, prefix: string) {
	return path.startsWith(prefix) ? path.slice(prefix.length) : ''
}

function cleanText(value?: string | number | null) {
	return String(value ?? '')
		.replace(/\s+/g, ' ')
		.trim()
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
