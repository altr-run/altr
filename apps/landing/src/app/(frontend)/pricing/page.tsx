import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Pricing — Altr',
	description: 'Zero-markup AI. You bring the key, we provide the execution loop. Transparent pricing for teams that ship.',
}

const PLAN_FEATURES = [
	{ category: 'Core workflow', items: [
		{ label: 'Intake → Plan → Build → Review loop', included: true },
		{ label: 'Unlimited execution trails', included: true },
		{ label: 'Slack thread capture', included: true },
		{ label: 'GitHub PR with context attached', included: true },
		{ label: 'Linear + Notion sync', included: true },
	]},
	{ category: 'AI agents', items: [
		{ label: 'Pax — PM agent (spec & structure)', included: true },
		{ label: 'Eng — engineer agent (build & PR)', included: true },
		{ label: 'Per-ticket autonomy control', included: true },
		{ label: 'BYOK — your Anthropic / OpenAI key', included: true },
		{ label: 'Bring any model (Sonnet, Haiku, GPT-4o)', included: true },
	]},
	{ category: 'Security & control', items: [
		{ label: 'OS Keychain key storage', included: true },
		{ label: 'Local-first SQLite (works offline)', included: true },
		{ label: 'Human approval gate by default', included: true },
		{ label: 'No Altr data proxy on LLM calls', included: true },
	]},
	{ category: 'Pilot program', items: [
		{ label: 'Direct founder support', included: true },
		{ label: 'Workflow mapping session', included: true },
		{ label: 'Early adopter pricing locked in', included: true },
	]},
]

const BYOK_ITEMS = [
	{
		title: 'No data markup',
		desc: "We don't charge a premium on top of Anthropic or OpenAI. You pay them directly at cost.",
		note: '$0 Altr margin on tokens',
	},
	{
		title: 'Privacy by default',
		desc: 'Your keys stay in your macOS Keychain. Your data never touches Altr servers in the LLM path.',
		note: 'Keys never leave your Mac',
	},
	{
		title: 'Model choice',
		desc: 'Switch between Sonnet, Haiku, or GPT-4o instantly. Use the model that fits the task budget.',
		note: 'Any Anthropic / OpenAI model',
	},
]

const FUTURE_PRICING = [
	{ tier: 'Team', price: '$29', interval: '/seat/mo', desc: 'Full execution loop for engineering teams. All agents, all integrations.' },
	{ tier: 'Growth', price: '$79', interval: '/seat/mo', desc: 'Advanced autonomy controls, analytics, and priority support.' },
	{ tier: 'Enterprise', price: 'Custom', interval: '', desc: 'VPC / on-prem deployment, SSO, SOC 2, and dedicated CS.' },
]

