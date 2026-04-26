'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from './reveal'

// ── Scenario data ────────────────────────────────────────────────────────────

type Msg  = { who: string; avatar: string; avatarBg: string; time: string; msg: string }
type Step = { id: string; icon: string; label: string; detail: string | null; done: boolean }

type Scenario = {
	id: string
	label: string
	channel: string
	msgCount: string
	thread: Msg[]
	steps: Step[]
	ac: string[]
	openQuestion: string
	footerMeta: string
}

const SCENARIOS: Scenario[] = [
	{
		id: 'feature',
		label: 'Feature request',
		channel: '#eng-team · invite feature thread',
		msgCount: '18 messages',
		thread: [
			{ who: 'alex',  avatar: 'A', avatarBg: '#3D6B4F', time: '10:48', msg: 'we need invite teammates feature before thursday — customer call at 2pm. magic-link style, no passwords. should be fast, <90s end-to-end' },
			{ who: 'priya', avatar: 'P', avatarBg: '#6B5EA8', time: '10:51', msg: 'agree. also need rate limiting — we got spammed last quarter. and expired invites should resend, not just 404' },
			{ who: 'alex',  avatar: 'A', avatarBg: '#3D6B4F', time: '10:53', msg: 'good call. should revoked invites still count toward the rate limit?' },
			{ who: 'priya', avatar: 'P', avatarBg: '#6B5EA8', time: '10:54', msg: 'not sure tbh. also need an audit log for compliance — inviter, invitee, status' },
			{ who: 'dan',   avatar: 'D', avatarBg: '#A0522D', time: '10:56', msg: "rate limit: 5/user/hour sounds right. revoked invites — yes, count them, otherwise it's trivially bypassed" },
		],
		steps: [
			{ id: 'read',     icon: '↓', label: 'Reading thread',        detail: '18 messages · 3 participants · #eng-team',      done: true  },
			{ id: 'classify', icon: '■', label: 'Signal classified',     detail: 'feature request · confidence 96%',               done: true  },
			{ id: 'problem',  icon: '→', label: 'Problem extracted',     detail: '34% drop-off at password step, pre-Thursday',    done: true  },
			{ id: 'draft',    icon: '■', label: 'Drafting criteria',     detail: null,                                             done: false },
			{ id: 'flag',     icon: '◆', label: 'Open question flagged', detail: null,                                             done: false },
			{ id: 'ready',    icon: '✓', label: 'Spec ready for review', detail: 'awaiting human approval',                       done: false },
		],
		ac: [
			'Any teammate can be invited by email alone',
			'Invites deliver within 10 seconds of send',
			'Expired invites (7 days) surface a resend CTA',
			'Rate-limit: 5 invites / user / hour',
			'Audit log records inviter, invitee, status',
		],
		openQuestion: 'Should revoked invites still count toward the rate limit?',
		footerMeta: '5 AC · 1 open question · awaiting your review',
	},
	{
		id: 'bug',
		label: 'Bug report',
		channel: '#incidents · auth failure thread',
		msgCount: '14 messages',
		thread: [
			{ who: 'sam',  avatar: 'S', avatarBg: '#B55A4B', time: '10:12', msg: 'getting reports of auth failures on /login — users can\'t sign in. seeing ~200 errors/min in datadog' },
			{ who: 'mia',  avatar: 'M', avatarBg: '#6B5EA8', time: '10:14', msg: 'confirmed. status page needs updating. started around 10:08am — was there a deploy?' },
			{ who: 'sam',  avatar: 'S', avatarBg: '#B55A4B', time: '10:15', msg: 'yes — dan pushed auth-service v2.3.1 at 10:07. that\'s almost certainly it' },
			{ who: 'mia',  avatar: 'M', avatarBg: '#6B5EA8', time: '10:16', msg: 'rollback or forward-fix? we have a customer demo at 11am' },
			{ who: 'dan',  avatar: 'D', avatarBg: '#A0522D', time: '10:17', msg: 'rolling back now. should be clear in 3-5 min. will write up the incident after' },
		],
		steps: [
			{ id: 'read',     icon: '↓', label: 'Reading thread',        detail: '14 messages · 3 participants · #incidents',     done: true  },
			{ id: 'classify', icon: '■', label: 'Signal classified',     detail: 'incident / bug · severity: high · confidence 98%', done: true },
			{ id: 'problem',  icon: '→', label: 'Problem extracted',     detail: 'auth-service v2.3.1 deploy caused /login failures at 10:07am', done: true },
			{ id: 'draft',    icon: '■', label: 'Drafting issue',        detail: null,                                             done: false },
			{ id: 'flag',     icon: '◆', label: 'Severity flagged',      detail: null,                                             done: false },
			{ id: 'ready',    icon: '✓', label: 'Issue ready for review',detail: 'awaiting human approval',                       done: false },
		],
		ac: [
			'/login returning 500 for all users since v2.3.1 deploy at 10:07am',
			'Rollback to v2.3.0 in progress — service restoring',
			'Root cause: JWT signing key rotation not backward-compatible',
			'Post-mortem required within 24h of resolution',
			'Status page updated · customer comms drafted',
		],
		openQuestion: 'Should deploys to auth-service be blocked until key rotation is fixed?',
		footerMeta: '5 facts · 1 open question · awaiting your review',
	},
	{
		id: 'incident',
		label: 'Incident follow-up',
		channel: '#post-mortem · JWT rotation fix',
		msgCount: '22 messages',
		thread: [
			{ who: 'priya', avatar: 'P', avatarBg: '#6B5EA8', time: '14:30', msg: 'post-mortem from yesterday\'s outage — we need to prevent the JWT rotation bug from happening again' },
			{ who: 'alex',  avatar: 'A', avatarBg: '#3D6B4F', time: '14:32', msg: 'agreed. we need a migration guide + test coverage for key rotation. eng estimate?' },
			{ who: 'dan',   avatar: 'D', avatarBg: '#A0522D', time: '14:34', msg: '2-3 days for a proper fix. key rotation should be zero-downtime with a backward compat window' },
			{ who: 'priya', avatar: 'P', avatarBg: '#6B5EA8', time: '14:35', msg: 'the fix must not break existing sessions. non-negotiable' },
			{ who: 'alex',  avatar: 'A', avatarBg: '#3D6B4F', time: '14:36', msg: 'and we need a canary rollout — 5% → 25% → 100%. not straight to prod' },
		],
		steps: [
			{ id: 'read',     icon: '↓', label: 'Reading thread',        detail: '22 messages · 3 participants · #post-mortem',    done: true  },
			{ id: 'classify', icon: '■', label: 'Signal classified',     detail: 'incident follow-up · confidence 97%',            done: true  },
			{ id: 'problem',  icon: '→', label: 'Problem extracted',     detail: 'JWT key rotation needs zero-downtime backward compat window', done: true },
			{ id: 'draft',    icon: '■', label: 'Drafting spec',         detail: null,                                             done: false },
			{ id: 'flag',     icon: '◆', label: 'Risk flagged',          detail: null,                                             done: false },
			{ id: 'ready',    icon: '✓', label: 'Spec ready for review', detail: 'awaiting human approval',                       done: false },
		],
		ac: [
			'Key rotation supports backward compat for 7-day window',
			'Existing sessions remain valid throughout rotation',
			'Canary rollout: 5% → 25% → 100% with 30-min windows',
			'Automated test suite covers all rotation scenarios',
			'Runbook updated with new rotation procedure',
		],
		openQuestion: 'Should the 7-day backward compat window be configurable per environment?',
		footerMeta: '5 AC · 1 open question · awaiting your review',
	},
]

