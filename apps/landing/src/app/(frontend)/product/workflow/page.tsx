import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Workflow — Altr',
	description:
		'Intake → Plan → Build → Review → Ship. Five stages, one unbroken context trail from first signal to merged PR.',
	openGraph: {
		title: 'Workflow — Altr',
		description: 'Five stages, one unbroken context trail from first signal to merged PR.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/workflow`,
	},
}

const STAGES = [
	{
		num: '01',
		label: 'Intake',
		meta: 'capture',
		headline: 'Every signal, one place.',
		body: 'Slack threads, meeting notes, customer calls, monitoring alerts — Altr captures them before context starts decaying. The original signal is preserved in full, not summarized.',
		detail: 'You designate the Slack channels, docs, or tools Altr should watch. New signals are identified, classified, and routed into the execution trail — with the original source attached.',
		items: ['Slack thread captured verbatim', 'Bug reports with reproduction context', 'Decisions with the reasoning intact'],
	},
	{
		num: '02',
		label: 'Plan',
		meta: 'structure',
		headline: 'Acceptance criteria before a line is written.',
		body: 'Pax turns raw signal into a reviewable spec — headline, problem statement, acceptance criteria, open questions. You edit and approve. Nothing moves forward until a human has signed off.',
		detail: 'The spec isn\'t a summary. It\'s a structured document that captures the intent from the original signal — so the engineer who opens the PR six days later knows exactly what was decided and why.',
		items: ['Acceptance criteria drafted from thread', 'Open questions flagged before build', 'Human review gate before Eng starts'],
	},
	{
		num: '03',
		label: 'Build',
		meta: 'execute',
		headline: 'A worktree opened, not a guess made.',
		body: 'Eng opens an isolated git worktree, proposes implementation steps, and streams progress back to you. The original spec — including acceptance criteria — stays attached throughout.',
		detail: 'Eng works in autopilot or copilot mode, your choice per ticket. Token budget tracked and auto-paused if it approaches the limit. Every proposed change comes with the original rationale still visible.',
		items: ['Isolated git worktree per ticket', 'Implementation steps proposed before changes', 'Copilot or autopilot — per-ticket choice'],
	},
	{
		num: '04',
		label: 'Review',
		meta: 'verify',
		headline: 'Review intent, not just diff shape.',
		body: 'Eng checks the implementation against the original acceptance criteria before opening the PR. Risk is flagged. Missing criteria surface early — not in a follow-up ticket three weeks later.',
		detail: 'Reviewers see the spec alongside the diff. The original Slack thread is one click away. Open questions from the spec are surfaced in the PR so they get resolved before merge, not after.',
		items: ['Criteria checked against implementation', 'Risk and regressions flagged', 'Original thread one click away'],
	},
	{
		num: '05',
		label: 'Ship',
		meta: 'artifact',
		headline: 'Merged. With the rationale still attached.',
		body: 'The PR links back to the spec, which links back to the original thread. Six months from now, anyone can trace exactly why this change was made, what was decided, and what was deferred.',
		detail: 'Release notes draft from the execution trail. Doc updates surface as tasks, not surprises. The audit trail is a byproduct of the workflow — not something you build after the fact.',
		items: ['PR linked to spec and thread', 'Release notes drafted from trail', 'Follow-on work surfaced automatically'],
	},
] as const

export default function WorkflowPage() {
	return (
		<main className="bg-bg text-ink">
			{/* Hero */}
			<section
				className="border-b border-line px-8 py-[120px]"
				style={{
					background: 'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--acc) 8%, transparent) 0%, transparent 60%), var(--bg)',
				}}
			>
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<div className="flex items-center gap-3 mb-8">
						<Link href="/product" className="font-mono text-[11px] tracking-widest uppercase text-ink-4 no-underline hover:text-ink transition-colors">
							product
						</Link>
						<span className="text-ink-4 font-mono text-[11px]">/</span>
						<span className="font-mono text-[11px] tracking-widest uppercase text-ink-3">workflow</span>
					</div>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						Five stages.
						<br />
						<em className="italic text-acc">One unbroken trail.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[54ch]">
						Every stage has a clear job and a visible handoff. No reconstruction work, no re-explaining the goal — context travels from first request to merged diff.
					</p>
				</div>
			</section>

			{/* Stage list */}
			<section className="border-b border-line">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					{STAGES.map((stage, i) => (
						<div
							key={stage.num}
							className="grid border-b border-line last:border-b-0"
							style={{ gridTemplateColumns: '280px 1fr' }}
						>
							{/* Left: stage identity */}
							<div
								className="flex flex-col justify-between p-10 border-r border-line"
								style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-1)' }}
							>
								<div>
									<span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-4 block mb-3">{stage.meta}</span>
									<span className="font-serif text-[56px] leading-none tracking-[-0.04em] text-acc opacity-25">{stage.num}</span>
								</div>
								<div>
									<h2 className="font-sans font-semibold text-[18px] text-ink tracking-tight mb-1">{stage.label}</h2>
									<ul className="list-none p-0 m-0 flex flex-col gap-1.5 mt-4">
										{stage.items.map((item) => (
											<li key={item} className="font-mono text-[10.5px] text-ink-3 tracking-wide pl-3 relative before:content-['→'] before:absolute before:left-0 before:text-acc before:text-[9px]">
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* Right: stage detail */}
							<div className="flex flex-col gap-5 p-10" style={{ background: 'var(--bg)' }}>
								<h3 className="font-serif font-normal text-ink m-0" style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
									{stage.headline}
								</h3>
								<p className="font-sans text-[15.5px] leading-[1.65] text-ink-1 m-0">
									{stage.body}
								</p>
								<p className="font-sans text-[14px] leading-[1.65] text-ink-3 m-0 pt-2 border-t border-line">
									{stage.detail}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Nav to other product pages */}
			<section className="border-b border-line px-8 py-14">
				<div className="mx-auto flex items-center justify-between gap-8" style={{ maxWidth: 'var(--maxw)' }}>
					<div>
						<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-2">next</p>
						<Link href="/product/agents" className="font-serif text-[22px] text-ink no-underline hover:text-acc transition-colors">
							Meet the agents →
						</Link>
					</div>
					<a href="/#close" className="btn btn-primary">Request access →</a>
				</div>
			</section>
		</main>
	)
}
