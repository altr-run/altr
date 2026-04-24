import s from './home.module.css'

const NAMES = [
	{ label: 'Northline', variant: '' },
	{ label: 'MESA', variant: 's' },
	{ label: 'Holt & Co', variant: '' },
	{ label: 'runwell.sh', variant: 'u' },
	{ label: 'Parabola', variant: '' },
	{ label: 'BASISLY', variant: 's' },
	{ label: 'Oak Labs', variant: '' },
	{ label: 'Meridian', variant: '' },
	{ label: 'LATCH', variant: 's' },
	{ label: 'depot.dev', variant: 'u' },
]

export default function Logos() {
	return (
		<section className={s.logos}>
			<div className={s.tickerIn} style={{ padding: 0, marginBottom: 28 }}>
				<div className={s.tickerLabel}>
					<span className={s.liveDot} />
					Pilot teams
				</div>
				<div
					style={{
						fontFamily: 'var(--f-sans)',
						fontSize: 15,
						color: 'var(--ink-2)',
						letterSpacing: '-0.01em',
					}}
				>
					Product, engineering, and design teams evaluating one connected execution loop.
				</div>
				<div className={s.tickerStat}>
					<b>active pilots</b>
					founder-led rollout
				</div>
			</div>
			<div className={s.logosScroll}>
				<div className={s.marqueeTrack}>
					{[...NAMES, ...NAMES].map((item, i) => (
						<span
							key={i}
							className={
								item.variant === 's'
									? s.logoNameSans
									: item.variant === 'u'
										? s.logoNameMono
										: s.logoNameSerif
							}
						>
							{item.label}
						</span>
					))}
				</div>
			</div>
		</section>
	)
}
