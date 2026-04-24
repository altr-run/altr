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

export default async function CompareIndex() {
	const pages = await sanityFetchLive<CompareEntry[]>({
		query: groq`*[_type == 'compare.page' && defined(metadata.slug.current) && metadata.noIndex != true]
			| order(competitor asc){
				competitor,
				headline,
				subhead,
				'slug': metadata.slug.current
			}`,
	})

	return (
		<main className="bg-(--bg) text-ink">
			{/* Header */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-24 border-b border-line">
				<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">Compare</p>
				<h1
					className="font-serif text-ink mb-4"
					style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.08, textWrap: 'balance' }}
				>
					Altr vs the tools
					<br />
					<em className="italic">already in your loop.</em>
				</h1>
				<p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
					Coding agents. Project trackers. Task-to-PR tools. See what's different
					when the full signal — thread to spec to merged PR — stays attached.
				</p>
			</section>

			{/* Grid */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-16">
				{pages.length === 0 ? (
					<p className="text-ink-3 font-mono text-sm">Comparison pages coming soon.</p>
				) : (
					<ul className="grid gap-4 grid-cols-1 sm:grid-cols-2">
						{pages.map((p) => (
							<li key={p.slug}>
								<Link
									href={`/${ROUTES.compare}/${p.slug}`}
									className="group block border border-line rounded-[var(--r-lg)] p-6 bg-(--panel) no-underline transition-[border-color,box-shadow] duration-200 hover:border-acc/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
								>
									<p className="font-mono text-[10px] tracking-widest uppercase text-acc mb-3">
										Altr vs
									</p>
									<h2 className="font-serif text-2xl text-ink mb-2 group-hover:text-acc transition-colors">
										{p.competitor}
									</h2>
									{p.subhead && (
										<p className="text-ink-3 text-sm leading-relaxed line-clamp-2">
											{p.subhead}
										</p>
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
					Don't see your tool?
				</h2>
				<p className="text-ink-2 text-base max-w-md">
					Tell us what you're evaluating and we'll walk through it together.
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
