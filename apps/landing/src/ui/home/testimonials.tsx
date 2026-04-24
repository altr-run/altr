import { clsx } from 'clsx'
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
		<section className="py-[140px] px-8 border-b border-line">
			<div className="inner">
				<Reveal className="grid grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-16 items-end mb-14">
					<div>
						<span className="over inline-block mb-4">from pilot teams</span>
						<h2 className="heading-2">
							What shifts when the trail
							<br />
							<em>stays intact.</em>
						</h2>
					</div>
					<p className="lede">
						The recurring pattern is not "AI magic." It is fewer reconstruction
						meetings, stronger specs, and review that starts with the full
						context already in place.
					</p>
				</Reveal>
				<div className="grid grid-cols-2 border-t border-b border-line">
					{QUOTES.map((q, i) => (
						<Reveal
							key={i}
							delay={i === 0 ? 0 : i * 100}
							className={clsx(
								'p-10 border-r border-line flex flex-col gap-5 transition last:border-r-0',
								'hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08),0_0_0_1px_color-mix(in_oklab,var(--acc)_30%,var(--line))] hover:relative hover:z-[1]',
								q.featured && 'col-span-2 flex-row gap-16 items-start px-12 py-14 border-b border-r-0 bg-bg-1',
								!q.featured && q.variant === 'dark' && 'bg-bg-1',
							)}
						>
							<div
								className={clsx(
									'font-serif text-[20px] leading-[1.4] text-ink-1 tracking-[-0.01em] [&_em]:italic [&_em]:text-ink',
									q.featured && 'text-[26px] leading-[1.35] flex-1 max-w-[70ch]',
								)}
							>
								{q.text}
							</div>
							<div
								className={clsx(
									'flex gap-3 items-center mt-auto',
									q.featured && 'flex-col items-start gap-4 min-w-[180px]',
								)}
							>
								<div
									className={clsx(
										'w-9 h-9 rounded-full bg-acc-soft text-acc-ink grid place-items-center font-sans font-semibold text-[13px]',
										q.featured && 'w-12 h-12 text-[16px]',
										q.variant === 'dark' && 'bg-ink text-bg',
									)}
								>
									{q.initials}
								</div>
								<div>
									<div className="text-[13px] font-semibold text-ink">{q.name}</div>
									<div className="font-mono text-[10.5px] text-ink-3 tracking-widest">{q.role}</div>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
