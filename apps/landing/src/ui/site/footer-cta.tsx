import EmailForm from './email-form'

export default function FooterCTA() {
	return (
		<div
			className="border-line border-b px-8 py-[160px] pb-[140px] text-center bg-bg"
			style={{
				background:
					'radial-gradient(70% 60% at 50% 0%, color-mix(in oklab, var(--acc) 10%, transparent) 0%, transparent 60%), var(--bg)',
			}}
			id="close"
		>
			<h2
				className="mb-7 font-serif leading-[0.98] font-normal tracking-[-0.025em] text-balance"
				style={{ fontSize: 'clamp(48px, 6.5vw, 92px)' }}
			>
				Stop rebuilding
				<br />
				the story at every <span className="text-acc italic">handoff.</span>
			</h2>
			<p className="lede mx-auto mb-8">
				We&apos;ll walk through Altr using your actual workflow, your stack,
				and your review standards — and show you where the loop closes.
			</p>
			<EmailForm />
			<div className="text-ink-4 mt-[18px] font-mono text-[11px] tracking-widest">
				founder-led onboarding · no spam · unsubscribe anytime
			</div>
		</div>
	)
}
