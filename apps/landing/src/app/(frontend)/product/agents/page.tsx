import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Agents — Altr',
	description:
		'Pax and Eng — two AI teammates that plan, build, and review alongside your team. Copilot or autopilot, your call per ticket.',
	openGraph: {
		title: 'Agents — Altr',
		description: 'Pax and Eng — two AI teammates that plan, build, and review alongside your team.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/agents`,
	},
}

const AUTONOMY_MODES = [
	{
		mode: 'Human-only',
		desc: 'Agent drafts, you execute. Altr structures the work and surfaces the context — the team does the rest.',
		when: 'Sensitive changes, onboarding, or any ticket where you want full control.',
	},
	{
		mode: 'Copilot',
		desc: 'Agent proposes and streams progress. You review and approve before anything merges.',
		when: 'The default mode. Most teams run here — fast enough to matter, safe enough to trust.',
	},
	{
		mode: 'Autopilot',
		desc: 'Agent opens the PR with criteria attached. You review the diff. Merge is still a human decision.',
		when: 'Well-defined tasks, migrations, and cases where the spec is locked and the risk is understood.',
	},
] as const

export default function AgentsPage() {
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
						<span className="font-mono text-[11px] tracking-widest uppercase text-ink-3">agents</span>
					</div>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						Two AI teammates.
						<br />
						<em className="italic text-acc">One studio.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[54ch]">
						Pax and Eng aren&apos;t chatbots or plugins. They&apos;re long-running processes that read the same artifacts you do, write into the same trail, and work at whatever pace you set.
					</p>
				</div>
			</section>

			{/* Agent cards */}
			<section className="border-b border-line">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
						{/* Pax */}
						<div className="flex flex-col gap-8 p-12 border-r border-line">
							<div>
								<div className="flex items-center gap-3 mb-4">
									<span className="font-mono text-[20px] text-acc leading-none font-bold">■</span>
									<span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Pax · PM agent</span>
								</div>
								<h2 className="font-serif font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
									Pax structures the work.
								</h2>
							</div>
							<p className="font-sans text-[15.5px] leading-[1.65] text-ink-2 m-0">
								Pax is the PM that never forgets the brief. It reads Slack threads, identifies feature requests and bug reports, drafts acceptance criteria, flags open questions, and produces a spec you can actually hand to engineering.
							</p>
							<p className="font-sans text-[14px] leading-[1.65] text-ink-3 m-0">
								Pax runs as a persistent Rust process. It subscribes to your designated Slack channels, watches for signals, and writes into the execution trail graph. It doesn&apos;t summarize — it preserves the original thread and builds structured context on top.
							</p>
							<div className="border-t border-line pt-6">
								<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-3">What Pax does</p>
								<ul className="list-none p-0 m-0 flex flex-col gap-2">
									{[
										'Captures Slack threads verbatim',
										'Drafts specs with acceptance criteria',
										'Flags unresolved decisions before build starts',
										'Writes the spec live — streams edits into the editor',
										'Co-authors release notes after merge',
									].map((item) => (
										<li key={item} className="font-mono text-[11px] text-ink-3 pl-3 relative before:content-['■'] before:absolute before:left-0 before:text-acc before:text-[8px] before:top-[2px]">
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Eng */}
						<div className="flex flex-col gap-8 p-12" style={{ background: 'var(--bg-1)' }}>
							<div>
								<div className="flex items-center gap-3 mb-4">
									<span className="font-mono text-[20px] text-acc leading-none font-bold">▲</span>
									<span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Eng · engineer agent</span>
								</div>
								<h2 className="font-serif font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
									Eng builds the change.
								</h2>
							</div>
							<p className="font-sans text-[15.5px] leading-[1.65] text-ink-2 m-0">
								Eng is the engineer that opens the worktree, proposes implementation steps, streams progress as it works, and opens a PR with the original spec still attached. It works the way you want — copilot or autopilot, per ticket.
							</p>
							<p className="font-sans text-[14px] leading-[1.65] text-ink-3 m-0">
								Eng runs Claude Code in an isolated git worktree per ticket. stdout and stderr stream back into the ticket view. Token budget is tracked and auto-paused before limits are hit. The worktree is pruned when the PR merges.
							</p>
							<div className="border-t border-line pt-6">
								<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-3">What Eng does</p>
								<ul className="list-none p-0 m-0 flex flex-col gap-2">
									{[
										'Opens an isolated git worktree per ticket',
										'Proposes implementation steps before writing code',
										'Streams progress back to the ticket view',
										'Opens PRs with spec and criteria attached',
										'Checks implementation against acceptance criteria',
									].map((item) => (
										<li key={item} className="font-mono text-[11px] text-ink-3 pl-3 relative before:content-['▲'] before:absolute before:left-0 before:text-acc before:text-[7px] before:top-[3px]">
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Autonomy modes */}
			<section className="border-b border-line px-8 py-16">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-8">Autonomy — per ticket, not per agent</p>
					<div className="grid gap-px bg-line border border-line rounded-[20px] overflow-hidden" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
						{AUTONOMY_MODES.map(({ mode, desc, when }) => (
							<div key={mode} className="flex flex-col gap-4 p-8" style={{ background: 'var(--bg)' }}>
								<h3 className="font-sans font-semibold text-[15px] text-ink tracking-tight m-0">{mode}</h3>
								<p className="font-sans text-[13.5px] leading-[1.62] text-ink-2 m-0">{desc}</p>
								<p className="font-mono text-[10.5px] text-ink-4 leading-[1.5] border-t border-line pt-3 m-0">
									<span className="text-ink-3">Use when:</span> {when}
								</p>
							</div>
						))}
					</div>
					<p className="font-mono text-[11px] text-ink-4 mt-5 tracking-wide">
						Human review stays the default gate — merge is always a human decision.
					</p>
				</div>
			</section>

			{/* Nav */}
			<section className="border-b border-line px-8 py-14">
				<div className="mx-auto flex items-center justify-between gap-8" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="flex gap-10">
						<div>
							<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-2">previous</p>
							<Link href="/product/workflow" className="font-serif text-[22px] text-ink no-underline hover:text-acc transition-colors">
								← Workflow
							</Link>
						</div>
						<div>
							<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-2">next</p>
							<Link href="/product/stack" className="font-serif text-[22px] text-ink no-underline hover:text-acc transition-colors">
								Stack →
							</Link>
						</div>
					</div>
					<a href="/#close" className="btn btn-primary">Request access →</a>
				</div>
			</section>
		</main>
	)
}
