'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

export default function HandoffCalculator() {
	const [teamSize, setTeamSize] = useState(10)
	const [sprintsPerMonth, setSprintsPerMonth] = useState(2)
	const hourlyRate = 120 // Blended hourly rate for eng/pm

	// Formula: team_size * sprints_per_month * 2.4h avg handoff tax * hourly_rate
	const TAX_PER_SPRINT_HOURS = 2.4
	const monthlyHoursLost = Math.round(teamSize * sprintsPerMonth * TAX_PER_SPRINT_HOURS)
	const monthlyCostLost = monthlyHoursLost * hourlyRate

	return (
		<div className="bg-bg border border-line rounded-[32px] p-10 shadow-sm flex flex-col gap-10">
			<div className="grid gap-12" style={{ gridTemplateColumns: '1fr 1fr' }}>
				{/* Inputs */}
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-5">
						<div className="flex justify-between items-baseline">
							<label className="font-sans text-[15px] font-medium text-ink">Team size</label>
							<span className="font-mono text-[14px] text-acc">{teamSize} humans</span>
						</div>
						<input
							type="range"
							min="2"
							max="100"
							value={teamSize}
							onChange={(e) => setTeamSize(parseInt(e.target.value))}
							className="w-full h-1.5 bg-line rounded-lg appearance-none cursor-pointer accent-acc"
						/>
					</div>

					<div className="flex flex-col gap-5">
						<div className="flex justify-between items-baseline">
							<label className="font-sans text-[15px] font-medium text-ink">Features / month</label>
							<span className="font-mono text-[14px] text-acc">{sprintsPerMonth} cycles</span>
						</div>
						<input
							type="range"
							min="1"
							max="12"
							value={sprintsPerMonth}
							onChange={(e) => setSprintsPerMonth(parseInt(e.target.value))}
							className="w-full h-1.5 bg-line rounded-lg appearance-none cursor-pointer accent-acc"
						/>
					</div>

					<div className="p-5 bg-bg-1 rounded-[16px] border border-line">
						<p className="font-mono text-[10px] uppercase tracking-widest text-ink-3 mb-2">Industry benchmark</p>
						<p className="font-sans text-[13px] text-ink-2 leading-relaxed m-0 italic">
							&ldquo;Product teams waste an average of 2.4 hours per feature cycle re-explaining intent that was already captured in Slack or docs.&rdquo;
						</p>
					</div>
				</div>

				{/* Results */}
				<div className="flex flex-col justify-center items-center text-center gap-2 p-8 bg-bg-1 rounded-[24px] border border-line relative overflow-hidden">
					<div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--acc) 1px, transparent 1px)', size: '20px 20px' }} />
					
					<p className="font-mono text-[11px] uppercase tracking-widest text-ink-4 relative z-10">Monthly reconstruction tax</p>
					
					<motion.div 
						key={monthlyCostLost}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="relative z-10"
					>
						<span className="font-serif text-[64px] text-acc leading-none">
							${monthlyCostLost.toLocaleString()}
						</span>
					</motion.div>
					
					<p className="font-sans text-[16px] text-ink-2 max-w-[20ch] leading-snug relative z-10">
						spent on <span className="text-ink font-medium">{monthlyHoursLost} hours</span> of re-explaining work
					</p>
				</div>
			</div>

			<div className="border-t border-line pt-10 flex flex-col items-center gap-6">
				<p className="font-sans text-[15px] text-ink-2 text-center max-w-[50ch]">
					Altr eliminates this tax by carrying the original signal through every handoff automatically.
				</p>
				<a href="#close" className="btn btn-acc btn-lg">
					Stop dropping the thread →
				</a>
			</div>
		</div>
	)
}
