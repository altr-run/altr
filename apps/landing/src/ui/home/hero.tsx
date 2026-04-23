'use client'

import { useState } from 'react'
import s from './home.module.css'
import Reveal from './reveal'
import HeroShader from './hero-shader'

export default function Hero() {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<section
			className={s.hero}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<HeroShader isHovered={isHovered} />
			<div className={s.heroWrap}>
				<h1 className={`${s.heroH} ${s.display}`}>
					<span className={s.line}>Fewer handoffs.</span>
					<span className={s.line}>
						More <span className={s.underlineHand}>context</span>.
					</span>
					<span className={s.line}>
						Better <span className={s.acc}>shipping.</span>
					</span>
				</h1>
				<p className={s.heroSub}>
					Altr gives comms, requests, research, product signals, specs,
					and PRs a single home, so <em>your team</em> and{' '}
					<span className={`${s.mono} ${s.heroMonoAcc}`}>
						@spec
					</span>
					,{' '}
					<span className={`${s.mono} ${s.heroMonoInk}`}>
						@eng
					</span>
					, and{' '}
					<span className={`${s.mono} ${s.heroMonoInk}`}>
						@review
					</span>{' '}
					can move as one, with context intact from first signal to
					shipped change.
				</p>
				<div className={s.heroCtas}>
					<a
						href="#close"
						className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`}
					>
						Request beta access →
					</a>
					<a
						href="#playground"
						className={`${s.btn} ${s.btnGhost} ${s.btnLg}`}
					>
						Try the demo
					</a>
				</div>
				<div className={s.heroMeta}>
					<span>mac-native</span>
					<span className={s.heroMetaSep} />
					<span>local-first</span>
					<span className={s.heroMetaSep} />
					<span>bring your own keys</span>
				</div>
			</div>

			<div className={s.heroShotWrap}>
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
								<span className={s.pcTab}>
									#launch-magic-link
								</span>
							</div>
							<div className={s.pcKbd}>⌘K</div>
						</div>
						<div className={s.pcBody}>
							<div className={s.pcDoc}>
								<span className={s.over}>
									§ spec · draft · edited 2 min ago
								</span>
								<h3 className={s.pcDocTitle}>
									Magic-link onboarding
								</h3>
								<div className={s.pcDocSub}>
									owner:{' '}
									<span className={s.mention}>@mukul</span> ·
									co-authored with{' '}
									<span className={s.mention}>@spec</span>
								</div>

								<h4 className={s.pcDocH}>The problem</h4>
								<p className={s.pcDocP}>
									Teams sign up, hit the password step, and
									34% bounce before their first workspace. We
									lose them before we learn anything. We want
									an invite flow that feels like{' '}
									<em>opening a door</em>, not filling out a
									form.
								</p>

								<h4 className={s.pcDocH}>
									Acceptance criteria
								</h4>
								<ul className={s.pcDocUl}>
									<li>
										Any teammate can be invited by email
										alone
									</li>
									<li>
										Invites deliver within{' '}
										<span className={s.hl}>10 seconds</span>{' '}
										of send
									</li>
									<li>
										Expired invites (7 days) surface a
										resend CTA
									</li>
									<li>
										Rate-limit: 5 invites / user / hour
									</li>
									<li>
										Audit log records inviter, invitee,
										status
										<span className={s.caret} />
									</li>
								</ul>

								<h4 className={s.pcDocH}>Open questions</h4>
								<p className={s.pcDocP}>
									<span className={s.mention}>@spec</span>{' '}
									flagged: should revoked invites still count
									toward the rate limit?
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
								<div className={s.pcMsgs}>
									<div className={s.pcMsg}>
										<div
											className={`${s.pcMsgAvatar} ${s.pcMsgAvatarSpec}`}
										>
											§
										</div>
										<div>
											<div className={s.pcMsgWho}>
												<b>@spec</b>
												<span>11:02</span>
											</div>
											Pulled 4 AC from the thread. Added
											rate-limit from the security review.
											Ready for <b>@eng</b>?
										</div>
									</div>
									<div className={s.pcMsg}>
										<div
											className={`${s.pcMsgAvatar} ${s.pcMsgAvatarHuman}`}
										>
											m
										</div>
										<div>
											<div className={s.pcMsgWho}>
												<b>mukul</b>
												<span>11:03</span>
											</div>
											Yes. Also: keep the resend CTA
											behind a 30s cooldown.
										</div>
									</div>
									<div className={s.pcMsg}>
										<div
											className={`${s.pcMsgAvatar} ${s.pcMsgAvatarEng}`}
										>
											E
										</div>
										<div>
											<div className={s.pcMsgWho}>
												<b>@eng</b>
												<span>11:04</span>
											</div>
											Drafting PR now. Est. <b>2h 40m</b>.
											Touching{' '}
											<span className={s.mono}>
												invites.ts
											</span>
											,{' '}
											<span className={s.mono}>
												email-templates/
											</span>
											, one new migration.
										</div>
									</div>
									<div className={s.pcMsg}>
										<div
											className={`${s.pcMsgAvatar} ${s.pcMsgAvatarSpec}`}
										>
											§
										</div>
										<div>
											<div className={s.pcMsgWho}>
												<b>@spec</b>
												<span>11:05</span>
											</div>
											I&apos;ll draft the changelog entry
											once PR lands. Staging link will
											post here.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
