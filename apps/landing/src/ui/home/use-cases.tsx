import Link from 'next/link'
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
		body: 'Break repetitive modernization work into focused tasks, run them in parallel, and keep human review on every branch before merge.',
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
		body: 'Draft release notes, update docs, and answer "what changed?" from the same execution trail.',
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
		<section
			id="use-cases"
			className="py-[140px] px-8 border-b border-(--line) bg-(--bg-1)"
		>
			<div className="inner">
				<Reveal
					className="grid gap-16 items-end mb-14"
					style={{ gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)' }}
				>
					<div>
						<span
							className="over inline-block"
							style={{ marginBottom: 16 }}
						>
							use cases
						</span>
						<h2
							className="font-serif font-normal leading-none tracking-[-0.03em] text-wrap-balance m-0"
							style={{ fontSize: 'clamp(44px, 5.6vw, 84px)' }}
						>
							Workflows teams already
							<br />
							<em className="italic">run every week.</em>
						</h2>
					</div>
					<p className="lede">
						Altr removes reconstruction work — the moment teams spend copying a
						bug report from Slack into Jira, summarizing a thread into acceptance
						criteria, or explaining context in a review comment. Start with any
						workflow you own. The signal comes with it.
					</p>
				</Reveal>

				<div
					className="grid gap-[1px] border-t border-l border-(--line)"
					style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
				>
					{CASES.map((item, index) => (
						<Reveal
							key={item.label}
							delay={index * 70}
							className={[
								'p-[28px_26px_30px] border-r border-b border-(--line)',
								'border-t-[3px] border-t-transparent',
								'flex flex-col gap-4',
								'transition-[transform,box-shadow,border-color] duration-[280ms] ease-[cubic-bezier(0.25,1,0.5,1)]',
								'hover:-translate-y-[3px] hover:shadow-md hover:border-t-(--acc) hover:z-[1] hover:relative',
							].join(' ')}
							style={{
								background: 'color-mix(in oklab, var(--panel-strong) 88%, white 12%)',
							}}
						>
							<div className="font-mono text-[10px] tracking-[0.12em] uppercase text-(--acc-2)">
								{item.label}
							</div>
							<h3
								className="font-serif font-normal text-[28px] leading-[1.08] tracking-[-0.02em] text-(--ink) m-0 max-w-[14ch]"
							>
								{item.title}
							</h3>
							<p className="text-[14px] leading-[1.62] text-(--ink-2) m-0 max-w-[34ch]">
								{item.body}
							</p>
							<ul className="list-none p-0 mt-auto mb-0 grid gap-2">
								{item.items.map((point) => (
									<li
										key={point}
										className="relative pl-[14px] font-mono text-[10.5px] leading-[1.45] tracking-[0.02em] text-(--ink-3) uppercase
											before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-(--acc)"
									>
										{point}
									</li>
								))}
							</ul>
						</Reveal>
					))}
				</div>

				<Reveal className="mt-10 flex items-center justify-between border-t border-(--line) pt-7">
					<p className="font-mono text-[11px] text-(--ink-4) tracking-widest">
						6 workflows · more added with each pilot cohort
					</p>
					<Link
						href="/use-cases"
						className="font-mono text-[12px] text-(--acc) no-underline hover:opacity-80 transition-opacity"
					>
						Explore all use cases →
					</Link>
				</Reveal>
			</div>
		</section>
	)
}
