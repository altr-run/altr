import s from './home.module.css'
import Reveal from './reveal'

const STEPS = [
	{
		title: 'Open a thread',
		desc: (
			<>
				Start the way you always do — a rough idea, a Slack-style thread.
				Mention{' '}
				<span className={s.mono} style={{ color: 'var(--acc)' }}>
					@spec
				</span>
				.
			</>
		),
	},
	{
		title: 'Structure the spec',
		desc: '@spec turns the thread into AC, open questions, and owner callouts. You edit; they follow.',
	},
	{
		title: 'Draft the PR',
		desc: (
			<>
				<span className={s.mono} style={{ color: 'var(--ink)' }}>
					@eng
				</span>{' '}
				opens a branch, plans the work, and drafts the diff — with tests.
			</>
		),
	},
	{
		title: 'Review & ship',
		desc: "You review like any teammate's PR. Comment, request changes, merge. The loop closes.",
	},
]

export default function How() {
	return (
		<section className={s.how}>
			<div className={s.howIn}>
				<Reveal className={s.howHead}>
					<span className={s.over} style={{ display: 'inline-block', marginBottom: 20 }}>
						§ 02 · how it works
					</span>
					<h2 className={s.h2} style={{ textWrap: 'balance' }}>
						Five minutes from <em>idea</em>
						<br />
						to <em>draft PR.</em>
					</h2>
				</Reveal>
				<Reveal>
					<div className={s.howGrid}>
						{STEPS.map((step, i) => (
							<div className={s.howCell} key={i}>
								<div className={s.howNum}>
									{String(i + 1).padStart(2, '0')}
								</div>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	)
}