const STEP_DELAYS = [0, 400, 800, 1400, 2200, 3200]

// ── Component ────────────────────────────────────────────────────────────────

export default function AltrLive() {
	const sectionRef     = useRef<HTMLDivElement>(null)
	const hasEnteredView = useRef(false)
	const activeTabRef   = useRef(0)
	const timerRefs      = useRef<ReturnType<typeof setTimeout>[]>([])

	const [activeTab,   setActiveTab]   = useState(0)
	const [visibleSteps, setVisibleSteps] = useState<number[]>([])
	const [visibleAC,    setVisibleAC]    = useState<number[]>([])

	const startAnimation = useCallback((scenario: Scenario) => {
		// Cancel any running timers
		timerRefs.current.forEach(clearTimeout)
		timerRefs.current = []
		setVisibleSteps([])
		setVisibleAC([])

		const acDelays = scenario.ac.map((_, i) => 1400 + 300 + i * 260)

		STEP_DELAYS.forEach((delay, i) => {
			const t = setTimeout(() => setVisibleSteps((p) => [...p, i]), delay)
			timerRefs.current.push(t)
		})
		acDelays.forEach((delay, i) => {
			const t = setTimeout(() => setVisibleAC((p) => [...p, i]), delay)
			timerRefs.current.push(t)
		})
	}, [])

	// IntersectionObserver — triggers once on first entry
	useEffect(() => {
		const el = sectionRef.current
		if (!el) return
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && !hasEnteredView.current) {
					hasEnteredView.current = true
					startAnimation(SCENARIOS[activeTabRef.current]!)
				}
			},
			{ threshold: 0.25 },
		)
		obs.observe(el)
		return () => obs.disconnect()
	}, [startAnimation])

	// Cleanup on unmount
	useEffect(() => () => { timerRefs.current.forEach(clearTimeout) }, [])

	const handleTabChange = (idx: number) => {
		activeTabRef.current = idx
		setActiveTab(idx)
		if (hasEnteredView.current) {
			setTimeout(() => startAnimation(SCENARIOS[idx]!), 80)
		}
	}

	const scenario = SCENARIOS[activeTab]!

	return (
		<section
			ref={sectionRef}
			className="py-[120px] px-8 border-b border-line overflow-hidden"
			style={{ background: 'var(--bg-1)' }}
		>
			<div className="inner">
				{/* Header */}
				<Reveal className="mb-10">
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
							Altr doesn&apos;t black-box the reasoning. Every step is visible — from the raw thread to the reviewable spec with criteria your team actually wrote.
						</p>
					</div>
				</Reveal>

				{/* Scenario tabs */}
				<Reveal className="mb-6">
					<div className="flex items-center gap-1 p-1 rounded-full border border-line w-fit" style={{ background: 'var(--bg)' }}>
						{SCENARIOS.map((s, i) => (
							<button
								key={s.id}
								onClick={() => handleTabChange(i)}
								className={
									activeTab === i
										? 'btn btn-acc btn-sm'
										: 'font-mono text-[11px] tracking-[0.06em] uppercase rounded-full px-4 py-1.5 transition-all duration-200 cursor-pointer text-ink-3 hover:text-ink'
								}
							>
								{s.label}
							</button>
						))}
					</div>
				</Reveal>

				{/* Main panel */}
				<Reveal delay={80}>
					<AnimatePresence mode="wait">
						<motion.div
							key={scenario.id}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
							className="grid rounded-[28px] border border-line overflow-hidden"
							style={{
								gridTemplateColumns: '1fr 1.1fr',
								background: 'var(--bg)',
								boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
							}}
						>
							{/* Left — raw thread */}
							<div className="border-r border-line flex flex-col">
								<div
									className="flex items-center justify-between px-5 py-3 border-b border-line"
									style={{ background: 'linear-gradient(180deg, var(--gray-2) 0%, var(--bg-1) 100%)' }}
								>
									<div className="flex items-center gap-[6px]">
										<span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
										<span className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
										<span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
									</div>
									<span className="font-mono text-[11px] text-ink-3">{scenario.channel}</span>
									<span className="font-mono text-[10px] text-ink-4">{scenario.msgCount}</span>
								</div>

								<div className="flex flex-col gap-0 flex-1 divide-y divide-line">
									{scenario.thread.map((msg, i) => (
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
									<div className="px-5 py-3 flex items-center gap-2">
										<span className="font-mono text-[10px] text-ink-4">+ more messages</span>
										<span className="w-1 h-1 rounded-full bg-line" />
										<span className="font-mono text-[10px] text-ink-4">Altr is reading all of them</span>
									</div>
								</div>
							</div>

							{/* Right — Altr reasoning */}
							<div className="flex flex-col">
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
										{visibleSteps.length < scenario.steps.length ? 'analyzing' : 'spec ready'}
									</span>
								</div>

								{/* Steps */}
								<div className="flex flex-col gap-0 px-5 py-5 border-b border-line">
									{scenario.steps.map((step, i) => {
										const visible = visibleSteps.includes(i)
										const isLast  = i === scenario.steps.length - 1
										return (
											<motion.div
												key={`${scenario.id}-${step.id}`}
												initial={{ opacity: 0, x: -8 }}
												animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
												transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
												className="flex items-start gap-3 py-2"
											>
												<div className="flex flex-col items-center gap-0 flex-shrink-0" style={{ width: 20 }}>
													<span
														className="w-[20px] h-[20px] rounded-full flex items-center justify-center font-mono text-[9px] font-bold flex-shrink-0"
														style={{
															background: isLast && visible ? 'var(--acc)' : visible ? 'color-mix(in oklab, var(--acc) 14%, white)' : 'var(--bg-1)',
															color: isLast && visible ? 'white' : 'var(--acc)',
															border: '1.5px solid color-mix(in oklab, var(--acc) 30%, var(--line))',
														}}
													>
														{step.icon}
													</span>
													{!isLast && (
														<div
															className="w-px flex-1 mt-1"
															style={{ height: 12, background: visible ? 'color-mix(in oklab, var(--acc) 20%, var(--line))' : 'var(--line)' }}
														/>
													)}
												</div>

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

													{/* AC list */}
													{step.id === 'draft' && visible && (
														<ul className="list-none p-0 m-0 mt-3 flex flex-col gap-1.5">
															{scenario.ac.map((item, j) => (
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
																		</motion.li>
																	)}
																</AnimatePresence>
															))}
														</ul>
													)}

													{/* Open question */}
													{step.id === 'flag' && visible && (
														<div
															className="mt-2 px-3 py-2 rounded-[10px] border font-sans text-[12.5px] text-ink-2 leading-[1.45]"
															style={{
																background: 'color-mix(in oklab, var(--acc) 5%, var(--bg-1))',
																borderColor: 'color-mix(in oklab, var(--acc) 20%, var(--line))',
															}}
														>
															<span className="font-mono text-[10px] text-acc uppercase tracking-widest block mb-1">open question</span>
															{scenario.openQuestion}
														</div>
													)}
												</div>
											</motion.div>
										)
									})}
								</div>

								{/* Human gate footer */}
								{visibleSteps.includes(scenario.steps.length - 1) && (
									<motion.div
										initial={{ opacity: 0, y: 6 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
										className="flex items-center justify-between px-5 py-4 gap-4"
										style={{ background: 'color-mix(in oklab, var(--acc) 4%, var(--bg-1))' }}
									>
										<div className="flex flex-col gap-0.5">
											<span className="font-sans font-semibold text-[13px] text-ink">Draft ready</span>
											<span className="font-mono text-[10px] text-ink-4 tracking-wide">{scenario.footerMeta}</span>
										</div>
										<div className="flex items-center gap-2 flex-shrink-0">
											<button className="btn btn-ghost btn-sm cursor-default">
												Edit
											</button>
											<motion.button
												className="btn btn-acc btn-sm cursor-default"
												animate={{
													boxShadow: [
														'0 0 0 0px color-mix(in oklab, var(--acc-vibrant) 0%, transparent)',
														'0 0 0 6px color-mix(in oklab, var(--acc-vibrant) 32%, transparent)',
														'0 0 0 0px color-mix(in oklab, var(--acc-vibrant) 0%, transparent)',
													],
												}}
												transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
											>
												Approve →
											</motion.button>
										</div>
									</motion.div>
								)}
							</div>
						</motion.div>
					</AnimatePresence>
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
