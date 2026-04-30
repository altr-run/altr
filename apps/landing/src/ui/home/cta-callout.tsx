import { Button } from '@/components/ui/button'

export default function CTACallout() {
	return (
		<section
			className="px-8 py-28 border-y border-[var(--line)] relative overflow-hidden"
			style={{ background: 'color-mix(in oklab, var(--acc) 4%, var(--bg))' }}
		>
			{/* Subtle radial glow */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: 'radial-gradient(ellipse 60% 80% at 80% 50%, color-mix(in oklab, var(--acc-soft) 40%, transparent) 0%, transparent 70%)',
				}}
			/>

			<div
				className="relative mx-auto flex flex-col sm:flex-row items-center justify-between gap-10"
				style={{ maxWidth: 'var(--maxw)' }}
			>
				{/* Left copy */}
				<div className="flex-1 min-w-0 flex flex-col gap-4">
					<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--acc)]">
						Close the loop
					</span>
					<h2
						className="font-serif font-normal text-[var(--ink)] leading-[1.1] tracking-[-0.025em] m-0"
						style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', textWrap: 'balance' }}
					>
						Stop rebuilding the story
						<br />
						<em className="italic">at every handoff.</em>
					</h2>
					<p className="font-sans text-[16px] text-[var(--ink-3)] leading-[1.65] m-0 max-w-[48ch]">
						Slack thread → spec → PR → merge. One unbroken trail. No context tax,
						no sync meetings, no archaeology at review.
					</p>
				</div>

				{/* Right CTA */}
				<div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0">
					<Button variant="acc" size="lg" href="#close">
						Get early access →
					</Button>
					<span className="font-mono text-[10px] text-[var(--ink-4)] tracking-[0.1em] uppercase text-center">
						Mission control · MCP + CLI · BYOK
					</span>
				</div>
			</div>
		</section>
	)
}
