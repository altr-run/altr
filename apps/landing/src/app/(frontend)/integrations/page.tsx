import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/lib/env'
import { INTEGRATIONS } from '@/content'
import { getBrandLogoUrl } from '@/lib/brand'
import { sanityFetchLive } from '@/sanity/lib/live'

export const metadata: Metadata = {
	title: 'Integrations — Altr',
	description:
		'Slack, Linear, GitHub, Notion, calls, CI, monitoring — Altr connects the tools already in your stack without replacing any of them.',
	openGraph: {
		title: 'Integrations — Altr',
		description:
			'Slack, Linear, GitHub, Notion, calls, CI, monitoring — Altr connects the tools already in your stack without replacing any of them.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.integrations}`,
	},
}

const CATEGORY_ORDER = [
	'communication',
	'project-tracking',
	'code',
	'docs',
	'calls',
	'monitoring',
]

const CATEGORY_LABELS: Record<string, string> = {
	'communication':    'Communication',
	'project-tracking': 'Project tracking',
	'code':             'Code & version control',
	'docs':             'Docs & knowledge',
	'calls':            'Calls & recordings',
	'monitoring':       'Monitoring & alerts',
}

type IntegrationEntry = {
	tool: string
	domain: string | null
	category: string | null
	subhead: string | null
	slug: string
}

export default async function IntegrationsIndex() {
	const sanityIntegrations = await sanityFetchLive<IntegrationEntry[]>({
		query: groq`*[_type == 'integration' && defined(metadata.slug.current) && metadata.noIndex != true]
			| order(tool asc){
				tool,
				domain,
				category,
				subhead,
				'slug': metadata.slug.current
			}`,
	})

	// Merge content map entries not already in Sanity
	const sanitySlugs = new Set(sanityIntegrations.map((i) => i.slug))
	const contentEntries: IntegrationEntry[] = Object.entries(INTEGRATIONS)
		.filter(([slug]) => !sanitySlugs.has(slug))
		.map(([slug, int]) => ({
			tool: int.tool,
			domain: int.domain,
			category: int.category,
			subhead: int.subhead,
			slug,
		}))
	const integrations = [...sanityIntegrations, ...contentEntries].sort((a, b) =>
		a.tool.localeCompare(b.tool),
	)

	// Group by category
	const grouped: Record<string, IntegrationEntry[]> = {}
	for (const i of integrations) {
		const key = i.category ?? 'other'
		if (!grouped[key]) grouped[key] = []
		grouped[key].push(i)
	}

	const sortedCategories = [
		...CATEGORY_ORDER.filter((c) => grouped[c]),
		...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)),
	]

	return (
		<main className="bg-(--bg) text-ink">
			{/* Header */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-24 border-b border-line">
				<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">Integrations</p>
				<h1
					className="font-serif text-ink mb-4"
					style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.08, textWrap: 'balance' }}
				>
					Your stack, connected.
					<br />
					<em className="italic">Nothing replaced.</em>
				</h1>
				<p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
					Altr sits between your tools and carries signal forward. Slack threads,
					GitHub diffs, Linear tickets, call recordings — the original context stays
					attached through every handoff.
				</p>
			</section>

			{/* Categories */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-16">
				{integrations.length === 0 ? (
					<p className="text-ink-3 font-mono text-sm">Integration pages coming soon.</p>
				) : (
					<div className="flex flex-col gap-16">
						{sortedCategories.map((cat) => (
							<div key={cat}>
								<h2 className="font-mono text-xs text-ink-3 uppercase tracking-wider mb-6">
									{CATEGORY_LABELS[cat] ?? cat}
								</h2>
								<ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
									{grouped[cat].map((int) => (
										<li key={int.slug}>
											<Link
												href={`/${ROUTES.integrations}/${int.slug}`}
												className="group block border border-line rounded-[var(--r-md)] p-5 bg-(--panel) no-underline transition-[border-color,box-shadow] duration-200 hover:border-acc/40 hover:shadow-[0_6px_18px_rgba(0,0,0,0.05)]"
											>
												<div className="flex items-center gap-3 mb-3">
													{int.domain && (
														<Image
															src={getBrandLogoUrl(int.domain, {
																width: 32,
																height: 32,
																type: 'icon',
																fallback: 'lettermark',
															})}
															alt={`${int.tool} logo`}
															width={32}
															height={32}
															className="rounded-md border border-line bg-white p-0.5 object-contain shrink-0"
															unoptimized
														/>
													)}
													<h3 className="font-serif text-xl text-ink group-hover:text-acc transition-colors">
														{int.tool}
													</h3>
												</div>
												{int.subhead && (
													<p className="text-ink-3 text-xs leading-relaxed line-clamp-2">
														{int.subhead}
													</p>
												)}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				)}
			</section>

			{/* CTA */}
			<section className="border-t border-line max-w-[var(--maxw-narrow)] mx-auto px-6 py-20 text-center flex flex-col items-center gap-4">
				<h2 className="font-serif text-3xl text-ink" style={{ textWrap: 'balance' }}>
					Don&apos;t see your tool?
				</h2>
				<p className="text-ink-2 text-base max-w-md">
					Tell us what&apos;s in your stack. We&apos;re expanding integrations with each pilot cohort.
				</p>
				<div className="flex flex-col items-center gap-2">
					<Link
						href="/#close"
						className="inline-flex items-center gap-2 bg-acc text-acc-ink font-mono text-sm tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
					>
						Talk to the founders →
					</Link>
					<span className="font-mono text-xs text-ink-3">No card required. Founder-led onboarding.</span>
				</div>
			</section>
		</main>
	)
}
