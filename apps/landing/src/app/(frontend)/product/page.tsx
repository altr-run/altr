import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Product — Altr',
	description:
		'The execution loop that keeps context attached — from Slack thread to merged PR. Workflow, AI agents, and your existing stack.',
	openGraph: {
		title: 'Product — Altr',
		description:
			'The execution loop that keeps context attached — from Slack thread to merged PR.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
	},
}

const FEATURES = [
	{
		href: '/product/workflow',
		num: '01',
		label: 'Workflow',
		mark: '→',
		headline: 'The execution loop.',
		body: 'Intake → Plan → Build → Review → Ship. Five stages, one unbroken trail. Context travels with the work from the first Slack thread to the merged diff.',
		items: ['Thread to spec in minutes', 'Acceptance criteria attached to every PR', 'Intent visible at review time'],
		stat: { value: '5', label: 'stages, zero context loss' },
	},
	{
		href: '/product/agents',
		num: '02',
		label: 'Agents',
		mark: '■',
		headline: 'Two AI teammates.',
		body: 'Pax writes specs and structures work. Eng opens worktrees, proposes changes, and drafts PRs. Both work at your pace — copilot or autopilot, your call.',
		items: ['Pax — PM agent, spec and structure', 'Eng — engineer agent, build and PR', 'Per-ticket autonomy control'],
		stat: { value: '2', label: 'named agents, one shared room' },
	},
	{
		href: '/product/stack',
		num: '03',
		label: 'Stack',
		mark: '◆',
		headline: 'Your stack, unchanged.',
		body: 'Slack, GitHub, Linear, Notion — Altr reads them all and keeps the context attached. No migration. No new workspace. Your keys, your machine.',
		items: ['Works with Slack, GitHub, Linear, Notion', 'BYOK — your Anthropic key, your bill', 'Mac-native, runs local'],
		stat: { value: '6+', label: 'integrations at launch' },
	},
] as const

const STAGES = [
	{ num: 1, label: 'Intake', sub: 'Slack thread captured', color: 'var(--acc)' },
	{ num: 2, label: 'Plan', sub: 'Pax writes the spec', color: 'var(--acc)' },
	{ num: 3, label: 'Build', sub: 'Eng opens worktree', color: 'var(--acc)' },
	{ num: 4, label: 'Review', sub: 'PR with full context', color: 'var(--acc)' },
	{ num: 5, label: 'Ship', sub: 'Trail preserved at merge', color: 'var(--acc)' },
]

