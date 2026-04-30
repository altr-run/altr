import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/env'
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

	const integrations = sanityIntegrations

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
			<section
				className="border-b border-line px-8 py-[160px]"
				style={{ background: 'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--acc) 7%, transparent) 0%, transparent 60%), var(--bg)' }}
			>
				<div className="inner grid grid-cols-12 gap-12 lg:gap-24 items-end">
					<div className="col-span-12 lg:col-span-7">
						<p className="over mb-6">Integrations</p>
						<h1 className="heading-2 mb-4">
							Your stack, connected.
							<br />
							<em className="italic text-acc">Nothing replaced.</em>
						</h1>
					</div>
					<div className="col-span-12 lg:col-span-5">
						<p className="lede mb-8">
							Altr sits between your tools and carries signal forward. Slack threads, GitHub diffs, Linear tickets — the original context stays attached through every handoff.
						</p>
						{/* Signal count badges */}
						<div className="flex flex-wrap gap-2">
							{['6 integrations at launch', 'More with each cohort', 'Your keys stay local'].map((label) => (
								<span
									key={label}
									className="font-mono text-[10px] tracking-wide border border-line rounded-full px-3 py-1 text-ink-3"
									style={{ background: 'var(--bg-1)' }}
								>
									{label}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className="max-w-[var(--maxw)] mx-auto px-6 py-16">
				{integrations.length === 0 ? (
					<p className="text-ink-3 font-mono text-sm">Integration pages coming soon.</p>
				) : (
					<div className="flex flex-col gap-16">
						{sortedCategories.map((cat) => (
							<div key={cat}>
								<div className="flex items-center gap-3 mb-6">
									<h2 className="font-mono text-[10px] text-ink-3 uppercase tracking-widest">
										{CATEGORY_LABELS[cat] ?? cat}
									</h2>
									<div className="flex-1 h-px bg-line" />
									<span className="font-mono text-[9.5px] text-ink-4">{grouped[cat].length} {grouped[cat].length === 1 ? 'integration' : 'integrations'}</span>
								</div>
								<ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
									{grouped[cat].map((int) => (
										<li key={int.slug}>
											<Link
												href={`/${ROUTES.integrations}/${int.slug}`}
												className="group block border border-line rounded-[var(--r-md)] p-5 bg-(--panel) no-underline transition-all duration-200 hover:border-[color-mix(in_oklab,var(--acc)_40%,var(--line))] hover:shadow-[0_6px_18px_rgba(0,0,0,0.05)] hover:bg-[color-mix(in_oklab,var(--acc)_2%,var(--bg))]"
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
															className="rounded-md border border-line bg-white p-0.5 object-contain shrink-0 group-hover:border-[color-mix(in_oklab,var(--acc)_20%,var(--line))] transition-colors"
															unoptimized
														/>
													)}
													<h3 className="font-serif text-[19px] text-ink group-hover:text-acc transition-colors">
														{int.tool}
													</h3>
												</div>
												{int.subhead && (
													<p className="text-ink-3 text-[12px] leading-relaxed line-clamp-2">
														{int.subhead}
													</p>
												)}
												<div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
													<span className="font-mono text-[9.5px] uppercase tracking-wider text-ink-4 group-hover:text-acc transition-colors">Details →</span>
												</div>
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
			<section className="border-t border-line max-w-[var(--maxw)] mx-auto px-6 py-20">
				<div
					className="relative border border-line rounded-[24px] p-10 overflow-hidden flex items-center justify-between gap-10"
					style={{
						background: 'radial-gradient(60% 80% at 0% 50%, color-mix(in oklab, var(--acc) 8%, transparent) 0%, transparent 60%), var(--bg-1)',
					}}
				>
					<div>
						<h2 className="font-serif text-[26px] text-ink mb-2" style={{ textWrap: 'balance' }}>
							Don&apos;t see your tool?
						</h2>
						<p className="text-ink-2 text-[14px] max-w-[38ch] leading-relaxed">
							Tell us what&apos;s in your stack. We&apos;re expanding integrations with each pilot cohort.
						</p>
					</div>
					<div className="flex flex-col items-end gap-2 flex-shrink-0">
						<Button variant="acc" href="/#close">
							Talk to the founders →
						</Button>
						<span className="font-mono text-[10.5px] text-ink-4">No card required. Founder-led onboarding.</span>
					</div>
				</div>
			</section>
		</main>
	)
}
