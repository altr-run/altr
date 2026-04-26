import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const AutonomyToggle = dynamic(() => import('@/ui/product/autonomy-toggle'))

export const metadata: Metadata = {
	title: 'Specialist Agents — Altr',
	description:
		'Specialist agents that plan, build, and review alongside your team. Copilot or autopilot, your call per ticket.',
	openGraph: {
		title: 'Specialist Agents — Altr',
		description: 'Specialist agents that plan, build, and review alongside your team.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/agents`,
	},
}

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
						Two specialists.
						<br />
						<em className="italic text-acc">One execution loop.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[54ch]">
						Altr doesn&apos;t use general-purpose chatbots. We use specialist agents designed for high-precision product work: one to structure the intent, and one to build the change.
					</p>
				</div>
			</section>

			{/* Agent cards */}
			<section className="border-b border-line">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid border-r border-line" style={{ gridTemplateColumns: '1fr 1fr' }}>
						{/* Spec Agent */}
						<div className="flex flex-col gap-8 p-12 border-r border-line">
							<div>
								<div className="flex items-center gap-3 mb-4">
									<span className="font-mono text-[20px] text-acc leading-none font-bold">■</span>
									<span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Spec Agent · Intent & Structure</span>
								</div>
								<h2 className="font-serif font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
									Structures the work.
								</h2>
							</div>
							<p className="font-sans text-[15.5px] leading-[1.65] text-ink-2 m-0">
								The Spec Agent is responsible for context preservation. It reads Slack threads, identifies feature requests, drafts acceptance criteria, and produces a spec that stays attached to the code forever.
							</p>
							<div className="border-t border-line pt-6">
								<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-3">Capabilities</p>
								<ul className="list-none p-0 m-0 flex flex-col gap-2">
									{[
										'Captures Slack threads verbatim',
										'Drafts specs with acceptance criteria',
										'Flags unresolved decisions before build starts',
										'Writes the spec live — streams into the editor',
										'Co-authors release notes after merge',
									].map((item) => (
										<li key={item} className="font-mono text-[11px] text-ink-3 pl-3 relative before:content-['■'] before:absolute before:left-0 before:text-acc before:text-[8px] before:top-[2px]">
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Build Agent */}
						<div className="flex flex-col gap-8 p-12" style={{ background: 'var(--bg-1)' }}>
							<div>
								<div className="flex items-center gap-3 mb-4">
									<span className="font-mono text-[20px] text-acc leading-none font-bold">▲</span>
									<span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Build Agent · Execution</span>
								</div>
								<h2 className="font-serif font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
									Ships the change.
								</h2>
							</div>
							<p className="font-sans text-[15.5px] leading-[1.65] text-ink-2 m-0">
								The Build Agent handles the execution. It opens isolated git worktrees, proposes implementation steps, runs tests, and opens PRs with the original spec still attached.
							</p>
							<div className="border-t border-line pt-6">
								<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-3">Capabilities</p>
								<ul className="list-none p-0 m-0 flex flex-col gap-2">
									{[
										'Opens isolated git worktrees per ticket',
										'Proposes implementation steps before code',
										'Streams progress back to the ticket view',
										'Opens PRs with spec and criteria attached',
										'Checks implementation against original intent',
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

			{/* Autonomy toggle visualization */}
			<section className="border-b border-line py-24">
				<div className="mx-auto px-8" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid gap-20 items-start" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
						<div className="sticky top-24">
							<p className="font-mono text-[11px] uppercase tracking-widest text-acc mb-5">Interactive</p>
							<h2
								className="font-serif font-normal tracking-[-0.03em] text-ink mb-5"
								style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.1, textWrap: 'balance' }}
							>
								Autonomy per-ticket,
								<br />
								not per-agent.
							</h2>
							<p className="font-sans text-[15.5px] leading-[1.65] text-ink-2 mb-8">
								You decide how much control to delegate for every task. Whether you want a specialist to draft while you code, or ship while you review, the choice is made at the ticket level.
							</p>
							<div className="flex flex-col gap-4 p-6 bg-bg-1 rounded-[16px] border border-line">
								<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-3">The Golden Rule</p>
								<p className="font-sans text-[13.5px] text-ink-2 leading-relaxed m-0 italic">
									&ldquo;Human review stays the default gate. Every PR opened by an agent waits for your explicit approval before it merges.&rdquo;
								</p>
							</div>
						</div>

						<AutonomyToggle />
					</div>
				</div>
			</section>

			{/* Nav */}
			<section className="border-b border-line px-8 py-12">
				<div className="mx-auto flex items-center justify-between gap-8" style={{ maxWidth: 'var(--maxw)' }}>
					<Link href="/product/workflow" className="group flex items-center gap-2 no-underline">
						<span className="text-ink-4 group-hover:text-acc transition-colors font-mono text-[13px]">←</span>
						<div>
							<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-0.5">back</p>
							<span className="font-sans text-[15px] text-ink group-hover:text-acc transition-colors">The workflow</span>
						</div>
					</Link>
					<Link href="/product/stack" className="group flex items-center gap-2 no-underline text-right">
						<div>
							<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-0.5">next</p>
							<span className="font-sans text-[15px] text-ink group-hover:text-acc transition-colors">Shared graph</span>
						</div>
						<span className="text-ink-4 group-hover:text-acc transition-colors font-mono text-[13px]">→</span>
					</Link>
				</div>
			</section>
		</main>
	)
}
