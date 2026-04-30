'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from './reveal'
import { AltrExecutionChart, AltrRunsList, AltrPreviewScope } from '@/components/altr-app-preview'

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
		<div className="flex items-center gap-2.5">
			<span className="font-mono text-[12px] font-semibold text-[var(--acc)] tabular-nums">
				{prefix}{val.toLocaleString()}{suffix}
			</span>
			<span className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-4)]">{label}</span>
		</div>
	)
}

const STATS = [
	{ value: 2.7, decimals: 1, suffix: '×', label: 'faster from request to reviewable spec' },
	{ value: 41, decimals: 0, suffix: '%', label: 'less time rebuilding context across tools' },
	{ value: 63, decimals: 0, suffix: '%', label: 'of pilot PRs arrived with AC attached' },
	{ value: 18, decimals: 0, suffix: 'm', label: 'median handoff-to-first-draft time' },
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
			className="py-[160px] px-8 border-b border-[var(--line)] overflow-hidden"
			style={{ background: 'var(--bg-1)' }}
		>
			{/* Live signal strip */}
			<div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', paddingBottom: 48, marginBottom: 48, borderBottom: '1px solid var(--line)' }}>
				<div className="flex items-center gap-5 flex-wrap">
					<div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-4)]">
						<span className="w-1.5 h-1.5 rounded-full bg-[var(--acc)] shadow-[0_0_0_3px_color-mix(in_oklab,var(--acc)_14%,transparent)] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
						live signal
					</div>
					<div className="w-px h-3 bg-[var(--line)] flex-shrink-0" />
					<LiveCounter base={14847} ratePerMinute={3} label="context trails preserved" />
					<div className="w-px h-3 bg-[var(--line)] flex-shrink-0" />
					<LiveCounter base={2341} ratePerMinute={1} label="reconstructions eliminated" />
					<div className="w-px h-3 bg-[var(--line)] flex-shrink-0" />
					<LiveCounter base={918} ratePerMinute={0.4} label="specs with AC at merge" />
				</div>
			</div>

			<div className="inner">
				<div className="grid grid-cols-12 gap-12 lg:gap-24 items-center">
					{/* Left: framing */}
					<Reveal className="col-span-12 lg:col-span-6 flex flex-col gap-6">
						<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--acc)] inline-block">
							Pilot signal
						</span>
						<h2
							className="font-serif font-normal text-[var(--ink)] leading-[1.08] tracking-[-0.025em] m-0"
							style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
						>
							What early teams see
							<br />
							<em className="italic text-[var(--acc)]">when the trail stays attached.</em>
						</h2>
						<p className="font-sans text-[17px] text-[var(--ink-3)] leading-[1.65] m-0 max-w-[46ch]">
							Numbers from closed pilots. Teams stopped reconstruction work —
							context now travels from the first thread to the merged diff.
						</p>
						<div className="flex items-center gap-2.5 pt-1">
							<div className="w-[6px] h-[6px] rounded-full bg-[var(--acc)] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
							<span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--ink-4)]">
								Early access cohort · Q1 2026
							</span>
						</div>
					</Reveal>

					{/* Right: stat grid */}
					<Reveal delay={120} className="col-span-12 lg:col-span-6">
						<div className="grid grid-cols-2 gap-4">
							{STATS.map((stat, i) => (
								<div
									key={i}
									className="flex flex-col gap-3 p-7 border border-[var(--line)] rounded-[20px] group transition-all duration-300 hover:border-[color-mix(in_oklab,var(--acc)_28%,var(--line))] hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]"
									style={{ background: 'var(--bg)' }}
								>
									<div
										className="font-serif leading-none tracking-[-0.04em] text-[var(--ink)]"
										style={{ fontSize: 'clamp(36px, 3.5vw, 56px)' }}
									>
										<CountUp
											to={stat.value}
											decimals={stat.decimals}
											duration={1400 + i * 100}
										/>
										{stat.suffix && (
											<span className="text-[var(--acc)]" style={{ fontSize: '0.6em' }}>
												{stat.suffix}
											</span>
										)}
									</div>
									<div className="font-mono text-[10px] leading-[1.55] tracking-[0.07em] uppercase text-[var(--ink-3)] group-hover:text-[var(--ink-2)] transition-colors duration-200">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</Reveal>
				</div>

				{/* Dashboard preview strip — chart + active runs */}
				<Reveal delay={200} className="mt-16 pt-16 border-t border-[var(--line)]">
					<AltrPreviewScope className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
						<AltrExecutionChart />
						<AltrRunsList />
					</AltrPreviewScope>
				</Reveal>
			</div>
		</section>
	)
}
