import Reveal from './reveal'

export default function Pullquote() {
	return (
		<section className="py-[120px] px-8 border-b border-line bg-(--bg-1)">
			<Reveal className="inner text-center">
				<q className="[quotes:none] font-serif font-normal text-[clamp(26px,3vw,44px)] leading-[1.08] tracking-[-0.02em] text-ink [text-wrap:balance] block">
					Altr is the first tool that made my AI teammates feel like{' '}
					<em className="italic text-acc">teammates</em> — not a chat window I have to babysit.
				</q>
				<div className="mt-9 inline-flex gap-3.5 items-center font-mono text-[12px] text-ink-3 tracking-[0.02em]">
					<span className="w-8 h-8 rounded-full bg-(--bg-2) grid place-items-center font-sans font-semibold text-[13px] text-ink">
						SK
					</span>
					<div>
						<b className="text-ink font-sans font-semibold text-[13px]">Sana Khoury</b>
						{' · '}Head of Product, Northline
						<div style={{ color: 'var(--ink-4)' }}>
							team of 14 · shipping since march 2026
						</div>
					</div>
				</div>
			</Reveal>
		</section>
	)
}
