'use client'

import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import Reveal from './reveal'

const ROTATING_WORDS = ['clarity', 'ownership', 'control', 'context'] as const

export default function Hero() {
	const [wordIndex, setWordIndex] = useState(0)

	useEffect(() => {
		const interval = window.setInterval(() => {
			setWordIndex((current) => (current + 1) % ROTATING_WORDS.length)
		}, 6500)
		return () => window.clearInterval(interval)
	}, [])

	// track raw window scroll so animation reacts immediately on first scroll
	const { scrollY } = useScroll()

	const shotScale   = useTransform(scrollY, [0, 520], [0.72, 1.0])
	const shotRotateX = useTransform(scrollY, [0, 520], [10, 0])
	const shotY       = useTransform(scrollY, [0, 520], [-40, 0])

	const sidebarRef = useRef<HTMLDivElement>(null)
	const sidebarInView = useInView(sidebarRef, { once: true, margin: '-40px' })

	const word = ROTATING_WORDS[wordIndex]

	return (
		<section
			className="px-8 pb-0 flex flex-col relative overflow-hidden bg-transparent text-ink border-b border-[color-mix(in_oklab,var(--line)_78%,transparent)]"
			style={{ minHeight: '156svh' }}
		>
			{/* hero text wrap */}
			<div className="max-w-[1020px] w-full mx-auto text-center flex flex-col items-center gap-7 relative z-[1] flex-1 pt-[280px] pb-12">
				{/* announcement pill */}
				<div className="inline-flex items-center gap-2.5 border border-line rounded-full px-3 py-1.5 shadow-sm" style={{ background: 'color-mix(in oklab, var(--panel) 92%, white)' }}>
					<span className="w-1.5 h-1.5 rounded-full bg-acc flex-shrink-0 animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
					<span className="badge badge-acc">Early Access</span>
					<span className="font-mono text-[11px] tracking-widest uppercase text-ink-3">
						One unbroken trail · thread to merged PR
					</span>
				</div>

				<h1
					className="font-serif text-center"
					style={{
						fontSize: 'clamp(32px, 4.4vw, 68px)',
						lineHeight: 1.08,
						textWrap: 'balance',
					}}
				>
					<span className="block">Build without the archaeology.</span>
					<span className="block">Close the execution loop.</span>
					<span className="block">
						Ship with{' '}
						<span className="inline-block relative">
							<AnimatePresence mode="wait" initial={false}>
								<motion.span
									key={word}
									className="text-acc inline-block"
									style={{
										display: 'inline-block',
										clipPath: 'inset(0 100% 0 0)',
									}}
									animate={{
										clipPath: 'inset(0 0% 0 0)',
									}}
									exit={{
										opacity: 0,
										y: '-0.14em',
										filter: 'blur(6px)',
										transition: {
											duration: 0.55,
											ease: [0.55, 0, 1, 0.45],
										},
									}}
									transition={{
										clipPath: {
											duration: 1.1,
											ease: [0.16, 1, 0.3, 1],
										},
									}}
								>
									{word}.
								</motion.span>
							</AnimatePresence>
						</span>
					</span>
				</h1>

				<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[56ch] mx-auto">
					Every artifact carries its source. From the initial signal to the
					merged PR — one unbroken trail of intent. No rebuilding the brief at
					handoff. Your agents work inside your actual stack.
				</p>

				<div className="flex gap-[10px] flex-wrap justify-center">
					<a href="#close" className="btn btn-acc btn-lg">
						Get early access →
					</a>
					<a href="#playground" className="btn btn-ghost btn-lg">
						See it in action
					</a>
				</div>

				{/* outcome stat strip */}
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2">
					{[
						{ stat: '6h', label: 'saved per engineer per week' },
						{ stat: '18m', label: 'thread to first reviewable spec' },
						{ stat: '100%', label: 'human approval at every gate' },
					].map(({ stat, label }) => (
						<div key={stat} className="flex items-baseline gap-1.5">
							<span className="font-mono text-[15px] font-semibold text-acc">{stat}</span>
							<span className="font-mono text-[10.5px] text-ink-4 tracking-widest uppercase">{label}</span>
						</div>
					))}
				</div>

			</div>

			{/* product shot */}
			<motion.div
				className="max-w-[1240px] mx-auto px-6 pb-28 relative z-[1]"
				style={{
					scale: shotScale,
					rotateX: shotRotateX,
					y: shotY,
					transformPerspective: 1200,
					transformOrigin: 'center bottom',
				}}
			>
				<Reveal>
					<div
						id="product"
						className="rounded-xl border border-line overflow-hidden"
						style={
							{
								background: 'var(--gray-1)',
								boxShadow:
									'0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.09), 0 0 0 1px var(--line)',
								'--pc-bg': 'var(--gray-1)',
								'--pc-bar': 'var(--gray-2)',
								'--pc-ink': 'var(--gray-12)',
								'--pc-ink-2': 'var(--gray-11)',
								'--pc-ink-3': 'var(--gray-9)',
								'--pc-ink-4': 'var(--gray-7)',
							} as React.CSSProperties
						}
					>
						{/* title bar */}
						<div
							className="grid items-center border-b border-line px-[18px] py-[14px]"
							style={{
								gridTemplateColumns: 'auto 1fr auto',
								background: 'linear-gradient(180deg, var(--gray-2) 0%, var(--pc-bar) 100%)',
							}}
						>
							<div className="flex items-center gap-[6px]">
								<span className="w-[12px] h-[12px] rounded-full bg-[#ff5f57]" />
								<span className="w-[12px] h-[12px] rounded-full bg-[#ffbd2e]" />
								<span className="w-[12px] h-[12px] rounded-full bg-[#28c840]" />
							</div>
							<div className="flex items-center gap-1 justify-center overflow-hidden">
								<span className="font-mono text-[11px] px-[10px] py-[6px] rounded-lg text-ink-3">
									inbox
								</span>
								<span
									className="font-mono text-[11px] px-[10px] py-[6px] rounded-lg border border-line shadow-sm text-ink"
									style={{ background: 'rgba(255,255,255,0.9)' }}
								>
									specs / magic-link-auth.md
								</span>
								<span className="font-mono text-[11px] px-[10px] py-[6px] rounded-lg text-ink-3">
									eng / PR #142
								</span>
								<span className="font-mono text-[11px] px-[10px] py-[6px] rounded-lg text-ink-3">
									#launch-magic-link
								</span>
							</div>
							<div className="font-mono text-[10.5px] px-2 py-1 border border-line rounded-md text-ink-3">
								⌘K
							</div>
						</div>

						{/* body: doc + sidebar */}
						<div
							className="grid"
							style={{ gridTemplateColumns: '1fr 360px', minHeight: '700px' }}
						>
							{/* doc pane */}
							<div
								className="px-10 py-[34px] border-r border-line text-left"
								style={{
									background:
										'linear-gradient(160deg, color-mix(in oklab, var(--acc) 4%, var(--pc-bg)) 0%, var(--pc-bg) 60%)',
								}}
							>
								{/* rail cards */}
								<div
									className="grid gap-[10px] mb-7"
									style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
								>
									{[
										{ label: 'status', value: 'drafting' },
										{ label: 'context', value: 'thread attached' },
										{ label: 'handoff', value: 'build next' },
									].map(({ label, value }) => (
										<div
											key={label}
											className="p-3 rounded-[14px] border border-line shadow-sm flex flex-col gap-1"
											style={{ background: 'rgba(255,255,255,0.86)' }}
										>
											<span className="font-mono text-[10px] uppercase tracking-widest text-ink-3">
												{label}
											</span>
											<b className="font-sans text-[12.5px] font-600 text-ink">
												{value}
											</b>
										</div>
									))}
								</div>

								<span className="over">§ spec · draft · edited 2 min ago</span>

								<h2
									className="font-serif font-normal tracking-tight text-ink mt-2 mb-1"
									style={{ fontSize: '32px' }}
								>
									Magic-link onboarding
								</h2>
								<div className="font-mono text-[11.5px] text-ink-3 mb-[30px]">
									owner:{' '}
									<span className="font-mono text-[13px] text-acc font-medium">
										@mukul
									</span>{' '}
									· co-authored with{' '}
									<span className="font-mono text-[13px] text-acc font-medium">
										Altr
									</span>
								</div>

								<h3 className="font-sans font-semibold text-[13px] tracking-wide text-ink uppercase mt-7 mb-2.5">
									The problem
								</h3>
								<p className="text-[14.5px] leading-[1.72] text-ink-2 mb-3">
									Teams sign up, hit the password step, and 34% bounce before
									their first workspace. We lose them before we learn anything.
									We want an invite flow that feels like <em>opening a door</em>
									, not filling out a form.
								</p>

								<h3 className="font-sans font-semibold text-[13px] tracking-wide text-ink uppercase mt-7 mb-2.5">
									Acceptance criteria
								</h3>
								<ul className="list-none p-0 m-0 mb-3 space-y-1">
									{[
										<>Any teammate can be invited by email alone</>,
										<>
											Invites deliver within{' '}
											<span className="bg-lime-3 text-acc px-1 rounded-sm">
												10 seconds
											</span>{' '}
											of send
										</>,
										<>Expired invites (7 days) surface a resend CTA</>,
										<>Rate-limit: 5 invites / user / hour</>,
										<>
											Audit log records inviter, invitee, status
											<span
												className="inline-block w-[2px] bg-acc ml-0.5 align-[-3px] animate-[blink_1.1s_steps(2)_infinite]"
												style={{ height: '1.1em' }}
											/>
										</>,
									].map((item, i) => (
										<li
											key={i}
											className="text-[14px] text-ink-2 pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-ink-3"
										>
											{item}
										</li>
									))}
								</ul>

								<h3 className="font-sans font-semibold text-[13px] tracking-wide text-ink uppercase mt-7 mb-2.5">
									Open questions
								</h3>
								<p className="text-[14.5px] leading-[1.72] text-ink-2 mb-3">
									Altr flagged: should revoked invites still count toward the
									rate limit?
								</p>
							</div>

							{/* sidebar pane */}
							<div
								className="flex flex-col border-l border-line"
								style={{
									background:
										'linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)',
								}}
							>
								<div className="p-3 border-b border-line font-mono text-[11px] text-ink-3 flex justify-between items-center">
									<div className="flex items-center gap-1.5">
										<span className="font-mono text-[12px] text-acc font-bold leading-none">■</span>
										<span>Altr</span>
										<span className="text-ink-4">· spec agent</span>
									</div>
									<span className="inline-flex gap-1.5 items-center text-acc">
										<span
											className="w-1.5 h-1.5 rounded-full bg-acc shadow-sm animate-[pulse-dot_1.6s_ease-in-out_infinite]"
										/>
										drafting spec
									</span>
								</div>

								<div className="p-3 grid gap-2.5">
									{[
										{ label: 'stage', value: 'plan · writing AC' },
										{ label: 'next', value: 'build opens worktree' },
									].map(({ label, value }) => (
										<div
											key={label}
											className="p-3 rounded-[14px] border border-line flex flex-col gap-1"
											style={{ background: 'rgba(255,255,255,0.72)' }}
										>
											<span className="font-mono text-[10px] uppercase tracking-widest text-ink-4">
												{label}
											</span>
											<b className="font-sans text-[13px] font-semibold text-ink">
												{value}
											</b>
										</div>
									))}
								</div>

								<div ref={sidebarRef} className="p-3 flex-1 flex flex-col gap-3 overflow-hidden">
									{/* msg 1 */}
									<motion.div
										className="flex gap-2.5 p-3 rounded-[14px] border text-[13px] leading-[1.5] text-ink-2"
										style={{
											borderColor: 'rgba(215,215,215,0.8)',
											background: 'rgba(255,255,255,0.68)',
										}}
										initial={{ opacity: 0, x: 10 }}
										animate={sidebarInView ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.0 }}
									>
										<div className="w-[26px] h-[26px] rounded-full flex-shrink-0 grid place-items-center font-mono text-[10px] font-semibold bg-acc text-white">
											§
										</div>
										<div>
											<div className="font-mono text-[11px] text-ink-3 tracking-wide mb-0.5">
												<b className="font-sans text-ink font-semibold text-[12.5px] mr-1.5">
													Altr
												</b>
												<span>11:02</span>
											</div>
											Pulled 4 AC from the thread. Added rate-limit from the
											security review. Ready for build?
										</div>
									</motion.div>

									{/* msg 2 */}
									<motion.div
										className="flex gap-2.5 p-3 rounded-[14px] border text-[13px] leading-[1.5] text-ink-2"
										style={{
											borderColor: 'rgba(215,215,215,0.8)',
											background: 'rgba(255,255,255,0.68)',
										}}
										initial={{ opacity: 0, x: 10 }}
										animate={sidebarInView ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.18 }}
									>
										<div className="w-[26px] h-[26px] rounded-full flex-shrink-0 grid place-items-center font-mono text-[10px] font-semibold bg-mint-soft text-(--moss-2)">
											m
										</div>
										<div>
											<div className="font-mono text-[11px] text-ink-3 tracking-wide mb-0.5">
												<b className="font-sans text-ink font-semibold text-[12.5px] mr-1.5">
													mukul
												</b>
												<span>11:03</span>
											</div>
											Yes. Also: keep the resend CTA behind a 30s cooldown.
										</div>
									</motion.div>

									{/* msg 3 */}
									<motion.div
										className="flex gap-2.5 p-3 rounded-[14px] border text-[13px] leading-[1.5] text-ink-2"
										style={{
											borderColor: 'rgba(215,215,215,0.8)',
											background: 'rgba(255,255,255,0.68)',
										}}
										initial={{ opacity: 0, x: 10 }}
										animate={sidebarInView ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.36 }}
									>
										<div className="w-[26px] h-[26px] rounded-full flex-shrink-0 grid place-items-center font-mono text-[10px] font-semibold bg-[#1a1a1a] text-white">
											E
										</div>
										<div>
											<div className="font-mono text-[11px] text-ink-3 tracking-wide mb-0.5">
												<b className="font-sans text-ink font-semibold text-[12.5px] mr-1.5">
													Altr
												</b>
												<span>11:04</span>
											</div>
											Drafting PR now. Est. <b>2h 40m</b>. Touching{' '}
											<span className="font-mono text-[13px]">invites.ts</span>,{' '}
											<span className="font-mono text-[13px]">
												email-templates/
											</span>
											, one new migration.
										</div>
									</motion.div>

									{/* msg 4 */}
									<motion.div
										className="flex gap-2.5 p-3 rounded-[14px] border text-[13px] leading-[1.5] text-ink-2"
										style={{
											borderColor: 'rgba(215,215,215,0.8)',
											background: 'rgba(255,255,255,0.68)',
										}}
										initial={{ opacity: 0, x: 10 }}
										animate={sidebarInView ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.54 }}
									>
										<div className="w-[26px] h-[26px] rounded-full flex-shrink-0 grid place-items-center font-mono text-[10px] font-semibold bg-acc text-white">
											§
										</div>
										<div>
											<div className="font-mono text-[11px] text-ink-3 tracking-wide mb-0.5">
												<b className="font-sans text-ink font-semibold text-[12.5px] mr-1.5">
													Altr
												</b>
												<span>11:05</span>
											</div>
											I&apos;ll draft the changelog entry once PR lands. Staging
											link will post here.
										</div>
									</motion.div>

									{/* Typing indicator — appears after last message */}
									<motion.div
										className="flex gap-2.5 px-3 py-1 items-center"
										initial={{ opacity: 0 }}
										animate={sidebarInView ? { opacity: 1 } : {}}
										transition={{ duration: 0.35, delay: 0.9 }}
									>
										<div className="w-[26px] h-[26px] rounded-full flex-shrink-0 grid place-items-center font-mono text-[10px] font-semibold bg-acc text-white">
											§
										</div>
										<div className="flex items-center gap-[5px]">
											{[0, 1, 2].map((i) => (
												<motion.span
													key={i}
													className="w-[5px] h-[5px] rounded-full bg-ink-3"
													animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
													transition={{
														duration: 1.1,
														repeat: Infinity,
														delay: i * 0.18,
														ease: 'easeInOut',
													}}
												/>
											))}
										</div>
									</motion.div>
								</div>
							</div>
						</div>
					</div>
				</Reveal>
			</motion.div>
		</section>
	)
}
