import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { groq } from 'next-sanity'
import { sanityFetchLive } from '@/sanity/lib/live'
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
	const pages = await sanityFetchLive<SanityLegalIndexItem[]>({
		query: LEGAL_PAGE_INDEX_QUERY,
	}).then((data) => data ?? [])

	// Group by category
	const grouped = CATEGORY_ORDER.map((cat) => ({
		key: cat,
		label: CATEGORY_LABELS[cat],
		pages: pages.filter((p) => p.category === cat),
	})).filter((g) => g.pages.length > 0)

	return (
		<main className="bg-(--bg) text-ink">
			{/* Header */}
			<section className="px-8 py-[160px] border-b border-line">
				<Reveal className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="over mb-6">Legal</p>
					<h1 className="heading-2 mb-8">
						Policies & compliance
					</h1>
					<p className="lede">
						Everything you need to understand how Altr handles your data, what you can build with it, and how we keep it secure.
					</p>
				</Reveal>
			</section>

			{/* Grouped policy sections */}
			<section className="px-8 py-32 flex flex-col gap-24">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					{grouped.map((group, gi) => (
						<Reveal key={group.key} delay={gi * 80} className="mb-20 last:mb-0">
							<div className="flex items-center gap-3 mb-12">
								<h2 className="font-mono text-[11px] tracking-widest uppercase text-ink-3">
									{group.label}
								</h2>
								<div className="flex-1 h-px bg-line" />
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{group.pages.map((page) => (
									<Link
										key={page.slug}
										href={`/legal/${page.slug}`}
										className="block border border-line rounded-[24px] p-10 bg-(--panel) hover:border-acc/40 transition-all hover:shadow-lg no-underline group"
									>
										<h3 className="heading-3 mb-4 group-hover:text-acc transition-colors">
											{page.title}
										</h3>
										{page.summary && (
											<p className="text-ink-2 text-[16px] leading-relaxed">{page.summary}</p>
										)}
									</Link>
								))}
							</div>
						</Reveal>
					))}
				</div>
			</section>

			{/* Contact */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-24">
				<Reveal>
					<div className="border-t border-line pt-10">
						<p className="text-ink-2 text-[15px] mb-4">
							Questions about our policies? We answer real questions from real people.
						</p>
						<Button variant="cta-ghost" href="mailto:legal@altr.run">
							Email legal@altr.run
						</Button>
					</div>
				</Reveal>
			</section>
		</main>
	)
}
