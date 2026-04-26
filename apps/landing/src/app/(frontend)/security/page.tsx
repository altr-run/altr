import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Security & Data Sovereignty — Altr',
	description:
		'Your API keys never touch our servers. Your code stays on your Mac. You pay Anthropic directly. Local-first, BYOK, and OS Keychain storage by design.',
	openGraph: {
		title: 'Security & Data Sovereignty — Altr',
		description: 'Local-first. BYOK. OS Keychain. Your data never leaves your Mac.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/security`,
	},
}

const PILLARS = [
	{
		mark: '■',
		label: 'OS Keychain storage',
		headline: 'Your API keys never touch our servers.',
		body: 'Altr stores your Anthropic and OpenAI API keys in the macOS Keychain — the same secure enclave used by 1Password and Safari. They are never written to SQLite, never sent to Altr servers, never logged. The key travels from the Keychain directly to the provider API over TLS.',
		items: [
			'Stored in macOS Keychain, not on disk or in our database',
			'Read at call time, never held in memory longer than needed',
			'Removed cleanly when you delete the app',
		],
	},
	{
		mark: '▲',
		label: 'SQLite on disk',
		headline: 'Your context stays on your Mac.',
		body: 'Every spec, Slack thread capture, ticket, and execution trail artifact is stored in a SQLite database on your machine at `~/Library/Application Support/run.altr.desktop/altr.db`. Nothing leaves your Mac unless you explicitly connect an integration.',
		items: [
			'No cloud sync by default — local-first architecture',
			'Readable by you: standard SQLite, no proprietary format',
			'Encrypted at rest by macOS FileVault when enabled',
		],
	},
	{
		mark: '◆',
		label: 'BYOK — Bring Your Own Key',
		headline: 'You pay the AI provider. We take no cut.',
		body: 'Altr never proxies your LLM calls through our servers. Your Mac connects directly to Anthropic or OpenAI using your key. We never see your prompts, your completions, or your usage. You get the provider\'s direct pricing — no Altr markup, no credit system.',
		items: [
			'Direct connection: your Mac → Anthropic / OpenAI',
			'Altr never receives or logs your prompts or completions',
			'Provider billing is between you and Anthropic/OpenAI',
		],
	},
] as const

const WHAT_WE_SEE = [
	{ item: 'Crash reports', detail: 'Anonymized stack traces via Sentry. No user data included.' },
	{ item: 'Opt-in telemetry', detail: 'Feature usage events (e.g. "opened spec editor"). Opt-out on first launch.' },
	{ item: 'Nothing else', detail: 'We have no access to your specs, threads, code, or API keys.' },
] as const

const ARCH_STEPS = [
	{ from: 'Your Mac', to: 'macOS Keychain', label: 'key fetch', note: 'stays on device' },
	{ from: 'Your Mac', to: 'Anthropic / OpenAI', label: 'LLM call', note: 'direct TLS, no proxy' },
	{ from: 'Anthropic / OpenAI', to: 'Your Mac', label: 'completion', note: 'Altr never sees this' },
	{ from: 'Your Mac', to: 'SQLite on disk', label: 'artifact stored', note: 'local only' },
] as const

