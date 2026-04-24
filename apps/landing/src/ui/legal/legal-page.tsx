import { PortableText } from 'next-sanity'
import Reveal from '@/ui/home/reveal'
import type { LegalPageContent, LegalSection } from '@/content/legal'

// Shape of a page coming from Sanity CMS
export type SanityLegalPage = {
	title: string
	category: string
	lastUpdated: string | null
	summary: string | null
	body: unknown[] // Portable text blocks
	noIndex?: boolean | null
}

type Props = {
	page: LegalPageContent | SanityLegalPage
}

function isSanityPage(page: LegalPageContent | SanityLegalPage): page is SanityLegalPage {
	return 'body' in page && Array.isArray((page as SanityLegalPage).body)
}

const CATEGORY_LABELS: Record<string, string> = {
	core: 'Core policies',
	compliance: 'Data & compliance',
	trust: 'Security & trust',
}

const portableTextComponents = {
	block: {
		h2: ({ children }: { children?: React.ReactNode }) => (
			<h2 className="font-serif text-2xl text-ink mt-12 mb-4">{children}</h2>
		),
		h3: ({ children }: { children?: React.ReactNode }) => (
			<h3 className="font-serif text-xl text-ink mt-8 mb-3">{children}</h3>
		),
		normal: ({ children }: { children?: React.ReactNode }) => (
			<p className="text-ink-2 leading-relaxed text-[15px] mb-4">{children}</p>
		),
	},
	list: {
		bullet: ({ children }: { children?: React.ReactNode }) => (
			<ul className="list-disc pl-5 flex flex-col gap-1.5 text-ink-2 text-[15px] leading-relaxed mb-4">
				{children}
			</ul>
		),
		number: ({ children }: { children?: React.ReactNode }) => (
			<ol className="list-decimal pl-5 flex flex-col gap-1.5 text-ink-2 text-[15px] leading-relaxed mb-4">
				{children}
			</ol>
		),
	},
}

function SectionContent({ section }: { section: LegalSection }) {
	return (
		<div>
			<h2 className="font-serif text-2xl text-ink mt-12 mb-4">{section.heading}</h2>
			{section.body.map((para, i) => (
				<p key={i} className="text-ink-2 leading-relaxed text-[15px] mb-4">
					{para}
				</p>
			))}
			{section.list && section.list.length > 0 && (
				<ul className="list-disc pl-5 flex flex-col gap-1.5 text-ink-2 text-[15px] leading-relaxed mb-4">
					{section.list.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default function LegalPage({ page }: Props) {
	const categoryLabel = CATEGORY_LABELS[page.category] ?? page.category
	const lastUpdated = page.lastUpdated
		? new Date(page.lastUpdated).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: null

	return (
		<main className="bg-(--bg) text-ink">
			{/* Header */}
			<section className="max-w-[760px] mx-auto px-6 pt-24 pb-12 border-b border-line">
				<Reveal>
					<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">
						{categoryLabel}
					</p>
					<h1
						className="font-serif text-ink"
						style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1, textWrap: 'balance' }}
					>
						{page.title}
					</h1>
					{page.summary && (
						<p className="text-ink-2 mt-4 text-[15px] leading-relaxed max-w-xl">
							{page.summary}
						</p>
					)}
					{lastUpdated && (
						<p className="font-mono text-xs text-ink-3 mt-6">
							Last updated {lastUpdated}
						</p>
					)}
				</Reveal>
			</section>

			{/* Body */}
			<section className="max-w-[760px] mx-auto px-6 py-12">
				{isSanityPage(page) ? (
					<Reveal>
						<div className="prose-legal">
							{/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- next-sanity PortableText accepts unknown[] */}
							<PortableText value={page.body as any} components={portableTextComponents} />
						</div>
					</Reveal>
				) : (
					page.sections.map((section, i) => (
						<Reveal key={section.heading} delay={i * 40}>
							<SectionContent section={section} />
						</Reveal>
					))
				)}
			</section>

			{/* CTA */}
			<section className="max-w-[760px] mx-auto px-6 pb-24">
				<Reveal>
					<div className="border-t border-line pt-10">
						<p className="text-ink-2 text-[15px] mb-4">
							Questions about this policy?
						</p>
						<a
							href="mailto:legal@altr.run"
							className="btn btn-ghost"
						>
							Email legal@altr.run
						</a>
					</div>
				</Reveal>
			</section>
		</main>
	)
}
