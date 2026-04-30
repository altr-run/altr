'use client'

import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { getBrandLogoUrl } from '@/lib/brand'

const INTEGRATIONS = [
	{ tool: 'Slack', domain: 'slack.com', signal: 'Feature threads' },
	{ tool: 'GitHub', domain: 'github.com', signal: 'PR events' },
	{ tool: 'Linear', domain: 'linear.app', signal: 'Issue updates' },
	{ tool: 'Notion', domain: 'notion.so', signal: 'Product specs' },
	{ tool: 'Figma', domain: 'figma.com', signal: 'Design tokens' },
	{ tool: 'PagerDuty', domain: 'pagerduty.com', signal: 'Incident logs' },
]

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1]

export default function Logos() {
	const gridRef = useRef<HTMLDivElement>(null)
	const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

	return (
		<section className="border-b border-line">
			<div className="mx-auto px-8 py-24" style={{ maxWidth: 'var(--maxw)' }}>
				<div className="flex flex-col items-center text-center gap-12">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, ease: EASE }}
						className="flex flex-col items-center gap-4"
					>
						<p className="font-mono text-[11px] uppercase tracking-widest text-acc m-0">Direct signal ingestion</p>
						<h2 className="font-serif font-normal text-ink text-[32px] tracking-tight m-0">
							Connect the tools you already use.
						</h2>
						<p className="font-sans text-[15px] text-ink-3 max-w-[48ch] leading-relaxed m-0">
							Signal, assignment, and artifact stay linked through every stage of the work — captured once, carried all the way through.
						</p>
					</motion.div>

					{/* Integration grid */}
					<div
						ref={gridRef}
						className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-line border border-line rounded-[20px] overflow-hidden w-full"
					>
						{/* Scanner beam */}
						{gridInView && (
							<motion.div
								className="absolute top-0 bottom-0 w-[2px] pointer-events-none z-10"
								style={{
									background:
										'linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--acc-vibrant) 60%, transparent) 30%, color-mix(in oklab, var(--acc-vibrant) 85%, transparent) 50%, color-mix(in oklab, var(--acc-vibrant) 60%, transparent) 70%, transparent 100%)',
									boxShadow: '0 0 18px 4px color-mix(in oklab, var(--acc-vibrant) 22%, transparent)',
								}}
								initial={{ left: '-2%', opacity: 0 }}
								animate={{ left: ['0%', '102%'], opacity: [0, 1, 1, 0] }}
								transition={{ duration: 2.2, ease: [0.4, 0, 0.6, 1], delay: 0.15 }}
							/>
						)}

						{INTEGRATIONS.map((int, i) => {
							const logoSrc = getBrandLogoUrl(int.domain, { height: 32, type: 'logo', theme: 'dark' })
							return (
								<motion.div
									key={int.tool}
									className="bg-bg p-8 flex flex-col items-center gap-4 group cursor-default relative overflow-hidden"
									initial={{ opacity: 0, y: 10 }}
									animate={gridInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.45, ease: EASE, delay: 0.08 + i * 0.07 }}
									whileHover={{ backgroundColor: 'color-mix(in oklab, var(--acc) 3%, var(--bg-1))' }}
								>
									<div
										className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[240ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
										style={{ background: 'var(--acc)' }}
									/>
									<div
										className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
										style={{
											background: 'radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--acc-soft) 60%, transparent) 0%, transparent 70%)',
										}}
									/>

									<div className="relative h-8 flex items-center justify-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
										<Image src={logoSrc} alt={int.tool} height={32} width={100} className="object-contain" unoptimized />
									</div>

									<div className="relative text-center">
										<p className="font-sans text-[13px] font-medium text-ink mb-0.5">{int.tool}</p>
										<p className="font-mono text-[9px] uppercase tracking-widest text-ink-4 group-hover:text-acc transition-colors duration-300">{int.signal}</p>
									</div>

									<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<span className="w-1.5 h-1.5 rounded-full bg-acc block animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
									</div>
								</motion.div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
