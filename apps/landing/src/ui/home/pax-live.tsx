'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from './reveal'

// The raw Slack thread Altr is reading
const THREAD = [
	{ who: 'alex', avatar: 'A', avatarBg: '#3D6B4F', time: '10:48', msg: 'we need invite teammates feature before thursday — customer call at 2pm. magic-link style, no passwords. should be fast, <90s end-to-end' },
	{ who: 'priya', avatar: 'P', avatarBg: '#6B5EA8', time: '10:51', msg: 'agree. also need rate limiting — we got spammed last quarter. and expired invites should resend, not just 404' },
	{ who: 'alex', avatar: 'A', avatarBg: '#3D6B4F', time: '10:53', msg: 'good call. should revoked invites still count toward the rate limit?' },
	{ who: 'priya', avatar: 'P', avatarBg: '#6B5EA8', time: '10:54', msg: 'not sure tbh. maybe ask eng? also need an audit log for compliance — inviter, invitee, status' },
	{ who: 'dan', avatar: 'D', avatarBg: '#A0522D', time: '10:56', msg: "rate limit: 5/user/hour sounds right. revoked invites — I'd say yes, count them, otherwise it's trivially bypassed" },
] as const

// Altr's reasoning steps
const STEPS = [
	{ id: 'read',     icon: '↓', label: 'Reading thread',         detail: '18 messages · 3 participants · #eng-team',    done: true  },
	{ id: 'classify', icon: '■', label: 'Signal classified',      detail: 'feature request · confidence 96%',             done: true  },
	{ id: 'problem',  icon: '→', label: 'Problem extracted',      detail: '34% drop-off at password step, pre-Thursday', done: true  },
	{ id: 'draft',    icon: '■', label: 'Drafting criteria',      detail: null,                                          done: false },
	{ id: 'flag',     icon: '◆', label: 'Open question flagged',  detail: null,                                          done: false },
	{ id: 'ready',    icon: '✓', label: 'Spec ready for review',  detail: 'awaiting human approval',                    done: false },
] as const

const AC = [
	'Any teammate can be invited by email alone',
	'Invites deliver within 10 seconds of send',
	'Expired invites (7 days) surface a resend CTA',
	'Rate-limit: 5 invites / user / hour',
	'Audit log records inviter, invitee, status',
]

// step index → how many ms after intersection to reveal it
const STEP_DELAYS = [0, 400, 800, 1400, 2200, 3200]
// AC item index → delay after step 3 starts (1400 + n*260)
const AC_DELAYS   = AC.map((_, i) => 1400 + 300 + i * 260)