export default function PricingPage() {
	return (
		<main className="bg-bg text-ink">

			{/* Hero */}
			<section className="border-b border-line px-8 py-[160px] text-center" style={{ background: 'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--acc) 7%, transparent) 0%, transparent 60%), var(--bg)' }}>
				<div className="mx-auto flex flex-col items-center" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="over mb-5">Pricing</p>
					<h1 className="heading-2 mb-6">
						Zero-markup AI.
						<br />
						<em className="italic text-acc">You bring the key.</em>
					</h1>
					<p className="lede mb-10">
						Altr doesn&apos;t sell AI credits or markup tokens. Connect your own provider directly — paying exactly what the AI costs, with no middleman tax.
					</p>
					{/* Social proof strip */}
					<div className="flex items-center gap-3 border border-line rounded-full px-5 py-2.5" style={{ background: 'var(--bg-1)' }}>
						<div className="flex -space-x-1.5">
							{['EJ', 'RP', 'MC', 'SK', 'TW'].map((i, idx) => (
								<div
									key={i}
									className="w-6 h-6 rounded-full border-2 border-bg flex items-center justify-center font-sans font-semibold text-[8.5px] flex-shrink-0"
									style={{
										background: ['#1a2d1a', '#1a2d3f', '#3f2a1a', '#2a1a3f', '#1a3a3f'][idx],
										color: ['#7fc97f', '#52b8ff', '#ffb852', '#c852ff', '#52ffee'][idx],
									}}
								>
									{i}
								</div>
							))}
						</div>
						<span className="font-mono text-[10px] tracking-[0.06em] text-ink-3">
							10 teams on limited pilot &middot; <span className="text-ink-2">invite-only</span>
						</span>
						<span className="w-1.5 h-1.5 rounded-full bg-acc animate-[pulse-dot_1.6s_ease-in-out_infinite] flex-shrink-0" />
					</div>
				</div>
			</section>

			{/* Plan card + BYOK explanation */}
			<section className="border-b border-line px-8 py-24">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid gap-12" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
						{/* BYOK explanation */}
						<div className="flex flex-col gap-10">
							<div>
								<h2 className="font-serif text-[32px] tracking-tight mb-3">The BYOK advantage.</h2>
								<p className="font-sans text-[16px] text-ink-2 leading-relaxed">
									Most &ldquo;AI workspaces&rdquo; hide margins inside confusing credit systems. Altr uses a <b>Bring Your Own Key</b> architecture — your Mac connects directly to Anthropic or OpenAI.
								</p>
							</div>

							<div className="flex flex-col gap-5">
								{BYOK_ITEMS.map((item) => (
									<div key={item.title} className="flex gap-4 p-5 rounded-[16px] border border-line" style={{ background: 'var(--bg-1)' }}>
										<span className="text-acc font-mono text-[14px] mt-0.5 flex-shrink-0">↳</span>
										<div>
											<div className="flex items-center gap-3 mb-1">
												<p className="font-sans font-semibold text-[14px] text-ink">{item.title}</p>
												<span className="font-mono text-[9px] uppercase tracking-wider border border-line rounded-full px-2 py-0.5 text-acc" style={{ background: 'color-mix(in oklab, var(--acc) 6%, var(--bg))' }}>{item.note}</span>
											</div>
											<p className="font-sans text-[13.5px] text-ink-3 leading-relaxed">{item.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Plan Card */}
						<div className="relative flex flex-col">
							<div
								className="relative border border-line rounded-[28px] p-9 flex flex-col gap-7 overflow-hidden h-full"
								style={{
									background: 'radial-gradient(80% 70% at 5% 5%, color-mix(in oklab, var(--acc) 9%, transparent) 0%, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(248,248,248,0.94) 100%)',
									boxShadow: 'var(--sh-md), inset 0 1px 0 rgba(255,255,255,0.9)',
								}}
							>
								{/* Grid overlay */}
								<div
									className="absolute inset-0 pointer-events-none opacity-[0.04]"
									style={{
										backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
										backgroundSize: '28px 28px',
									}}
								/>
								{/* Status badge */}
								<div className="relative flex items-center gap-2 font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink-4">
									<span className="w-1.5 h-1.5 rounded-full bg-acc shadow-[0_0_0_3px_color-mix(in_oklab,var(--acc)_15%,transparent)] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
									Early Access · Limited cohort · Q2 2026
								</div>

								<div className="relative">
									<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-2">Early Access</p>
									<div className="flex items-baseline gap-2 mb-3">
										<span className="font-serif text-[60px] leading-none text-ink">$0</span>
										<span className="font-sans text-[14px] text-ink-3 mt-auto mb-1">during beta</span>
									</div>
									<p className="font-sans text-[14px] text-ink-2">Join the pilot program and help shape the future of AI-native execution. Early adopter pricing locked in when we launch paid tiers.</p>
								</div>

								<div className="relative flex flex-col gap-2.5">
									{PLAN_FEATURES.flatMap(cat => cat.items.slice(0, 2)).slice(0, 7).map((f) => (
										<div key={f.label} className="flex items-center gap-3">
											<span
												className="w-4 h-4 rounded-full grid place-items-center flex-shrink-0"
												style={{ background: 'color-mix(in oklab, var(--acc) 12%, var(--bg))', border: '1px solid color-mix(in oklab, var(--acc) 20%, var(--line))' }}
											>
												<span className="text-acc text-[8px] font-bold">✓</span>
											</span>
											<span className="font-sans text-[13px] text-ink-2">{f.label}</span>
										</div>
									))}
									<p className="font-mono text-[10px] text-ink-4 pl-7 tracking-wide">+ everything below →</p>
								</div>

								<a href="/#close" className="relative btn btn-acc btn-lg w-full mt-auto text-center">
									Request early access →
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Full feature breakdown */}
			<section className="border-b border-line px-8 py-20">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-10 text-center">Everything in early access</p>
					<div className="grid grid-cols-2 gap-px bg-line border border-line rounded-[20px] overflow-hidden lg:grid-cols-4">
						{PLAN_FEATURES.map((cat) => (
							<div key={cat.category} className="p-7 flex flex-col gap-4" style={{ background: 'var(--bg)' }}>
								<h3 className="font-mono text-[10px] uppercase tracking-widest text-acc mb-1">{cat.category}</h3>
								<ul className="list-none p-0 m-0 flex flex-col gap-2.5">
									{cat.items.map((item) => (
										<li key={item.label} className="flex items-start gap-2">
											<span className="font-mono text-[11px] text-acc mt-0.5 flex-shrink-0">■</span>
											<span className="font-sans text-[12.5px] text-ink-2 leading-snug">{item.label}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Future pricing preview */}
			<section className="border-b border-line px-8 py-20" style={{ background: 'var(--bg-1)' }}>
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="flex items-end justify-between gap-8 mb-10">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-2">After beta</p>
							<h2 className="font-serif text-[28px] tracking-tight text-ink">Pricing when we launch paid tiers.</h2>
						</div>
						<p className="font-sans text-[14px] text-ink-3 max-w-[38ch] text-right leading-relaxed">
							Early access users lock in a 40% discount on any tier for the first year. No action needed.
						</p>
					</div>
					<div className="grid grid-cols-3 gap-4">
						{FUTURE_PRICING.map((tier) => (
							<div
								key={tier.tier}
								className="border border-line rounded-[20px] p-7 flex flex-col gap-4"
								style={{ background: 'var(--bg)', opacity: 0.65 }}
							>
								<div>
									<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-3">{tier.tier}</p>
									<div className="flex items-baseline gap-1 mb-2">
										<span className="font-serif text-[36px] text-ink leading-none">{tier.price}</span>
										{tier.interval && <span className="font-sans text-[13px] text-ink-3">{tier.interval}</span>}
									</div>
									<p className="font-sans text-[13px] text-ink-3 leading-snug">{tier.desc}</p>
								</div>
							</div>
						))}
					</div>
					<p className="font-mono text-[10px] text-ink-4 text-center mt-6 tracking-wide">Indicative only. Pricing will be announced before beta closes.</p>
				</div>
			</section>

			{/* FAQ shortcut */}
			<section className="px-8 py-16 text-center border-b border-line">
				<p className="font-serif text-[22px] text-ink mb-2">Questions about pricing?</p>
				<p className="font-sans text-[15px] text-ink-3 mb-7 max-w-[40ch] mx-auto">Whether it&apos;s about seat limits, enterprise procurement, or BYOK cost modeling — talk to a founder.</p>
				<div className="flex gap-3 justify-center">
					<a href="/#close" className="btn btn-acc">
						Talk to the founders →
					</a>
					<Link href="/security" className="btn btn-ghost">
						Security & data →
					</Link>
				</div>
			</section>
		</main>
	)
}
