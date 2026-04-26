import { COMPARE_PAGES, INTEGRATIONS, LEGAL_PAGES, USE_CASES } from '@/content'
import LogoMark from '@/ui/home/logo-mark'

const COL_HEAD =
	'font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-[18px] font-medium'

const NAV_LINK =
	'block font-sans text-[13.5px] text-ink-3 py-[4px] transition-colors duration-150 hover:text-ink no-underline leading-snug'

const NAV_LINK_ACCENT =
	'block font-mono text-[11px] text-acc py-[4px] no-underline hover:opacity-80 transition-opacity leading-snug mt-1'

export default function SiteFooter() {
	const useCases = Object.entries(USE_CASES)
	const comparePages = Object.entries(COMPARE_PAGES)
	const integrations = Object.entries(INTEGRATIONS)
	const legalPages = Object.entries(LEGAL_PAGES)

	return (
		<footer className="bg-bg">
			{/* Row 1 — brand + meta */}
			<div className="border-b border-line">
				<div className="mx-auto px-8 pt-8 pb-8" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="flex items-center justify-between gap-10">
						{/* Logo + tagline */}
						<div className="flex items-center gap-6">
							<a href="/" className="inline-flex items-center leading-none text-current no-underline">
								<LogoMark className="h-[26px]" />
								<span className="sr-only">Altr</span>
							</a>
							<p className="text-ink-3 m-0 font-serif text-[15px] leading-[1.45] italic">
								One execution loop for product teams and agents.
							</p>
						</div>
						{/* Social links */}
						<div className="flex items-center gap-4 flex-shrink-0">
							<a href="https://twitter.com/altr_run" className="text-ink-4 hover:text-ink transition-colors" aria-label="Twitter / X" rel="noopener noreferrer" target="_blank">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
							</a>
							<a href="https://github.com/altr-run" className="text-ink-4 hover:text-ink transition-colors" aria-label="GitHub" rel="noopener noreferrer" target="_blank">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
							</a>
							<a href="https://linkedin.com/company/altr-run" className="text-ink-4 hover:text-ink transition-colors" aria-label="LinkedIn" rel="noopener noreferrer" target="_blank">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Row 2 — nav columns */}
			<div className="border-b border-line">
				<div className="mx-auto px-8 pt-10 pb-12" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>

						{/* Product col */}
						<div>
							<div className={COL_HEAD}>Product</div>
							<a href="/product/workflow" className={NAV_LINK}>Workflow</a>
							<a href="/product/agents" className={NAV_LINK}>Agents</a>
							<a href="/product/stack" className={NAV_LINK}>Stack</a>
							<a href="/#playground" className={NAV_LINK}>Playground</a>
							<a href="/changelog" className={NAV_LINK}>Changelog</a>
							<a href="/product" className={NAV_LINK_ACCENT}>All product →</a>
						</div>

						{/* Solutions col */}
						<div>
							<div className={COL_HEAD}>Solutions</div>
							{useCases.map(([slug, uc]) => (
								<a key={slug} href={`/use-cases/${slug}`} className={NAV_LINK}>
									{uc.title}
								</a>
							))}
							<a href="/use-cases" className={NAV_LINK_ACCENT}>All use cases →</a>
						</div>

						{/* Compare col */}
						<div>
							<div className={COL_HEAD}>Compare</div>
							{comparePages.map(([slug, cp]) => (
								<a key={slug} href={`/compare/${slug}`} className={NAV_LINK}>
									vs {cp.competitor}
								</a>
							))}
							<a href="/compare" className={NAV_LINK_ACCENT}>All comparisons →</a>
						</div>

						{/* Integrations col */}
						<div>
							<div className={COL_HEAD}>Integrations</div>
							{integrations.map(([slug, int]) => (
								<a key={slug} href={`/integrations/${slug}`} className={NAV_LINK}>
									{int.tool}
								</a>
							))}
							<a href="/integrations" className={NAV_LINK_ACCENT}>All integrations →</a>
						</div>

						{/* Company col */}
						<div>
							<div className={COL_HEAD}>Company</div>
							<a href="/security" className={NAV_LINK}>Security</a>
							<a href="/#faq" className={NAV_LINK}>FAQ</a>
							<a href="/changelog" className={NAV_LINK}>What&apos;s new</a>
							<a href="/#close" className={NAV_LINK}>Early access</a>
							<div className="mt-5">
								<div className={COL_HEAD}>Legal</div>
								{legalPages.map(([slug, page]) => (
									<a key={slug} href={`/legal/${slug}`} className={NAV_LINK}>
										{page.title}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Compliance strip */}
			<div className="border-b border-line">
				<div className="mx-auto px-8 py-4" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
						{[
							'Local-First Architecture',
							'BYOK Data Sovereignty',
							'Apple Silicon Native',
							'No Data Resale',
							'SOC2 In-Progress',
						].map((pill) => (
							<div
								key={pill}
								className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-3"
							>
								<span className="text-acc text-[8px]">●</span>
								{pill}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="px-8 py-5">
			<div className="mx-auto flex items-center justify-between" style={{ maxWidth: 'var(--maxw)' }}>
				<span className="font-mono text-[11px] text-ink-4 tracking-wider">
					© 2026 altr labs, inc.
				</span>

				{/* "Shipped with Altr" heartbeat badge — adapted from the cinematic footer pattern */}
				<div
					className="flex items-center gap-2 border border-line rounded-full px-4 py-1.5"
					style={{ background: 'var(--bg-1)' }}
				>
					<span className="font-mono text-[10px] uppercase tracking-widest text-ink-4">
						shipped with
					</span>
					<span
						className="font-mono text-[12px] font-bold text-acc inline-block"
						style={{ animation: 'heartbeat 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite' }}
					>
						■
					</span>
					<span className="font-mono text-[11px] font-bold text-ink tracking-tight">
						Altr
					</span>
				</div>
			</div>
			</div>
		</footer>
	)
}
