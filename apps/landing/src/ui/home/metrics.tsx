'use client'

import { useEffect, useRef, useState } from 'react'
import s from './home.module.css'
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
		<section className={s.metrics}>
			<div className={s.metricsIn}>
				<Reveal className={s.metricsHead}>
					<span
						className={s.over}
						style={{ display: 'inline-block', marginBottom: 16 }}
					>
						§ pilot signal
					</span>
					<h2 className={s.h2}>
						What early teams see when
						<br />
						<em>the whole trail stays attached.</em>
					</h2>
					<p className={s.metricsNote}>
						Early signal from pilot teams.
					</p>
				</Reveal>
				<div className={s.metricsGrid}>
					{STATS.map((stat, i) => (
						<Reveal key={i} delay={i * 80} className={s.metricCell}>
							<div className={s.metricVal}>
								<CountUp
									to={stat.value}
									decimals={stat.decimals}
									duration={1400 + i * 100}
								/>
								{stat.suffix && (
									<span className={s.metricSuffix}>{stat.suffix}</span>
								)}
							</div>
							<div className={s.metricLabel}>{stat.label}</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
