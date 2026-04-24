import s from './home.module.css'
import Reveal from './reveal'

const CASES = [
	{
		label: '01 · feature delivery',
		title: 'Turn rough requests into reviewable change.',
		body: 'Pull a thread, meeting note, or customer call into the room. Draft acceptance criteria, assign owners, and keep the rationale attached through review.',
		items: ['thread → spec → PR', 'acceptance stays attached', 'status answers on demand'],
	},
	{
		label: '02 · bug triage',
		title: 'Move from report to owner without losing the signal.',
		body: 'Capture bug reports from Slack, support, or monitoring, structure the issue, and route it with the evidence intact.',
		items: ['triage incoming reports', 'attach logs and repro notes', 'assign owner and severity'],
	},
	{
		label: '03 · migrations',
		title: 'Break large refactors into supervised agent work.',
		body: 'Use role agents to plan repetitive modernization work, open focused tasks, and keep human review on every branch.',
		items: ['parallel subtasks', 'repeatable migration plans', 'approval before merge'],
	},
	{
		label: '04 · PR review',
		title: 'Review against intent, not just diff shape.',
		body: 'The spec, open questions, and prior decisions travel with the code so review happens against the original goal.',
		items: ['intent-aware review', 'regression and risk checks', 'missing AC surfaced early'],
	},
	{
		label: '05 · release follow-through',
		title: 'Close the loop after the code lands.',
		body: 'Draft release notes, update docs, and answer “what changed?” from the same execution trail.',
		items: ['release notes drafted', 'docs updated from merged work', 'answers from the full trail'],
	},
	{
		label: '06 · incident follow-up',
		title: 'Carry incident context into the actual fix.',
		body: 'Move from noisy incident room to scoped implementation work without rebuilding the timeline in a second system.',
		items: ['incident thread retained', 'fix plan linked to evidence', 'postmortem trail preserved'],
	},
] as const

export default function UseCases() {
	return (
		<section className={s.useCases} id="use-cases">
			<div className={s.useCasesIn}>
				<Reveal className={s.useCasesHead}>
					<div>
						<span
							className={s.over}
							style={{ display: 'inline-block', marginBottom: 16 }}
						>
							§ use cases
						</span>
						<h2 className={s.h2}>
							Workflows teams already
							<br />
							<em>run every week.</em>
						</h2>
					</div>
					<p className={s.lede}>
						Start with a workflow you already own: feature delivery, bug triage,
						refactors, review, release, or incident follow-through. Altr is
						meant to remove reconstruction work, not create a new ritual.
					</p>
				</Reveal>
				<div className={s.useCasesGrid}>
					{CASES.map((item, index) => (
						<Reveal key={item.label} delay={index * 70} className={s.useCaseCard}>
							<div className={s.useCaseLabel}>{item.label}</div>
							<h3 className={s.useCaseTitle}>{item.title}</h3>
							<p className={s.useCaseBody}>{item.body}</p>
							<ul className={s.useCaseList}>
								{item.items.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
