import LogoMark from './logo-mark'

export default function FooterHome() {
	return (
		<footer className="py-20 px-8 pb-10 bg-bg">
			<div className="max-w-[var(--maxw)] mx-auto grid gap-12" style={{ gridTemplateColumns: '1.4fr repeat(4, 1fr)' }}>
				<div>
					<a href="#" className="inline-flex items-center no-underline text-current leading-none">
						<LogoMark className="h-[26px]" />
						<span className="sr-only">Altr</span>
					</a>
					<p className="font-serif italic text-[16px] text-ink-2 mt-3.5 max-w-[28ch] leading-[1.4]">
						One execution loop for product teams and agents.
					</p>
				</div>
				<div>
					<h5 className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">Product</h5>
					<a href="#workflow" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Workflow</a>
					<a href="#agents" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Agents</a>
					<a href="#stack" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Stack</a>
					<a href="#playground" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Try it</a>
				</div>
				<div>
					<h5 className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">Use cases</h5>
					<a href="#use-cases" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Feature delivery</a>
					<a href="#use-cases" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Bug triage</a>
					<a href="#use-cases" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">PR review</a>
					<a href="#contact" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Rollout</a>
				</div>
				<div>
					<h5 className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">Build</h5>
					<a href="#playground" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Demo</a>
					<a href="#use-cases" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Use cases</a>
					<a href="#faq" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">FAQ</a>
					<a href="#close" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Access</a>
				</div>
				<div>
					<h5 className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">Trust</h5>
					<a href="#security" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Security</a>
					<a href="#security" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Control</a>
					<a href="#contact" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Rollout</a>
					<a href="#close" className="block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline">Contact</a>
				</div>
			</div>
			<div className="max-w-[var(--maxw)] mx-auto mt-16 pt-6 border-t border-line flex justify-between font-mono text-[11px] text-ink-4 tracking-widest">
				<span>© 2026 altr labs, inc.</span>
				<span>shipped with altr · v0.1.2026</span>
			</div>
		</footer>
	)
}
