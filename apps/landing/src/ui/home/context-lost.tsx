'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import Reveal from './reveal'

type Pain = {
	index: string
	label: string
	stat: string
	statSuffix: string
	desc: string
	visual: ReactNode
}

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1]

/* ── Visual 01: Context Switching ──────────────────────────── */
function VisualSwitching() {
	const ref = useRef<HTMLDivElement>(null)
	const inView = useInView(ref, { once: true, margin: '-40px' })

	const tools = [
		{ abbr: 'SL', color: 'var(--brand-slack)', bg: 'var(--brand-slack-a)' },
		{ abbr: 'LN', color: 'var(--brand-linear)', bg: 'var(--brand-linear-a)' },
		{ abbr: 'GH', color: 'var(--brand-github)', bg: 'var(--brand-github-a)' },
		{ abbr: 'NT', color: 'var(--brand-notion)', bg: 'var(--brand-notion-a)' },
		{ abbr: '?', color: 'var(--ink-4)', bg: 'var(--bg-1)' },
	]

	return (
		<div ref={ref} className="flex items-center gap-[7px] mb-[22px]">
			{tools.map(({ abbr, color, bg }, i) => (
				<div key={i} className="flex items-center gap-[7px]">
					<motion.span
						className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center font-mono text-[10px] font-semibold border border-line"
						style={{ background: bg, color }}
						initial={{ opacity: 0, scale: 0.7, y: 4 }}
						animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
						transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
					>
						{abbr}
					</motion.span>
					{i < tools.length - 1 && (
						<motion.svg
							width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true"
							initial={{ opacity: 0 }}
							animate={inView ? { opacity: 1 } : {}}
							transition={{ duration: 0.3, delay: i * 0.08 + 0.18 }}
						>
							<path d="M0 4h8M6 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-4" />
						</motion.svg>
					)}
				</div>
			))}
		</div>
	)
}

/* ── Visual 02: Context Missing ─────────────────────────────── */
function VisualMissing() {
	const ref = useRef<HTMLDivElement>(null)
	const inView = useInView(ref, { once: true, margin: '-40px' })

	const messages = [
		{ who: 'PM',  text: "Let's add magic-link auth, no passwords", faded: false },
		{ who: 'ENG', text: 'So… just skip auth entirely?',            faded: true  },
		{ who: '?',   text: "Where's the original brief?",             faded: true  },
	]

	return (
		<div ref={ref} className="flex flex-col gap-[6px] mb-[22px]">
			{messages.map(({ who, text, faded }, i) => (
				<motion.div
					key={i}
					className="flex items-start gap-2 text-[12px] leading-[1.4]"
					initial={{ opacity: 0, x: -6 }}
					animate={inView ? { opacity: faded ? 0.45 : 1, x: 0 } : {}}
					transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.28 }}
				>
					<span
						className="flex-shrink-0 w-[20px] h-[20px] rounded-full flex items-center justify-center font-mono text-[9px] font-semibold border border-line"
						style={{
							background: i === 0 ? 'color-mix(in oklab, var(--acc) 12%, white)' : 'var(--bg-1)',
							color: i === 0 ? 'var(--acc-ink)' : 'var(--ink-3)',
						}}
					>
						{who}
					</span>
					<span className="font-sans text-ink-2 pt-[2px]">{text}</span>
				</motion.div>
			))}
		</div>
	)
}

/* ── Visual 03: Context Rebuilding ──────────────────────────── */
function VisualRebuilding() {
	const ref = useRef<HTMLDivElement>(null)
	const inView = useInView(ref, { once: true, margin: '-40px' })

	return (
		<div ref={ref} className="flex items-center gap-[10px] mb-[22px]">
			<motion.div
				className="h-[38px] rounded-[10px] border border-line flex items-center px-3 gap-2 font-mono text-[11px] text-ink-3"
				style={{ background: 'rgba(255,255,255,0.8)', flex: '1 1 0' }}
				initial={{ opacity: 0, x: -8 }}
				animate={inView ? { opacity: 1, x: 0 } : {}}
				transition={{ duration: 0.4, ease: EASE }}
			>
				<span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: 'var(--macos-minimize)' }} />
				slack thread
			</motion.div>

			{/* Arrow with subtle bounce */}
			<motion.svg
				width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true"
				animate={inView ? { x: [0, 3, 0] } : {}}
				transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
			>
				<path d="M0 6h14M12 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-ink-4" />
			</motion.svg>

			<motion.div
				className="h-[38px] rounded-[10px] border border-dashed border-line flex items-center px-3 gap-2 font-mono text-[11px] text-ink-4"
				style={{ background: 'rgba(255,255,255,0.4)', flex: '1 1 0' }}
				initial={{ opacity: 0, x: 8 }}
				animate={inView ? { opacity: 1, x: 0 } : {}}
				transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
			>
				<span className="w-[6px] h-[6px] rounded-full flex-shrink-0 opacity-30 bg-ink-4" />
				...who asked?
			</motion.div>
		</div>
	)
}

