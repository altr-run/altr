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
				<div
					key={i}
					className="font-mono text-[12px] text-ink-2 tracking-[0.01em] inline-flex gap-2.5 items-center whitespace-nowrap"
				>
					<span className="text-ink-4">{t}</span>
					<span className="text-ink font-semibold font-sans text-[13px]">{n}</span>
					{v} <em className="italic text-ink-1 font-serif text-[14px]">{w}</em>
				</div>
			))}
		</>
	)
}

export default function Ticker() {
	return (
		<section className="border-b border-line bg-(--bg) overflow-hidden py-3.5">
			<div className="max-w-(--maxw) mx-auto px-8 grid grid-cols-[auto_1fr_auto] gap-7 items-center">
				<div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-acc">
					<span
						className="w-1.5 h-1.5 rounded-full bg-acc animate-[pulse-dot_1.6s_ease-in-out_infinite]"
						style={{ boxShadow: '0 0 0 3px color-mix(in oklab, var(--acc) 20%, transparent)' }}
					/>
					shipped this hour
				</div>
				<div
					className="overflow-hidden"
					style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}
				>
					<div className="flex gap-14 animate-[tick_60s_linear_infinite] w-max">
						<TickerItems />
						<TickerItems />
					</div>
				</div>
				<div className="font-mono text-[11px] text-ink-3 tracking-[0.02em] flex flex-col text-right leading-[1.2]">
					<b className="font-sans text-ink text-[15px] tracking-[-0.02em]">2,417</b>
					PRs this week
				</div>
			</div>
		</section>
	)
}
