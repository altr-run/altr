'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from './reveal'

const STATS = [
	{ value: 2.7, decimals: 1, suffix: '×', label: 'faster from request to reviewable spec' },
	{ value: 41, decimals: 0, suffix: '%', label: 'less time spent rebuilding context' },
	{ value: 63, decimals: 0, suffix: '%', label: 'of pilot PRs arrived with AC attached' },
	{ value: 18, decimals: 0, suffix: 'm', label: 'median handoff to first structured draft' },
]

function CountUp({
	to,
	decimals = 0,
	duration = 1600,
}: {
	to: number
	decimals?: number
	duration?: number
}) {
	const [val, setVal] = useState(0)
	const ref = useRef<HTMLSpanElement>(null)
	const started = useRef(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && !started.current) {
					started.current = true
					const start = performance.now()
					const tick = (now: number) => {
						const t = Math.min((now - start) / duration, 1)
						const ease = 1 - Math.pow(1 - t, 4) // easeOutQuart
						const current =
							Math.round(to * ease * Math.pow(10, decimals)) /
							Math.pow(10, decimals)
						setVal(current)
						if (t < 1) requestAnimationFrame(tick)
					}
					requestAnimationFrame(tick)
					obs.unobserve(el)
				}
			},
			{ threshold: 0.4 },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [to, decimals, duration])

	return (
		<span ref={ref}>
			{decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}
		</span>
	)
}

export default function Metrics() {
	return (
		<section className="py-[100px] px-8 border-b border-(--line) bg-(--bg-1)">
			<div className="inner">
				<Reveal className="text-center mb-14">
					<span
						className="over inline-block"
						style={{ marginBottom: 16 }}
					>
						pilot signal
					</span>
					<h2
						className="font-serif font-normal leading-none tracking-[-0.03em] text-wrap-balance m-0"
						style={{ fontSize: 'clamp(44px, 5.6vw, 84px)' }}
					>
						What early teams see when
						<br />
						<em className="italic">the whole trail stays attached.</em>
					</h2>
					<p className="mt-5 max-w-[58ch] mx-auto font-mono text-[11px] leading-[1.6] tracking-[0.03em] uppercase text-(--ink-4)">
						Early signal from pilot teams.
					</p>
				</Reveal>

				<div
					className="grid gap-[1px] border-t border-(--line)"
					style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
				>
					{STATS.map((stat, i) => (
						<Reveal
							key={i}
							delay={i * 80}
							className={[
								'py-12 px-7 text-center',
								'border-r border-(--line) last:border-r-0',
								'transition-[background,transform,box-shadow] duration-300',
								'hover:bg-(--surface) hover:-translate-y-1 hover:z-[1] hover:relative',
								'hover:shadow-[0_16px_40px_rgba(0,0,0,0.07),inset_0_-3px_0_var(--acc)]',
							].join(' ')}
						>
							<div
								className="font-serif leading-none tracking-[-0.04em] text-(--ink)"
								style={{ fontSize: 'clamp(56px, 5vw, 84px)' }}
							>
								<CountUp
									to={stat.value}
									decimals={stat.decimals}
									duration={1400 + i * 100}
								/>
								{stat.suffix && (
									<span className="text-[42px] text-(--ink-3) tracking-[-0.02em]">
										{stat.suffix}
									</span>
								)}
							</div>
							<div className="font-mono text-[11px] leading-[1.55] tracking-[0.08em] uppercase text-(--ink-3) mt-3.5 max-w-[24ch] mx-auto">
								{stat.label}
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
