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
		label: 'Workflow',
		mark: '→',
		headline: 'The execution loop.',
		body: 'Intake → Plan → Build → Review → Ship. Five stages, one unbroken trail. Context travels with the work from the first Slack thread to the merged diff.',
		items: ['Thread to spec in minutes', 'Acceptance criteria attached to every PR', 'Intent visible at review time'],
	},
	{
		href: '/product/agents',
		label: 'Agents',
		mark: '■',
		headline: 'Two AI teammates.',
		body: 'Pax writes specs and structures work. Eng opens worktrees, proposes changes, and drafts PRs. Both work at your pace — copilot or autopilot, your call.',
		items: ['Pax — PM agent, spec and structure', 'Eng — engineer agent, build and PR', 'Per-ticket autonomy control'],
	},
	{
		href: '/product/stack',
		label: 'Stack',
		mark: '◆',
		headline: 'Your stack, unchanged.',
		body: 'Slack, GitHub, Linear, Notion — Altr reads them all and keeps the context attached. No migration. No new workspace. Your keys, your machine.',
		items: ['Works with Slack, GitHub, Linear, Notion', 'BYOK — your Anthropic key, your bill', 'Mac-native, runs local'],
	},
] as const

export default function ProductHub() {
	return (
		<main className="bg-bg text-ink">
			{/* Hero */}
			<section className="border-b border-line px-8 py-[120px]" style={{ background: 'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--acc) 8%, transparent) 0%, transparent 60%), var(--bg)' }}>
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
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 mx-auto max-w-[52ch]">
						Altr is a Mac-native workspace where humans and AI teammates collaborate on the same artifacts — from first signal to shipped PR — without losing the thread.
					</p>
				</div>
			</section>

			{/* Feature cards */}
			<section className="border-b border-line">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
						{FEATURES.map((f, i) => (
							<Link
								key={f.href}
								href={f.href}
								className={[
									'group flex flex-col gap-6 p-10 no-underline',
									'border-r border-line last:border-r-0',
									'transition-colors duration-200',
									'hover:bg-[color-mix(in_oklab,var(--acc)_3%,var(--bg-1))]',
								].join(' ')}
							>
								{/* Mark + label */}
								<div className="flex items-center gap-3">
									<span className="font-mono text-[18px] text-acc leading-none">{f.mark}</span>
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

								{/* Items */}
								<ul className="list-none p-0 m-0 flex flex-col gap-2 mt-auto">
									{f.items.map((item) => (
										<li key={item} className="font-mono text-[11px] text-ink-3 tracking-wide pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-acc">
											{item}
										</li>
									))}
								</ul>

								{/* CTA */}
								<div className="font-mono text-[11.5px] text-acc tracking-wide group-hover:translate-x-1 transition-transform duration-200">
									Explore {f.label.toLowerCase()} →
								</div>
							</Link>
						))}
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
					<a href="/#close" className="btn btn-primary btn-lg">
						Request early access →
					</a>
				</div>
			</section>
		</main>
	)
}
