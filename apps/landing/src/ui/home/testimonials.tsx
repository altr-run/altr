import s from './home.module.css'
import Reveal from './reveal'

const QUOTES = [
	{
		text: (
			<>
				&ldquo;<em>@spec asks better questions than I do.</em> It caught
				an edge case in our auth flow I&apos;d been ignoring for
				months.&rdquo;
			</>
		),
		initials: 'EJ',
		name: 'Elena Joshi',
		role: 'CTO, Mesa',
		variant: 'default' as const,
	},
	{
		text: (
			<>
				&ldquo;We stopped spending Monday in standup.{' '}
				<em>The spec is the standup now.</em> Three agents, four humans,
				one thread.&rdquo;
			</>
		),
		initials: 'RP',
		name: 'Ravi Patel',
		role: 'Head of Eng, Holt & Co',
		variant: 'dark' as const,
	},
	{
		text: (
			<>
				&ldquo;I&apos;ve been burned by AI tools before. Altr is the
				first where{' '}
				<em>the agent feels like a coworker,</em> not a chatbot.&rdquo;
			</>
		),
		initials: 'MC',
		name: 'Maya Chen',
		role: 'Founder, Parabola',
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
							§ 04 · the word
						</span>
						<h2 className={s.h2}>
							What teams are <em>saying.</em>
						</h2>
					</div>
					<p className={s.lede}>
						Seven months into private beta, 140 teams across 19 time
						zones. Here&apos;s a sample.
					</p>
				</Reveal>
				<Reveal>
					<div className={s.testimonialsGrid}>
						{QUOTES.map((q, i) => (
							<div
								key={i}
								className={`${s.testiCell} ${i === 1 ? s.testiCellAlt : ''}`}
							>
								<div className={s.testiQuote}>{q.text}</div>
								<div className={s.testiAttr}>
									<div
										className={`${s.testiAvatar} ${q.variant === 'dark' ? s.testiAvatarDark : ''}`}
									>
										{q.initials}
									</div>
									<div>
										<div className={s.testiName}>
											{q.name}
										</div>
										<div className={s.testiRole}>
											{q.role}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	)
}
