'use client'

import { motion } from 'motion/react'
import s from './home.module.css'
import Reveal from './reveal'

function IntakeVisualization() {
	return (
		<div className={`${s.tripIll} ${s.illScene}`} aria-hidden="true">
			<div className={s.sceneGrid} />
			<div className={s.sceneGlow} />
			<motion.div
				className={`${s.streamCard} ${s.streamSource}`}
				animate={{ y: [0, -4, 0], rotate: [-2, -1, -2] }}
				transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
			>
				<span className={s.streamLabel}>incoming</span>
				<strong>customer call</strong>
				<p>pricing confusion around seat handoff and review ownership</p>
			</motion.div>
			<motion.div
				className={s.streamBeam}
				animate={{ opacity: [0.35, 0.75, 0.35], scaleX: [0.96, 1, 0.96] }}
				transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
			/>
			<motion.div
				className={s.streamPulse}
				animate={{ x: ['0%', '100%'] }}
				transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
			/>
			<motion.div
				className={`${s.streamCard} ${s.streamHub}`}
				animate={{ boxShadow: ['0 0 0 rgba(141, 182, 84, 0)', '0 18px 40px rgba(141, 182, 84, 0.16)', '0 0 0 rgba(141, 182, 84, 0)'] }}
				transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
			>
				<div className={s.hubDots}>
					<span />
					<span />
					<span />
				</div>
				<strong>room thread</strong>
				<ul className={s.hubList}>
					<li>signal attached</li>
					<li>owners named</li>
					<li>context retained</li>
				</ul>
			</motion.div>
			<div className={s.streamTags}>
				<motion.span
					className={s.streamTag}
					animate={{ y: [0, -6, 0] }}
					transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
				>
					transcript
				</motion.span>
				<motion.span
					className={s.streamTag}
					animate={{ y: [0, -6, 0] }}
					transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
				>
					note
				</motion.span>
				<motion.span
					className={s.streamTag}
					animate={{ y: [0, -6, 0] }}
					transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
				>
					research
				</motion.span>
			</div>
		</div>
	)
}

function RoleVisualization() {
	return (
		<div className={`${s.tripIll} ${s.roleScene}`} aria-hidden="true">
			<div className={s.sceneGrid} />
			<div className={s.roleRail}>
				<div className={s.roleHeader}>orchestration lanes</div>
				<div className={s.roleLane}>
					<span className={`${s.roleChip} ${s.roleChipSpec}`}>@spec</span>
					<div className={s.roleTrack}>
						<motion.div
							className={`${s.roleBlock} ${s.roleBlockSpec}`}
							animate={{ x: [0, 10, 0] }}
							transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
						>
							draft brief
						</motion.div>
					</div>
				</div>
				<div className={s.roleLane}>
					<span className={s.roleChip}>@eng</span>
					<div className={s.roleTrack}>
						<motion.div
							className={s.roleBlock}
							animate={{ x: [0, 14, 0] }}
							transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
						>
							implement
						</motion.div>
					</div>
				</div>
				<div className={s.roleLane}>
					<span className={s.roleChip}>@review</span>
					<div className={s.roleTrack}>
						<motion.div
							className={s.roleBlock}
							animate={{ x: [0, 8, 0] }}
							transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
						>
							check risk
						</motion.div>
					</div>
				</div>
			</div>
			<motion.div
				className={s.roleSignal}
				animate={{ x: ['0%', '76%'], opacity: [0, 1, 1, 0] }}
				transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
			>
				incoming change
			</motion.div>
			<div className={s.roleStatusStack}>
				<motion.div
					className={s.roleStatus}
					animate={{ y: [0, -4, 0] }}
					transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
				>
					spec owns acceptance
				</motion.div>
				<motion.div
					className={s.roleStatus}
					animate={{ y: [0, -4, 0] }}
					transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
				>
					eng holds delivery
				</motion.div>
				<motion.div
					className={s.roleStatus}
					animate={{ y: [0, -4, 0] }}
					transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
				>
					review blocks regressions
				</motion.div>
			</div>
		</div>
	)
}

function ChainVisualization() {
	return (
		<div className={`${s.tripIll} ${s.chainScene}`} aria-hidden="true">
			<div className={s.sceneGrid} />
			<div className={s.chainFlow}>
				<motion.div
					className={s.chainNode}
					animate={{ y: [0, -5, 0] }}
					transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
				>
					<span>thread</span>
					<strong>incident context</strong>
				</motion.div>
				<div className={s.chainConnector}>
					<motion.div
						className={s.chainPulse}
						animate={{ x: ['-8%', '92%'] }}
						transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
					/>
				</div>
				<motion.div
					className={`${s.chainNode} ${s.chainNodeAccent}`}
					animate={{ y: [0, -5, 0] }}
					transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
				>
					<span>spec</span>
					<strong>acceptance locked</strong>
				</motion.div>
				<div className={s.chainConnector}>
					<motion.div
						className={s.chainPulse}
						animate={{ x: ['-8%', '92%'] }}
						transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: 0.9 }}
					/>
				</div>
				<motion.div
					className={s.chainDock}
					animate={{ y: [0, -4, 0] }}
					transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
				>
					<div className={s.chainDockBar}>
						<span />
						<span />
						<span />
					</div>
					<div className={s.chainDockBody}>
						<div className={s.chainPrRow}>
							<b>pr #142</b>
							<span>full trail attached</span>
						</div>
						<div className={s.chainMeta}>
							<span>thread</span>
							<span>spec</span>
							<span>tests</span>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default function Triptych() {
	return (
		<section className={s.triptych}>
			<div className={s.triptychIn}>
				<Reveal className={s.triptychHead}>
					<span className={s.over} style={{ display: 'inline-block', marginBottom: 20 }}>
						§ platform
					</span>
					<h2 className={s.h2}>
						The platform that
						<br />
						<em>stays in the room.</em>
					</h2>
					<p className={s.lede} style={{ marginTop: 24 }}>
						Every artifact — signal, spec, ticket, PR — lives on the same
						graph. Humans and agents read and write the same room.
					</p>
				</Reveal>
				<div className={s.triptychGrid}>
					<Reveal delay={0} className={s.tripCell}>
						<span className={s.tripN}>01 · communication</span>
						<h3>
							Signals become <em>working context.</em>
						</h3>
						<p>
							Requests, customer notes, research, and internal discussion all
							enter the same stream. Nothing needs to be copied into a second
							system before the work can start.
						</p>
						<IntakeVisualization />
					</Reveal>

					<Reveal delay={80} className={s.tripCell}>
						<span className={s.tripN}>02 · agent roles</span>
						<h3>
							Agents act with <em>named responsibility.</em>
						</h3>
						<p>
							Instead of one generic assistant,{' '}
							<span className={s.mono} style={{ color: 'var(--acc)' }}>
								@spec
							</span>
							, <span className={s.mono}>@eng</span> and{' '}
							<span className={s.mono}>@review</span> keep clear roles, memory,
							and queues. You know who is drafting, questioning, or blocking a
							change at any moment.
						</p>
						<RoleVisualization />
					</Reveal>

					<Reveal delay={160} className={s.tripCell}>
						<span className={s.tripN}>03 · continuous artifact</span>
						<h3>
							One context. Thread to spec
							<br />
							to PR — <em>all linked.</em>
						</h3>
						<p>
							The same context follows the work all the way through. No
							retyping the brief. No drifting acceptance criteria. No lost
							rationale when the PR lands for review.
						</p>
						<ChainVisualization />
					</Reveal>
				</div>
			</div>
		</section>
	)
}
