import Link from 'next/link'
import Reveal from './reveal'

const PILLARS = [
	{
		mark: '■',
		title: 'Your workspace lives on your Mac',
		body: 'Specs, diffs, and context are stored in SQLite on-device. Integrations with Slack, GitHub, and Linear are handled by Altr cloud — so you get real-time events without exposing your machine.',
	},
	{
		mark: '▲',
		title: 'Choose models and providers deliberately',
		body: 'Bring your own model providers, keep keys in the OS keychain, and decide which roles can call which models under which rules.',
	},
	{
		mark: '◆',
		title: 'Keep decisions attributable',
		body: 'Specs, diffs, agent actions, and approvals stay reviewable. Important work still passes through human approval instead of disappearing behind automation.',
	},
	{
		mark: '●',
		title: 'Grow into stricter environments',
		body: 'Start with Mac-native pilots, then move into managed environments, VPCs, or on-prem setups as security and procurement requirements increase.',
	},
] as const

export default function Trust() {
	return (
		<section
			id="security"
			data-theme="dark"
			className="py-[140px] px-8 border-t border-b border-(--line) bg-(--bg) text-(--ink)"
		>
			<div className="inner flex flex-col gap-16">
				<Reveal className="flex flex-col items-start gap-5">
					<span className="over inline-block" style={{ marginBottom: 20 }}>
						security &amp; control
					</span>
					<h2
						className="font-serif font-normal leading-none tracking-[-0.03em] text-wrap-balance m-0"
						style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}
					>
						Your specs and diffs
						<br />
						<em className="italic">stay on your machine.</em>
					</h2>
					<p
						className="text-(--ink-2) leading-[1.6] mt-0 max-w-[480px]"
						style={{ fontSize: 'clamp(17px, 1.5vw, 20px)' }}
					>
						Control is part of the product surface, not a compliance add-on.
						Teams decide what agents can touch, which models run where, and how
						every decision stays attributable — from first request to merged diff.
					</p>
				</Reveal>

				<div className="grid grid-cols-2 gap-[2px]">
					{PILLARS.map((p, i) => (
						<Reveal
							key={p.title}
							delay={i * 90}
							className={[
								'border border-(--line) bg-(--bg-1) p-[36px_32px] flex flex-col gap-4',
								'transition-[transform,border-color] duration-300',
								'hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--acc)_40%,var(--line))]',
								i === 0 ? 'rounded-tl-[var(--r-lg)]' : '',
								i === 1 ? 'rounded-tr-[var(--r-lg)]' : '',
								i === 2 ? 'rounded-bl-[var(--r-lg)]' : '',
								i === 3 ? 'rounded-br-[var(--r-lg)]' : '',
							]
								.filter(Boolean)
								.join(' ')}
						>
							<span className="text-[20px] text-(--acc) leading-none inline-block transition-transform duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.28]">
								{p.mark}
							</span>
							<h3 className="font-serif font-normal text-[22px] text-(--ink) m-0 leading-[1.2]">
								{p.title}
							</h3>
							<p className="text-[14px] text-(--ink-2) leading-[1.7] m-0">
								{p.body}
							</p>
						</Reveal>
					))}
				</div>

				<Reveal>
					<div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.06em] text-(--ink-3) flex-wrap">
						<span>mac-native · tauri 2 + rust</span>
						<span className="w-[3px] h-[3px] rounded-full bg-(--ink-4) shrink-0" />
						<span>llm keys in OS keychain</span>
						<span className="w-[3px] h-[3px] rounded-full bg-(--ink-4) shrink-0" />
						<span>integrations via altr cloud</span>
						<span className="w-[3px] h-[3px] rounded-full bg-(--ink-4) shrink-0" />
						<span>audit trail preserved</span>
						<span className="w-[3px] h-[3px] rounded-full bg-(--ink-4) shrink-0" />
						<span>deployment path: local → vpc → on-prem</span>
					</div>
				</Reveal>

				<Reveal className="flex items-center justify-between border-t border-(--line) pt-7">
					<div className="flex items-center gap-3 flex-wrap font-mono text-[11px] text-(--ink-4) tracking-widest">
						<span>works with your existing stack:</span>
						{['Slack', 'GitHub', 'Linear', 'Notion', 'calls', 'CI'].map((t) => (
							<span key={t} className="badge">{t}</span>
						))}
					</div>
					<Link
						href="/integrations"
						className="font-mono text-[12px] text-(--acc) no-underline hover:opacity-80 transition-opacity whitespace-nowrap ml-6"
					>
						All integrations →
					</Link>
				</Reveal>
			</div>
		</section>
	)
}
