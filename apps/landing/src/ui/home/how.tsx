import s from './home.module.css'
import Reveal from './reveal'

const STEPS = [
	{
		title: 'Capture — so nothing gets lost before it starts',
		desc: 'Pulls threads, calls, notes, and alerts into the trail. Engineering starts from the original signal, not a second-hand retelling.',
	},
	{
		title: 'Plan — so building never starts on assumptions',
		desc: 'Locks acceptance criteria, flags unresolved decisions, and hands off a reviewable spec. No more discovering the goal mid-PR.',
	},
	{
		title: 'Build — so implementation stays tethered to intent',
		desc: 'Opens the worktree, proposes steps, and drafts changes with the original criteria still attached — visible to every reviewer.',
	},
	{
		title: 'Review — so merge is a decision, not a gamble',
		desc: 'Checks the diff against the original goal, flags regressions and missing criteria, and surfaces risk before it becomes a rollback.',
	},
]

export default function How() {
	return (
		<section className={s.how} id="agents">
			<div className={s.howIn}>
				<div className={s.howLayout}>
					<Reveal className={s.howLeft}>
						<span className={s.over} style={{ display: 'inline-block' }}>
							§ how it works
						</span>
						<h2 className={s.h2} style={{ textWrap: 'balance', marginTop: 20 }}>
							Four stages.
							<br />
							<em>One unbroken trail.</em>
						</h2>
						<p className={s.lede}>
							Each stage has a clear job and a visible handoff. No
							reconstruction work, no re-explaining the goal — the context
							travels with the work from first request to merged diff.
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
