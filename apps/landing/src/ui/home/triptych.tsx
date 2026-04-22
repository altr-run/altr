import s from './home.module.css'
import Reveal from './reveal'

export default function Triptych() {
	return (
		<section className={s.triptych}>
			<div className={s.triptychIn}>
				<Reveal className={s.triptychHead}>
					<span className={s.over} style={{ display: 'inline-block', marginBottom: 20 }}>
						§ 01 · how it works
					</span>
					<h2 className={s.h2}>
						Three moves that <em>change the loop.</em>
					</h2>
				</Reveal>
				<Reveal>
					<div className={s.triptychGrid}>
						<div className={s.tripCell}>
							<span className={s.tripN}>01 · spec</span>
							<h3>
								A spec is a <em>teammate,</em> not a doc.
							</h3>
							<p>
								Every spec has an owner named{' '}
								<span className={s.mono} style={{ color: 'var(--acc)' }}>
									@spec
								</span>
								. They attend the thread, ask the hard questions, and
								keep the AC honest as the work moves.
							</p>
							<div className={`${s.tripIll} ${s.illSpec}`} aria-hidden="true">
								<div className={`${s.illCard} ${s.illCardLeft}`}>
									<b>spec.md</b>
									<br />
									draft · 2 AC
								</div>
								<div className={s.illArr}>→</div>
								<div className={`${s.illCard} ${s.illCardRight}`}>
									<b>PR #142</b>
									<br />
									ready · 4 files
								</div>
							</div>
						</div>

						<div className={s.tripCell}>
							<span className={s.tripN}>02 · eng</span>
							<h3>
								PRs draft themselves <em>— you review.</em>
							</h3>
							<p>
								When a spec is ready,{' '}
								<span className={s.mono} style={{ color: 'var(--ink)' }}>
									@eng
								</span>{' '}
								opens the PR in parallel worktrees. You decide which
								ones land. Your IDE, your keys, your code.
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
									<text x="100" y="62" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)">spec</text>
									<text x="248" y="42" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)">PR#a</text>
									<text x="248" y="72" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)">PR#b</text>
									<text x="248" y="102" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)">PR#c</text>
								</svg>
							</div>
						</div>

						<div className={s.tripCell}>
							<span className={s.tripN}>03 · together</span>
							<h3>
								The agents work <em>alongside you.</em>
							</h3>
							<p>
								No dashboards, no prompt boxes. Mention an agent in a
								thread, a spec, or a PR comment. They show up the way a
								coworker would — with context.
							</p>
							<div className={`${s.tripIll} ${s.illCur}`} aria-hidden="true">
								<div className={`${s.illBubble} ${s.illBubbleLeft}`}>
									ship it when it&apos;s ready
								</div>
								<div className={s.illCursor} />
								<div className={`${s.illBubble} ${s.illBubbleRight}`}>
									<span className={s.mono} style={{ color: 'var(--acc)' }}>
										@eng
									</span>{' '}
									on it
								</div>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
