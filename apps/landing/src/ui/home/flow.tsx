'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Reveal from './reveal'

// Notification data — a realistic snapshot of peak-chaos
const NOTIFICATIONS = [
	{
		tool: 'SL',
		toolColor: 'var(--brand-slack)',
		toolBg: 'var(--brand-slack-a)',
		channel: '#eng-alerts',
		who: 'priya',
		avatar: 'P',
		avatarBg: '#6B5EA8',
		msg: '@here can someone look at the auth bug before standup? users are getting logged out',
		time: '9:02 AM',
		unread: true,
		urgent: true,
	},
	{
		tool: 'LN',
		toolColor: 'var(--brand-linear)',
		toolBg: 'var(--brand-linear-a)',
		channel: 'Linear',
		who: 'System',
		avatar: '▲',
		avatarBg: 'var(--brand-linear)',
		msg: '[ENG-142] Magic-link invite fails silently on mobile — assigned to you',
		time: '9:04 AM',
		unread: true,
		urgent: false,
	},
	{
		tool: 'GH',
		toolColor: 'var(--brand-github)',
		toolBg: 'var(--brand-github-a)',
		channel: 'GitHub',
		who: 'ci-runner',
		avatar: '○',
		avatarBg: 'var(--brand-github)',
		msg: 'CI failed on main · 2 checks failed · auth/token.test.ts',
		time: '9:06 AM',
		unread: true,
		urgent: true,
	},
	{
		tool: 'SL',
		toolColor: 'var(--brand-slack)',
		toolBg: 'var(--brand-slack-a)',
		channel: 'alex (DM)',
		who: 'alex',
		avatar: 'A',
		avatarBg: '#3D6B4F',
		msg: 'Can we get the invite feature before Thursday? Customer call at 2pm',
		time: '9:07 AM',
		unread: true,
		urgent: false,
	},
	{
		tool: 'GH',
		toolColor: 'var(--brand-github)',
		toolBg: 'var(--brand-github-a)',
		channel: 'GitHub',
		who: 'alex',
		avatar: 'A',
		avatarBg: '#3D6B4F',
		msg: 'PR #138 Review requested — touching auth/session.ts · 3 reviewers pending',
		time: '9:09 AM',
		unread: false,
		urgent: false,
	},
	{
		tool: 'SL',
		toolColor: 'var(--brand-slack)',
		toolBg: 'var(--brand-slack-a)',
		channel: '#product',
		who: 'alex',
		avatar: 'A',
		avatarBg: '#3D6B4F',
		msg: "What's the status on magic-link? Design signed off last week",
		time: '9:11 AM',
		unread: false,
		urgent: false,
	},
	{
		tool: 'EM',
		toolColor: 'var(--amber)',
		toolBg: 'var(--amber-soft)',
		channel: 'Support → Eng',
		who: 'support',
		avatar: 'S',
		avatarBg: 'var(--amber)',
		msg: '[Escalation] 3 enterprise users can\'t log in since Thursday\'s deploy',
		time: '9:14 AM',
		unread: true,
		urgent: true,
	},
	{
		tool: 'LN',
		toolColor: 'var(--brand-linear)',
		toolBg: 'var(--brand-linear-a)',
		channel: 'Linear',
		who: 'System',
		avatar: '▲',
		avatarBg: 'var(--brand-linear)',
		msg: '[ENG-138] Rate limit not enforcing in prod — priority: urgent',
		time: '9:15 AM',
		unread: true,
		urgent: false,
	},
]

const RESOLUTION_STEPS = [
	{ label: 'Intake', desc: 'Every signal, one place', icon: '↓' },
	{ label: 'Spec', desc: 'AC drafted automatically', icon: '■' },
	{ label: 'Build', desc: 'Worktree opened, criteria attached', icon: '▲' },
	{ label: 'Ship', desc: 'Trail linked to the PR', icon: '→' },
]

