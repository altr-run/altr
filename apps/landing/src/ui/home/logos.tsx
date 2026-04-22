import s from './home.module.css'

export default function Logos() {
	return (
		<section className={s.logos}>
			<span className={s.over} style={{ display: 'inline-block', marginBottom: 28 }}>
				§ trusted by teams building at
			</span>
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
