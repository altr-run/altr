import s from './home.module.css'
import Reveal from './reveal'

const STEPS = [
	{
		title: 'Human review stays central',
		desc: (
			<>
				Agents can draft, propose, and queue work, but humans still own
				the decision to comment, request changes, approve, and merge.
			</>
		),
	},
	{
		title: 'Every action has a trail',
		desc: 'Specs, comments, diffs, and agent decisions remain attributable and reviewable. The rationale survives the sprint.',
	},
	{
		title: 'Bring your own keys',
		desc: (
			<>
				Run Altr on your stack with your model providers, or use managed
				credits when that is faster. The control plane stays yours.
			</>
		),
	},
	{
		title: 'Deploy where you need it',
		desc: 'Start local-first on Mac, then expand to dedicated environments, VPCs, or on-prem setups as security requirements tighten.',
	},
]

export default function How() {
	return (
		<section className={s.how}>
			<div className={s.howIn}>
				<Reveal className={s.howHead}>
					<span className={s.over} style={{ display: 'inline-block', marginBottom: 20 }}>
						§ trust and control
					</span>
					<h2 className={s.h2} style={{ textWrap: 'balance' }}>
						Enterprise discipline.
						<br />
						<em>Built into the loop.</em>
					</h2>
				</Reveal>
				<div className={s.howGrid}>
					{STEPS.map((step, i) => (
						<Reveal key={i} delay={i * 80} className={s.howCell}>
							<div className={s.howNum}>
								{String(i + 1).padStart(2, '0')}
							</div>
							<h3>{step.title}</h3>
							<p>{step.desc}</p>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
