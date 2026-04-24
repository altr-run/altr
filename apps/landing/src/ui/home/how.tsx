import s from './home.module.css'
import Reveal from './reveal'

const STEPS = [
	{
		title: '@intake turns raw signals into working input',
		desc: (
			<>
				Pulls in threads, calls, notes, and alerts so the room starts with
				the original signal instead of a second-hand summary.
			</>
		),
	},
	{
		title: '@spec drafts acceptance and open questions',
		desc: 'Transforms messy requests into reviewable specs, preserves unresolved decisions, and prepares the work for engineering instead of just summarizing it.',
	},
	{
		title: '@eng plans and executes the change',
		desc: (
			<>
				Opens the worktree, proposes implementation steps, and drafts code
				changes with the original criteria still attached.
			</>
		),
	},
	{
		title: '@review checks the work against intent',
		desc: 'Looks for regressions, missing acceptance criteria, and risky assumptions so review happens against the original goal, not just the diff.',
	},
]

export default function How() {
	return (
		<section className={s.how} id="agents">
			<div className={s.howIn}>
				<div className={s.howLayout}>
					<Reveal className={s.howLeft}>
						<span className={s.over} style={{ display: 'inline-block' }}>
							§ role agents
						</span>
						<h2 className={s.h2} style={{ textWrap: 'balance', marginTop: 20 }}>
							Named agents for each
							<br />
							<em>stage of the loop.</em>
						</h2>
						<p className={s.lede}>
							Instead of one generic assistant, each role has a named
							responsibility, a distinct queue, and a visible handoff to the
							next stage. You always know who owns what.
						</p>
					</Reveal>
					<div className={s.howSteps}>
						{STEPS.map((step, i) => (
							<Reveal key={i} delay={i * 80} className={s.howStep}>
								<div className={s.howStepNum}>
									{String(i + 1).padStart(2, '0')}
								</div>
								<div className={s.howStepContent}>
									<h3>{step.title}</h3>
									<p>{step.desc}</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
