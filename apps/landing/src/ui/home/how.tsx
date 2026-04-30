'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Reveal from './reveal'

const STEPS = [
	{
		title: 'Capture — so nothing gets lost before it starts',
		desc: 'Ingests Slack threads, Linear issues, monitoring alerts, and call transcripts automatically. PMs trigger capture from the Slack bot. Engineering starts from the original signal, not a second-hand retelling.',
	},
	{
		title: 'Plan — so building never starts on assumptions',
		desc: 'Locks acceptance criteria, flags unresolved decisions, and produces a reviewable spec. Human approves in the mission control app before any agent writes a line. No more discovering the goal mid-PR.',
	},
	{
		title: 'Build — so implementation stays tethered to intent',
		desc: 'Run Claude Code, Codex, or Cursor from the mission control app — or inject the full context trail via MCP directly into your existing agent session. The brief travels with the work.',
	},
	{
		title: 'Review — so merge is a decision, not a gamble',
		desc: 'The PR opens with the original spec and acceptance criteria attached — visible in GitHub, the app, and Slack. Reviewers see why the code was written, not just what changed.',
	},
]

export default function How() {
	const stepsRef = useRef<HTMLDivElement>(null)
	const stepsInView = useInView(stepsRef, { once: true, margin: '-80px' })

	return (
		<section
			className="py-[160px] px-8 border-b border-line bg-bg-1"
			id="agents"
		>
			<div className="inner">
				<div className="grid grid-cols-12 gap-12 lg:gap-24 items-start">
					{/* Left sticky column - spans 5 columns */}
					<Reveal className="col-span-12 lg:col-span-5 lg:sticky lg:top-[160px] flex flex-col gap-8">
						<span className="over" style={{ display: 'inline-block' }}>
							how it works
						</span>
						<h2
							className="heading-2"
							style={{ textWrap: 'balance' }}
						>
							Four stages.
							<br />
							<em>One unbroken trail.</em>
						</h2>
						<p className="lede">
							Each stage has a clear job and a visible handoff. No
							reconstruction work, no re-explaining the goal — the context
							travels with the work from first request to merged diff.
						</p>
					</Reveal>

					{/* Steps - spans 7 columns */}
					<div ref={stepsRef} className="col-span-12 lg:col-span-7 flex flex-col relative mt-12 lg:mt-0">
						{/* Vertical connecting line — travels from top to bottom */}
						<div
							className="absolute left-[27px] top-[36px] bottom-[36px] w-px pointer-events-none overflow-hidden"
							style={{ background: 'var(--line)' }}
						>
							<motion.div
								className="absolute top-0 left-0 right-0 rounded-full"
								style={{ background: 'linear-gradient(180deg, var(--acc-vibrant) 0%, color-mix(in oklab, var(--acc) 60%, transparent) 100%)' }}
								initial={{ height: '0%' }}
								animate={stepsInView ? { height: '100%' } : {}}
								transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
							/>
						</div>

						{STEPS.map((step, i) => (
							<Reveal
								key={i}
								delay={i * 80}
								className={[
									'grid grid-cols-[56px_1fr] gap-6 py-9 border-t border-line',
									'transition-transform duration-200 cursor-default group',
									'hover:translate-x-[6px]',
									i === STEPS.length - 1 ? 'border-b border-line' : '',
								].join(' ')}
							>
								{/* Step number — circle dot on the connecting line */}
								<div className="relative flex flex-col items-center">
									<motion.div
										className="w-[30px] h-[30px] rounded-full border-2 border-line flex items-center justify-center mt-1 z-[1] transition-colors duration-300 group-hover:border-acc"
										style={{ background: 'var(--bg-1)' }}
										initial={{ scale: 0.6, opacity: 0 }}
										animate={stepsInView ? { scale: 1, opacity: 1 } : {}}
										transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 + i * 0.18 }}
									>
										<span
											className="font-mono text-[11px] font-bold text-acc-2 group-hover:text-acc transition-colors duration-300"
										>
											{String(i + 1).padStart(2, '0')}
										</span>
									</motion.div>
								</div>
								<div>
									<h3
										className="font-serif font-normal text-[22px] tracking-tight mt-1 mb-[10px] text-ink"
										style={{ fontFamily: 'var(--f-serif)' }}
									>
										{step.title}
									</h3>
									<p className="text-[14.5px] text-ink-2 leading-[1.6] m-0">
										{step.desc}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
