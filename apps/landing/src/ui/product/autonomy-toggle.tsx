'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const MODES = [
	{
		id: 'human',
		label: 'Human-only',
		desc: 'Agent structures the signal and attaches the context. You write the code.',
		split: { agent: 20, human: 80 },
		tasks: [
			{ who: 'agent', task: 'Captures thread intent' },
			{ who: 'agent', task: 'Drafts spec structure' },
			{ who: 'human', task: 'Implementation code' },
			{ who: 'human', task: 'Tests & verification' },
			{ who: 'human', task: 'Opens PR' },
		],
	},
	{
		id: 'copilot',
		label: 'Copilot',
		desc: 'Agent proposes implementation steps. You review and pair on the diff.',
		split: { agent: 60, human: 40 },
		tasks: [
			{ who: 'agent', task: 'Captures thread intent' },
			{ who: 'agent', task: 'Drafts spec & tickets' },
			{ who: 'agent', task: 'Proposes code changes' },
			{ who: 'human', task: 'Review & pair on diff' },
			{ who: 'human', task: 'Manual verification' },
		],
	},
	{
		id: 'autopilot',
		label: 'Autopilot',
		desc: 'Agent ships the PR with criteria checked. You review and merge.',
		split: { agent: 90, human: 10 },
		tasks: [
			{ who: 'agent', task: 'Captures thread intent' },
			{ who: 'agent', task: 'Full spec → code loop' },
			{ who: 'agent', task: 'Runs tests & checks criteria' },
			{ who: 'agent', task: 'Opens PR with context' },
			{ who: 'human', task: 'Final review & merge' },
		],
	},
]

export default function AutonomyToggle() {
	const [active, setActive] = useState(MODES[1]!)

	return (
		<div className="flex flex-col gap-8">
			{/* Mode selector */}
			<div className="flex gap-px bg-line border border-line rounded-[14px] overflow-hidden p-1" style={{ background: 'var(--bg-1)' }}>
				{MODES.map((m) => (
					<button
						key={m.id}
						onClick={() => setActive(m)}
						className={`flex-1 px-4 py-2.5 rounded-[10px] text-[13px] font-sans font-medium transition-all ${
							active.id === m.id ? 'bg-bg text-ink shadow-sm' : 'text-ink-3 hover:text-ink hover:bg-bg/50'
						}`}
					>
						{m.label}
					</button>
				))}
			</div>

			{/* Visualization */}
			<div className="bg-bg border border-line rounded-[24px] p-8 min-h-[340px] flex flex-col gap-8">
				<div>
					<p className="font-sans text-[15px] text-ink font-medium mb-1.5">{active.label} mode</p>
					<p className="font-sans text-[13.5px] text-ink-2 leading-relaxed max-w-[40ch]">{active.desc}</p>
				</div>

				{/* task list comparison */}
				<div className="flex flex-col gap-3">
					<AnimatePresence mode="wait">
						<motion.div
							key={active.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2, ease: 'easeOut' }}
							className="flex flex-col gap-3"
						>
							{active.tasks.map((t, i) => (
								<div key={i} className="flex items-center gap-4">
									<div className={`w-[60px] font-mono text-[9px] uppercase tracking-widest ${t.who === 'agent' ? 'text-acc' : 'text-ink-4'}`}>
										{t.who}
									</div>
									<div className="flex-1 h-px bg-line" />
									<div className={`font-sans text-[13px] ${t.who === 'agent' ? 'text-ink' : 'text-ink-2'}`}>
										{t.task}
									</div>
								</div>
							))}
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Split bar */}
				<div className="mt-auto pt-6 border-t border-line">
					<div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-3">
						<span>Agent contribution</span>
						<span>{active.split.agent}%</span>
					</div>
					<div className="h-1.5 w-full bg-line rounded-full overflow-hidden flex">
						<motion.div
							animate={{ width: `${active.split.agent}%` }}
							transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
							className="h-full bg-acc"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
