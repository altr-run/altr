import s from './home.module.css'
import Reveal from './reveal'

const QUOTES = [
	{
		text: (
			<>
				&ldquo;<em>@spec asks better questions than I do.</em> The thread
				already had the context, so the spec came out reviewable in
				minutes — not after three meetings.&rdquo;
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
				GitHub. <em>The spec is the standup now.</em> The PR arrives with
				the full trail attached.&rdquo;
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
				&ldquo;I&apos;ve been burned by AI tools before. Altr is the first
				that feels like a real operating surface — not a sidecar.{' '}
				<em>The agents show up with context.</em>&rdquo;
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
							§ from the teams
						</span>
						<h2 className={s.h2}>
							What shifts when the loop
							<br />
							<em>stays in one room.</em>
						</h2>
					</div>
					<p className={s.lede}>
						Less coordination drag. Stronger specs. Better review context.
						The pattern is consistent across every beta team.
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
