import Image from 'next/image'
import { getBrandLogoUrl } from '@/lib/brand'

type LogoEntry = {
	label: string
	/** When set, a real brand logo is fetched from Brandfetch instead of showing text */
	domain?: string
	/** Text-only display variant when no domain — 's' = sans bold, 'u' = mono, default = serif */
	variant?: 's' | 'u' | ''
}

const LOGOS: LogoEntry[] = [
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
					? 'font-sans font-semibold text-[17px] tracking-[-0.02em] text-(--ink-2) whitespace-nowrap'
					: item.variant === 'u'
						? 'font-mono text-[14px] text-(--ink-3) whitespace-nowrap'
						: 'font-serif text-[22px] tracking-[-0.02em] text-(--ink-2) whitespace-nowrap'
			}
		>
			{item.label}
		</span>
	)
}

export default function Logos() {
	return (
		<section className="py-[60px] pb-16 border-b border-(--line) text-center">
			{/* ticker header row */}
			<div
				className="inner grid gap-7 items-center px-8 mb-7"
				style={{ gridTemplateColumns: 'auto 1fr auto', padding: '0 32px', marginBottom: 28 }}
			>
				<div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-(--acc)">
					<span className="w-1.5 h-1.5 rounded-full bg-(--acc) shadow-[0_0_0_4px_color-mix(in_oklab,var(--acc)_14%,transparent)] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
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
				<div className="font-mono text-[11px] text-(--ink-3) tracking-[0.02em] flex flex-col text-right leading-[1.2]">
					<b className="font-sans text-(--ink) text-[15px] tracking-[-0.02em]">active pilots</b>
					founder-led rollout
				</div>
			</div>

			{/* scrolling logo strip */}
			<div
				className="overflow-hidden"
				style={{
					maskImage:
						'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
					WebkitMaskImage:
						'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
				}}
			>
				<div
					className="flex items-center gap-16 w-max opacity-65 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]"
				>
					{[...LOGOS, ...LOGOS].map((item, i) => (
						<LogoItem key={i} item={item} />
					))}
				</div>
			</div>
		</section>
	)
}