export default function SecurityPage() {
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
					<p className="font-mono text-[11px] tracking-widest uppercase text-acc mb-5">
						Security & data sovereignty
					</p>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						Your data never
						<br />
						<em className="italic text-acc">leaves your Mac.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[54ch] mb-10">
						Local-first architecture. API keys in the OS Keychain. Direct connection to AI providers — no Altr proxy, no markup, no visibility into your work.
					</p>
					{/* Trust pills */}
					<div className="flex flex-wrap gap-2">
						{[
							'Local-first architecture',
							'BYOK — zero markup',
							'OS Keychain storage',
							'Apple Silicon native',
							'No cloud sync by default',
						].map((label) => (
							<span
								key={label}
								className="font-mono text-[10.5px] tracking-wide border border-line rounded-full px-3 py-1 text-ink-3"
								style={{ background: 'var(--bg-1)' }}
							>
								{label}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ── Three pillars ─────────────────────────────────────────────── */}
			<section className="border-b border-line">
				<div className="mx-auto px-8 py-20" style={{ maxWidth: 'var(--maxw)' }}>
					<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-12 text-center">
						Three non-negotiables
					</p>
					<div className="grid gap-px rounded-[24px] overflow-hidden border border-line" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
						{PILLARS.map((p, i) => (
							<div key={i} className="p-8 flex flex-col gap-5" style={{ background: 'var(--bg)' }}>
								<div className="flex items-center gap-2">
									<span className="font-mono text-[14px] text-acc font-bold">{p.mark}</span>
									<span className="font-mono text-[10px] uppercase tracking-widest text-ink-3">{p.label}</span>
								</div>
								<h3
									className="font-serif font-normal text-ink"
									style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', lineHeight: 1.2, textWrap: 'balance' }}
								>
									{p.headline}
								</h3>
								<p className="font-sans text-[14px] leading-[1.7] text-ink-2">
									{p.body}
								</p>
								<ul className="list-none p-0 m-0 flex flex-col gap-2 pt-3 border-t border-line">
									{p.items.map((item) => (
										<li key={item} className="flex items-start gap-2 font-mono text-[10.5px] text-ink-3 tracking-wide">
											<span className="text-acc mt-0.5 flex-shrink-0">→</span>
											{item}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Architecture diagram ──────────────────────────────────────── */}
			<section className="border-b border-line" style={{ background: 'var(--bg-1)' }}>
				<div className="mx-auto px-8 py-20" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-10 text-center">
						How it flows
					</p>

					{/* Diagram */}
					<div
						className="rounded-[20px] border border-line overflow-hidden"
						style={{ background: 'var(--bg)' }}
					>
						{/* Header row */}
						<div
							className="grid border-b border-line px-6 py-3"
							style={{ gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--bg-1)' }}
						>
							<div className="font-mono text-[10px] uppercase tracking-widest text-ink-4">Source</div>
							<div className="font-mono text-[10px] uppercase tracking-widest text-ink-4 text-center">Signal</div>
							<div className="font-mono text-[10px] uppercase tracking-widest text-ink-4 text-right">Destination</div>
						</div>

						{ARCH_STEPS.map((step, i) => (
							<div
								key={i}
								className="grid items-center border-b border-line last:border-b-0 px-6 py-4 gap-4"
								style={{ gridTemplateColumns: '1fr auto 1fr', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-1)' }}
							>
								<span className="font-sans font-medium text-[13.5px] text-ink">{step.from}</span>
								<div className="flex flex-col items-center gap-1 px-3">
									<div className="flex items-center gap-1">
										<div className="h-px w-8 bg-line" />
										<span className="font-mono text-[10px] text-acc">→</span>
									</div>
									<span className="font-mono text-[9px] uppercase tracking-widest text-ink-3">{step.label}</span>
									<span className="font-mono text-[9px] text-ink-4">{step.note}</span>
								</div>
								<span className="font-sans font-medium text-[13.5px] text-ink text-right">{step.to}</span>
							</div>
						))}

						{/* Altr note */}
						<div className="px-6 py-4 border-t border-line" style={{ background: 'color-mix(in oklab, var(--acc) 4%, var(--bg))' }}>
							<p className="font-mono text-[10.5px] text-acc text-center">
								Altr is never in the data path between your Mac and the AI provider
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ── What we do see ────────────────────────────────────────────── */}
			<section className="border-b border-line">
				<div className="mx-auto px-8 py-20" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-3">
						Full transparency
					</p>
					<h2
						className="font-serif font-normal text-ink mb-8"
						style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', lineHeight: 1.1 }}
					>
						What we do see.
					</h2>
					<div className="flex flex-col gap-3">
						{WHAT_WE_SEE.map((row, i) => (
							<div
								key={i}
								className="grid items-center gap-8 px-6 py-4 rounded-[14px] border border-line"
								style={{ gridTemplateColumns: '160px 1fr', background: 'var(--bg-1)' }}
							>
								<span className="font-sans font-medium text-[14px] text-ink">{row.item}</span>
								<span className="font-sans text-[14px] text-ink-2 leading-snug">{row.detail}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── SOC 2 status ──────────────────────────────────────────────── */}
			<section className="border-b border-line" style={{ background: 'var(--bg-1)' }}>
				<div className="mx-auto px-8 py-14" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<div className="flex items-center justify-between gap-8">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-2">Compliance</p>
							<h3 className="font-serif text-[22px] text-ink mb-2">SOC 2 Type II — in progress.</h3>
							<p className="font-sans text-[14px] text-ink-2 leading-[1.65] max-w-[44ch]">
								We are working toward SOC 2 Type II certification. In the meantime, our architecture is designed to meet enterprise data residency requirements from day one.
							</p>
						</div>
						<div
							className="flex-shrink-0 border border-line rounded-[14px] px-5 py-4 text-center"
							style={{ background: 'var(--bg)', minWidth: 140 }}
						>
							<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-2">Status</p>
							<div className="flex items-center gap-2 justify-center">
								<span className="w-2 h-2 rounded-full bg-[#c49a4b]" />
								<span className="font-mono text-[12px] text-ink">In progress</span>
							</div>
							<p className="font-mono text-[10px] text-ink-4 mt-2">2026 target</p>
						</div>
					</div>
				</div>
			</section>

			{/* ── CTA ───────────────────────────────────────────────────────── */}
			<section
				className="px-8 py-20 text-center"
				style={{
					background: 'radial-gradient(60% 60% at 50% 100%, color-mix(in oklab, var(--acc) 6%, transparent) 0%, transparent 70%), var(--bg)',
				}}
			>
				<div className="mx-auto flex flex-col items-center gap-5" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<h2
						className="font-serif font-normal text-ink"
						style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.1, textWrap: 'balance' }}
					>
						Questions about your
						<br />
						<em className="italic text-acc">data or architecture?</em>
					</h2>
					<p className="font-sans text-[16px] text-ink-2 max-w-[42ch] leading-[1.65]">
						We do founder-led onboarding. Ask us anything about how Altr handles your data — before you sign up.
					</p>
					<a href="/#close" className="btn btn-acc btn-lg">
						Talk to the founders →
					</a>
					<Link href="/product/workflow" className="font-mono text-[12px] text-ink-3 hover:text-acc transition-colors no-underline">
						Read about the workflow →
					</Link>
				</div>
			</section>
		</main>
	)
}
