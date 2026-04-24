import Link from 'next/link'

type FeatureRow = {
	feature: string
	altr: boolean
	them: boolean
	altrNote: string | null
	themNote: string | null
}

type PainPoint = {
	title: string
	body: string
}

type ComparePage = {
	competitor: string
	headline: string | null
	subhead: string | null
	painPoints: PainPoint[] | null
	featureTable: FeatureRow[] | null
	counterParagraph: string | null
	ctaLabel: string | null
	metadata: unknown
}

export default function ComparePage({ page }: { page: ComparePage }) {
	const {
		competitor,
		headline,
		subhead,
		painPoints,
		featureTable,
		counterParagraph,
		ctaLabel,
	} = page

	return (
		<main className="bg-(--bg) text-ink">
			{/* Hero */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">
				<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 border border-line bg-(--panel) shadow-sm rounded-full px-3 py-1.5">
					Altr vs {competitor}
				</p>
				<h1
					className="font-serif text-center text-ink"
					style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.1, textWrap: 'balance' }}
				>
					{headline ?? `Altr vs ${competitor}`}
				</h1>
				{subhead && (
					<p className="text-ink-2 max-w-2xl" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: 1.6 }}>
						{subhead}
					</p>
				)}
				<div className="flex flex-col items-center gap-2 pt-2">
					<Link
						href="https://app.altr.run"
						className="inline-flex items-center gap-2 bg-acc text-[#FBF7F1] font-mono text-sm tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
					>
						{ctaLabel ?? 'Get early access'}
					</Link>
					<span className="font-mono text-xs text-ink-3">No card required. Founder-led onboarding.</span>
				</div>
			</section>

			{/* Pain points */}
			{painPoints && painPoints.length > 0 && (
				<section className="max-w-[var(--maxw)] mx-auto px-6 pb-20">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{painPoints.map((p, i) => (
							<div key={i} className="border border-line rounded-[var(--r-lg)] p-6 bg-(--panel)">
								<h3 className="font-serif text-lg text-ink mb-2">{p.title}</h3>
								<p className="text-ink-2 text-sm leading-relaxed">{p.body}</p>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Feature table */}
			{featureTable && featureTable.length > 0 && (
				<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-20">
					<h2 className="font-serif text-2xl text-ink mb-8 text-center">
						Feature by feature
					</h2>
					<div className="border border-line rounded-[var(--r-lg)] overflow-hidden">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-line bg-(--panel)">
									<th className="text-left px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-3 w-1/2">
										Feature
									</th>
									<th className="text-center px-4 py-3 font-mono text-xs uppercase tracking-wider text-acc">
										Altr
									</th>
									<th className="text-center px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink-3">
										{competitor}
									</th>
								</tr>
							</thead>
							<tbody>
								{featureTable.map((row, i) => (
									<tr key={i} className="border-b border-line last:border-0">
										<td className="px-6 py-4 text-ink">{row.feature}</td>
										<td className="px-4 py-4 text-center">
											{row.altr ? (
												<span className="text-[var(--success,#6F8C5A)] font-mono text-base">✓</span>
											) : (
												<span className="text-ink-3 font-mono text-base">–</span>
											)}
											{row.altrNote && (
												<p className="text-xs text-ink-3 mt-0.5">{row.altrNote}</p>
											)}
										</td>
										<td className="px-4 py-4 text-center">
											{row.them ? (
												<span className="text-ink-2 font-mono text-base">✓</span>
											) : (
												<span className="text-ink-3 font-mono text-base">✗</span>
											)}
											{row.themNote && (
												<p className="text-xs text-ink-3 mt-0.5">{row.themNote}</p>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			)}

			{/* Counter-positioning */}
			{counterParagraph && (
				<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 pb-20">
					<blockquote className="border-l-4 border-acc pl-8 py-2">
						<p className="font-serif text-xl text-ink leading-relaxed italic">
							{counterParagraph}
						</p>
					</blockquote>
				</section>
			)}

			{/* CTA close */}
			<section className="border-t border-line max-w-[var(--maxw-narrow)] mx-auto px-6 py-20 text-center flex flex-col items-center gap-4">
				<h2 className="font-serif text-3xl text-ink" style={{ textWrap: 'balance' }}>
					Ready to close the gap?
				</h2>
				<div className="flex flex-col items-center gap-2">
					<Link
						href="https://app.altr.run"
						className="inline-flex items-center gap-2 bg-acc text-[#FBF7F1] font-mono text-sm tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
					>
						{ctaLabel ?? 'Get early access'}
					</Link>
					<span className="font-mono text-xs text-ink-3">No card required. Founder-led onboarding.</span>
				</div>
			</section>
		</main>
	)
}
