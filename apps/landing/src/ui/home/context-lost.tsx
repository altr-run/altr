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

function VisualSwitching() {
	const tools = [
		{ abbr: 'SL', color: '#4A154B', bg: 'rgba(74,21,75,0.1)' },
		{ abbr: 'LN', color: '#635BFF', bg: 'rgba(99,91,255,0.1)' },
		{ abbr: 'GH', color: '#1a1a1a', bg: 'rgba(26,26,26,0.08)' },
		{ abbr: 'NT', color: '#1a1a1a', bg: 'rgba(26,26,26,0.06)' },
		{ abbr: '?', color: 'var(--ink-4)', bg: 'var(--bg-1)' },
	]
	return (
		<div className="flex items-center gap-[7px] mb-[22px]">
			{tools.map(({ abbr, color, bg }, i) => (
				<div key={i} className="flex items-center gap-[7px]">
					<span
						className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center font-mono text-[10px] font-semibold border border-line"
						style={{ background: bg, color }}
					>
						{abbr}
					</span>
					{i < tools.length - 1 && (
						<svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
							<path d="M0 4h8M6 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-4" />
						</svg>
					)}
				</div>
			))}
		</div>
	)
}

function VisualMissing() {
	const messages = [
		{ who: 'PM', text: "Let's add magic-link auth, no passwords", faded: false },
		{ who: 'ENG', text: 'So… just skip auth entirely?', faded: true },
		{ who: '?', text: "Where's the original brief?", faded: true },
	]
	return (
		<div className="flex flex-col gap-[6px] mb-[22px]">
			{messages.map(({ who, text, faded }, i) => (
				<div
					key={i}
					className="flex items-start gap-2 text-[12px] leading-[1.4]"
					style={{ opacity: faded ? 0.45 : 1 }}
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
				</div>
			))}
		</div>
	)
}

function VisualRebuilding() {
	return (
		<div className="flex items-center gap-[10px] mb-[22px]">
			<div
				className="h-[38px] rounded-[10px] border border-line flex items-center px-3 gap-2 font-mono text-[11px] text-ink-3"
				style={{ background: 'rgba(255,255,255,0.8)', flex: '1 1 0' }}
			>
				<span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: '#ffbd2e' }} />
				slack thread
			</div>
			<svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
				<path d="M0 6h14M12 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-ink-4" />
			</svg>
			<div
				className="h-[38px] rounded-[10px] border border-dashed border-line flex items-center px-3 gap-2 font-mono text-[11px] text-ink-4"
				style={{ background: 'rgba(255,255,255,0.4)', flex: '1 1 0' }}
			>
				<span className="w-[6px] h-[6px] rounded-full flex-shrink-0 opacity-30 bg-ink-4" />
				...who asked?
			</div>
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
						<em className="italic text-acc">And AI is lost without it.</em>
					</h2>
					<p
						className="mt-5 font-sans text-[17px] text-ink-3 mx-auto"
						style={{ maxWidth: '52ch' }}
					>
						Work sprawl is destroying the context your team needs to ship — and
						every tool switch makes it worse.
					</p>
				</Reveal>

				{/* Pain cards */}
				<div
					className="grid gap-px bg-line rounded-[24px] overflow-hidden border border-line"
					style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
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
						Altr keeps the context attached — from first thread to merged PR →
					</p>
				</Reveal>
			</div>
		</section>
	)
}
