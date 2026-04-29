'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Reveal from './reveal'

const STEPS = [
	{
		title: 'Capture — so nothing gets lost before it starts',
		desc: 'Pulls threads, calls, notes, and alerts into the trail. Engineering starts from the original signal, not a second-hand retelling.',
	},
	{
		title: 'Plan — so building never starts on assumptions',
		desc: 'Locks acceptance criteria, flags unresolved decisions, and hands off a reviewable spec. No more discovering the goal mid-PR.',
	},
	{
		title: 'Build — so implementation stays tethered to intent',
		desc: 'Opens the worktree, proposes steps, and drafts changes with the original criteria still attached — visible to every reviewer.',
	},
	{
		title: 'Review — so merge is a decision, not a gamble',
		desc: 'Checks the diff against the original goal, flags regressions and missing criteria, and surfaces risk before it becomes a rollback.',
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
				<div className="grid grid-cols-2 gap-20 items-start">
					{/* Left sticky column */}
					<Reveal className="sticky top-[120px] flex flex-col gap-6">
						<span className="over" style={{ display: 'inline-block' }}>
							how it works
						</span>
						<h2
							className="heading-2"
							style={{ textWrap: 'balance', marginTop: 20 }}
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

					{/* Steps with connecting vertical line */}
					<div ref={stepsRef} className="flex flex-col relative">
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
