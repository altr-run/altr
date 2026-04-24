import LogoMark from '@/ui/home/logo-mark'
import { COMPARE_PAGES, INTEGRATIONS, USE_CASES } from '@/content'
import EmailForm from './email-form'

const NAV_LINK =
	'block text-[14px] text-ink-2 py-[5px] transition-colors hover:text-ink no-underline'

export default function SiteFooter() {
	const useCases = Object.entries(USE_CASES)
	const comparePages = Object.entries(COMPARE_PAGES)
	const integrations = Object.entries(INTEGRATIONS)

	return (
		<footer className="bg-bg">
			{/* CTA band */}
			<div className="border-b border-line py-16 px-8 text-center">
				<h2
					className="font-serif font-normal tracking-[-0.025em] leading-[0.98] mb-5 text-balance"
					style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
				>
					Stop rebuilding the story
					<br />
					at every{' '}
					<span className="text-acc italic">handoff.</span>
				</h2>
				<p className="text-ink-2 text-[16px] leading-relaxed mb-7 max-w-xl mx-auto">
					We'll walk through Altr using your actual workflow, your stack, and
					your review standards.
				</p>
				<EmailForm />
				<div className="mt-[18px] font-mono text-[11px] text-ink-4 tracking-widest">
					founder-led onboarding · no spam · unsubscribe anytime
				</div>
			</div>

			{/* Link grid */}
			<div
				className="max-w-[var(--maxw)] mx-auto py-16 px-8 grid gap-12"
				style={{ gridTemplateColumns: '1.4fr repeat(4, 1fr)' }}
			>
				{/* Brand col */}
				<div>
					<a
						href="/"
						className="inline-flex items-center no-underline text-current leading-none"
					>
						<LogoMark className="h-[26px]" />
						<span className="sr-only">Altr</span>
					</a>
					<p className="font-serif italic text-[16px] text-ink-2 mt-3.5 max-w-[28ch] leading-[1.4]">
						One execution loop for product teams and agents.
					</p>
					<div className="mt-5 flex items-center gap-2 flex-wrap font-mono text-[10px] tracking-wide text-ink-4">
						<span className="border border-line rounded-full px-2.5 py-0.5">
							local-first
						</span>
						<span className="border border-line rounded-full px-2.5 py-0.5">
							BYOK
						</span>
						<span className="border border-line rounded-full px-2.5 py-0.5">
							mac-native
						</span>
					</div>
				</div>

				{/* Product col */}
				<div>
					<div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">
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
					<div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">
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
					<div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">
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
					<div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 mb-4 font-medium">
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

			{/* Bottom bar */}
			<div className="max-w-[var(--maxw)] mx-auto px-8 pb-10 border-t border-line flex justify-between font-mono text-[11px] text-ink-4 tracking-widest pt-6">
				<span>© 2026 altr labs, inc.</span>
				<span>shipped with altr · v0.1.2026</span>
			</div>
		</footer>
	)
}
