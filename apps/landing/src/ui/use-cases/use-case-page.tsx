import Link from 'next/link'

type Step = { step: number; label: string; body: string }
type Testimonial = { quote: string; name: string; title: string; company: string }
type RelatedUseCase = { title: string; metadata: { slug: { current: string } | null } | null }

type UseCasePage = {
	title: string
	headline: string | null
	subhead: string | null
	problem: string | null
	steps: Step[] | null
	tools: string[] | null
	testimonial: Testimonial | null
	relatedUseCases: RelatedUseCase[] | null
	metadata: unknown
}

export default function UseCasePage({ page }: { page: UseCasePage }) {
	const { title, headline, subhead, problem, steps, tools, testimonial, relatedUseCases } = page

	return (
		<main className="bg-(--bg) text-ink">
			{/* Hero */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-24 flex flex-col gap-6">
				<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 border border-line bg-(--panel) shadow-sm rounded-full px-3 py-1.5 self-start">
					Use case
				</p>
				<h1
					className="font-serif text-ink"
					style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.1, textWrap: 'balance' }}
				>
					{headline ?? title}
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

			{/* Problem */}
			{problem && (
				<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-16">
					<h2 className="font-serif text-2xl text-ink mb-4">The reconstruction tax</h2>
					<p className="text-ink-2 leading-relaxed text-lg">{problem}</p>
				</section>
			)}

			{/* Tools in the flow */}
			{tools && tools.length > 0 && (
				<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-16">
					<p className="font-mono text-xs text-ink-3 uppercase tracking-wider mb-3">Tools in this flow</p>
					<div className="flex flex-wrap gap-2">
						{tools.map((t) => (
							<span
								key={t}
								className="border border-line rounded-full px-4 py-1.5 font-mono text-xs text-ink-2 bg-(--panel)"
							>
								{t}
							</span>
						))}
					</div>
				</section>
			)}

			{/* How it works */}
			{steps && steps.length > 0 && (
				<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-20">
					<h2 className="font-serif text-2xl text-ink mb-8">How it works</h2>
					<ol className="flex flex-col gap-6">
						{steps.map((s, i) => (
							<li key={i} className="flex gap-6 items-start">
								<span
									className="shrink-0 font-mono text-sm text-acc border border-acc/30 rounded-full w-8 h-8 flex items-center justify-center"
								>
									{s.step}
								</span>
								<div>
									<p className="font-serif text-lg text-ink mb-1">{s.label}</p>
									<p className="text-ink-2 text-sm leading-relaxed">{s.body}</p>
								</div>
							</li>
						))}
					</ol>
				</section>
			)}

			{/* Testimonial */}
			{testimonial?.quote && (
				<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-20">
					<blockquote className="border-l-4 border-acc pl-8 py-2">
						<p className="font-serif text-xl text-ink leading-relaxed italic mb-4">
							"{testimonial.quote}"
						</p>
						<footer className="font-mono text-xs text-ink-3">
							{testimonial.name}
							{testimonial.title ? `, ${testimonial.title}` : ''}
							{testimonial.company ? ` · ${testimonial.company}` : ''}
						</footer>
					</blockquote>
				</section>
			)}

			{/* Related use cases */}
			{relatedUseCases && relatedUseCases.length > 0 && (
				<section className="border-t border-line max-w-[var(--maxw-narrow)] mx-auto px-6 py-16">
					<h3 className="font-mono text-xs text-ink-3 uppercase tracking-wider mb-6">Related workflows</h3>
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
					Eliminate the reconstruction tax.
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