/* ── Visual 04: Knowledge Erosion (Agent Amnesia) ───────────── */
function VisualAgentAmnessia() {
	const ref = useRef<HTMLDivElement>(null)
	const inView = useInView(ref, { once: true, margin: '-40px' })

	const sessions = [
		{ label: 'Claude Code · session 1', note: 'chose Postgres for WAL', faded: false },
		{ label: 'Codex · session 2',       note: 'why not SQLite?',         faded: true  },
		{ label: 'Gemini CLI · session 3',  note: '← blank slate',           faded: true  },
	]

	return (
		<div ref={ref} className="flex flex-col gap-[6px] mb-[22px]">
			{sessions.map(({ label, note, faded }, i) => (
				<motion.div
					key={i}
					className="flex items-center justify-between gap-2 rounded-[8px] border border-line px-3 py-[7px]"
					style={{ background: 'rgba(255,255,255,0.7)' }}
					initial={{ opacity: 0, y: 6 }}
					animate={inView ? { opacity: faded ? 0.32 : 1, y: 0 } : {}}
					transition={{
						duration: 0.5,
						ease: EASE,
						delay: 0.1 + i * 0.32,
						opacity: { duration: faded ? 0.8 : 0.5 },
					}}
				>
					<span className="font-mono text-[10px] text-ink-3 truncate">{label}</span>
					<span className="font-mono text-[10px] text-ink-4 flex-shrink-0">{note}</span>
				</motion.div>
			))}
		</div>
	)
}

const PAINS: Pain[] = [
	{
		index: '01',
		label: 'Context Switching',
		stat: '5 tools,',
		statSuffix: 'zero thread',
		desc: "Your team writes the brief in Slack, refines it in Linear, builds it in GitHub, and reviews it in Notion. The original intent doesn't survive the trip.",
		visual: <VisualSwitching />,
	},
	{
		index: '02',
		label: 'Context Missing',
		stat: '3 re-explains',
		statSuffix: 'per ticket',
		desc: 'By the time a PR opens, the acceptance criteria from the kick-off thread has been paraphrased twice and summarized once. Reviewers guess at the goal.',
		visual: <VisualMissing />,
	},
	{
		index: '03',
		label: 'Context Rebuilding',
		stat: '2.5h daily',
		statSuffix: 'stitching context',
		desc: 'Engineers spend the start of every sprint pulling up old threads and calls — context that should have traveled automatically with the work.',
		visual: <VisualRebuilding />,
	},
	{
		index: '04',
		label: 'Knowledge Erosion',
		stat: '0 agents',
		statSuffix: 'remember why',
		desc: 'Every AI coding session starts blank. The architectural decisions your team made last sprint — which database, which pattern, which approach was rejected — are invisible to the next agent. You re-litigate the same choices, sprint after sprint.',
		visual: <VisualAgentAmnessia />,
	},
]

export default function ContextLost() {
	return (
		<section
			className="py-[120px] px-8 border-b border-line overflow-hidden"
			style={{
				background: 'var(--bg)',
			}}
		>
			<div className="inner">
				{/* Headline */}
				<Reveal className="text-center mb-[72px]">
					<p
						className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-5"
					>
						the problem
					</p>
					<h2
						className="font-serif font-normal tracking-[-0.03em] text-ink mx-auto"
						style={{
							fontSize: 'clamp(34px, 4.2vw, 62px)',
							lineHeight: 1.06,
							maxWidth: 820,
							textWrap: 'balance',
						}}
					>
						Context dies at every handoff.
						<br />
						<em className="italic text-acc">Knowledge erodes across every sprint.</em>
					</h2>
					<p
						className="mt-5 font-sans text-[17px] text-ink-3 mx-auto"
						style={{ maxWidth: '52ch' }}
					>
						Work sprawl destroys the context your team needs to ship. And when
						everyone uses AI agents, nobody owns the knowledge — decisions
						evaporate between sessions.
					</p>
				</Reveal>

				{/* Pain cards */}
				<div
					className="grid gap-px bg-line rounded-[24px] overflow-hidden border border-line"
					style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
				>
					{PAINS.map((pain, i) => (
						<Reveal
							key={i}
							delay={i * 90}
							className="flex flex-col p-8 relative group transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--acc)_3%,white)]"
							style={{ background: 'var(--bg)' }}
						>
							{/* Index */}
							<span className="font-mono text-[10px] text-ink-4 tracking-[0.14em] mb-5">
								{pain.index}
							</span>

							{/* Visual mockup */}
							{pain.visual}

							{/* Stat */}
							<div className="mb-4">
								<span
									className="font-serif text-[40px] leading-none tracking-[-0.04em] text-ink"
								>
									{pain.stat}
								</span>
								<span className="block font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-4 mt-1">
									{pain.statSuffix}
								</span>
							</div>

							{/* Label */}
							<h3 className="font-sans font-semibold text-[16px] text-ink tracking-tight mb-2">
								{pain.label}
							</h3>

							{/* Desc */}
							<p className="font-sans text-[13.5px] leading-[1.62] text-ink-3 m-0">
								{pain.desc}
							</p>

							{/* Bottom accent line on hover */}
							<div
								className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-acc opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							/>
						</Reveal>
					))}
				</div>

				{/* Bridge to solution */}
				<Reveal className="text-center mt-12">
					<p className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-4">
						Altr keeps context attached and knowledge alive — from first thread to merged PR →
					</p>
				</Reveal>
			</div>
		</section>
	)
}
