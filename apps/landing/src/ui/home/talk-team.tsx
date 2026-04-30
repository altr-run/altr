import { Button } from '@/components/ui/button'
import Reveal from './reveal'

const POINTS = [
	'Map which agents your team runs — Claude Code, Codex, Cursor, Copilot, Devin — and where context breaks down today',
	'Scope the integration: Slack + Linear + GitHub as signal sources; mission control app + MCP + CLI + Slack bot as consumption surfaces',
	'Security review: BYOK, local SQLite, agent keys in OS keychain — your code never touches Altr servers',
]

export default function TalkTeam() {
	return (
		<section className="py-[140px] px-8 border-b border-line" id="contact">
			<div className="inner">
				<Reveal className="grid grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-16 items-end mb-16">
					<div>
						<span className="over inline-block mb-4">rollout</span>
						<h2 className="heading-2">
							Scope the rollout against
							<br />
							<em>your actual stack.</em>
						</h2>
					</div>
					<p className="lede">
						We&apos;ll map Altr against your actual coordination stack and show
						what changes, what stays where it is, and what a safe rollout
						should look like for your team.
					</p>
				</Reveal>
				<Reveal>
					<div
						className="relative border border-line rounded-[28px] p-7 overflow-hidden"
						style={{
							background: 'radial-gradient(80% 80% at 0% 0%, color-mix(in oklab, var(--acc) 8%, transparent) 0%, transparent 58%), linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(248,248,248,0.92) 100%)',
							boxShadow: 'var(--sh-md)',
						}}
					>
						{/* Subtle grid overlay — Mastra-inspired structural texture */}
						<div
							className="absolute inset-0 pointer-events-none opacity-[0.055]"
							style={{
								backgroundImage:
									'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
								backgroundSize: '32px 32px',
							}}
						/>
						{/* Urgency strip */}
						<div className="relative flex items-center gap-2 mb-6 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-4">
							<span className="w-1.5 h-1.5 rounded-full bg-acc shadow-[0_0_0_3px_color-mix(in_oklab,var(--acc)_14%,transparent)] animate-[pulse-dot_1.6s_ease-in-out_infinite] flex-shrink-0" />
							Design partner evaluation · limited cohort · Q2 2026
						</div>
						<div className="grid gap-9 items-start" style={{ gridTemplateColumns: '1.1fr 0.9fr' }}>
							<div>
								<h3 className="font-serif font-normal tracking-tight leading-[1.05] mb-4 max-w-[12ch]" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
									For teams replacing real coordination overhead.
								</h3>
								<p className="text-[17px] text-ink-2 leading-[1.65] max-w-[42ch]">
									Bring product, engineering, design, or security to the
									table. We'll show the workflow in context and outline where
									Altr fits into your current systems.
								</p>
							</div>
							<div>
								<ul className="list-none p-0 m-0 mb-7 flex flex-col gap-3.5">
									{POINTS.map((point) => (
										<li
											key={point}
											className="relative pl-[18px] text-[15px] text-ink-1 leading-[1.6] before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-[6px] before:h-[6px] before:rounded-full before:bg-acc"
											style={{ ['--tw-shadow-color' as string]: 'color-mix(in oklab, var(--acc) 12%, transparent)' }}
										>
											{point}
										</li>
									))}
								</ul>
								<div className="flex gap-3 flex-wrap">
									<Button variant="acc" href="#close">
										Request access →
									</Button>
									<Button variant="cta-ghost" href="mailto:hello@altr.run">
										Email the team
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
