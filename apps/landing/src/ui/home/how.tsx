import s from './home.module.css'
import Reveal from './reveal'

const STEPS = [
	{
		title: 'Human review stays central',
		desc: (
			<>
				Agents draft, propose, and queue — but humans own the call.
				Comment, request changes, approve, merge. The decision stays yours.
			</>
		),
	},
	{
		title: 'Every action has a trail',
		desc: 'Specs, diffs, and agent decisions stay attributable and reviewable. The rationale survives the sprint, not just the outcome.',
	},
	{
		title: 'Bring your own keys',
		desc: (
			<>
				Run on your model providers with your API keys, or use managed
				credits when that is faster. The control plane stays yours.
			</>
		),
	},
	{
		title: 'Deploy where you need it',
		desc: 'Start local-first on Mac, then expand to dedicated environments, VPCs, or on-prem setups as security requirements grow.',
	},
]

export default function How() {
	return (
		<section className={s.how}>
			<div className={s.howIn}>
				<div className={s.howLayout}>
					<Reveal className={s.howLeft}>
						<span className={s.over} style={{ display: 'inline-block' }}>
							§ trust and control
						</span>
						<h2 className={s.h2} style={{ textWrap: 'balance', marginTop: 20 }}>
							Enterprise discipline.
							<br />
							<em>Built into the loop.</em>
						</h2>
						<p className={s.lede}>
							Altr gives teams control over every decision an agent makes —
							not just oversight of the output.
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
