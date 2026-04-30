'use client'

const PILOT_ORGS = [
	{ label: 'Northline',  style: 'font-serif text-[28px] tracking-[-0.025em]' },
	{ label: 'MESA',       style: 'font-sans font-semibold text-[20px] tracking-[0.07em] uppercase' },
	{ label: 'Holt & Co',  style: 'font-serif text-[28px] tracking-[-0.015em]' },
	{ label: 'runwell.sh', style: 'font-mono text-[19px]' },
	{ label: 'Parabola',   style: 'font-sans font-medium text-[23px] tracking-[-0.02em]' },
	{ label: 'BASISLY',    style: 'font-sans font-bold text-[19px] tracking-[0.09em] uppercase' },
	{ label: 'Oak Labs',   style: 'font-serif text-[28px] tracking-[-0.025em]' },
	{ label: 'Meridian',   style: 'font-sans font-medium text-[23px] tracking-[-0.01em]' },
	{ label: 'LATCH',      style: 'font-sans font-bold text-[19px] tracking-[0.12em] uppercase' },
	{ label: 'depot.dev',  style: 'font-mono text-[19px]' },
]

export default function BrandStrip() {
	return (
		<div className="bg-zinc-950 border-b border-white/[6%] overflow-hidden">
			{/* label row */}
			<div
				className="mx-auto px-8 pt-9 pb-7 flex items-center justify-between gap-6"
				style={{ maxWidth: 'var(--maxw)' }}
			>
				<div className="flex items-center gap-3 flex-shrink-0">
					<span className="w-1.5 h-1.5 rounded-full bg-acc flex-shrink-0 animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
					<span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-acc">
						Pilot teams
					</span>
				</div>
				<p className="font-sans text-[13.5px] text-white/35 m-0 leading-none hidden sm:block">
					Teams from these organizations are evaluating Altr in limited pilot cycles.
				</p>
				<span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/20 hidden md:block flex-shrink-0">
					Invite only · 10 teams
				</span>
			</div>

			{/* marquee */}
			<div
				className="pb-9"
				style={{
					maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
					WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
				}}
			>
				<div className="flex items-center gap-16 w-max animate-[marquee_48s_linear_infinite] hover:[animation-play-state:paused]">
					{[...PILOT_ORGS, ...PILOT_ORGS].map((org, i) => (
						<span
							key={i}
							className={`${org.style} text-white/40 whitespace-nowrap select-none transition-colors duration-200 hover:text-white/65`}
						>
							{org.label}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
