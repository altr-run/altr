import s from './home.module.css'
import Reveal from './reveal'

export default function Triptych() {
	return (
		<section className={s.triptych}>
			<div className={s.triptychIn}>
				<Reveal className={s.triptychHead}>
					<span className={s.over} style={{ display: 'inline-block', marginBottom: 20 }}>
						§ platform
					</span>
					<h2 className={s.h2}>
						One workspace.
						<br />
						Three <em>system layers.</em>
					</h2>
				</Reveal>
				<div className={s.triptychGrid}>
					<Reveal delay={0} className={s.tripCell}>
						<span className={s.tripN}>01 · communication</span>
						<h3>
							Signals become <em>working context.</em>
						</h3>
						<p>
							Requests, customer notes, research, and internal
							discussion all enter the same stream. Nothing
							needs to be copied into a second system before
							the work can start.
						</p>
						<div className={`${s.tripIll} ${s.illSpec}`} aria-hidden="true">
							<div className={`${s.illCard} ${s.illCardLeft}`}>
								<b>request</b>
								<br />
								call transcript
							</div>
							<div className={s.illArr}>→</div>
							<div className={`${s.illCard} ${s.illCardRight}`}>
								<b>thread</b>
								<br />
								owners aligned
							</div>
						</div>
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
							,{' '}
							<span className={s.mono} style={{ color: 'var(--ink)' }}>
								@eng
							</span>{' '}
							and{' '}
							<span className={s.mono} style={{ color: 'var(--ink)' }}>
								@review
							</span>{' '}
							keep clear roles, memory, and queues. You know
							who is drafting, questioning, or blocking a
							change at any moment.
						</p>
						<div className={`${s.tripIll} ${s.illPar}`} aria-hidden="true">
							<svg viewBox="0 0 260 140" preserveAspectRatio="none">
								<g fill="none" stroke="var(--ink-4)" strokeWidth="1.5" strokeLinecap="round">
									<line x1="20" y1="70" x2="100" y2="70" />
									<path d="M100 70 Q 120 70 130 40 L 240 40" />
									<path d="M100 70 Q 120 70 130 70 L 240 70" />
									<path d="M100 70 Q 120 70 130 100 L 240 100" />
								</g>
								<circle cx="20" cy="70" r="4" fill="var(--acc)" />
								<circle cx="240" cy="40" r="4" fill="var(--ink)" />
								<circle cx="240" cy="70" r="4" fill="var(--ink)" />
								<circle cx="240" cy="100" r="4" fill="var(--ink)" />
								<text x="96" y="62" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)">signal</text>
								<text x="248" y="42" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)">spec</text>
								<text x="248" y="72" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)">eng</text>
								<text x="248" y="102" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)">review</text>
							</svg>
						</div>
					</Reveal>

					<Reveal delay={160} className={s.tripCell}>
						<span className={s.tripN}>03 · continuous artifact</span>
						<h3>
							The thread, spec, and PR stay <em>linked.</em>
						</h3>
						<p>
							The important shift is structural: the same
							context follows the work all the way through. No
							retyping the brief. No drifting acceptance
							criteria. No lost rationale in review.
						</p>
						<div className={`${s.tripIll} ${s.illCur}`} aria-hidden="true">
							<div className={`${s.illBubble} ${s.illBubbleLeft}`}>
								spec approved
							</div>
							<div className={s.illCursor} />
							<div className={`${s.illBubble} ${s.illBubbleRight}`}>
								<span className={s.mono} style={{ color: 'var(--acc)' }}>
									pr
								</span>{' '}
								still attached
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	)
}
