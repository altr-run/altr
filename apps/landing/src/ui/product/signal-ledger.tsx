'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const TRAIL = [
	{
		id: 'slack',
		tool: 'Slack',
		toolMark: '💬',
		toolColor: '#4A154B',
		label: 'Signal captured',
		time: '10:48 AM',
		channel: '#feature-requests',
		content: 'we need invite teammates feature before thursday — magic-link style, no passwords. should be <90s end-to-end',
		author: 'alex',
		authorBg: '#3D6B4F',
		meta: '18 messages · 3 participants',
	},
	{
		id: 'spec',
		tool: 'Altr Spec',
		toolMark: '■',
		toolColor: 'var(--acc)',
		label: 'Spec drafted',
		time: '10:51 AM',
		channel: 'specs / magic-link-auth.md',
		content: '5 AC · Problem statement · Open questions flagged · Awaiting your review',
		author: 'Altr',
		authorBg: 'var(--acc)',
		meta: 'Acceptance criteria · Ready to approve',
	},
	{
		id: 'pr',
		tool: 'GitHub',
		toolMark: '▲',
		toolColor: '#1a1a1a',
		label: 'PR opened',
		time: '1:34 PM',
		channel: 'PR #142 · magic-link-onboarding',
		content: 'Implements all 5 AC. Spec attached. Rate limit: 5/user/hour. Audit log added. 2 files changed.',
		author: 'Altr',
		authorBg: '#1a1a1a',
		meta: '+186 −12 · 2 reviewers · spec linked',
	},
	{
		id: 'merged',
		tool: 'Merged',
		toolMark: '✓',
		toolColor: '#4a7c59',
		label: 'Intent preserved',
		time: '3:12 PM',
		channel: 'main · v0.4.2',
		content: 'Thread → Spec → PR → Merged. Six months from now, anyone can trace why this shipped.',
		author: 'mukul',
		authorBg: '#5a6e9c',
		meta: 'Full trail · Changelog drafted',
	},
] as const

const CONNECTOR_DELAYS = [0.6, 1.4, 2.2]

export default function SignalLedger() {
	const ref = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState<number[]>([])
	const [connectors, setConnectors] = useState<number[]>([])
	const [triggered, setTriggered] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && !triggered) {
					setTriggered(true)
					TRAIL.forEach((_, i) => {
						setTimeout(() => setActive((p) => [...p, i]), i * 800)
					})
					CONNECTOR_DELAYS.forEach((_, i) => {
						setTimeout(() => setConnectors((p) => [...p, i]), 400 + i * 800)
					})
				}
			},
			{ threshold: 0.2 },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [triggered])

	return (
		<div ref={ref} className="relative">
			{/* Vertical spine */}
			<div
				className="absolute left-[39px] top-[60px] bottom-[60px] w-px"
				style={{ background: 'linear-gradient(180deg, var(--line) 0%, color-mix(in oklab, var(--acc) 30%, var(--line)) 50%, var(--line) 100%)' }}
			/>

			<div className="flex flex-col gap-0">
				{TRAIL.map((item, i) => {
					const isVisible = active.includes(i)
					const hasConnector = connectors.includes(i)

					return (
						<div key={item.id} className="relative">
							<motion.div
								initial={{ opacity: 0, x: -16 }}
								animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
								transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
								className="flex gap-5 items-start py-5"
							>
								{/* Tool mark */}
								<div
									className="flex-shrink-0 w-[80px] flex flex-col items-center gap-1.5 pt-1"
								>
									<div
										className="w-[30px] h-[30px] rounded-full flex items-center justify-center font-mono text-[11px] font-bold text-white flex-shrink-0 z-[1] relative"
										style={{ background: item.toolColor === 'var(--acc)' ? 'var(--acc)' : item.toolColor }}
									>
										{item.toolMark}
									</div>
									<span className="font-mono text-[9px] uppercase tracking-widest text-ink-4 text-center leading-tight">
										{item.tool}
									</span>
								</div>

								{/* Card */}
								<div
									className="flex-1 rounded-[16px] border border-line p-5 flex flex-col gap-3"
									style={{
										background: isVisible
											? `color-mix(in oklab, ${item.toolColor === 'var(--acc)' ? 'var(--acc)' : item.toolColor} 3%, var(--bg))`
											: 'var(--bg)',
										borderColor: isVisible ? 'color-mix(in oklab, var(--line) 60%, transparent)' : 'var(--line)',
									}}
								>
									{/* Card header */}
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div
												className="w-[20px] h-[20px] rounded-full flex items-center justify-center font-mono text-[8px] font-bold text-white flex-shrink-0"
												style={{ background: item.authorBg === 'var(--acc)' ? 'var(--acc)' : item.authorBg }}
											>
												{item.author[0]?.toUpperCase()}
											</div>
											<span className="font-sans font-semibold text-[12.5px] text-ink">{item.author}</span>
											<span className="font-mono text-[10px] text-ink-4">{item.time}</span>
										</div>
										<span
											className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
											style={{
												color: item.toolColor === 'var(--acc)' ? 'var(--acc)' : undefined,
												borderColor: 'var(--line)',
												background: 'var(--bg-1)',
											}}
										>
											{item.label}
										</span>
									</div>

									{/* Channel */}
									<div className="font-mono text-[10.5px] text-ink-3">
										{item.channel}
									</div>

									{/* Content */}
									<p className="font-sans text-[13.5px] leading-[1.55] text-ink-2 m-0">
										{item.content}
									</p>

									{/* Meta footer */}
									<div className="font-mono text-[10px] text-ink-4 pt-2 border-t border-line">
										{item.meta}
									</div>
								</div>
							</motion.div>

							{/* Connector arrow */}
							{i < TRAIL.length - 1 && (
								<AnimatePresence>
									{hasConnector && (
										<motion.div
											initial={{ opacity: 0, scaleY: 0 }}
											animate={{ opacity: 1, scaleY: 1 }}
											transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
											className="absolute left-[39px] -translate-x-1/2 flex flex-col items-center"
											style={{ top: 'calc(100% - 20px)', transformOrigin: 'top' }}
										>
											<div className="font-mono text-[10px] text-acc opacity-60">↓</div>
										</motion.div>
									)}
								</AnimatePresence>
							)}
						</div>
					)
				})}
			</div>

			{/* Caption */}
			<p className="font-mono text-[10.5px] text-ink-4 tracking-[0.06em] text-center mt-4">
				Intent attached at every stage · nothing reconstructed from memory
			</p>
		</div>
	)
}
