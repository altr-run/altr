import { COMPARE_PAGES, INTEGRATIONS, LEGAL_PAGES, USE_CASES } from '@/content'
import LogoMark from '@/ui/home/logo-mark'
import EmailForm from './email-form'

const NAV_LINK =
	'block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline'

export default function SiteFooter() {
	const useCases = Object.entries(USE_CASES)
	const comparePages = Object.entries(COMPARE_PAGES)
	const integrations = Object.entries(INTEGRATIONS)
	const legalPages = Object.entries(LEGAL_PAGES)

	return (
		<footer className="bg-bg">
			{/* CTA band */}
			<div
				className="border-line border-b px-8 py-[160px] pb-[140px] text-center"
				style={{
					background:
						'radial-gradient(70% 60% at 50% 0%, color-mix(in oklab, var(--acc) 10%, transparent) 0%, transparent 60%), var(--bg)',
				}}
				id="close"
			>
				<h2
					className="mb-7 font-serif leading-[0.98] font-normal tracking-[-0.025em] text-balance"
					style={{ fontSize: 'clamp(48px, 6.5vw, 92px)' }}
				>
					Stop rebuilding
					<br />
					the story at every <span className="text-acc italic">handoff.</span>
				</h2>
				<p className="lede mx-auto mb-8">
					We&apos;ll walk through Altr using your actual workflow, your stack,
					and your review standards — and show you where the loop closes.
				</p>
				<EmailForm />
				<div className="text-ink-4 mt-[18px] font-mono text-[11px] tracking-widest">
					founder-led onboarding · no spam · unsubscribe anytime
				</div>
			</div>

			{/* Link grid */}
			<div
				className="mx-auto grid max-w-[var(--maxw)] gap-12 px-8 py-16"
				style={{ gridTemplateColumns: '1.4fr repeat(4, 1fr)' }}
			>
				{/* Brand col */}
				<div>
					<a
						href="/"
						className="inline-flex items-center leading-none text-current no-underline"
					>
						<LogoMark className="h-[26px]" />
						<span className="sr-only">Altr</span>
					</a>
					<p className="text-ink-2 mt-3.5 max-w-[28ch] font-serif text-[16px] leading-[1.4] italic">
						One execution loop for product teams and agents.
					</p>
					<div className="text-ink-4 mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wide">
						<span className="border-line rounded-full border px-2.5 py-0.5">
							your workspace, your Mac
						</span>
						<span className="border-line rounded-full border px-2.5 py-0.5">
							BYOK
						</span>
						<span className="border-line rounded-full border px-2.5 py-0.5">
							mac-native
						</span>
					</div>
				</div>

				{/* Product col */}
				<div>
					<div className="text-ink-4 mb-4 font-mono text-[10.5px] font-medium tracking-widest uppercase">
						Product
					</div>
					<a href="/#workflow" className={NAV_LINK}>
						Workflow
					</a>
					<a href="/#agents" className={NAV_LINK}>
						Agents
					</a>
					<a href="/#stack" className={NAV_LINK}>
						Stack
					</a>
					<a href="/#playground" className={NAV_LINK}>
						Try it
					</a>
					<a href="/changelog" className={NAV_LINK}>
						Changelog
					</a>
				</div>

				{/* Use cases col */}
				<div>
					<div className="text-ink-4 mb-4 font-mono text-[10.5px] font-medium tracking-widest uppercase">
						Use cases
					</div>
					{useCases.map(([slug, uc]) => (
						<a key={slug} href={`/use-cases/${slug}`} className={NAV_LINK}>
							{uc.title}
						</a>
					))}
					<a href="/use-cases" className={NAV_LINK + ' text-acc'}>
						All use cases →
					</a>
				</div>

				{/* Compare col */}
				<div>
					<div className="text-ink-4 mb-4 font-mono text-[10.5px] font-medium tracking-widest uppercase">
						Compare
					</div>
					{comparePages.map(([slug, cp]) => (
						<a key={slug} href={`/compare/${slug}`} className={NAV_LINK}>
							vs {cp.competitor}
						</a>
					))}
					<a href="/compare" className={NAV_LINK + ' text-acc'}>
						All comparisons →
					</a>
				</div>

				{/* Connect col */}
				<div>
					<div className="text-ink-4 mb-4 font-mono text-[10.5px] font-medium tracking-widest uppercase">
						Connect
					</div>
					{integrations.map(([slug, int]) => (
						<a key={slug} href={`/integrations/${slug}`} className={NAV_LINK}>
							{int.tool}
						</a>
					))}
					<a href="/integrations" className={NAV_LINK + ' text-acc'}>
						All integrations →
					</a>
					<a href="/#faq" className={NAV_LINK}>
						FAQ
					</a>
				</div>
			</div>

			{/* Legal links bar */}
			<div className="border-line mx-auto flex max-w-[var(--maxw)] flex-wrap gap-x-5 gap-y-1.5 border-t px-8 pt-5 pb-4">
				{legalPages.map(([slug, page]) => (
					<a
						key={slug}
						href={`/legal/${slug}`}
						className="text-ink-4 hover:text-ink-2 font-mono text-[11px] no-underline transition-colors"
					>
						{page.title}
					</a>
				))}
			</div>

			{/* Bottom bar */}
			<div className="text-ink-4 mx-auto flex max-w-[var(--maxw)] justify-between px-8 pt-4 pb-10 font-mono text-[11px] tracking-widest">
				<span>© 2026 altr labs, inc.</span>
				<span>shipped with altr · v0.1.2026</span>
			</div>
		</footer>
	)
}
