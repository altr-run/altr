import Link from 'next/link'

type Signal = { signal: string; description: string }
type RelatedUseCase = { title: string; metadata: { slug: { current: string } | null } | null }

type IntegrationPage = {
	tool: string
	category: string | null
	logo: unknown
	headline: string | null
	subhead: string | null
	howItWorks: string | null
	signals: Signal[] | null
	relatedUseCases: RelatedUseCase[] | null
	metadata: unknown
}

const CATEGORY_LABELS: Record<string, string> = {
	'communication': 'Communication',
	'project-tracking': 'Project tracking',
	'code': 'Code & version control',
	'docs': 'Docs & knowledge',
	'calls': 'Calls & recordings',
	'monitoring': 'Monitoring & alerts',
}

export default function IntegrationPage({ page }: { page: IntegrationPage }) {
	const { tool, category, headline, subhead, howItWorks, signals, relatedUseCases } = page

	return (
		<main className="bg-(--bg) text-ink">
			{/* Hero */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-24 flex flex-col gap-6">
				<div className="flex items-center gap-3">
					{category && (
						<span className="font-mono text-[11px] tracking-widest uppercase text-ink-3 border border-line bg-(--panel) shadow-sm rounded-full px-3 py-1.5">
							{CATEGORY_LABELS[category] ?? category}
						</span>
					)}
				</div>
				<h1
					className="font-serif text-ink"
					style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.1, textWrap: 'balance' }}
				>
					{headline ?? `Altr + ${tool}`}
				</h1>
				{subhead && (
					<p className="text-ink-2 max-w-2xl" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: 1.6 }}>
						{subhead}
					</p>
				)}
				<div className="flex flex-col gap-2 pt-2">
					<Link
						href="https://app.altr.run"
						className="inline-flex items-center gap-2 bg-acc text-[#FBF7F1] font-mono text-sm tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity self-start"
					>
						Get early access
					</Link>
					<span className="font-mono text-xs text-ink-3">No card required. Founder-led onboarding.</span>
				</div>
			</section>

			{/* How it works */}
			{howItWorks && (
				<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-20">
					<h2 className="font-serif text-2xl text-ink mb-4">How {tool} fits into Altr</h2>
					<p className="text-ink-2 leading-relaxed text-lg">{howItWorks}</p>
				</section>
			)}

			{/* Signals */}
			{signals && signals.length > 0 && (
				<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-20">
					<h2 className="font-serif text-2xl text-ink mb-8">
						Signals Altr reads from {tool}
					</h2>
					<ul className="flex flex-col gap-4">
						{signals.map((s, i) => (
							<li key={i} className="flex gap-4 items-start border-b border-line pb-4 last:border-0 last:pb-0">
								<span className="shrink-0 text-acc font-mono text-sm mt-0.5">→</span>
								<div>
									<p className="font-serif text-base text-ink">{s.signal}</p>
									{s.description && (
										<p className="text-ink-3 text-sm mt-0.5 leading-relaxed">{s.description}</p>
									)}
								</div>
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Related use cases */}
			{relatedUseCases && relatedUseCases.length > 0 && (
				<section className="border-t border-line max-w-[var(--maxw-narrow)] mx-auto px-6 py-16">
					<h3 className="font-mono text-xs text-ink-3 uppercase tracking-wider mb-6">Workflows that use {tool}</h3>
					<ul className="flex flex-col gap-3">
						{relatedUseCases.map((uc, i) => {
							const slug = uc.metadata?.slug?.current
							return (
								<li key={i}>
									{slug ? (
										<Link
											href={`/use-cases/${slug}`}
											className="font-serif text-lg text-ink hover:text-acc transition-colors"
										>
											{uc.title}
										</Link>
									) : (
										<span className="font-serif text-lg text-ink-2">{uc.title}</span>
									)}
								</li>
							)
						})}
					</ul>
				</section>
			)}

			{/* CTA close */}
			<section className="border-t border-line max-w-[var(--maxw-narrow)] mx-auto px-6 py-20 text-center flex flex-col items-center gap-4">
				<h2 className="font-serif text-3xl text-ink" style={{ textWrap: 'balance' }}>
					Your tools. One trail.
				</h2>
				<div className="flex flex-col items-center gap-2">
					<Link
						href="https://app.altr.run"
						className="inline-flex items-center gap-2 bg-acc text-[#FBF7F1] font-mono text-sm tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
					>
						Get early access
					</Link>
					<span className="font-mono text-xs text-ink-3">No card required. Founder-led onboarding.</span>
				</div>
			</section>
		</main>
	)
}
