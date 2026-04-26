import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const SignalLedger = dynamic(() => import('@/ui/product/signal-ledger'))

export const metadata: Metadata = {
	title: 'Workflow — Altr',
	description:
		'The Signal-to-PR trail. From Slack thread to merged PR — intent attached at every stage, nothing reconstructed from memory.',
	openGraph: {
		title: 'The Signal-to-PR Trail — Altr Workflow',
		description: 'One unbroken execution trail from first signal to merged PR. No handoff tax.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/workflow`,
	},
}

const STATS = [
	{
		value: '40%',
		suffix: '',
		label: 'of PM time spent re-explaining why work exists',
		detail: 'across handoffs between tools',
	},
	{
		value: '3',
		suffix: '+',
		label: 'tools touched before a PR opens',
		detail: 'Slack → Notion → Linear → GitHub',
	},
	{
		value: '0',
		suffix: '',
		label: 'PRs that ship with the original intent attached',
		detail: 'in a typical team workflow',
	},
] as const

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
		body: 'Altr turns raw signal into a reviewable spec — headline, problem statement, acceptance criteria, open questions. You edit and approve. Nothing moves forward until a human has signed off.',
		detail: 'The spec isn\'t a summary. It\'s a structured document that captures the intent from the original signal — so the engineer who opens the PR six days later knows exactly what was decided and why.',
		items: ['Acceptance criteria drafted from thread', 'Open questions flagged before build', 'Human review gate before build starts'],
	},
	{
		num: '03',
		label: 'Build',
		meta: 'execute',
		headline: 'A worktree opened, not a guess made.',
		body: 'Altr opens an isolated git worktree, proposes implementation steps, and streams progress back to you. The original spec — including acceptance criteria — stays attached throughout.',
		detail: 'Altr works in autopilot or copilot mode, your choice per ticket. Token budget tracked and auto-paused if it approaches the limit. Every proposed change comes with the original rationale still visible.',
		items: ['Isolated git worktree per ticket', 'Implementation steps proposed before changes', 'Copilot or autopilot — per-ticket choice'],
	},
	{
		num: '04',
		label: 'Review',
		meta: 'verify',
		headline: 'Review intent, not just diff shape.',
		body: 'Altr checks the implementation against the original acceptance criteria before opening the PR. Risk is flagged. Missing criteria surface early — not in a follow-up ticket three weeks later.',
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

			{/* ── Hero ──────────────────────────────────────────────────────── */}
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
					<p className="font-mono text-[11px] tracking-widest uppercase text-acc mb-5">
						The signal-to-PR trail
					</p>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						The &ldquo;why&rdquo; travels
						<br />
						<em className="italic text-acc">with the code.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[54ch] mb-10">
						From the Slack thread that sparked the idea to the merged PR — every artifact carries its source. No reconstruction work. No re-explaining the goal at handoff.
					</p>
					<a href="/#close" className="btn btn-primary btn-lg">
						Request access →
					</a>
				</div>
			</section>

			{/* ── Reconstruction tax stats ──────────────────────────────────── */}
			<section className="border-b border-line" style={{ background: 'var(--bg-1)' }}>
				<div className="mx-auto px-8 py-16" style={{ maxWidth: 'var(--maxw)' }}>
					<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-10 text-center">
						The reconstruction tax
					</p>
					<div className="grid gap-px rounded-[24px] overflow-hidden border border-line" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
						{STATS.map((s, i) => (
							<div key={i} className="p-8 flex flex-col gap-2" style={{ background: 'var(--bg)' }}>
								<div className="flex items-baseline gap-0.5">
									<span
										className="font-serif leading-none"
										style={{ fontSize: 'clamp(48px, 5vw, 72px)', color: 'var(--acc)' }}
									>
										{s.value}
									</span>
									{s.suffix && (
										<span className="font-serif text-[32px] text-acc leading-none">{s.suffix}</span>
									)}
								</div>
								<p className="font-sans text-[15px] font-medium text-ink leading-snug">{s.label}</p>
								<p className="font-mono text-[10.5px] text-ink-4 tracking-wide">{s.detail}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Signal Ledger ─────────────────────────────────────────────── */}
			<section className="border-b border-line">
				<div className="mx-auto px-8 py-20" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid gap-16 items-start" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
						{/* Left: framing */}
						<div className="sticky top-24">
							<p className="font-mono text-[11px] uppercase tracking-widest text-acc mb-5">
								The signal ledger
							</p>
							<h2
								className="font-serif font-normal tracking-[-0.03em] text-ink mb-5"
								style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.1, textWrap: 'balance' }}
							>
								Watch intent travel
								<br />
								from thread to merge.
							</h2>
							<p className="font-sans text-[15.5px] leading-[1.65] text-ink-2 mb-6">
								Every artifact in Altr carries a pointer back to its origin. The spec references the Slack thread. The PR references the spec. Six months from now, the trail is still there.
							</p>
							<div className="flex flex-col gap-3">
								{[
									'Nothing summarized — original signal preserved',
									'Spec attached to every PR, not just linked',
									'Follow-on work surfaces from the trail',
								].map((item) => (
									<div key={item} className="flex items-start gap-2.5">
										<span className="text-acc font-mono text-[11px] mt-0.5 flex-shrink-0">→</span>
										<span className="font-sans text-[13.5px] text-ink-2 leading-snug">{item}</span>
									</div>
								))}
							</div>
						</div>

						{/* Right: animated ledger */}
						<SignalLedger />
					</div>
				</div>
			</section>

			{/* ── Stage breakdown ───────────────────────────────────────────── */}
			<section className="border-b border-line">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="px-8 py-14 border-b border-line">
						<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">
							Five stages · one trail
						</p>
					</div>
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

			{/* ── CTA + nav ─────────────────────────────────────────────────── */}
			<section
				className="px-8 py-20 border-b border-line text-center"
				style={{
					background: 'radial-gradient(60% 60% at 50% 100%, color-mix(in oklab, var(--acc) 7%, transparent) 0%, transparent 70%), var(--bg)',
				}}
			>
				<div className="mx-auto flex flex-col items-center gap-5" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<h2
						className="font-serif font-normal text-ink"
						style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.1, textWrap: 'balance' }}
					>
						Ready to close the
						<br />
						<em className="italic text-acc">execution loop?</em>
					</h2>
					<p className="font-sans text-[16px] text-ink-2 max-w-[42ch] leading-[1.65]">
						We'll walk through Altr with your actual stack and show you where context stops bleeding out.
					</p>
					<a href="/#close" className="btn btn-primary btn-lg">
						Request access →
					</a>
				</div>
			</section>

			{/* ── Prev / next nav ───────────────────────────────────────────── */}
			<section className="border-b border-line px-8 py-12">
				<div className="mx-auto flex items-center justify-between gap-8" style={{ maxWidth: 'var(--maxw)' }}>
					<Link href="/product" className="group flex items-center gap-2 no-underline">
						<span className="text-ink-4 group-hover:text-acc transition-colors font-mono text-[13px]">←</span>
						<div>
							<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-0.5">back</p>
							<span className="font-sans text-[15px] text-ink group-hover:text-acc transition-colors">Product overview</span>
						</div>
					</Link>
					<Link href="/product/agents" className="group flex items-center gap-2 no-underline text-right">
						<div>
							<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-0.5">next</p>
							<span className="font-sans text-[15px] text-ink group-hover:text-acc transition-colors">Meet the agents</span>
						</div>
						<span className="text-ink-4 group-hover:text-acc transition-colors font-mono text-[13px]">→</span>
					</Link>
				</div>
			</section>
		</main>
	)
}
