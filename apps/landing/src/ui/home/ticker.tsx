import s from './home.module.css'

const ITEMS = [
	['14:22', 'Northline', 'merged', 'pr-142 · magic-link-auth'],
	['14:19', 'Mesa', 'published', 'changelog — v0.8.1'],
	['14:17', 'Holt & Co', 'spec approved', 'onboarding-v2'],
	['14:12', 'Runwell', 'opened', 'pr-88 · dark-mode'],
	['14:09', 'Parabola', 'shipped', 'teams billing'],
	['14:04', 'Basisly', 'merged', 'pr-301 · search index'],
	['13:58', 'Oak Labs', 'draft', 'retro — sprint 14'],
	['13:54', 'Northline', 'spec approved', 'search-index v2'],
	['13:49', 'Mesa', 'opened', 'pr-89 · webhook-retries'],
] as const

function TickerItems() {
	return (
		<>
			{ITEMS.map(([t, n, v, w], i) => (
				<div className={s.tickerItem} key={i}>
					<span className="t">{t}</span>
					<span className="n">{n}</span>
					{v} <em>{w}</em>
				</div>
			))}
		</>
	)
}

export default function Ticker() {
	return (
		<section className={s.ticker}>
			<div className={s.tickerIn}>
				<div className={s.tickerLabel}>
					<span className={s.liveDot} />
					shipped this hour
				</div>
				<div className={s.tickerTrack}>
					<div className={s.tickerList}>
						<TickerItems />
						<TickerItems />
					</div>
				</div>
				<div className={s.tickerStat}>
					<b>2,417</b>PRs this week
				</div>
			</div>
		</section>
	)
}
