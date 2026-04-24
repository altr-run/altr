'use client'

import { motion } from 'motion/react'
import s from './home.module.css'
import Reveal from './reveal'

const NODES = [
	{
		label: 'Signal',
		sub: 'request, note, idea',
		meta: 'human input',
		type: 'human',
	},
	{
		label: '@spec',
		sub: 'reads thread, drafts brief',
		meta: 'agent',
		type: 'agent-spec',
	},
	{
		label: 'Spec',
		sub: 'criteria, open questions',
		meta: 'artifact',
		type: 'artifact',
	},
	{
		label: '@eng',
		sub: 'opens worktree, ships change',
		meta: 'agent',
		type: 'agent-eng',
	},
	{
		label: 'PR #142',
		sub: 'context trail attached',
		meta: 'artifact',
		type: 'artifact',
	},
	{
		label: 'Merged',
		sub: 'decision and diff intact',
		meta: 'outcome',
		type: 'done',
	},
] as const

export default function Flow() {
	return (
		<section className={s.flow}>
			<div className={s.flowIn}>
				<Reveal className={s.flowHead}>
					<span className={s.over}>§ the loop</span>
					<p className={s.flowSub}>
						From first signal to shipped change —{' '}
						<em>without leaving the room.</em>
					</p>
				</Reveal>
				<Reveal delay={120}>
					<div className={s.flowShell}>
						<div className={s.flowRail} aria-hidden="true" />
						<motion.div
							className={s.flowRailPulse}
							animate={{ left: ['2%', '94%'] }}
							transition={{ duration: 6.8, repeat: Infinity, ease: 'linear' }}
						/>
						<div className={s.flowTrack}>
							{NODES.map((node, i) => (
								<div key={node.label} className={s.flowStep}>
									<div
										className={`${s.flowNode} ${
											node.type === 'agent-spec'
												? s.flowNodeSpec
												: node.type === 'agent-eng'
													? s.flowNodeEng
													: node.type === 'done'
														? s.flowNodeDone
														: node.type === 'artifact'
															? s.flowNodeArtifact
															: ''
										}`}
									>
										<span className={s.flowNodeMeta}>{node.meta}</span>
										<span className={s.flowNodeLabel}>{node.label}</span>
										<span className={s.flowNodeSub}>{node.sub}</span>
									</div>
									{i < NODES.length - 1 && (
										<div className={s.flowArrow} aria-hidden="true">
											<svg width="28" height="12" viewBox="0 0 28 12" fill="none">
												<path
													d="M0 6h22M22 6l-5-5M22 6l-5 5"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
