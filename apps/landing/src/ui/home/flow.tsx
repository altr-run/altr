'use client'

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
		sub: 'acceptance criteria drafted, open questions flagged',
		meta: 'structure',
		type: 'agent-spec',
	},
	{
		label: 'Build',
		sub: 'worktree opened, change proposed with criteria attached',
		meta: 'execute',
		type: 'artifact',
	},
	{
		label: 'Review',
		sub: 'intent, risk, and regressions checked before merge',
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
		<section
			className="py-20 px-8 border-b border-line bg-bg overflow-hidden"
			id="workflow"
		>
			<div className="inner">
				<Reveal className="flex items-baseline gap-6 mb-10">
					<span className="over">workflow</span>
					<p
						className="font-serif text-[19px] text-ink-2 m-0 tracking-[-0.01em]"
						style={{ fontFamily: 'var(--f-serif)' }}
					>
						One operating loop for product work — from first signal to{' '}
						<em>shipped change.</em>
					</p>
				</Reveal>
				<Reveal delay={120}>
					<div
						className="relative p-[28px_30px] rounded-[28px] border overflow-hidden"
						style={{
							borderColor: 'color-mix(in oklab, var(--line) 84%, transparent)',
							background:
								'radial-gradient(70% 120% at 0% 0%, color-mix(in oklab, var(--acc-soft) 28%, white) 0%, transparent 48%), linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,248,248,0.98) 100%)',
							boxShadow: '0 12px 28px rgba(17,24,18,0.045)',
						}}
					>
						{/* flowTop */}
						<div
							className="flex items-center justify-between gap-4 mb-[26px] font-mono text-[10px] tracking-[0.12em] uppercase text-ink-4"
							style={{ fontFamily: 'var(--f-mono)' }}
						>
							<span>intake → plan → build → review → ship</span>
							<span>humans, agents, and artifacts stay linked</span>
						</div>

						{/* flowRail */}
						<div
							className="absolute left-[60px] right-[60px] top-[102px] h-px z-0"
							style={{
								background:
									'color-mix(in oklab, var(--acc) 28%, var(--line))',
							}}
							aria-hidden="true"
						/>

						{/* flowTrack */}
						<div
							className="flex items-center overflow-x-auto relative z-[1] pb-1"
							style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
						>
							{NODES.map((node, i) => {
								const isActive = i === 1
								const isSpec = node.type === 'agent-spec'
								const isEng = node.type === 'agent-eng'
								const isArtifact = node.type === 'artifact'

								let nodeStyle: React.CSSProperties = {
									background: 'rgba(255,255,255,0.92)',
									boxShadow:
										'0 6px 14px rgba(17,24,18,0.035), inset 0 1px 0 rgba(255,255,255,0.88)',
									borderColor: 'var(--line)',
								}

								if (isActive) {
									nodeStyle = {
										...nodeStyle,
										borderColor:
											'color-mix(in oklab, var(--acc) 32%, var(--line))',
										boxShadow:
											'0 10px 24px rgba(17,24,18,0.055), 0 0 0 1px color-mix(in oklab, var(--acc) 12%, transparent), inset 0 1px 0 rgba(255,255,255,0.9)',
									}
								}

								if (isSpec) {
									nodeStyle = {
										...nodeStyle,
										background:
											'linear-gradient(135deg, var(--acc-soft) 0%, var(--bg) 60%)',
										borderColor:
											'color-mix(in oklab, var(--acc) 28%, var(--line))',
									}
								} else if (isEng) {
									nodeStyle = {
										...nodeStyle,
										background:
											'linear-gradient(135deg, rgba(26,26,26,0.04) 0%, var(--bg) 60%)',
										borderColor: 'var(--line-2)',
									}
								} else if (isArtifact) {
									nodeStyle = {
										...nodeStyle,
										background: 'var(--surface)',
									}
								}

								return (
									<div
										key={node.label}
										className="flex items-center gap-3 flex-shrink-0"
										style={{ scrollSnapAlign: 'center' }}
									>
										<div
											className="flex flex-col gap-[7px] p-[18px_20px] rounded-[18px] border min-w-[176px] min-h-[118px] transition-all"
											style={nodeStyle}
										>
											<span
												className="font-mono text-[10px] uppercase tracking-widest text-ink-4"
												style={{ fontFamily: 'var(--f-mono)' }}
											>
												{node.meta}
											</span>
											<span
												className="font-sans font-semibold text-[15px] text-ink tracking-tight"
												style={{ fontFamily: 'var(--f-sans)' }}
											>
												{node.label}
											</span>
											<span className="text-[12px] text-ink-3 leading-relaxed">
												{node.sub}
											</span>
										</div>
										{i < NODES.length - 1 && (
											<div
												className="flex items-center text-ink-4"
												aria-hidden="true"
											>
												<svg
													width="28"
													height="12"
													viewBox="0 0 28 12"
													fill="none"
												>
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
								)
							})}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
