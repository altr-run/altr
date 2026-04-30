import Link from 'next/link'
import Reveal from './reveal'

const PILLARS = [
	{
		mark: '■',
		title: 'Your workspace, on your machine',
		body: 'Specs, diffs, and context are stored in SQLite on-device. Integrations with Slack, GitHub, and Linear are handled by Altr cloud — so you get real-time events without exposing your machine to outside access.',
	},
	{
		mark: '▲',
		title: 'You choose the models',
		body: 'Bring your own model providers and keep API keys in the OS keychain. Set which roles can call which models under which rules. No credits flow through Altr.',
	},
	{
		mark: '◆',
		title: 'Every decision stays attributable',
		body: 'Specs, diffs, agent actions, and approvals remain reviewable. Important work still passes through human approval. Nothing disappears behind automation.',
	},
	{
		mark: '●',
		title: 'Grow into stricter environments',
		body: 'Start with Mac-native pilots. Move into managed environments, VPCs, or on-prem setups as security and procurement requirements increase.',
	},
] as const

export default function Trust() {
	return (
		<section
			id="security"
			data-theme="dark"
			className="py-[140px] px-8 border-t border-b border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]"
		>
			<div className="inner flex flex-col gap-14">
				<Reveal className="flex flex-col items-start gap-5 max-w-[640px]">
					<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--acc)]">
						Security &amp; control
					</span>
					<h2
						className="font-serif font-normal text-[var(--ink)] leading-[1.06] tracking-[-0.03em] m-0"
						style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
					>
						Your specs and diffs
						<br />
						<em className="italic">stay on your machine.</em>
					</h2>
					<p
						className="font-sans text-[var(--ink-2)] leading-[1.65] m-0 max-w-[46ch]"
						style={{ fontSize: 'clamp(16px, 1.4vw, 19px)' }}
					>
						Control is part of the product surface, not a compliance add-on.
						Teams decide what agents can touch, which models run where, and how
						every decision stays attributable — from first request to merged diff.
					</p>
				</Reveal>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[var(--line)] rounded-[var(--r-lg)] overflow-hidden border border-[var(--line)]">
					{PILLARS.map((p, i) => (
						<Reveal
							key={p.title}
							delay={i * 90}
							className="bg-[var(--bg-1)] p-9 flex flex-col gap-5 group transition-[background] duration-300 hover:bg-[color-mix(in_oklab,var(--acc)_3%,var(--bg-1))]"
						>
							<span className="text-[22px] text-[var(--acc)] leading-none inline-block transition-transform duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.2]">
								{p.mark}
							</span>
							<h3 className="font-serif font-normal text-[20px] text-[var(--ink)] m-0 leading-[1.25] tracking-[-0.01em]">
								{p.title}
							</h3>
							<p className="font-sans text-[14px] text-[var(--ink-2)] leading-[1.72] m-0">
								{p.body}
							</p>
						</Reveal>
					))}
				</div>

				<Reveal>
					<div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.06em] text-[var(--ink-3)] flex-wrap">
						{[
							'Mac-native · Tauri 2 + Rust',
							'LLM keys in OS keychain',
							'Integrations via Altr cloud',
							'Audit trail preserved',
							'Local → VPC → on-prem path',
						].flatMap((item, i) => [
							...(i > 0
								? [<span key={`dot-${i}`} className="w-[3px] h-[3px] rounded-full bg-[var(--ink-5)] shrink-0" />]
								: []),
							<span key={item}>{item}</span>,
						])}
					</div>
				</Reveal>

				<Reveal className="flex items-center justify-between border-t border-[var(--line)] pt-7 flex-wrap gap-4">
					<div className="flex items-center gap-2.5 flex-wrap font-mono text-[10.5px] text-[var(--ink-4)] tracking-[0.06em]">
						<span className="uppercase">Works with your existing stack:</span>
						{['Slack', 'GitHub', 'Linear', 'Notion', 'Figma', 'PagerDuty'].map((t) => (
							<span
								key={t}
								className="badge"
							>
								{t}
							</span>
						))}
					</div>
					<Link
						href="/integrations"
						className="font-mono text-[11px] text-[var(--acc)] no-underline hover:opacity-75 transition-opacity whitespace-nowrap"
					>
						All integrations →
					</Link>
				</Reveal>
			</div>
		</section>
	)
}
