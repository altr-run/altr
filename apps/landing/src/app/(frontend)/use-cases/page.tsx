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
	const cases = await sanityFetchLive<UseCaseEntry[]>({
		query: groq`*[_type == 'use-case' && defined(metadata.slug.current) && metadata.noIndex != true]
			| order(title asc){
				title,
				subhead,
				tools,
				'slug': metadata.slug.current
			}`,
	})

	return (
		<main className="bg-(--bg) text-ink">
			{/* Header */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-24 border-b border-line">
				<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">Use cases</p>
				<h1
					className="font-serif text-ink mb-4"
					style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.08, textWrap: 'balance' }}
				>
					Workflows teams
					<br />
					<em className="italic">run every week.</em>
				</h1>
				<p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
					Each workflow eliminates a specific reconstruction tax — the time teams spend
					rebuilding context that already existed somewhere else.
				</p>
			</section>

			{/* Grid */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-16">
				{cases.length === 0 ? (
					<p className="text-ink-3 font-mono text-sm">Use case pages coming soon.</p>
				) : (
					<ul className="grid gap-4 grid-cols-1 sm:grid-cols-2">
						{cases.map((c) => (
							<li key={c.slug}>
								<Link
									href={`/${ROUTES.useCases}/${c.slug}`}
									className="group block border border-line rounded-[var(--r-lg)] p-6 bg-(--panel) no-underline transition-[border-color,box-shadow] duration-200 hover:border-acc/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
								>
									<h2 className="font-serif text-2xl text-ink mb-2 group-hover:text-acc transition-colors">
										{c.title}
									</h2>
									{c.subhead && (
										<p className="text-ink-3 text-sm leading-relaxed line-clamp-2 mb-3">
											{c.subhead}
										</p>
									)}
									{c.tools && c.tools.length > 0 && (
										<div className="flex flex-wrap gap-1.5 mt-3">
											{c.tools.slice(0, 4).map((t) => (
												<span
													key={t}
													className="border border-line rounded-full px-2.5 py-0.5 font-mono text-[10px] text-ink-3"
												>
													{t}
												</span>
											))}
										</div>
									)}
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>

			{/* CTA */}
			<section className="border-t border-line max-w-[var(--maxw-narrow)] mx-auto px-6 py-20 text-center flex flex-col items-center gap-4">
				<h2 className="font-serif text-3xl text-ink" style={{ textWrap: 'balance' }}>
					Don't see your workflow?
				</h2>
				<p className="text-ink-2 text-base max-w-md">
					We do founder-led onboarding using your actual stack and workflow.
				</p>
				<div className="flex flex-col items-center gap-2">
					<Link
						href="/#close"
						className="inline-flex items-center gap-2 bg-acc text-[#FBF7F1] font-mono text-sm tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
					>
						Talk to the founders →
					</Link>
					<span className="font-mono text-xs text-ink-3">No card required. Founder-led onboarding.</span>
				</div>
			</section>
		</main>
	)
}
