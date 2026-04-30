import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { sanityFetchLive } from '@/sanity/lib/live'

export const metadata: Metadata = {
	title: 'Stack — Altr',
	description:
		'Altr works with the tools you already use — Slack, GitHub, Linear, Notion. No migration. BYOK. Mac-native.',
	openGraph: {
		title: 'Stack — Altr',
		description: 'Works with Slack, GitHub, Linear, Notion. No migration. BYOK. Mac-native.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/stack`,
	},
}

const PRINCIPLES = [
	{
		headline: 'Your keys. Your bill.',
		body: 'Altr uses your Anthropic API key, stored in the OS keychain. Never in SQLite, never in logs, never on our servers. Your usage is billed directly to your account — no markup, no credit system.',
		mark: '◆',
	},
	{
		headline: 'Mac-native. Not a web app.',
		body: 'Built with Tauri 2 + Rust. Not Electron. The execution trail lives in SQLite on your disk. The app launches in under a second. It works offline.',
		mark: '■',
	},
	{
		headline: 'No migration required.',
		body: 'Slack stays Slack. GitHub stays GitHub. Linear stays Linear. Altr reads them and keeps the context attached — it doesn\'t replace them or ask your team to move.',
		mark: '→',
	},
] as const

type StackIntegration = {
	tool: string
	category: string | null
	subhead: string | null
	signals: Array<{ signal: string }> | null
	slug: string
}

export default async function StackPage() {
	const integrations = await sanityFetchLive<StackIntegration[]>({
		query: groq`*[_type == 'integration' && defined(metadata.slug.current) && metadata.noIndex != true]
			| order(tool asc){
				tool,
				category,
				subhead,
				signals[]{ signal },
				'slug': metadata.slug.current
			}`,
	})

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
						<span className="font-mono text-[11px] tracking-widest uppercase text-ink-3">stack</span>
					</div>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						Your stack,
						<br />
						<em className="italic text-acc">unchanged.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[54ch]">
						Altr connects to the tools your team already uses and keeps context attached across all of them. No new workspace, no migration tax, no cloud lock-in.
					</p>
				</div>
			</section>

			{/* Integrations */}
			<section className="border-b border-line">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid gap-px bg-line" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
						{integrations.map((int) => (
							<Link
								key={int.slug}
								href={`/integrations/${int.slug}`}
								className="group flex flex-col gap-5 p-10 no-underline border-b border-line transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--acc)_3%,var(--bg-1))]"
								style={{ background: 'var(--bg)' }}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<span className="font-mono text-[11px] uppercase tracking-widest text-ink-4">{int.category}</span>
									</div>
									<span className="font-mono text-[11px] text-acc opacity-0 group-hover:opacity-100 transition-opacity">
										Learn more →
									</span>
								</div>
								<h2 className="font-serif font-normal text-ink m-0" style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
									{int.tool}
								</h2>
								{int.subhead && (
									<p className="font-sans text-[14px] leading-[1.62] text-ink-2 m-0">
										{int.subhead}
									</p>
								)}
								{int.signals && int.signals.length > 0 && (
									<div className="flex flex-wrap gap-2 mt-auto">
										{int.signals.slice(0, 3).map((s) => (
											<span key={s.signal} className="font-mono text-[10px] text-ink-3 border border-line rounded-full px-2.5 py-[3px]">
												{s.signal}
											</span>
										))}
									</div>
								)}
							</Link>
						))}
					</div>
					<div className="px-10 py-5 border-t border-line flex items-center justify-between">
						<span className="font-mono text-[10.5px] text-ink-4 tracking-wide">4 integrations · more with each pilot cohort</span>
						<Link href="/integrations" className="font-mono text-[11.5px] text-acc no-underline hover:opacity-80 transition-opacity">
							All integrations →
						</Link>
					</div>
				</div>
			</section>

			{/* Principles */}
			<section className="border-b border-line px-8 py-16">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-8">How Altr fits your stack</p>
					<div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
						{PRINCIPLES.map(({ headline, body, mark }) => (
							<div key={headline} className="flex flex-col gap-4 p-8 border border-line rounded-[16px]" style={{ background: 'var(--bg-1)' }}>
								<span className="font-mono text-[18px] text-acc leading-none">{mark}</span>
								<h3 className="font-sans font-semibold text-[15px] text-ink tracking-tight m-0">{headline}</h3>
								<p className="font-sans text-[13.5px] leading-[1.62] text-ink-2 m-0">{body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Tech strip */}
			<section className="border-b border-line px-8 py-10">
				<div className="mx-auto flex items-center justify-between gap-8" style={{ maxWidth: 'var(--maxw)' }}>
					<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">built with</p>
					<div className="flex items-center gap-6 flex-wrap">
						{['Tauri 2', 'Rust', 'React 18', 'SQLite', 'Claude API', 'OS Keychain'].map((t) => (
							<span key={t} className="font-mono text-[12px] text-ink-3">{t}</span>
						))}
					</div>
				</div>
			</section>

			{/* Nav */}
			<section className="border-b border-line px-8 py-14">
				<div className="mx-auto flex items-center justify-between gap-8" style={{ maxWidth: 'var(--maxw)' }}>
					<div>
						<p className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-2">previous</p>
						<Link href="/product/agents" className="font-serif text-[22px] text-ink no-underline hover:text-acc transition-colors">
							← Agents
						</Link>
					</div>
					<Button variant="acc" href="/#close">Request access →</Button>
				</div>
			</section>
		</main>
	)
}
