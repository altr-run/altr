export default function CTACallout() {
	return (
		<section className="px-8 py-32 border-y border-line" style={{ background: 'color-mix(in oklab, var(--acc) 3%, var(--bg))' }}>
			<div
				className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-8"
				style={{ maxWidth: 'var(--maxw)' }}
			>
				{/* left copy */}
				<div className="flex-1 min-w-0">
					<p className="font-mono text-[11px] uppercase tracking-widest text-acc mb-3">
						Ready to close the loop?
					</p>
					<h2
						className="font-serif font-normal text-ink leading-[1.12]"
						style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', textWrap: 'balance' }}
					>
						Stop rebuilding the story at every handoff.
					</h2>
					<p className="font-sans text-[17px] text-ink-3 leading-[1.65] mt-4 max-w-[52ch]">
						Slack thread → spec → PR → merged. One continuous trail. No archaeology,
						no sync meetings, no context tax.
					</p>
				</div>

				{/* right CTA */}
				<div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0">
					<a href="#close" className="btn btn-acc btn-lg">
						Get early access →
					</a>
					<span className="font-mono text-[10px] text-ink-4 tracking-widest uppercase">
						Mission control app · MCP + CLI · BYOK
					</span>
				</div>
			</div>
		</section>
	)
}
