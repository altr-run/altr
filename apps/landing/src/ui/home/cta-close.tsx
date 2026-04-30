'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CTAClose() {
	const inputRef = useRef<HTMLInputElement>(null)
	const btnRef = useRef<HTMLButtonElement>(null)

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
				style={{ fontSize: 'clamp(40px, 4.8vw, 72px)' }}
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
				className="inline-flex gap-2 items-center py-[7px] px-[7px] pl-[26px] rounded-full bg-surface border border-line-2 min-w-[520px] max-w-full focus-within:border-[color-mix(in_oklab,var(--acc)_48%,var(--line-2))] transition-colors duration-200"
				style={{
					['--focus-ring' as string]: 'none',
					boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
				}}
				onSubmit={(e) => {
					e.preventDefault()
					if (inputRef.current) inputRef.current.value = ''
					if (btnRef.current) btnRef.current.textContent = '✓ on the list'
				}}
			>
				<Input
					ref={inputRef}
					type="email"
					required
					placeholder="you@company.com"
					className="text-[16px] py-[12px]"
				/>
				<Button ref={btnRef} type="submit" variant="acc" size="lg">
					Request access →
				</Button>
			</form>
			<div className="mt-[20px] font-mono text-[11px] text-ink-4 tracking-widest">
				founder-led onboarding · no spam · unsubscribe anytime
			</div>
		</section>
	)
}