export default function AltrLive() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const [visibleSteps, setVisibleSteps] = useState<number[]>([])
	const [visibleAC, setVisibleAC]       = useState<number[]>([])
	const [triggered, setTriggered]       = useState(false)

	useEffect(() => {
		const el = sectionRef.current
		if (!el) return
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && !triggered) {
					setTriggered(true)
					STEP_DELAYS.forEach((delay, i) => {
						setTimeout(() => setVisibleSteps((prev) => [...prev, i]), delay)
					})
					AC_DELAYS.forEach((delay, i) => {
						setTimeout(() => setVisibleAC((prev) => [...prev, i]), delay)
					})
				}
			},
			{ threshold: 0.25 },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [triggered])

	return (
		<section
			ref={sectionRef}
			className="py-[120px] px-8 border-b border-line overflow-hidden"
			style={{ background: 'var(--bg-1)' }}
		>
			<div className="inner">
				{/* Header */}
				<Reveal className="mb-14">
					<span className="over inline-block mb-5">agent transparency</span>
					<div className="grid gap-10 items-end" style={{ gridTemplateColumns: '1fr 1fr' }}>
						<h2
							className="font-serif font-normal tracking-[-0.03em] text-ink m-0"
							style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.06, textWrap: 'balance' }}
						>
							Watch Altr read
							<br />
							<em className="italic text-acc">the thread.</em>
						</h2>
						<p className="font-sans text-[16px] leading-[1.65] text-ink-2 m-0">
							Altr doesn&apos;t black-box the reasoning. Every step Altr takes is visible — from the raw thread to the reviewable spec with criteria your team actually wrote.
						</p>
					</div>
				</Reveal>

				{/* Main panel */}
				<Reveal delay={80}>
					<div
						className="grid rounded-[28px] border border-line overflow-hidden"
						style={{
							gridTemplateColumns: '1fr 1.1fr',
							background: 'var(--bg)',
							boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
						}}
					>
						{/* Left — raw Slack thread */}
						<div className="border-r border-line flex flex-col">
							{/* Panel header */}
							<div
								className="flex items-center justify-between px-5 py-3 border-b border-line"
								style={{ background: 'linear-gradient(180deg, var(--gray-2) 0%, var(--bg-1) 100%)' }}
							>
								<div className="flex items-center gap-[6px]">
									<span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
									<span className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
									<span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
								</div>
								<span className="font-mono text-[11px] text-ink-3">#eng-team · invite feature thread</span>
								<span className="font-mono text-[10px] text-ink-4">18 messages</span>
							</div>

							{/* Thread messages */}
							<div className="flex flex-col gap-0 flex-1 divide-y divide-line">
								{THREAD.map((msg, i) => (
									<div key={i} className="flex gap-3 px-5 py-4">
										<span
											className="flex-shrink-0 w-[28px] h-[28px] rounded-full grid place-items-center font-mono text-[10px] font-semibold text-white mt-0.5"
											style={{ background: msg.avatarBg }}
										>
											{msg.avatar}
										</span>
										<div className="flex-1 min-w-0">
											<div className="flex items-baseline gap-2 mb-1">
												<span className="font-sans font-semibold text-[13px] text-ink">{msg.who}</span>
												<span className="font-mono text-[10px] text-ink-4">{msg.time}</span>
											</div>
											<p className="font-sans text-[13px] text-ink-2 leading-[1.5] m-0">{msg.msg}</p>
										</div>
									</div>
								))}

								{/* Thread overflow */}
								<div className="px-5 py-3 flex items-center gap-2">
									<span className="font-mono text-[10px] text-ink-4">+ 13 more messages</span>
									<span className="w-1 h-1 rounded-full bg-line" />
									<span className="font-mono text-[10px] text-ink-4">Altr is reading all of them</span>
								</div>
							</div>
						</div>

						{/* Right — Altr reasoning panel */}
						<div className="flex flex-col">
							{/* Panel header */}
							<div
								className="flex items-center justify-between px-5 py-3 border-b border-line"
								style={{ background: 'linear-gradient(180deg, color-mix(in oklab, var(--acc) 5%, var(--gray-2)) 0%, var(--bg-1) 100%)' }}
							>
								<div className="flex items-center gap-2">
									<span className="font-mono text-[14px] text-acc font-bold leading-none">■</span>
									<span className="font-sans font-semibold text-[13px] text-ink">Altr</span>
									<span className="font-mono text-[10px] text-ink-4">· spec agent</span>
								</div>
								<span className="inline-flex gap-1.5 items-center font-mono text-[10px] text-acc">
									<span className="w-[5px] h-[5px] rounded-full bg-acc animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
									{visibleSteps.length < STEPS.length ? 'analyzing' : 'spec ready'}
								</span>
							</div>

							{/* Steps */}
							<div className="flex flex-col gap-0 px-5 py-5 border-b border-line">
								{STEPS.map((step, i) => {
									const visible = visibleSteps.includes(i)
									const isLast = i === STEPS.length - 1
									return (
										<motion.div
											key={step.id}
											initial={{ opacity: 0, x: -8 }}
											animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
											transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
											className="flex items-start gap-3 py-2"
										>
											{/* Step icon + connector */}
											<div className="flex flex-col items-center gap-0 flex-shrink-0" style={{ width: 20 }}>
												<span
													className="w-[20px] h-[20px] rounded-full flex items-center justify-center font-mono text-[9px] font-bold flex-shrink-0"
													style={{
														background: isLast && visible
															? 'var(--acc)'
															: visible ? 'color-mix(in oklab, var(--acc) 14%, white)' : 'var(--bg-1)',
														color: isLast && visible ? 'white' : 'var(--acc)',
														border: '1.5px solid color-mix(in oklab, var(--acc) 30%, var(--line))',
													}}
												>
													{step.icon}
												</span>
												{!isLast && (
													<div
														className="w-px flex-1 mt-1"
														style={{
															height: 12,
															background: visible ? 'color-mix(in oklab, var(--acc) 20%, var(--line))' : 'var(--line)',
														}}
													/>
												)}
											</div>

											{/* Step content */}
											<div className="flex-1 pb-1">
												<div className="flex items-center gap-2">
													<span className="font-sans font-semibold text-[13px] text-ink tracking-tight">{step.label}</span>
													{step.done && visible && (
														<span className="font-mono text-[9px] text-acc opacity-70">done</span>
													)}
												</div>
												{step.detail && (
													<span className="font-mono text-[10px] text-ink-4 tracking-wide">{step.detail}</span>
												)}

												{/* AC list under "Drafting criteria" */}
												{step.id === 'draft' && visible && (
													<ul className="list-none p-0 m-0 mt-3 flex flex-col gap-1.5">
														{AC.map((item, j) => (
															<AnimatePresence key={j}>
																{visibleAC.includes(j) && (
																	<motion.li
																		initial={{ opacity: 0, x: -6 }}
																		animate={{ opacity: 1, x: 0 }}
																		transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
																		className="flex items-start gap-2 font-sans text-[12.5px] text-ink-2 leading-[1.45]"
																	>
																		<span className="flex-shrink-0 w-[14px] h-[14px] rounded-full border border-line grid place-items-center mt-[1px]">
																			<span className="w-[5px] h-[5px] rounded-full bg-acc" />
																		</span>
																		{item}
																		{j === AC.length - 1 && visibleAC.length < AC.length && (
																			<span
																				className="inline-block w-[2px] bg-acc ml-0.5 align-[-2px] animate-[blink_1.1s_steps(2)_infinite]"
																				style={{ height: '1em' }}
																			/>
																		)}
																	</motion.li>
																)}
															</AnimatePresence>
														))}
													</ul>
												)}

												{/* Flagged question */}
												{step.id === 'flag' && visible && (
													<div
														className="mt-2 px-3 py-2 rounded-[10px] border font-sans text-[12.5px] text-ink-2 leading-[1.45]"
														style={{
															background: 'color-mix(in oklab, var(--acc) 5%, var(--bg-1))',
															borderColor: 'color-mix(in oklab, var(--acc) 20%, var(--line))',
														}}
													>
														<span className="font-mono text-[10px] text-acc uppercase tracking-widest block mb-1">open question</span>
														Should revoked invites still count toward the rate limit?
													</div>
												)}
											</div>
										</motion.div>
									)
								})}
							</div>

							{/* Footer — human gate */}
							{visibleSteps.includes(STEPS.length - 1) && (
								<motion.div
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
									className="flex items-center justify-between px-5 py-4 gap-4"
									style={{ background: 'color-mix(in oklab, var(--acc) 4%, var(--bg-1))' }}
								>
									<div className="flex flex-col gap-0.5">
										<span className="font-sans font-semibold text-[13px] text-ink">Draft ready</span>
										<span className="font-mono text-[10px] text-ink-4 tracking-wide">5 AC · 1 open question · awaiting your review</span>
									</div>
									<div className="flex items-center gap-2 flex-shrink-0">
										<button className="font-mono text-[11px] text-ink-3 border border-line rounded-full px-3 py-1.5 bg-bg hover:bg-bg-1 transition-colors cursor-default">
											Edit
										</button>
										<button className="font-mono text-[11px] text-acc-ink bg-acc rounded-full px-3 py-1.5 hover:opacity-90 transition-opacity cursor-default">
											Approve →
										</button>
									</div>
								</motion.div>
							)}
						</div>
					</div>
				</Reveal>

				{/* Caption */}
				<Reveal className="mt-6 flex items-center justify-center gap-2">
					<span className="font-mono text-[10.5px] text-ink-4 tracking-[0.08em]">
						Every step visible · nothing autonomous without your approval · spec stays editable until merge
					</span>
				</Reveal>
			</div>
		</section>
	)
}
