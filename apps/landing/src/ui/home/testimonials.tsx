import s from './home.module.css'
import Reveal from './reveal'

const QUOTES = [
	{
		text: (
			<>
				&ldquo;<em>We stopped rewriting the brief at every handoff.</em> The
				request, the acceptance criteria, and the PR now read like one
				continuous story, which changed the quality of review immediately.&rdquo;
			</>
		),
		initials: 'EJ',
		name: 'Elena Joshi',
		role: 'CTO, Mesa',
		featured: true,
		variant: 'default' as const,
	},
	{
		text: (
			<>
				&ldquo;We stopped losing the reasoning between Slack, Linear, and
				GitHub. <em>The PR finally arrives with the trail attached</em>,
				which means review starts from intent instead of archaeology.&rdquo;
			</>
		),
		initials: 'RP',
		name: 'Ravi Patel',
		role: 'Head of Eng, Holt & Co',
		featured: false,
		variant: 'dark' as const,
	},
	{
		text: (
			<>
				&ldquo;Most AI tooling gave us output. Altr gives us a workflow.{' '}
				<em>The agents show up with context, role, and a visible handoff</em>
				, which makes the whole thing governable.&rdquo;
			</>
		),
		initials: 'MC',
		name: 'Maya Chen',
		role: 'Founder, Parabola',
		featured: false,
		variant: 'default' as const,
	},
]

export default function Testimonials() {
	return (
		<section className={s.testimonials}>
			<div className={s.testimonialsIn}>
				<Reveal className={s.testimonialsHead}>
					<div>
						<span
							className={s.over}
							style={{
								display: 'inline-block',
								marginBottom: 16,
							}}
						>
							§ from pilot teams
						</span>
						<h2 className={s.h2}>
							What shifts when the trail
							<br />
							<em>stays intact.</em>
						</h2>
					</div>
					<p className={s.lede}>
						The recurring pattern is not “AI magic.” It is fewer reconstruction
						meetings, stronger specs, and review that starts with the full
						context already in place.
					</p>
				</Reveal>
				<div className={s.testimonialsGrid}>
					{QUOTES.map((q, i) => (
						<Reveal
							key={i}
							delay={i === 0 ? 0 : i * 100}
							className={`${s.testiCell} ${q.featured ? s.testiCellFeatured : q.variant === 'dark' ? s.testiCellAlt : ''}`}
						>
							<div className={s.testiQuote}>{q.text}</div>
							<div className={s.testiAttr}>
								<div
									className={`${s.testiAvatar} ${q.variant === 'dark' ? s.testiAvatarDark : ''}`}
								>
									{q.initials}
								</div>
								<div>
									<div className={s.testiName}>{q.name}</div>
									<div className={s.testiRole}>{q.role}</div>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
