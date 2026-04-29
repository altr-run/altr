import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'

export const metadata: Metadata = {
	title: 'Altr vs the competition — compare',
	description:
		'See how Altr compares to Cursor, Devin, ClickUp Codegen, and other tools that touch the engineering execution loop.',
	openGraph: {
		title: 'Altr vs the competition',
		description:
			'See how Altr compares to Cursor, Devin, ClickUp Codegen, and other tools that touch the engineering execution loop.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.compare}`,
	},
}

type CompareEntry = {
	competitor: string
	headline: string | null
	subhead: string | null
	slug: string
}

const POSITIONING = [
	{ label: 'Coding agents', examples: 'Cursor, Devin', desc: 'Great at writing code. Altr is the workflow context those agents are missing.' },
	{ label: 'Task trackers', examples: 'Linear, ClickUp', examples2: 'Jira', desc: 'Excellent for backlog management. Altr is the execution loop that feeds them with full context.' },
	{ label: 'Team workspaces', examples: 'Notion, Confluence', desc: 'Docs and knowledge. Altr carries that knowledge into every PR and spec, attached.' },
]

export default async function CompareIndex() {
	const sanityPages = await sanityFetchLive<CompareEntry[]>({
		query: groq`*[_type == 'compare.page' && defined(metadata.slug.current) && metadata.noIndex != true]
			| order(competitor asc){
				competitor,
				headline,
				subhead,
				'slug': metadata.slug.current
			}`,
	})

	const pages = sanityPages

	return (
		<main className="bg-(--bg) text-ink">

			{/* Hero */}
			<section className="max-w-[var(--maxw)] mx-auto px-6 py-24 border-b border-line">
				<div className="grid gap-16 items-end" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
					<div>
						<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">Compare</p>
						<h1
							className="font-serif text-ink mb-4"
							style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.08, textWrap: 'balance' }}
						>
							Altr vs the tools
							<br />
							<em className="italic">already in your loop.</em>
						</h1>
					</div>
					<p className="text-ink-2 text-[16px] leading-relaxed max-w-[38ch] mb-1">
						Coding agents. Project trackers. Task-to-PR tools. See what&apos;s different when the full signal — thread to spec to merged PR — stays attached.
					</p>
				</div>
			</section>

			{/* Positioning context strip */}
			<section className="border-b border-line px-6 py-12" style={{ background: 'var(--bg-1)' }}>
				<div className="max-w-[var(--maxw)] mx-auto">
					<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-8 text-center">How Altr fits alongside the tools you already use</p>
					<div className="grid grid-cols-3 gap-4">
						{POSITIONING.map((p) => (
							<div key={p.label} className="border border-line rounded-[16px] p-6" style={{ background: 'var(--bg)' }}>
								<div className="flex items-center gap-2 mb-3">
									<span className="font-mono text-[10px] uppercase tracking-widest text-acc">{p.label}</span>
									<span className="font-mono text-[9px] text-ink-4 border border-line rounded-full px-2 py-0.5">{p.examples}{p.examples2 ? `, ${p.examples2}` : ''}</span>
								</div>
								<p className="font-sans text-[13px] text-ink-2 leading-relaxed">{p.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Grid */}
			<section className="max-w-[var(--maxw)] mx-auto px-6 py-16">
				<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-8">Side-by-side comparisons</p>
				{pages.length === 0 ? (
					<p className="text-ink-3 font-mono text-sm">Comparison pages coming soon.</p>
				) : (
					<ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{pages.map((p) => (
							<li key={p.slug}>
								<Link
									href={`/${ROUTES.compare}/${p.slug}`}
									className="group block border border-line rounded-[var(--r-lg)] p-6 bg-(--panel) no-underline transition-all duration-200 hover:border-[color-mix(in_oklab,var(--acc)_40%,var(--line))] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:bg-[color-mix(in_oklab,var(--acc)_2%,var(--bg))]"
								>
									<div className="flex items-start justify-between gap-3 mb-3">
										<p className="font-mono text-[9.5px] tracking-widest uppercase text-ink-4">
											Altr vs
										</p>
										<span className="font-mono text-[10px] text-acc opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
									</div>
									<h2 className="font-serif text-[22px] text-ink mb-2 group-hover:text-acc transition-colors duration-200">
										{p.competitor}
									</h2>
									{p.subhead && (
										<p className="text-ink-3 text-[12.5px] leading-relaxed line-clamp-2">
											{p.subhead}
										</p>
									)}
									<div className="mt-4 pt-4 border-t border-line">
										<span className="font-mono text-[10px] uppercase tracking-wider text-ink-4 group-hover:text-acc transition-colors duration-200">
											Read comparison →
										</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>

			{/* CTA */}
			<section className="border-t border-line max-w-[var(--maxw)] mx-auto px-6 py-20 text-center flex flex-col items-center gap-4">
				<p className="font-mono text-[11px] uppercase tracking-widest text-ink-4 mb-2">Evaluating alternatives?</p>
				<h2 className="font-serif text-[28px] text-ink" style={{ textWrap: 'balance' }}>
					Don&apos;t see your tool?
				</h2>
				<p className="text-ink-2 text-[15px] max-w-[38ch] leading-relaxed">
					Tell us what you&apos;re evaluating and we&apos;ll walk through it together — live demo with your actual stack.
				</p>
				<div className="flex gap-3 flex-wrap justify-center mt-2">
					<Link
						href="/#close"
						className="btn btn-acc"
					>
						Talk to the founders →
					</Link>
					<Link href="/pricing" className="btn btn-ghost">
						See pricing →
					</Link>
				</div>
				<span className="font-mono text-[10.5px] text-ink-4 mt-1">No card required. Founder-led onboarding.</span>
			</section>
		</main>
	)
}
