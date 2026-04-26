import type { Metadata } from 'next'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { sanityFetchLive } from '@/sanity/lib/live'
import { LEGAL_PAGES } from '@/content/legal'
import type { LegalPageContent } from '@/content/legal'
import Reveal from '@/ui/home/reveal'

export const metadata: Metadata = {
	title: 'Legal — Altr',
	description: 'Privacy policy, terms of service, security documentation, and compliance information for Altr.',
}

type SanityLegalIndexItem = {
	slug: string
	title: string
	category: string
	summary: string | null
}

const CATEGORY_ORDER = ['core', 'compliance', 'trust'] as const
const CATEGORY_LABELS: Record<string, string> = {
	core: 'Core policies',
	compliance: 'Data & compliance',
	trust: 'Security & trust',
}

const LEGAL_PAGE_INDEX_QUERY = groq`*[_type == 'legal.page' && noIndex != true]{
	'slug': slug.current,
	title,
	category,
	summary
}`

export default async function LegalIndexPage() {
	// Load Sanity pages
	const sanityPages = await sanityFetchLive<SanityLegalIndexItem[]>({
		query: LEGAL_PAGE_INDEX_QUERY,
	}).then((data) => data ?? [])

	// Merge with content map, Sanity takes precedence for matching slugs
	const contentPages = Object.entries(LEGAL_PAGES).map(([slug, page]) => ({
		slug,
		title: page.title,
		category: page.category,
		summary: page.summary,
	}))

	const sanitySlugSet = new Set(sanityPages.map((p) => p.slug))
	const mergedPages = [
		...sanityPages,
		...contentPages.filter((p) => !sanitySlugSet.has(p.slug)),
	]

	// Group by category
	const grouped = CATEGORY_ORDER.map((cat) => ({
		key: cat,
		label: CATEGORY_LABELS[cat],
		pages: mergedPages.filter((p) => p.category === cat),
	})).filter((g) => g.pages.length > 0)

	return (
		<main className="bg-(--bg) text-ink">
			{/* Header */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-24 border-b border-line">
				<Reveal>
					<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">Legal</p>
					<h1
						className="font-serif text-ink"
						style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.1, textWrap: 'balance' }}
					>
						Policies & compliance
					</h1>
					<p className="text-ink-2 mt-4 text-lg leading-relaxed max-w-xl">
						Everything you need to understand how Altr handles your data, what you can build with it, and how we keep it secure.
					</p>
				</Reveal>
			</section>

			{/* Grouped policy sections */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-16 flex flex-col gap-16">
				{grouped.map((group, gi) => (
					<Reveal key={group.key} delay={gi * 80}>
						<div>
							<h2 className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">
								{group.label}
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{group.pages.map((page) => (
									<Link
										key={page.slug}
										href={`/legal/${page.slug}`}
										className="block border border-line rounded-[var(--r-lg)] p-6 bg-(--panel) hover:border-acc/40 transition-colors no-underline group"
									>
										<h3 className="font-serif text-lg text-ink mb-2 group-hover:text-acc transition-colors">
											{page.title}
										</h3>
										{page.summary && (
											<p className="text-ink-3 text-sm leading-relaxed">{page.summary}</p>
										)}
									</Link>
								))}
							</div>
						</div>
					</Reveal>
				))}
			</section>

			{/* Contact */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-24">
				<Reveal>
					<div className="border-t border-line pt-10">
						<p className="text-ink-2 text-[15px] mb-4">
							Questions about our policies? We answer real questions from real people.
						</p>
						<a href="mailto:legal@altr.run" className="btn btn-ghost">
							Email legal@altr.run
						</a>
					</div>
				</Reveal>
			</section>
		</main>
	)
}
