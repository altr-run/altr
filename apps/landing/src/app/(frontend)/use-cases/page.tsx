import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'

export const metadata: Metadata = {
	title: 'Use cases — Altr',
	description:
		'Feature delivery, bug triage, PR review, incident follow-through — see how Altr removes reconstruction work from each engineering workflow.',
	openGraph: {
		title: 'Use cases — Altr',
		description:
			'Feature delivery, bug triage, PR review, incident follow-through — see how Altr removes reconstruction work from each engineering workflow.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.useCases}`,
	},
}

type UseCaseEntry = {
	title: string
	subhead: string | null
	tools: string[] | null
	slug: string
}

export default async function UseCasesIndex() {
	const sanityCases = await sanityFetchLive<UseCaseEntry[]>({
		query: groq`*[_type == 'use-case' && defined(metadata.slug.current) && metadata.noIndex != true]
			| order(title asc){
				title,
				subhead,
				tools,
				'slug': metadata.slug.current
			}`,
	})

	const cases = sanityCases

	return (
		<main className="bg-(--bg) text-ink">
			{/* Header */}
			<section
				className="border-b border-line"
				style={{ background: 'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--acc) 7%, transparent) 0%, transparent 60%), var(--bg)' }}
			>
				<div className="max-w-[var(--maxw)] mx-auto px-6 py-24 grid gap-16 items-end" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
					<div>
						<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">Use cases</p>
						<h1
							className="font-serif text-ink mb-4"
							style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.08, textWrap: 'balance' }}
						>
							Workflows teams
							<br />
							<em className="italic">run every week.</em>
						</h1>
					</div>
					<p className="text-ink-2 text-[16px] leading-relaxed mb-1">
						Each workflow eliminates a specific reconstruction tax — the time teams spend rebuilding context that already existed somewhere else.
					</p>
				</div>
			</section>

			{/* Grid */}
			<section className="max-w-[var(--maxw)] mx-auto px-6 py-16">
				{cases.length === 0 ? (
					<p className="text-ink-3 font-mono text-sm">Use case pages coming soon.</p>
				) : (
					<ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{cases.map((c) => (
							<li key={c.slug}>
								<Link
									href={`/${ROUTES.useCases}/${c.slug}`}
									className="group flex flex-col h-full border border-line rounded-[var(--r-lg)] p-6 bg-(--panel) no-underline transition-all duration-200 hover:border-[color-mix(in_oklab,var(--acc)_40%,var(--line))] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:bg-[color-mix(in_oklab,var(--acc)_2%,var(--bg))]"
								>
									<h2 className="font-serif text-[22px] text-ink mb-2 group-hover:text-acc transition-colors duration-200">
										{c.title}
									</h2>
									{c.subhead && (
										<p className="text-ink-3 text-[13px] leading-relaxed line-clamp-2 mb-auto">
											{c.subhead}
										</p>
									)}
									{c.tools && c.tools.length > 0 && (
										<div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-line">
											{c.tools.slice(0, 4).map((t) => (
												<span
													key={t}
													className="border border-line rounded-full px-2.5 py-0.5 font-mono text-[9.5px] text-ink-4 group-hover:border-[color-mix(in_oklab,var(--acc)_25%,var(--line))] group-hover:text-ink-3 transition-colors duration-200"
												>
													{t}
												</span>
											))}
										</div>
									)}
									<div className="flex items-center justify-between mt-3">
										<span className="font-mono text-[10px] uppercase tracking-wider text-ink-4 group-hover:text-acc transition-colors duration-200">Read →</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
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
						<h2 className="font-serif text-[24px] text-ink mb-2" style={{ textWrap: 'balance' }}>
							Don&apos;t see your workflow?
						</h2>
						<p className="text-ink-2 text-[14px] max-w-[38ch] leading-relaxed">
							We do founder-led onboarding using your actual stack — Slack, Linear, GitHub, and whatever else is in the loop.
						</p>
					</div>
					<div className="flex flex-col items-end gap-2 flex-shrink-0">
						<Link
							href="/#close"
							className="btn btn-acc"
						>
							Talk to the founders →
						</Link>
						<span className="font-mono text-[10.5px] text-ink-4">No card required. Founder-led onboarding.</span>
					</div>
				</div>
			</section>
		</main>
	)
}