export default function ProductHub() {
	return (
		<main className="bg-bg text-ink">

			{/* Hero */}
			<section
				className="border-b border-line px-8 py-[120px]"
				style={{ background: 'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--acc) 8%, transparent) 0%, transparent 60%), var(--bg)' }}
			>
				<div className="mx-auto text-center" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">product</p>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						One loop.
						<br />
						<em className="italic text-acc">Context stays attached.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 mx-auto max-w-[52ch] mb-14">
						Altr is a Mac-native workspace where humans and AI teammates collaborate on the same artifacts — from first signal to shipped PR — without losing the thread.
					</p>

					{/* Execution loop strip */}
					<div
						className="inline-flex items-stretch rounded-[16px] border border-line overflow-hidden mx-auto"
						style={{ background: 'var(--bg-1)' }}
					>
						{STAGES.map((stage, i) => (
							<div key={stage.num} className="flex items-center">
								<div className="flex flex-col items-center gap-1 px-5 py-4">
									<span className="font-mono text-[9px] uppercase tracking-widest text-acc">{stage.num}</span>
									<span className="font-sans font-semibold text-[12.5px] text-ink">{stage.label}</span>
									<span className="font-mono text-[9px] text-ink-4 whitespace-nowrap">{stage.sub}</span>
								</div>
								{i < STAGES.length - 1 && (
									<span className="font-mono text-[11px] text-line px-1">→</span>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Feature cards */}
			<section className="border-b border-line">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
						{FEATURES.map((f) => (
							<Link
								key={f.href}
								href={f.href}
								className={[
									'group flex flex-col gap-6 p-10 no-underline',
									'border-r border-line last:border-r-0',
									'transition-colors duration-200',
									'hover:bg-[color-mix(in_oklab,var(--acc)_3%,var(--bg-1))]',
									'relative overflow-hidden',
								].join(' ')}
							>
								{/* Background number — large, subtle */}
								<div
									className="absolute top-6 right-8 font-serif font-normal text-[100px] leading-none pointer-events-none select-none text-ink opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300"
									aria-hidden
								>
									{f.num}
								</div>

								{/* Number + label */}
								<div className="flex items-center gap-3">
									<span className="font-mono text-[11px] text-acc">{f.num}</span>
									<div className="w-px h-3 bg-line" />
									<span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">{f.label}</span>
								</div>

								{/* Headline */}
								<h2 className="font-serif font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 2.8vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
									{f.headline}
								</h2>

								{/* Body */}
								<p className="font-sans text-[14.5px] leading-[1.65] text-ink-2 m-0">
									{f.body}
								</p>

								{/* Stat callout */}
								<div className="flex items-baseline gap-2 border-t border-line pt-4">
									<span className="font-serif text-[28px] text-acc leading-none">{f.stat.value}</span>
									<span className="font-mono text-[10px] uppercase tracking-wider text-ink-3">{f.stat.label}</span>
								</div>

								{/* Items */}
								<ul className="list-none p-0 m-0 flex flex-col gap-2">
									{f.items.map((item) => (
										<li key={item} className="font-mono text-[11px] text-ink-3 tracking-wide pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-acc">
											{item}
										</li>
									))}
								</ul>

								{/* CTA */}
								<div className="font-mono text-[11.5px] text-acc tracking-wide group-hover:translate-x-1 transition-transform duration-200 mt-auto">
									Explore {f.label.toLowerCase()} →
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* How it works — linear timeline */}
			<section className="border-b border-line px-8 py-20">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="flex items-end justify-between gap-12 mb-14">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-3">How it works</p>
							<h2 className="font-serif text-[32px] tracking-tight text-ink">The same thread, all the way through.</h2>
						</div>
						<p className="font-sans text-[15px] text-ink-2 max-w-[38ch] leading-relaxed text-right">
							The original signal — the Slack message, the design note, the incident — stays attached at every stage.
						</p>
					</div>
					<div className="relative">
						{/* Connecting line */}
						<div className="absolute left-[23px] top-8 bottom-8 w-px bg-line pointer-events-none" />
						<div className="flex flex-col gap-0">
							{[
								{ step: '01', title: 'Signal captured', desc: 'A Slack thread, Linear comment, or call recording hits Altr. The original context is locked in — who said what, when, why.' },
								{ step: '02', title: 'Pax writes the spec', desc: 'The PM agent turns the raw signal into a structured spec with acceptance criteria, open questions, and a priority recommendation. You edit in real time.' },
								{ step: '03', title: 'Eng opens the worktree', desc: 'The engineer agent spins up an isolated git worktree, proposes a diff, and runs in copilot or autopilot mode depending on your setting per ticket.' },
								{ step: '04', title: 'PR opens with the trail attached', desc: 'The pull request description includes the original thread, the spec, and the acceptance criteria. Review starts from intent, not archaeology.' },
								{ step: '05', title: 'Trail preserved at merge', desc: 'After merge, every artifact — thread, spec, diff, decision — is linked in the execution trail. Searchable, auditable, yours.' },
							].map((row, i) => (
								<div
									key={row.step}
									className="relative grid items-start gap-8 py-8 border-b border-line last:border-b-0"
									style={{ gridTemplateColumns: '48px 1fr 1fr' }}
								>
									{/* Step dot */}
									<div
										className="w-11 h-11 rounded-full border border-line grid place-items-center relative z-10 flex-shrink-0"
										style={{ background: 'var(--bg)', boxShadow: '0 0 0 4px var(--bg)' }}
									>
										<span className="font-mono text-[10px] text-acc font-semibold">{row.step}</span>
									</div>
									<h3 className="font-serif text-[20px] text-ink mt-2">{row.title}</h3>
									<p className="font-sans text-[14px] text-ink-2 leading-[1.65] mt-2">{row.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Principles strip */}
			<section className="border-b border-line px-8 py-16">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid gap-px bg-line border border-line rounded-[20px] overflow-hidden" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
						{[
							{ label: 'Mac-native', desc: 'Tauri 2 + Rust. Not Electron. Not a browser tab.' },
							{ label: 'Local-first', desc: 'SQLite on disk. Works offline. No cloud at launch.' },
							{ label: 'BYOK', desc: 'Your Anthropic key in the OS keychain. Never on our servers.' },
							{ label: 'Human gates', desc: 'Copilot mode is the default. Autopilot is your choice, per ticket.' },
						].map(({ label, desc }) => (
							<div key={label} className="flex flex-col gap-2 p-7" style={{ background: 'var(--bg)' }}>
								<span className="font-sans font-semibold text-[13.5px] text-ink tracking-tight">{label}</span>
								<span className="font-mono text-[11px] text-ink-3 leading-[1.55]">{desc}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="px-8 py-24 text-center">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<h2 className="font-serif font-normal text-ink mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
						See it on your actual workflow.
					</h2>
					<p className="font-sans text-[16px] text-ink-2 mb-8 max-w-[44ch] mx-auto leading-relaxed">
						Founder-led onboarding using your stack, your Slack channels, and your review standards.
					</p>
					<div className="flex gap-3 justify-center">
						<a href="/#close" className="btn btn-acc btn-lg">
							Request early access →
						</a>
						<Link href="/integrations" className="btn btn-ghost">
							See integrations →
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
