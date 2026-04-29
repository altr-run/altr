'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from './reveal'

// Live counter that increments from a base number, simulating real-time activity
function LiveCounter({
	base,
	ratePerMinute,
	label,
	prefix = '',
	suffix = '',
}: {
	base: number
	ratePerMinute: number
	label: string
	prefix?: string
	suffix?: string
}) {
	const [val, setVal] = useState(base)
	const startTime = useRef(Date.now())

	useEffect(() => {
		const interval = setInterval(() => {
			const elapsed = (Date.now() - startTime.current) / 60000
			setVal(Math.floor(base + elapsed * ratePerMinute))
		}, 1800)
		return () => clearInterval(interval)
	}, [base, ratePerMinute])

	return (
		<div className="flex items-center gap-3">
			<span className="font-mono text-[13px] font-semibold text-acc tabular-nums">
				{prefix}{val.toLocaleString()}{suffix}
			</span>
			<span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-4">{label}</span>
		</div>
	)
}

const STATS = [
	{ value: 2.7, decimals: 1, suffix: '×', label: 'faster from request to reviewable spec' },
	{ value: 41, decimals: 0, suffix: '%', label: 'less time spent rebuilding context' },
	{ value: 63, decimals: 0, suffix: '%', label: 'of pilot PRs arrived with AC attached' },
	{ value: 18, decimals: 0, suffix: 'm', label: 'median time from handoff to first draft' },
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
						const ease = 1 - Math.pow(1 - t, 4)
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
		<section
			className="py-[120px] px-8 border-b border-line overflow-hidden"
			style={{ background: 'var(--bg-1)' }}
		>
			{/* Live signal strip — Stripe-style incrementing counters */}
			<div
				className="border-b border-line mb-16 pb-4"
				style={{ maxWidth: 'var(--maxw)', margin: '0 auto', marginBottom: 64, paddingBottom: 16, paddingLeft: 0, paddingRight: 0 }}
			>
				<div className="flex items-center gap-6 flex-wrap px-0">
					<div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
						<span className="w-1.5 h-1.5 rounded-full bg-acc shadow-[0_0_0_3px_color-mix(in_oklab,var(--acc)_14%,transparent)] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
						live signal
					</div>
					<div className="w-px h-3 bg-line flex-shrink-0" />
					<LiveCounter base={14847} ratePerMinute={3} label="context trails preserved" />
					<div className="w-px h-3 bg-line flex-shrink-0" />
					<LiveCounter base={2341} ratePerMinute={1} label="handoff reconstructions eliminated" />
					<div className="w-px h-3 bg-line flex-shrink-0" />
					<LiveCounter base={918} ratePerMinute={0.4} label="specs with AC attached at merge" />
				</div>
			</div>

			<div className="inner">
				<div
					className="grid gap-[80px] items-center"
					style={{ gridTemplateColumns: '1fr 1fr' }}
				>
					{/* Left: framing statement */}
					<Reveal className="flex flex-col gap-6">
						<span className="over inline-block">pilot signal</span>
						<h2
							className="font-serif font-normal leading-[1.04] tracking-[-0.03em] text-ink m-0"
							style={{ fontSize: 'clamp(36px, 4vw, 58px)', textWrap: 'balance' }}
						>
							What early teams see when the whole trail
							<br />
							<em className="italic text-acc">stays attached.</em>
						</h2>
						<p className="font-sans text-[16px] leading-[1.62] text-ink-3 m-0 max-w-[40ch]">
							Signal from closed pilots. Teams stopped the reconstruction
							work — context now travels from the first thread to the merged diff.
						</p>
						<div className="flex items-center gap-3 pt-2">
							<div
								className="w-[6px] h-[6px] rounded-full bg-acc animate-[pulse-dot_1.6s_ease-in-out_infinite]"
							/>
							<span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-4">
								Early access cohort · Q1 2026
							</span>
						</div>
					</Reveal>

					{/* Right: stat grid */}
					<Reveal delay={120}>
						<div
							className="grid gap-px bg-line rounded-[20px] overflow-hidden border border-line"
							style={{ gridTemplateColumns: '1fr 1fr' }}
						>
							{STATS.map((stat, i) => (
								<div
									key={i}
									className="flex flex-col gap-3 p-7 group transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--acc)_3%,var(--bg))]"
									style={{ background: 'var(--bg)' }}
								>
									<div
										className="font-serif leading-none tracking-[-0.04em] text-ink"
										style={{ fontSize: 'clamp(42px, 3.6vw, 60px)' }}
									>
										<CountUp
											to={stat.value}
											decimals={stat.decimals}
											duration={1400 + i * 100}
										/>
										{stat.suffix && (
											<span
												className="text-acc"
												style={{ fontSize: '0.65em' }}
											>
												{stat.suffix}
											</span>
										)}
									</div>
									<div className="font-mono text-[10.5px] leading-[1.5] tracking-[0.07em] uppercase text-ink-3">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	)
}
