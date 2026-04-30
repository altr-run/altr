import LogoMark from './logo-mark'

const NAV_LINK = 'block text-[13.5px] text-[rgba(255,255,255,0.45)] py-[5px] transition-colors hover:text-white no-underline'
const NAV_LINK_ACC = 'block text-[13.5px] text-[var(--acc)] py-[5px] hover:opacity-80 transition-opacity no-underline'
const COL_LABEL = 'font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.28)] mb-4 font-medium'

export default function FooterHome() {
	return (
		<footer
			className="py-20 px-8 pb-10"
			style={{ background: '#000' }}
		>
			<div
				className="inner grid gap-12 mb-16"
				style={{ gridTemplateColumns: '1.5fr repeat(4, 1fr)' }}
			>
				{/* Brand column */}
				<div>
					<a href="/" className="inline-flex items-center no-underline text-current leading-none">
						<LogoMark className="h-[24px] brightness-[10] saturate-0 opacity-90" />
						<span className="sr-only">Altr</span>
					</a>
					<p className="font-serif italic text-[15px] text-[rgba(255,255,255,0.40)] mt-4 max-w-[26ch] leading-[1.5]">
						One execution loop for product teams and agents.
					</p>
					<div className="mt-5 flex items-center gap-2 flex-wrap">
						{['your stack', 'BYOK', 'mac-native'].map(tag => (
							<span
								key={tag}
								className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] px-[7px] py-[2px] rounded-full text-[rgba(255,255,255,0.35)] whitespace-nowrap"
								style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
							>
								{tag}
							</span>
						))}
					</div>
				</div>

				{/* Product */}
				<div>
					<div className={COL_LABEL}>Product</div>
					<a href="/#workflow" className={NAV_LINK}>Workflow</a>
					<a href="/#agents" className={NAV_LINK}>Agents</a>
					<a href="/#stack" className={NAV_LINK}>Stack</a>
					<a href="/#playground" className={NAV_LINK}>Try it</a>
					<a href="/changelog" className={NAV_LINK}>Changelog</a>
				</div>

				{/* Use cases */}
				<div>
					<div className={COL_LABEL}>Use cases</div>
					<a href="/use-cases/feature-delivery" className={NAV_LINK}>Feature delivery</a>
					<a href="/use-cases/bug-triage" className={NAV_LINK}>Bug triage</a>
					<a href="/use-cases/pr-review" className={NAV_LINK}>PR review</a>
					<a href="/use-cases/incident-follow-up" className={NAV_LINK}>Incident follow-up</a>
					<a href="/use-cases" className={NAV_LINK_ACC}>All use cases →</a>
				</div>

				{/* Compare */}
				<div>
					<div className={COL_LABEL}>Compare</div>
					<a href="/compare/altr-vs-cursor" className={NAV_LINK}>vs Cursor</a>
					<a href="/compare/altr-vs-devin" className={NAV_LINK}>vs Devin</a>
					<a href="/compare/altr-vs-clickup-codegen" className={NAV_LINK}>vs ClickUp Codegen</a>
					<a href="/compare/altr-vs-linear" className={NAV_LINK}>vs Linear</a>
					<a href="/compare" className={NAV_LINK_ACC}>All comparisons →</a>
				</div>

				{/* Connect */}
				<div>
					<div className={COL_LABEL}>Connect</div>
					<a href="/integrations/slack" className={NAV_LINK}>Slack</a>
					<a href="/integrations/github" className={NAV_LINK}>GitHub</a>
					<a href="/integrations/linear" className={NAV_LINK}>Linear</a>
					<a href="/integrations" className={NAV_LINK_ACC}>All integrations →</a>
					<a href="/#faq" className={NAV_LINK}>FAQ</a>
				</div>
			</div>

			{/* Bottom bar */}
			<div
				className="inner pt-6 flex justify-between items-center font-mono text-[10.5px] tracking-[0.06em]"
				style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
			>
				<span className="text-[rgba(255,255,255,0.22)]">© 2026 Altr Labs, Inc.</span>
				<span className="text-[rgba(255,255,255,0.18)]">shipped with altr · v0.1.2026</span>
			</div>
		</footer>
	)
}
