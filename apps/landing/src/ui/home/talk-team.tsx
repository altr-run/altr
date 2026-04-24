import s from './home.module.css'
import Reveal from './reveal'

const POINTS = [
	'Workflow mapping for intake, planning, build, review, and release',
	'Integration scoping for Slack, GitHub, Linear, docs, and monitoring',
	'Security, procurement, and rollout handled with engineering and IT leads',
]

export default function TalkTeam() {
	return (
		<section className={s.contact} id="contact">
			<div className={s.contactIn}>
				<Reveal className={s.contactHead}>
					<div>
						<span
							className={s.over}
							style={{ display: 'inline-block', marginBottom: 16 }}
						>
							§ rollout
						</span>
						<h2 className={s.h2}>
							Scope the rollout against
							<br />
							<em>your actual stack.</em>
						</h2>
					</div>
					<p className={s.lede}>
						We&apos;ll map Altr against your actual coordination stack and show
						what changes, what stays where it is, and what a safe rollout
						should look like for your team.
					</p>
				</Reveal>
				<Reveal>
					<div className={s.contactCard}>
						<div className={s.contactCardMeta}>Design partner evaluation</div>
						<div className={s.contactCardGrid}>
							<div>
								<h3 className={s.contactTitle}>
									For teams replacing real coordination overhead.
								</h3>
								<p className={s.contactText}>
									Bring product, engineering, design, or security to the
									table. We’ll show the workflow in context and outline where
									Altr fits into your current systems.
								</p>
							</div>
							<div>
								<ul className={s.contactList}>
									{POINTS.map((point) => (
										<li key={point}>{point}</li>
									))}
								</ul>
								<div className={s.contactActions}>
									<a href="#close" className={`${s.btn} ${s.btnAcc}`}>
										Request access →
									</a>
									<a
										href="mailto:hello@altr.run"
										className={`${s.btn} ${s.btnGhost}`}
									>
										Email the team
									</a>
								</div>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
