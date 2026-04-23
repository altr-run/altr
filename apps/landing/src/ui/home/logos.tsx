import s from './home.module.css'

export default function Logos() {
	return (
		<section className={s.logos}>
			<div className={s.tickerIn} style={{ padding: 0, marginBottom: 28 }}>
				<div className={s.tickerLabel}>
					<span className={s.liveDot} />
					Teams shipping in Altr
				</div>
				<div
					style={{
						fontFamily: 'var(--f-sans)',
						fontSize: 15,
						color: 'var(--ink-2)',
						letterSpacing: '-0.01em',
					}}
				>
					Product, design, engineering, and agent work in one loop.
				</div>
				<div className={s.tickerStat}>
					<b>140 teams</b>
					active in private beta
				</div>
			</div>
			<div className={s.logosRow}>
				<span>Northline</span>
				<span className="s">MESA</span>
				<span>Holt &amp; Co</span>
				<span className="u">runwell.sh</span>
				<span>Parabola</span>
				<span className="s">BASISLY</span>
				<span>Oak Labs</span>
			</div>
		</section>
	)
}
