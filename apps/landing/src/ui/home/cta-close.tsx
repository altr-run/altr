'use client'

export default function CTAClose() {
	return (
		<section
			className="py-[160px] px-8 pb-[140px] text-center border-b border-line"
			style={{
				background: 'radial-gradient(70% 60% at 50% 0%, color-mix(in oklab, var(--acc) 10%, transparent) 0%, transparent 60%), var(--bg)',
			}}
			id="close"
		>
			<h2
				className="font-serif font-normal tracking-[-0.025em] leading-[0.98] mb-7 text-balance"
				style={{ fontSize: 'clamp(48px, 6.5vw, 92px)' }}
			>
				Stop rebuilding
				<br />
				the story at every{' '}
				<span className="text-acc italic">handoff.</span>
			</h2>
			<p className="lede mx-auto mb-8">
				We&apos;ll walk through Altr using your actual workflow, your stack,
				and your review standards — and show you where the loop closes.
			</p>
			<form
				className="inline-flex gap-2 items-center py-[6px] px-[6px] pl-[22px] rounded-full bg-surface border border-line-2 shadow-sm min-w-[460px] max-w-full focus-within:border-[color-mix(in_oklab,var(--acc)_38%,var(--line-2))]"
				style={{
					['--focus-ring' as string]: 'none',
				}}
				onSubmit={(e) => {
					e.preventDefault()
					const input = e.currentTarget.querySelector('input')
					const btn = e.currentTarget.querySelector('button')
					if (input) input.value = ''
					if (btn) btn.textContent = '✓ on the list'
				}}
			>
				<input
					type="email"
					required
					placeholder="you@company.com"
					className="flex-1 border-0 outline-none bg-transparent font-sans text-[15px] text-ink py-[10px] placeholder:text-ink-4"
				/>
				<button type="submit" className="btn btn-acc">
					Request access →
				</button>
			</form>
			<div className="mt-[18px] font-mono text-[11px] text-ink-4 tracking-widest">
				founder-led onboarding · no spam · unsubscribe anytime
			</div>
		</section>
	)
}
