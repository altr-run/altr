import s from './home.module.css'
import Reveal from './reveal'

const STATS = [
	{ value: '140', label: 'teams in beta' },
	{ value: '3.4', suffix: '×', label: 'faster spec-to-PR' },
	{ value: '68', suffix: '%', label: 'merged on first review' },
	{ value: '2,417', label: 'PRs shipped this week' },
]

export default function Metrics() {
	return (
		<section className={s.metrics}>
			<div className={s.metricsIn}>
				<Reveal className={s.metricsHead}>
					<span
						className={s.over}
						style={{ display: 'inline-block', marginBottom: 16 }}
					>
						§ proof
					</span>
					<h2 className={s.h2}>
						Signals from teams already
						<br />
						<em>running the loop.</em>
					</h2>
				</Reveal>
				<Reveal>
					<div className={s.metricsGrid}>
						{STATS.map((stat, i) => (
							<div className={s.metricCell} key={i}>
								<div className={s.metricVal}>
									{stat.value}
									{stat.suffix && (
										<span className={s.metricSuffix}>
											{stat.suffix}
										</span>
									)}
								</div>
								<div className={s.metricLabel}>{stat.label}</div>
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	)
}
