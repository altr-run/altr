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

// Split headline on ". " to colour the second sentence accent
function SplitHeadline({ text }: { text: string }) {
	const dot = text.indexOf('. ')
	if (dot === -1) return <>{text}</>
	return (
		<>
			{text.slice(0, dot + 1)}{' '}
			<em className="italic text-acc">{text.slice(dot + 2)}</em>
		</>
	)
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

	const altrCount = featureTable?.filter((r) => r.altr).length ?? 0
	const themCount = featureTable?.filter((r) => r.them).length ?? 0

	return (
		<main className="bg-(--bg) text-ink">

			{/* ── Hero ──────────────────────────────────────────────────────── */}
			<section
				className="px-8 py-[120px] text-center border-b border-line"
				style={{
					background:
						'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--acc) 8%, transparent) 0%, transparent 70%), var(--bg)',
				}}
			>
				<div className="max-w-[var(--maxw-narrow)] mx-auto flex flex-col items-center gap-6">
					{/* badge */}
					<div className="flex items-center gap-2">
						<span className="font-mono text-[11px] tracking-widest uppercase text-ink-3 border border-line bg-(--panel) rounded-full px-3 py-1.5">
							Altr vs {competitor}
						</span>
					</div>

					{/* headline */}
					<h1
						className="font-serif text-ink text-center"
						style={{
							fontSize: 'clamp(28px, 4.4vw, 64px)',
							lineHeight: 1.08,
							textWrap: 'balance',
						}}
					>
						{headline ? <SplitHeadline text={headline} /> : `Altr vs ${competitor}`}
					</h1>

					{subhead && (
						<p
							className="text-ink-2 max-w-[52ch] mx-auto"
							style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.65 }}
						>
							{subhead}
						</p>
					)}

					{/* side-by-side score strip */}
					{featureTable && (
						<div className="flex items-center gap-4 mt-2">
							<div className="text-center">
								<div className="font-serif text-[42px] text-acc leading-none">{altrCount}</div>
								<div className="font-mono text-[10px] uppercase tracking-widest text-acc mt-1">Altr</div>
							</div>
							<div className="font-mono text-[20px] text-ink-3">vs</div>
							<div className="text-center">
								<div className="font-serif text-[42px] text-ink-3 leading-none">{themCount}</div>
								<div className="font-mono text-[10px] uppercase tracking-widest text-ink-3 mt-1">{competitor}</div>
							</div>
							<div className="font-mono text-[10px] text-ink-4 ml-2">
								features checked
							</div>
						</div>
					)}

					<div className="flex flex-col items-center gap-2 pt-2">
						<Link
							href="/#close"
							className="inline-flex items-center gap-2 bg-acc text-acc-ink font-mono text-sm tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
						>
							{ctaLabel ?? 'Get early access'} →
						</Link>
						<span className="font-mono text-[11px] text-ink-3">
							Founder-led onboarding · no card required
						</span>
					</div>
				</div>
			</section>

			{/* ── Pain points ───────────────────────────────────────────────── */}
			{painPoints && painPoints.length > 0 && (
				<section className="border-b border-line" style={{ background: 'var(--bg-1)' }}>
					<div className="max-w-[var(--maxw)] mx-auto px-8 py-20">
						<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-10 text-center">
							Where {competitor} stops short
						</p>
						<div
							className="grid gap-px rounded-[24px] overflow-hidden border border-line"
							style={{ gridTemplateColumns: `repeat(${Math.min(painPoints.length, 3)}, 1fr)` }}
						>
							{painPoints.map((p, i) => (
								<div
									key={i}
									className="p-8 flex flex-col gap-3"
									style={{ background: 'var(--bg)' }}
								>
									<span className="font-mono text-[10px] uppercase tracking-widest text-ink-4">
										0{i + 1}
									</span>
									<h3 className="font-serif text-xl text-ink leading-snug">
										{p.title}
									</h3>
									<p className="font-sans text-[14px] leading-[1.7] text-ink-2">
										{p.body}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* ── Feature table ─────────────────────────────────────────────── */}
			{featureTable && featureTable.length > 0 && (
				<section className="border-b border-line">
					<div className="max-w-[var(--maxw-narrow)] mx-auto px-8 py-20">
						<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-10 text-center">
							Feature by feature
						</p>

						<div className="border border-line rounded-[20px] overflow-hidden">
							{/* Table header */}
							<div
								className="grid border-b border-line"
								style={{ gridTemplateColumns: '1fr 160px 160px', background: 'var(--bg-1)' }}
							>
								<div className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-ink-4">
									Capability
								</div>
								<div className="px-4 py-4 text-center border-l border-line">
									<span className="font-mono text-[11px] font-bold text-acc">Altr</span>
								</div>
								<div className="px-4 py-4 text-center border-l border-line">
									<span className="font-mono text-[11px] text-ink-3">{competitor}</span>
								</div>
							</div>

							{featureTable.map((row, i) => (
								<div
									key={i}
									className="grid border-b border-line last:border-0"
									style={{ gridTemplateColumns: '1fr 160px 160px', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-1)' }}
								>
									{/* Feature label */}
									<div className="px-6 py-4">
										<span className="font-sans text-[14px] text-ink">{row.feature}</span>
									</div>

									{/* Altr cell */}
									<div className="px-4 py-4 border-l border-line text-center flex flex-col items-center justify-center gap-1">
										{row.altr ? (
											<>
												<span className="text-acc font-mono text-[18px] leading-none">✓</span>
												{row.altrNote && (
													<span className="font-mono text-[10px] text-acc-muted leading-tight text-center">
														{row.altrNote}
													</span>
												)}
											</>
										) : (
											<span className="text-ink-4 font-mono text-[18px] leading-none">–</span>
										)}
									</div>

									{/* Them cell */}
									<div className="px-4 py-4 border-l border-line text-center flex flex-col items-center justify-center gap-1">
										{row.them ? (
											<>
												<span className="text-ink-2 font-mono text-[18px] leading-none">✓</span>
												{row.themNote && (
													<span className="font-mono text-[10px] text-ink-4 leading-tight text-center">
														{row.themNote}
													</span>
												)}
											</>
										) : (
											<span className="text-ink-4 font-mono text-[18px] leading-none">✗</span>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* ── Counter-positioning pull quote ────────────────────────────── */}
			{counterParagraph && (
				<section
					className="px-8 py-24 border-b border-line"
					style={{
						background:
							'linear-gradient(160deg, color-mix(in oklab, var(--acc) 5%, var(--bg)) 0%, var(--bg) 50%)',
					}}
				>
					<div className="max-w-[var(--maxw-narrow)] mx-auto">
						<p className="font-mono text-[10px] uppercase tracking-widest text-acc mb-8">
							The real difference
						</p>
						<blockquote
							className="font-serif text-ink leading-[1.25]"
							style={{ fontSize: 'clamp(22px, 2.8vw, 38px)', textWrap: 'balance' }}
						>
							&ldquo;{counterParagraph}&rdquo;
						</blockquote>
					</div>
				</section>
			)}

			{/* ── CTA close ─────────────────────────────────────────────────── */}
			<section
				className="px-8 py-[120px] text-center"
				style={{
					background:
						'radial-gradient(60% 50% at 50% 100%, color-mix(in oklab, var(--acc) 6%, transparent) 0%, transparent 70%), var(--bg)',
				}}
			>
				<div className="max-w-[var(--maxw-narrow)] mx-auto flex flex-col items-center gap-5">
					<h2
						className="font-serif text-ink"
						style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.1, textWrap: 'balance' }}
					>
						Ready to close the loop?
					</h2>
					<p className="font-sans text-[16px] text-ink-2 max-w-[44ch] leading-[1.65]">
						We'll walk through Altr using your actual workflow and show you where the gap between intent and merged code disappears.
					</p>
					<div className="flex flex-col items-center gap-2 pt-2">
						<Link
							href="/#close"
							className="inline-flex items-center gap-2 bg-acc text-acc-ink font-mono text-sm tracking-wide px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
						>
							{ctaLabel ?? 'Talk to the founders'} →
						</Link>
						<span className="font-mono text-[11px] text-ink-3">
							No card required · Founder-led onboarding
						</span>
					</div>

					{/* Links back to other comparisons */}
					<div className="mt-8 pt-8 border-t border-line w-full text-center">
						<p className="font-mono text-[11px] text-ink-3 mb-4">Also compare</p>
						<div className="flex flex-wrap justify-center gap-3">
							<Link href="/compare/altr-vs-cursor" className="font-mono text-[12px] text-ink-2 hover:text-acc transition-colors no-underline">
								vs Cursor
							</Link>
							<span className="text-ink-4">·</span>
							<Link href="/compare/altr-vs-devin" className="font-mono text-[12px] text-ink-2 hover:text-acc transition-colors no-underline">
								vs Devin
							</Link>
							<span className="text-ink-4">·</span>
							<Link href="/compare/altr-vs-github-copilot" className="font-mono text-[12px] text-ink-2 hover:text-acc transition-colors no-underline">
								vs GitHub Copilot
							</Link>
							<span className="text-ink-4">·</span>
							<Link href="/compare/altr-vs-linear" className="font-mono text-[12px] text-ink-2 hover:text-acc transition-colors no-underline">
								vs Linear
							</Link>
							<span className="text-ink-4">·</span>
							<Link href="/compare" className="font-mono text-[12px] text-acc no-underline hover:underline">
								All comparisons →
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
