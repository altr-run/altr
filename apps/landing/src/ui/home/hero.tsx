'use client'

import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Reveal from './reveal'
import { AltrAppPreview } from '@/components/altr-app-preview'

const ROTATING_WORDS = ['context', 'intent', 'clarity', 'control'] as const

const HERO_STATS = [
	{ value: 6, suffix: 'h', label: 'saved per engineer per week' },
	{ value: 18, suffix: 'm', label: 'thread to first reviewable spec' },
	{ value: 100, suffix: '%', label: 'human approval at every gate' },
] as const

function HeroCountUp({
	target,
	suffix,
	inView,
	duration = 1100,
}: {
	target: number
	suffix: string
	inView: boolean
	duration?: number
}) {
	const [val, setVal] = useState(0)
	const started = useRef(false)

	useEffect(() => {
		if (!inView || started.current) return
		started.current = true
		const start = performance.now()
		const tick = (now: number) => {
			const t = Math.min((now - start) / duration, 1)
			const ease = 1 - Math.pow(1 - t, 3)
			setVal(Math.round(target * ease))
			if (t < 1) requestAnimationFrame(tick)
		}
		requestAnimationFrame(tick)
	}, [inView, target, duration])

	return (
		<>
			{val}
			{suffix}
		</>
	)
}

export default function Hero() {
	const [wordIndex, setWordIndex] = useState(0)

	useEffect(() => {
		const interval = window.setInterval(() => {
			setWordIndex((current) => (current + 1) % ROTATING_WORDS.length)
		}, 6500)
		return () => window.clearInterval(interval)
	}, [])

	// track raw window scroll so animation reacts immediately on first scroll
	const { scrollY } = useScroll()

	const shotScale   = useTransform(scrollY, [0, 520], [0.72, 1.0])
	const shotRotateX = useTransform(scrollY, [0, 520], [10, 0])
	const shotY       = useTransform(scrollY, [0, 520], [-40, 0])

	const statsRef = useRef<HTMLDivElement>(null)
	const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

	const word = ROTATING_WORDS[wordIndex]

	return (
		<section
			className="px-8 pb-0 flex flex-col relative overflow-hidden bg-transparent text-ink border-b border-[color-mix(in_oklab,var(--line)_78%,transparent)]"
			style={{ minHeight: '156svh' }}
		>
			{/* hero text wrap */}
			<div className="w-full mx-auto text-center flex flex-col items-center gap-7 relative z-[1] flex-1 pt-[280px] pb-12" style={{ maxWidth: 'var(--maxw)' }}>
				{/* announcement pill */}
				<div className="inline-flex items-center gap-2.5 border border-line rounded-full px-3 py-1.5 shadow-sm" style={{ background: 'color-mix(in oklab, var(--panel) 92%, white)' }}>
					<span className="w-1.5 h-1.5 rounded-full bg-acc flex-shrink-0 animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
					<span className="badge badge-acc">Early Access</span>
					<span className="font-mono text-[11px] tracking-widest uppercase text-ink-3">
						Orchestrate any agent · thread to merged PR
					</span>
				</div>

				<h1
					className="font-serif text-center"
					style={{
						fontSize: 'clamp(44px, 5.5vw, 80px)',
						lineHeight: 1.06,
						textWrap: 'balance',
					}}
				>
					<span className="block">Build without the archaeology.</span>
					<span className="block">Mission control for every agent you run.</span>
					<span className="block">
						Ship with{' '}
						<span className="inline-block relative">
							<AnimatePresence mode="wait" initial={false}>
								<motion.span
									key={word}
									className="text-acc inline-block"
									style={{
										display: 'inline-block',
										clipPath: 'inset(0 100% 0 0)',
									}}
									animate={{
										clipPath: 'inset(0 0% 0 0)',
									}}
									exit={{
										opacity: 0,
										y: '-0.14em',
										filter: 'blur(6px)',
										transition: {
											duration: 0.55,
											ease: [0.55, 0, 1, 0.45],
										},
									}}
									transition={{
										clipPath: {
											duration: 1.1,
											ease: [0.16, 1, 0.3, 1],
										},
									}}
								>
									{word}.
								</motion.span>
							</AnimatePresence>
						</span>
					</span>
				</h1>

				<p className="font-sans leading-[1.62] text-ink-2 max-w-[56ch] mx-auto" style={{ fontSize: 'clamp(18px, 1.4vw, 22px)' }}>
					Run Claude Code, Codex, and your whole agent fleet from one
					execution surface. Context from every Slack thread, Linear ticket,
					and call — injected via MCP before a session starts, attached to
					every PR when it opens.
				</p>

				<div className="flex gap-[10px] flex-wrap justify-center">
					<Button variant="acc" size="lg" href="#close">
						Get early access →
					</Button>
					<Button variant="cta-ghost" size="lg" href="#playground">
						See it in action
					</Button>
				</div>

				{/* Social proof row */}
				<div className="flex flex-col items-center gap-2.5 mt-1">
					<div className="flex items-center gap-3">
						{/* Avatar stack */}
						<div className="flex -space-x-2">
							{[
								{ initials: 'EJ', bg: '#2a3f1a', color: 'var(--acc)' },
								{ initials: 'RP', bg: '#1a2d3f', color: '#52b8ff' },
								{ initials: 'MC', bg: '#3f2a1a', color: '#ffb852' },
								{ initials: 'SK', bg: '#2a1a3f', color: '#c852ff' },
							].map((a) => (
								<div
									key={a.initials}
									className="w-7 h-7 rounded-full border-2 border-bg flex items-center justify-center font-sans font-semibold text-[9.5px] tracking-tight flex-shrink-0"
									style={{ background: a.bg, color: a.color }}
								>
									{a.initials}
								</div>
							))}
						</div>
						<div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.06em] text-ink-3">
							<span className="w-1.5 h-1.5 rounded-full bg-acc animate-[pulse-dot_1.6s_ease-in-out_infinite] flex-shrink-0" />
							<span>10 teams on limited pilot · <em className="not-italic text-ink-2">invite-only</em></span>
						</div>
					</div>
				</div>

				{/* outcome stat strip */}
				<div ref={statsRef} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mt-2">
					{HERO_STATS.map(({ value, suffix, label }, i) => (
						<motion.div
							key={label}
							className="flex items-baseline gap-1.5"
							initial={{ opacity: 0, y: 6 }}
							animate={statsInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
						>
							<span className="font-mono text-[17px] font-semibold text-acc tabular-nums">
								<HeroCountUp
									target={value}
									suffix={suffix}
									inView={statsInView}
									duration={900 + i * 120}
								/>
							</span>
							<span className="font-mono text-[11px] text-ink-4 tracking-widest uppercase">{label}</span>
						</motion.div>
					))}
				</div>

			</div>

			{/* product shot */}
			<motion.div
				className="max-w-[1240px] mx-auto px-6 pb-28 relative z-[1]"
				style={{
					scale: shotScale,
					rotateX: shotRotateX,
					y: shotY,
					transformPerspective: 1200,
					transformOrigin: 'center bottom',
				}}
			>
				<Reveal>
					<div id="product">
						<AltrAppPreview variant="full" />
					</div>
				</Reveal>
			</motion.div>
		</section>
	)
}