export default function Flow() {
	const feedRef = useRef<HTMLDivElement>(null)
	const feedInView = useInView(feedRef, { once: true, margin: '-80px' })

	return (
		<section
			className="py-[120px] px-8 border-b border-line bg-bg overflow-hidden"
			id="workflow"
		>
			<div className="inner">

				{/* Header */}
				<Reveal className="text-center mb-[60px]">
					<span className="over inline-block mb-5">workflow</span>
					<h2
						className="font-serif font-normal tracking-[-0.03em] text-ink mx-auto"
						style={{
							fontSize: 'clamp(34px, 4.2vw, 60px)',
							lineHeight: 1.06,
							maxWidth: 800,
							textWrap: 'balance',
						}}
					>
						This is how work actually enters your team.
						<br />
						<em className="italic text-acc">Every sprint. Every handoff.</em>
					</h2>
					<p className="mt-5 font-sans text-[16px] text-ink-3 mx-auto max-w-[50ch]">
						Nine notifications. Four tools. Zero shared context. Someone&apos;s
						about to open a doc and start from scratch.
					</p>
				</Reveal>

				{/* Chaos panel + resolution */}
				<Reveal delay={80}>
					<div
						className="rounded-[28px] border border-line overflow-hidden"
						style={{
							background: 'var(--bg)',
							boxShadow: '0 16px 48px rgba(0,0,0,0.07)',
						}}
					>
						{/* Panel header bar */}
						<div
							className="flex items-center justify-between px-5 py-3 border-b border-line"
							style={{
								background: 'linear-gradient(180deg, var(--gray-2) 0%, var(--bg-1) 100%)',
							}}
						>
							<div className="flex items-center gap-[6px]">
								<span className="w-[11px] h-[11px] rounded-full bg-[var(--macos-close)]" />
								<span className="w-[11px] h-[11px] rounded-full bg-[var(--macos-minimize)]" />
								<span className="w-[11px] h-[11px] rounded-full bg-[var(--macos-maximize)]" />
							</div>
							<div className="flex items-center gap-3">
								<span className="font-mono text-[11px] text-ink-3 tracking-wide">
									inbox · all sources
								</span>
								<span
									className="font-mono text-[10px] px-2 py-0.5 rounded-full text-white font-semibold"
									style={{ background: 'var(--status-error)' }}
								>
									9
								</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="font-mono text-[10px] text-ink-4 tracking-wider uppercase">
									3 urgent
								</span>
								<span className="font-mono text-[10px] text-ink-4 tracking-wider uppercase">
									4 tools
								</span>
							</div>
						</div>

						{/* Notification feed */}
						<div ref={feedRef} className="divide-y divide-line relative overflow-hidden">
							{/* Scanner beam — sweeps once when feed enters view */}
							{feedInView && (
								<motion.div
									className="absolute left-0 right-0 h-[2px] pointer-events-none z-[10]"
									style={{
										background: 'linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--acc-vibrant) 60%, transparent) 40%, color-mix(in oklab, var(--acc-vibrant) 80%, transparent) 50%, color-mix(in oklab, var(--acc-vibrant) 60%, transparent) 60%, transparent 100%)',
										boxShadow: '0 0 12px 2px color-mix(in oklab, var(--acc-vibrant) 30%, transparent)',
									}}
									initial={{ top: '0%', opacity: 0 }}
									animate={{ top: ['0%', '105%'], opacity: [0, 1, 1, 0] }}
									transition={{ duration: 1.6, ease: [0.4, 0, 0.6, 1], delay: 0.3 }}
								/>
							)}
							{NOTIFICATIONS.map((n, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -8 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.35,
										ease: [0.25, 1, 0.5, 1],
										delay: 0.05 + i * 0.055,
									}}
									className="flex items-start gap-3 px-5 py-[13px] relative transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--acc)_2%,var(--bg-1))] group/row"
									style={{
										background: n.unread
											? 'color-mix(in oklab, var(--bg-1) 60%, var(--bg))'
											: 'var(--bg)',
									}}
								>
									{/* Unread dot */}
									{n.unread && (
										<span
											className="absolute left-[10px] top-[50%] translate-y-[-50%] w-[5px] h-[5px] rounded-full flex-shrink-0"
											style={{ background: n.urgent ? 'var(--status-error)' : 'var(--acc)' }}
										/>
									)}

									{/* Tool badge */}
									<span
										className="flex-shrink-0 w-[22px] h-[22px] rounded-[5px] flex items-center justify-center font-mono text-[8.5px] font-bold mt-0.5 border border-line"
										style={{
											background: n.toolBg,
											color: n.toolColor,
										}}
									>
										{n.tool}
									</span>

									{/* Avatar */}
									<span
										className="flex-shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center font-mono text-[9px] font-semibold text-white mt-0.5"
										style={{ background: n.avatarBg }}
									>
										{n.avatar}
									</span>

									{/* Content */}
									<div className="flex-1 min-w-0">
										<div className="flex items-baseline gap-2 mb-[3px]">
											<span className="font-sans font-semibold text-[12.5px] text-ink">
												{n.who}
											</span>
											<span className="font-mono text-[10px] text-ink-4 tracking-wide">
												{n.channel}
											</span>
											{n.urgent && (
												<span
													className="font-mono text-[9px] px-1.5 py-px rounded-full text-white font-semibold ml-auto flex-shrink-0"
													style={{ background: 'var(--status-error)' }}
												>
													urgent
												</span>
											)}
										</div>
										<p className="font-sans text-[13px] text-ink-2 leading-[1.45] m-0 truncate">
											{n.msg}
										</p>
									</div>

									{/* Time */}
									<span className="flex-shrink-0 font-mono text-[10px] text-ink-4 mt-0.5">
										{n.time}
									</span>
								</motion.div>
							))}

							{/* Overflow indicator */}
							<div
								className="px-5 py-3 flex items-center gap-2"
								style={{
									background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-1) 100%)',
								}}
							>
								<div className="flex gap-[3px]">
									{['var(--brand-slack-a)', 'var(--brand-linear-a)', 'var(--brand-github-a)'].map((bg, i) => (
										<span
											key={i}
											className="w-[14px] h-[14px] rounded-[4px] border border-line"
											style={{ background: bg }}
										/>
									))}
								</div>
								<span className="font-mono text-[10px] text-ink-4 tracking-wider">
									+14 more since yesterday · 0 have linked context
								</span>
							</div>
						</div>

						{/* Resolution band */}
						<motion.div
							className="border-t border-line px-5 py-5"
							style={{
								background:
									'linear-gradient(180deg, color-mix(in oklab, var(--acc) 5%, var(--bg-1)) 0%, var(--bg-1) 100%)',
							}}
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.55 }}
						>
							<div className="flex items-center gap-2 mb-4">
								<span
									className="w-[5px] h-[5px] rounded-full bg-acc animate-[pulse-dot_1.6s_ease-in-out_infinite]"
								/>
								<span className="font-mono text-[10px] tracking-[0.12em] uppercase text-acc font-semibold">
									Altr captures and structures all of this
								</span>
							</div>
							<div
								className="grid gap-px bg-line rounded-[16px] overflow-hidden border border-line"
								style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
							>
								{RESOLUTION_STEPS.map((step, i) => {
									const isLast = i === RESOLUTION_STEPS.length - 1
									return (
										<motion.div
											key={step.label}
											initial={{ opacity: 0, y: 8 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{
												duration: 0.45,
												ease: [0.25, 1, 0.5, 1],
												delay: 0.6 + i * 0.1,
											}}
											className="flex flex-col gap-1.5 p-[14px_16px] relative overflow-hidden"
											style={{
												background: isLast
													? 'color-mix(in oklab, var(--acc) 5%, var(--bg))'
													: 'var(--bg)',
											}}
										>
											{isLast && (
												<div
													className="absolute inset-0 pointer-events-none"
													style={{
														background: 'radial-gradient(ellipse at 50% 110%, color-mix(in oklab, var(--acc-vibrant) 12%, transparent) 0%, transparent 70%)',
													}}
												/>
											)}
											<span className={`font-mono text-[16px] leading-none ${isLast ? 'text-acc' : 'text-acc'}`}>
												{step.icon}
											</span>
											<span className="font-sans font-semibold text-[13px] text-ink tracking-tight">
												{step.label}
											</span>
											<span className="font-mono text-[10px] text-ink-4 tracking-wide leading-[1.4]">
												{step.desc}
											</span>
										</motion.div>
									)
								})}
							</div>

							{/* Before / After time comparison — tryclean.ai-inspired */}
							<div className="mt-4 grid grid-cols-2 gap-px rounded-[12px] overflow-hidden border border-line" style={{ background: 'var(--line)' }}>
								{/* Before */}
								<div className="px-4 py-3" style={{ background: 'var(--bg)' }}>
									<div className="font-mono text-[9px] uppercase tracking-widest text-ink-4 mb-2">
										without altr
									</div>
									<div className="flex items-center gap-2.5 mb-1">
										<div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
											<motion.div
												className="h-full rounded-full"
												style={{ background: 'rgba(180,83,9,0.5)' }}
												initial={{ width: '0%' }}
												whileInView={{ width: '100%' }}
												viewport={{ once: true }}
												transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.8 }}
											/>
										</div>
										<span className="font-mono text-[13px] font-semibold text-ink-3 tabular-nums">~6h</span>
									</div>
									<div className="font-mono text-[9.5px] text-ink-4 leading-snug">
										context rebuilt per handoff
									</div>
								</div>
								{/* After */}
								<div className="px-4 py-3" style={{ background: 'color-mix(in oklab, var(--acc) 4%, var(--bg))' }}>
									<div className="font-mono text-[9px] uppercase tracking-widest text-acc mb-2">
										with altr
									</div>
									<div className="flex items-center gap-2.5 mb-1">
										<div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
											<motion.div
												className="h-full rounded-full bg-acc"
												initial={{ width: '0%' }}
												whileInView={{ width: '5%' }}
												viewport={{ once: true }}
												transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 1.0 }}
											/>
										</div>
										<span className="font-mono text-[13px] font-semibold text-acc tabular-nums">18m</span>
									</div>
									<div className="font-mono text-[9.5px] text-ink-4 leading-snug">
										context travels with the work
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</Reveal>

			</div>
		</section>
	)
}
