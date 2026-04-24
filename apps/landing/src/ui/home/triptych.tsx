'use client'

import { motion } from 'motion/react'
import s from './home.module.css'
import Reveal from './reveal'

const PREVIEW_EASE = [0.2, 0, 0.2, 1] as const

function SceneChrome({
	label,
	status,
}: {
	label: string
	status: string
}) {
	return (
		<div className={s.sceneBar} aria-hidden="true">
			<div className={s.sceneDots}>
				<span />
				<span />
				<span />
			</div>
			<span className={s.sceneLabel}>{label}</span>
			<span className={s.sceneState}>{status}</span>
		</div>
	)
}

function IntakeVisualization() {
	return (
		<div className={`${s.tripIll} ${s.intakeScene}`} aria-hidden="true">
			<SceneChrome label="Room Intake" status="context retained" />
			<div className={s.sceneGrid} />
			<div className={s.sceneGlow} />
			<div className={s.intakeStack}>
				<div className={`${s.intakeCard} ${s.intakeCardSource}`}>
					<span className={s.intakeMeta}>incoming signal</span>
					<strong>customer call</strong>
					<p>handoff confusion between spec, eng, and review ownership</p>
				</div>
				<div className={s.intakeColumn}>
					<span className={s.intakeChip}>transcript</span>
					<span className={s.intakeChip}>note</span>
					<span className={s.intakeChip}>research</span>
				</div>
				<div className={s.intakeSpine}>
					<motion.div
						className={s.intakePulse}
						animate={{ top: ['10%', '82%'] }}
						transition={{ duration: 6.2, repeat: Infinity, ease: PREVIEW_EASE }}
					/>
				</div>
				<div className={`${s.intakeCard} ${s.intakeCardThread}`}>
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
				</div>
			</div>
		</div>
	)
}

function RoleVisualization() {
	return (
		<div className={`${s.tripIll} ${s.roleScene}`} aria-hidden="true">
			<SceneChrome label="Agent Lanes" status="named responsibility" />
			<div className={s.sceneGrid} />
			<div className={s.roleShell}>
				<div className={s.roleSignal}>
					incoming change
				</div>
				<div className={s.roleBoard}>
					<div className={s.roleHeader}>orchestration lanes</div>
					<div className={s.roleLanes}>
						<div className={s.roleLane}>
							<span className={`${s.roleChip} ${s.roleChipSpec}`}>@spec</span>
							<div className={s.roleTrack}>
								<motion.div
									className={`${s.roleBlock} ${s.roleBlockSpec}`}
									animate={{ x: [0, 4, 0] }}
									transition={{ duration: 7.2, repeat: Infinity, ease: PREVIEW_EASE }}
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
									animate={{ x: [0, 4, 0] }}
									transition={{
										duration: 7.2,
										repeat: Infinity,
										ease: PREVIEW_EASE,
										delay: 1.8,
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
									animate={{ x: [0, 4, 0] }}
									transition={{
										duration: 7.2,
										repeat: Infinity,
										ease: PREVIEW_EASE,
										delay: 3.6,
									}}
								>
									check risk
								</motion.div>
							</div>
						</div>
					</div>
				</div>
				<div className={s.roleStatusStack}>
					<div className={s.roleStatus}>
						<b>spec</b>
						<span>owns acceptance</span>
					</div>
					<div className={s.roleStatus}>
						<b>eng</b>
						<span>holds delivery</span>
					</div>
					<div className={s.roleStatus}>
						<b>review</b>
						<span>blocks regressions</span>
					</div>
				</div>
			</div>
		</div>
	)
}

function ChainVisualization() {
	return (
		<div className={`${s.tripIll} ${s.chainScene}`} aria-hidden="true">
			<SceneChrome label="Artifact Trail" status="thread → spec → pr" />
			<div className={s.sceneGrid} />
			<div className={s.chainShell}>
				<div className={s.chainLine}>
					<div className={s.chainNode}>
						<span>thread</span>
						<strong>incident context</strong>
					</div>
					<div className={s.chainConnector}>
						<motion.div
							className={s.chainPulse}
							animate={{ left: ['8%', '82%'] }}
							transition={{ duration: 6.8, repeat: Infinity, ease: PREVIEW_EASE }}
						/>
					</div>
					<div className={`${s.chainNode} ${s.chainNodeAccent}`}>
						<span>spec</span>
						<strong>acceptance locked</strong>
					</div>
				</div>
				<div className={s.chainDock}>
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
				</div>
			</div>
		</div>
	)
}

export default function Triptych() {
	return (
		<section className={s.triptych} id="context">
			<div className={s.triptychIn}>
				<Reveal className={s.triptychHead}>
					<span className={s.over} style={{ display: 'inline-block', marginBottom: 20 }}>
						§ connected context
					</span>
					<h2 className={s.h2}>
						The context that
						<br />
						<em>stays attached.</em>
					</h2>
					<p className={s.lede} style={{ marginTop: 24 }}>
						Signal, assignment, and artifact stay linked through every stage
						of the work — captured once, carried all the way through.
					</p>
				</Reveal>
				<div className={s.triptychGrid}>
					<Reveal delay={0} className={s.tripCell}>
						<span className={s.tripN}>01 · capture</span>
						<h3>
							Signals become <em>working context.</em>
						</h3>
						<p>
							Requests, notes, customer calls, and internal discussion enter the
							same room first. Work starts from the original signal, not from a
							summary pasted somewhere else.
						</p>
						<IntakeVisualization />
					</Reveal>

					<Reveal delay={80} className={s.tripCell}>
						<span className={s.tripN}>02 · assign</span>
						<h3>
							Responsibility is <em>named and visible.</em>
						</h3>
						<p>
							Instead of one generic assistant,{' '}
							<span className={s.mono} style={{ color: 'var(--acc)' }}>
								@spec
							</span>
							, <span className={s.mono}>@eng</span> and{' '}
							<span className={s.mono}>@review</span> keep separate queues and
							clear responsibilities. You can see who is structuring, building,
							or blocking the work at any moment.
						</p>
						<RoleVisualization />
					</Reveal>

					<Reveal delay={160} className={s.tripCell}>
						<span className={s.tripN}>03 · carry</span>
						<h3>
							Thread to spec to PR.
							<br />
							<em>One continuous trail.</em>
						</h3>
						<p>
							The same context follows the work all the way through. Acceptance
							criteria do not drift, review has the original rationale, and the
							PR lands with the full trail attached.
						</p>
						<ChainVisualization />
					</Reveal>
				</div>
			</div>
		</section>
	)
}
