'use client'

import s from './home.module.css'
import Reveal from './reveal'

const NODES = [
	{
		label: 'Intake',
		sub: 'thread, call, note, alert',
		meta: 'capture',
		type: 'human',
	},
	{
		label: 'Plan',
		sub: '@spec drafts acceptance and open questions',
		meta: 'structure',
		type: 'agent-spec',
	},
	{
		label: 'Build',
		sub: '@eng opens worktree and proposes the change',
		meta: 'execute',
		type: 'artifact',
	},
	{
		label: 'Review',
		sub: '@review checks intent, risk, and regressions',
		meta: 'verify',
		type: 'agent-eng',
	},
	{
		label: 'Ship',
		sub: 'PR, release note, and rationale stay linked',
		meta: 'artifact',
		type: 'artifact',
	},
] as const

export default function Flow() {
	return (
		<section className={s.flow} id="workflow">
			<div className={s.flowIn}>
				<Reveal className={s.flowHead}>
					<span className={s.over}>§ workflow</span>
					<p className={s.flowSub}>
						One operating loop for product work — from first signal to{' '}
						<em>shipped change.</em>
					</p>
				</Reveal>
				<Reveal delay={120}>
					<div className={s.flowShell}>
						<div className={s.flowTop}>
							<span>intake → plan → build → review → ship</span>
							<span>humans, agents, and artifacts stay linked</span>
						</div>
						<div className={s.flowRail} aria-hidden="true" />
						<div className={s.flowTrack}>
							{NODES.map((node, i) => (
								<div key={node.label} className={s.flowStep}>
									<div
										className={`${s.flowNode} ${
											i === 1 ? s.flowNodeActive : ''
										} ${
											node.type === 'agent-spec'
												? s.flowNodeSpec
												: node.type === 'agent-eng'
													? s.flowNodeEng
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
