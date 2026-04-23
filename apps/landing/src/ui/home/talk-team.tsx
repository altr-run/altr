import s from './home.module.css'
import Reveal from './reveal'

const POINTS = [
	'Pricing shaped around team size, deployment model, and support requirements',
	'Founder-led evaluation for teams replacing a real coordination stack',
	'Security, procurement, and rollout handled with your engineering and IT leads',
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
							§ commercials
						</span>
						<h2 className={s.h2}>
							Talk to the team.
							<br />
							<em>We’ll scope it properly.</em>
						</h2>
					</div>
					<p className={s.lede}>
						Altr is sold with the shape of the team in mind, not a
						generic pricing calculator. We’ll walk through workflow,
						deployment, model policy, and what success should look like in
						your environment.
					</p>
				</Reveal>
				<Reveal>
					<div className={s.contactCard}>
						<div className={s.contactCardMeta}>Private beta consultations</div>
						<div className={s.contactCardGrid}>
							<div>
								<h3 className={s.contactTitle}>
									For teams evaluating Altr seriously.
								</h3>
								<p className={s.contactText}>
									Bring product, design, engineering, or security to the
									table. We’ll show the system in context and map a rollout
									that matches how your team already works.
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
