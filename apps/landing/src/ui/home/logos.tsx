import Image from 'next/image'
import { getBrandLogoUrl } from '@/lib/brand'

type LogoEntry = {
	label: string
	domain?: string
	variant?: 's' | 'u' | ''
}

const PILOT_LOGOS: LogoEntry[] = [
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

const INTEGRATIONS = [
	{ tool: 'Slack', domain: 'slack.com', signal: 'Feature threads' },
	{ tool: 'GitHub', domain: 'github.com', signal: 'PR events' },
	{ tool: 'Linear', domain: 'linear.app', signal: 'Issue updates' },
	{ tool: 'Notion', domain: 'notion.so', signal: 'Product specs' },
	{ tool: 'Figma', domain: 'figma.com', signal: 'Design tokens' },
	{ tool: 'PagerDuty', domain: 'pagerduty.com', signal: 'Incident logs' },
]

function LogoItem({ item }: { item: LogoEntry }) {
	if (item.domain) {
		const src = getBrandLogoUrl(item.domain, {
			height: 28,
			type: 'logo',
			theme: 'dark',
			fallback: 'transparent',
		})
		return (
			<Image
				src={src}
				alt={item.label}
				height={28}
				width={120}
				className="object-contain opacity-60 grayscale"
				unoptimized
			/>
		)
	}

	return (
		<span
			className={
				item.variant === 's'
					? 'font-sans font-semibold text-[17px] tracking-[-0.02em] text-ink-2 whitespace-nowrap'
					: item.variant === 'u'
						? 'font-mono text-[14px] text-ink-3 whitespace-nowrap'
						: 'font-serif text-[22px] tracking-[-0.02em] text-ink-2 whitespace-nowrap'
			}
		>
			{item.label}
		</span>
	)
}

export default function Logos() {
	return (
		<section className="border-b border-line">
			{/* Part 1: Integration Grid */}
			<div className="mx-auto px-8 py-20 border-b border-line" style={{ maxWidth: 'var(--maxw)' }}>
				<div className="flex flex-col items-center text-center gap-12">
					<div>
						<p className="font-mono text-[11px] uppercase tracking-widest text-acc mb-4">Direct signal ingestion</p>
						<h2 className="font-serif font-normal text-ink text-[32px] tracking-tight m-0">
							Connect the tools you already use.
						</h2>
					</div>
					
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-line border border-line rounded-[24px] overflow-hidden w-full">
						{INTEGRATIONS.map((int) => {
							const logoSrc = getBrandLogoUrl(int.domain, { height: 32, type: 'logo', theme: 'dark' })
							return (
								<div key={int.tool} className="bg-bg p-8 flex flex-col items-center gap-5 hover:bg-bg-1 transition-colors group">
									<div className="h-8 flex items-center justify-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
										<Image src={logoSrc} alt={int.tool} height={32} width={100} className="object-contain" unoptimized />
									</div>
									<div className="text-center">
										<p className="font-sans text-[13px] font-medium text-ink mb-0.5">{int.tool}</p>
										<p className="font-mono text-[9px] uppercase tracking-widest text-ink-4">{int.signal}</p>
									</div>
								</div>
							)
						})}
					</div>
					
					<p className="font-sans text-[15px] text-ink-3 max-w-[50ch] leading-relaxed">
						Altr carries context across handoffs without requiring a workspace migration. No new docs, no new trackers. Just one execution loop.
					</p>
				</div>
			</div>

			{/* Part 2: Pilot Ticker (Original Logos component functionality) */}
			<div className="py-12 bg-bg-1/30">
				<div className="inner grid gap-7 items-center px-8 mb-7" style={{ gridTemplateColumns: 'auto 1fr auto', maxWidth: 'var(--maxw)', margin: '0 auto 28px' }}>
					<div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-acc">
						<span className="w-1.5 h-1.5 rounded-full bg-acc shadow-[0_0_0_4px_color-mix(in_oklab,var(--acc)_14%,transparent)] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
						Pilot teams
					</div>
					<div className="font-sans text-[14px] text-ink-3">
						Teams from these organizations are evaluating Altr in limited pilot cycles.
					</div>
					<div className="font-mono text-[10px] text-ink-4 tracking-[0.02em] uppercase">
						Active pilot phase
					</div>
				</div>

				<div className="overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
					<div className="flex items-center gap-16 w-max opacity-60 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
						{[...PILOT_LOGOS, ...PILOT_LOGOS, ...PILOT_LOGOS].map((item, i) => (
							<LogoItem key={i} item={item} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
