'use client'

import { motion } from 'motion/react'
import s from './home.module.css'
import Reveal from './reveal'

function IntakeVisualization() {
	return (
		<div className={`${s.tripIll} ${s.intakeScene}`} aria-hidden="true">
			<div className={s.sceneGrid} />
			<div className={s.sceneGlow} />
			<div className={s.intakeStack}>
				<motion.div
					className={`${s.intakeCard} ${s.intakeCardSource}`}
					animate={{ y: [0, -2, 0], rotate: [-0.8, -0.4, -0.8] }}
					transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
				>
					<span className={s.intakeMeta}>incoming signal</span>
					<strong>customer call</strong>
					<p>handoff confusion between spec, eng, and review ownership</p>
				</motion.div>
				<div className={s.intakeColumn}>
					<motion.span
						className={s.intakeChip}
						animate={{ x: [0, 3, 0] }}
						transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
					>
						transcript
					</motion.span>
					<motion.span
						className={s.intakeChip}
						animate={{ x: [0, 3, 0] }}
						transition={{
							duration: 4.6,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: 0.45,
						}}
					>
						note
					</motion.span>
					<motion.span
						className={s.intakeChip}
						animate={{ x: [0, 3, 0] }}
						transition={{
							duration: 4.6,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: 0.9,
						}}
					>
						research
					</motion.span>
				</div>
				<div className={s.intakeSpine}>
					<motion.div
						className={s.intakePulse}
						animate={{ top: ['8%', '84%'] }}
						transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
					/>
				</div>
				<motion.div
					className={`${s.intakeCard} ${s.intakeCardThread}`}
					animate={{
						boxShadow: [
							'0 10px 24px rgba(17, 24, 18, 0.05)',
							'0 14px 28px rgba(141, 182, 84, 0.08)',
							'0 10px 24px rgba(17, 24, 18, 0.05)',
						],
					}}
					transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
				>
					<div className={s.intakeThreadHead}>
						<span>room thread</span>
						<b>live</b>
					</div>
					<div className={s.intakeThreadList}>
						<div>
							<strong>signal attached</strong>
							<span>source preserved</span>
						</div>
						<div>
							<strong>owners named</strong>
							<span>spec, eng, review</span>
						</div>
						<div>
							<strong>context retained</strong>
							<span>travels with the work</span>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

function RoleVisualization() {
	return (
		<div className={`${s.tripIll} ${s.roleScene}`} aria-hidden="true">
			<div className={s.sceneGrid} />
			<div className={s.roleShell}>
				<motion.div
					className={s.roleSignal}
					animate={{ x: [0, 8, 0], opacity: [0.86, 1, 0.86] }}
					transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
				>
					incoming change
				</motion.div>
				<div className={s.roleBoard}>
					<div className={s.roleHeader}>orchestration lanes</div>
					<div className={s.roleLanes}>
						<div className={s.roleLane}>
							<span className={`${s.roleChip} ${s.roleChipSpec}`}>@spec</span>
							<div className={s.roleTrack}>
								<motion.div
									className={`${s.roleBlock} ${s.roleBlockSpec}`}
									animate={{ x: [0, 10, 0] }}
									transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
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
									animate={{ x: [0, 12, 0] }}
									transition={{
										duration: 5.8,
										repeat: Infinity,
										ease: 'easeInOut',
										delay: 0.35,
									}}
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
									transition={{
										duration: 5.4,
										repeat: Infinity,
										ease: 'easeInOut',
										delay: 0.7,
									}}
								>
									check risk
								</motion.div>
							</div>
						</div>
					</div>
				</div>
				<div className={s.roleStatusStack}>
					<motion.div
						className={s.roleStatus}
						animate={{ y: [0, -2, 0] }}
						transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
					>
						<b>spec</b>
						<span>owns acceptance</span>
					</motion.div>
					<motion.div
						className={s.roleStatus}
						animate={{ y: [0, -2, 0] }}
						transition={{
							duration: 4.8,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: 0.5,
						}}
					>
						<b>eng</b>
						<span>holds delivery</span>
					</motion.div>
					<motion.div
						className={s.roleStatus}
						animate={{ y: [0, -2, 0] }}
						transition={{
							duration: 4.8,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: 1,
						}}
					>
						<b>review</b>
						<span>blocks regressions</span>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

function ChainVisualization() {
	return (
		<div className={`${s.tripIll} ${s.chainScene}`} aria-hidden="true">
			<div className={s.sceneGrid} />
			<div className={s.chainShell}>
				<div className={s.chainLine}>
					<motion.div
						className={s.chainNode}
						animate={{ y: [0, -2, 0] }}
						transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
					>
						<span>thread</span>
						<strong>incident context</strong>
					</motion.div>
					<div className={s.chainConnector}>
						<motion.div
							className={s.chainPulse}
							animate={{ left: ['4%', '86%'] }}
							transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
						/>
					</div>
					<motion.div
						className={`${s.chainNode} ${s.chainNodeAccent}`}
						animate={{ y: [0, -2, 0] }}
						transition={{
							duration: 5.2,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: 0.45,
						}}
					>
						<span>spec</span>
						<strong>acceptance locked</strong>
					</motion.div>
				</div>
				<motion.div
					className={s.chainDock}
					animate={{ y: [0, -2, 0] }}
					transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
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
							<span>review</span>
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
