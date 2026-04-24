import LogoMark from './logo-mark'

const NAV_LINK = 'block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline'

export default function FooterHome() {
	return (
		<footer className="py-20 px-8 pb-10 bg-bg">
			<div className="max-w-[var(--maxw)] mx-auto grid gap-12" style={{ gridTemplateColumns: '1.4fr repeat(4, 1fr)' }}>
				<div>
					<a href="/" className="inline-flex items-center no-underline text-current leading-none">
						<LogoMark className="h-[26px]" />
						<span className="sr-only">Altr</span>
					</a>
					<p className="font-serif italic text-[16px] text-ink-2 mt-3.5 max-w-[28ch] leading-[1.4]">
						One execution loop for product teams and agents.
					</p>
					<div className="mt-5 flex items-center gap-2 flex-wrap font-mono text-[10px] tracking-wide text-ink-4">
						<span className="border border-line rounded-full px-2.5 py-0.5">your workspace, your Mac</span>
						<span className="border border-line rounded-full px-2.5 py-0.5">BYOK</span>
						<span className="border border-line rounded-full px-2.5 py-0.5">mac-native</span>
					</div>
				</div>
				<div>
					<div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">Product</div>
					<a href="/#workflow" className={NAV_LINK}>Workflow</a>
					<a href="/#agents" className={NAV_LINK}>Agents</a>
					<a href="/#stack" className={NAV_LINK}>Stack</a>
					<a href="/#playground" className={NAV_LINK}>Try it</a>
					<a href="/changelog" className={NAV_LINK}>Changelog</a>
				</div>
				<div>
					<div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">Use cases</div>
					<a href="/use-cases/feature-delivery" className={NAV_LINK}>Feature delivery</a>
					<a href="/use-cases/bug-triage" className={NAV_LINK}>Bug triage</a>
					<a href="/use-cases/pr-review" className={NAV_LINK}>PR review</a>
					<a href="/use-cases/incident-follow-up" className={NAV_LINK}>Incident follow-up</a>
					<a href="/use-cases" className={NAV_LINK + ' text-acc'}>All use cases →</a>
				</div>
				<div>
					<div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">Compare</div>
					<a href="/compare/altr-vs-cursor" className={NAV_LINK}>vs Cursor</a>
					<a href="/compare/altr-vs-devin" className={NAV_LINK}>vs Devin</a>
					<a href="/compare/altr-vs-clickup-codegen" className={NAV_LINK}>vs ClickUp Codegen</a>
					<a href="/compare/altr-vs-linear" className={NAV_LINK}>vs Linear</a>
					<a href="/compare" className={NAV_LINK + ' text-acc'}>All comparisons →</a>
				</div>
				<div>
					<div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">Connect</div>
					<a href="/integrations/slack" className={NAV_LINK}>Slack</a>
					<a href="/integrations/github" className={NAV_LINK}>GitHub</a>
					<a href="/integrations/linear" className={NAV_LINK}>Linear</a>
					<a href="/integrations" className={NAV_LINK + ' text-acc'}>All integrations →</a>
					<a href="/#faq" className={NAV_LINK}>FAQ</a>
				</div>
			</div>
			<div className="max-w-[var(--maxw)] mx-auto mt-16 pt-6 border-t border-line flex justify-between font-mono text-[11px] text-ink-4 tracking-widest">
				<span>© 2026 altr labs, inc.</span>
				<span>shipped with altr · v0.1.2026</span>
			</div>
		</footer>
	)
}
