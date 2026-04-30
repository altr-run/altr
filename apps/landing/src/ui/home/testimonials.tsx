'use client'

import { cn } from '@/lib/utils'
import { useRef } from 'react'
import Reveal from './reveal'

const QUOTES = [
	{
		text: 'We stopped rewriting the brief at every handoff. The original request, acceptance criteria, and the merged diff now read like one continuous story.',
		emphasis: 'The PR finally arrives with reasoning attached.',
		initials: 'EJ',
		name: 'Elena Joshi',
		role: 'CTO',
		company: 'MESA',
		colorBg: '#1a2f1a',
		colorText: '#7fc47f',
	},
	{
		text: 'We lost the reasoning between Slack, Linear, and GitHub constantly. Altr threads it through automatically.',
		emphasis: 'Review starts from intent now, not archaeology.',
		initials: 'RP',
		name: 'Ravi Patel',
		role: 'Head of Engineering',
		company: 'Holt & Co',
		colorBg: '#1a2340',
		colorText: '#7ab3e8',
	},
	{
		text: 'Most AI tooling gave us output. Altr gives us a workflow. The agents show up with context, role, and a visible handoff.',
		emphasis: 'The whole thing is governable now.',
		initials: 'MC',
		name: 'Maya Chen',
		role: 'Founder',
		company: 'Parabola',
		colorBg: '#3a1f0d',
		colorText: '#e0a96d',
	},
]

function QuoteCard({ q, i }: { q: (typeof QUOTES)[number]; i: number }) {
	const wrapRef = useRef<HTMLDivElement>(null)

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		const el = wrapRef.current
		if (!el) return
		const rect = el.getBoundingClientRect()
		const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
		const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4
		el.style.setProperty('--cx', `${x.toFixed(2)}px`)
		el.style.setProperty('--cy', `${y.toFixed(2)}px`)
	}

	function handleMouseLeave() {
		const el = wrapRef.current
		if (!el) return
		el.style.setProperty('--cx', '0px')
		el.style.setProperty('--cy', '0px')
	}

	return (
		<div
			ref={wrapRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className="h-full"
			style={{
				transform: 'translate(var(--cx, 0px), var(--cy, 0px))',
				transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
			} as React.CSSProperties}
		>
			<Reveal
				delay={i * 80}
				className={cn(
					'flex flex-col gap-6 p-8 h-full rounded-[20px]',
					'border border-[var(--line)] bg-[var(--bg)]',
					'transition-[border-color,box-shadow] duration-300',
					'hover:border-[color-mix(in_oklab,var(--acc)_30%,var(--line))] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
				)}
			>
				{/* Quote mark */}
				<div
					className="font-serif text-[40px] leading-none text-[var(--acc)] opacity-30 select-none"
					aria-hidden="true"
				>
					&ldquo;
				</div>

				{/* Quote body */}
				<div className="flex-1 flex flex-col gap-3">
					<p className="font-serif text-[18px] leading-[1.5] text-[var(--ink-2)] tracking-[-0.01em]">
						{q.text}
					</p>
					<p className="font-serif text-[18px] leading-[1.5] text-[var(--ink)] font-normal italic tracking-[-0.01em]">
						{q.emphasis}
					</p>
				</div>

				{/* Attribution */}
				<div className="flex items-center gap-3 pt-2 border-t border-[var(--line)]">
					<div
						className="w-9 h-9 rounded-full flex-shrink-0 grid place-items-center font-sans font-semibold text-[13px]"
						style={{ background: q.colorBg, color: q.colorText }}
					>
						{q.initials}
					</div>
					<div>
						<div className="font-sans text-[13px] font-semibold text-[var(--ink)] leading-tight">
							{q.name}
						</div>
						<div className="font-mono text-[10px] text-[var(--ink-3)] tracking-[0.06em] uppercase mt-0.5">
							{q.role} · {q.company}
						</div>
					</div>
				</div>
			</Reveal>
		</div>
	)
}

export default function Testimonials() {
	return (
		<section className="py-[160px] px-8 border-b border-[var(--line)]">
			<div className="inner">
				<Reveal className="grid grid-cols-12 gap-8 lg:gap-16 items-end mb-16">
					<div className="col-span-12 lg:col-span-6">
						<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--acc)] inline-block mb-4">
							From pilot teams
						</span>
						<h2
							className="font-serif font-normal text-[var(--ink)] leading-[1.08] tracking-[-0.025em] m-0"
							style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
						>
							What shifts when
							<br />
							<em className="italic">the trail stays intact.</em>
						</h2>
					</div>
					<div className="col-span-12 lg:col-span-5 lg:col-start-8">
						<p className="font-sans text-[17px] text-[var(--ink-3)] leading-[1.65] m-0 max-w-[44ch]">
							The recurring pattern is not AI magic. It is fewer reconstruction
							meetings, stronger specs, and review that starts from full context.
						</p>
					</div>
				</Reveal>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
					{QUOTES.map((q, i) => (
						<QuoteCard key={i} q={q} i={i} />
					))}
				</div>

				{/* Bottom strip */}
				<Reveal className="mt-10 flex items-center justify-between border-t border-[var(--line)] pt-6">
					<div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-4)]">
						<span className="w-1.5 h-1.5 rounded-full bg-[var(--acc)] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
						10 teams in limited pilot
					</div>
					<span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-4)]">
						Invite-only · Q1–Q2 2026
					</span>
				</Reveal>
			</div>
		</section>
	)
}
