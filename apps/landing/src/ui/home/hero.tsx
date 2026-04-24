'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import s from './home.module.css'
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

	const word = ROTATING_WORDS[wordIndex]

	return (
		<section className={s.hero}>
			<div className={s.heroWrap}>
				<p className={s.heroTagline}>
					for teams &amp; agents · threads → specs → prs · local-first
				</p>
				<h1 className={`${s.heroH} ${s.display}`}>
					<span className={s.line}>Build without the archaeology.</span>
					<span className={s.line}>Close the execution loop.</span>
					<span className={s.line}>
						Ship with{' '}
						<span className={s.accWordWrap}>
							<AnimatePresence mode="wait" initial={false}>
								<motion.span
									key={word}
									className={`${s.acc} ${s.accShimmer}`}
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
				<p className={s.heroSub}>
					Rough requests become specs. Specs become branches. Branches become
					reviewed PRs. The original rationale survives every step — so your
					team ships on intent, not archaeology.
				</p>
				<div className={s.heroCtas}>
					<a href="#close" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`}>
						Get early access →
					</a>
					<a href="#playground" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`}>
						See it in action
					</a>
				</div>
				<div className={s.heroTrust}>
					<span>2.7× faster request-to-spec</span>
					<span className={s.heroMetaSep} />
					<span>41% less context rebuilding</span>
					<span className={s.heroMetaSep} />
					<span>founder-led onboarding</span>
				</div>
				<div className={s.heroMeta}>
					<span>intake</span>
					<span className={s.heroMetaSep} />
					<span>plan</span>
					<span className={s.heroMetaSep} />
					<span>build</span>
					<span className={s.heroMetaSep} />
					<span>review</span>
					<span className={s.heroMetaSep} />
					<span>ship</span>
				</div>
			</div>

			<motion.div
				className={s.heroShotWrap}
				style={{
					scale: shotScale,
					rotateX: shotRotateX,
					y: shotY,
					transformPerspective: 1200,
				}}
			>
				<Reveal>
					<div className={s.heroShot} id="product">
						<div className={s.pcBar}>
							<div className={s.pcDots}>
								<span />
								<span />
								<span />
							</div>
							<div className={s.pcTabs}>
								<span className={s.pcTab}>inbox</span>
								<span className={`${s.pcTab} ${s.pcTabOn}`}>
									specs / magic-link-auth.md
								</span>
								<span className={s.pcTab}>eng / PR #142</span>
								<span className={s.pcTab}>#launch-magic-link</span>

							</div>
							<div className={s.pcKbd}>⌘K</div>
						</div>
						<div className={s.pcBody}>
							<div className={s.pcDoc}>
								<div className={s.pcDocRail}>
									<div className={s.pcRailCard}>
										<span>status</span>
										<b>drafting</b>
									</div>
									<div className={s.pcRailCard}>
										<span>context</span>
										<b>thread attached</b>
									</div>
									<div className={s.pcRailCard}>
										<span>handoff</span>
										<b>build next</b>
									</div>
								</div>
								<span className={s.over}>
									§ spec · draft · edited 2 min ago
								</span>
								<h3 className={s.pcDocTitle}>Magic-link onboarding</h3>
								<div className={s.pcDocSub}>
									owner: <span className={s.mention}>@mukul</span> · co-authored
									with <span className={s.mention}>Altr</span>
								</div>

								<h4 className={s.pcDocH}>The problem</h4>
								<p className={s.pcDocP}>
									Teams sign up, hit the password step, and 34% bounce before
									their first workspace. We lose them before we learn anything.
									We want an invite flow that feels like <em>opening a door</em>
									, not filling out a form.
								</p>

								<h4 className={s.pcDocH}>Acceptance criteria</h4>
								<ul className={s.pcDocUl}>
									<li>Any teammate can be invited by email alone</li>
									<li>
										Invites deliver within{' '}
										<span className={s.hl}>10 seconds</span> of send
									</li>
									<li>Expired invites (7 days) surface a resend CTA</li>
									<li>Rate-limit: 5 invites / user / hour</li>
									<li>
										Audit log records inviter, invitee, status
										<span className={s.caret} />
									</li>
								</ul>

								<h4 className={s.pcDocH}>Open questions</h4>
								<p className={s.pcDocP}>
									Altr flagged: should
									revoked invites still count toward the rate limit?
								</p>
							</div>

							<div className={s.pcSide}>
								<div className={s.pcSideHead}>
									<span>#launch-magic-link</span>
									<span className={s.live}>
										<span className={s.liveDot} />
										live
									</span>
								</div>
								<div className={s.pcQueue}>
									<div className={s.pcQueueItem}>
										<span>active</span>
										<b>Altr drafting AC</b>
									</div>
									<div className={s.pcQueueItem}>
										<span>next</span>
										<b>build opens worktree</b>
									</div>
								</div>
								<div className={s.pcMsgs}>
									<div className={s.pcMsg}>
										<div className={`${s.pcMsgAvatar} ${s.pcMsgAvatarSpec}`}>
											§
										</div>
										<div>
											<div className={s.pcMsgWho}>
												<b>Altr</b>
												<span>11:02</span>
											</div>
											Pulled 4 AC from the thread. Added rate-limit from the
											security review. Ready for build?
										</div>
									</div>
									<div className={s.pcMsg}>
										<div className={`${s.pcMsgAvatar} ${s.pcMsgAvatarHuman}`}>
											m
										</div>
										<div>
											<div className={s.pcMsgWho}>
												<b>mukul</b>
												<span>11:03</span>
											</div>
											Yes. Also: keep the resend CTA behind a 30s cooldown.
										</div>
									</div>
									<div className={s.pcMsg}>
										<div className={`${s.pcMsgAvatar} ${s.pcMsgAvatarEng}`}>
											E
										</div>
										<div>
											<div className={s.pcMsgWho}>
												<b>Altr</b>
												<span>11:04</span>
											</div>
											Drafting PR now. Est. <b>2h 40m</b>. Touching{' '}
											<span className={s.mono}>invites.ts</span>,{' '}
											<span className={s.mono}>email-templates/</span>, one new
											migration.
										</div>
									</div>
									<div className={s.pcMsg}>
										<div className={`${s.pcMsgAvatar} ${s.pcMsgAvatarSpec}`}>
											§
										</div>
										<div>
											<div className={s.pcMsgWho}>
												<b>Altr</b>
												<span>11:05</span>
											</div>
											I&apos;ll draft the changelog entry once PR lands. Staging
											link will post here.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Reveal>
			</motion.div>
		</section>
	)
}
