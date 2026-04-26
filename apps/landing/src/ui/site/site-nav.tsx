'use client'

import HoverDetails from '@/ui/hover-details'
import LogoMark from '@/ui/home/logo-mark'
import { COMPARE_PAGES, INTEGRATIONS, USE_CASES } from '@/content'

// ── Link style helpers ────────────────────────────────────────────────────────

const NAV_TRIGGER =
	'text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink cursor-pointer list-none flex items-center gap-1 [&::-webkit-details-marker]:hidden'

const PANEL_HEADING =
	'font-mono text-[9.5px] tracking-[0.14em] uppercase text-ink-4 mb-3 font-semibold'

const MEGA_ITEM =
	'flex items-start gap-3 py-2 no-underline rounded-[10px] px-2.5 -mx-2.5 transition-colors hover:bg-[color-mix(in_oklab,var(--acc)_4%,var(--bg-1))] group/item'

const DROPDOWN_ITEM =
	'block text-[13px] text-ink-2 py-1.5 no-underline hover:text-ink transition-colors leading-snug'

// ── Chevron icon ──────────────────────────────────────────────────────────────

function ChevronIcon() {
	return (
		<svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" className="opacity-40">
			<path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

// ── Panel wrappers ────────────────────────────────────────────────────────────

function MegaPanel({ children }: { children: React.ReactNode }) {
	return (
		<div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-(--panel-strong) border border-(--line) rounded-[var(--r-xl)] shadow-[var(--sh-lg)] p-6 min-w-[760px] z-50">
			{children}
		</div>
	)
}

function DropdownPanel({ children }: { children: React.ReactNode }) {
	return (
		<div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-(--panel-strong) border border-(--line) rounded-[var(--r-lg)] shadow-[var(--sh-lg)] p-4 min-w-[220px] z-50">
			{children}
		</div>
	)
}

// ── Bottom strip shared between mega panels ───────────────────────────────────

function MegaPanelFooter({ links }: { links: { label: string; href: string }[] }) {
	return (
		<div className="border-t border-(--line) mt-5 pt-4 flex items-center justify-between">
			<div className="flex items-center gap-5">
				{links.map((link) => (
					<a
						key={link.label}
						href={link.href}
						className="font-mono text-[11px] tracking-[0.06em] text-ink-4 no-underline hover:text-ink transition-colors"
					>
						{link.label}
					</a>
				))}
			</div>
			<a href="#close" className="btn btn-acc btn-sm">
				Request access →
			</a>
		</div>
	)
}

// ── Product menu ──────────────────────────────────────────────────────────────

const WORKFLOW_ITEMS = [
	{
		mark: '■',
		href: '/product/workflow',
		title: 'Capture & Spec',
		desc: 'Thread → brief → AC in 18 minutes. No reconstruction.',
	},
	{
		mark: '▲',
		href: '/product/stack',
		title: 'Build & Review',
		desc: 'Worktrees opened, criteria attached through merge.',
	},
]

const AGENT_ITEMS = [
	{
		mark: '■',
		href: '/product/agents',
		title: 'Pax — PM',
		desc: 'Structures work, drafts specs, tracks open decisions.',
		badge: 'Early access',
		badgeCls: 'badge badge-acc',
	},
	{
		mark: '▲',
		href: '/product/agents',
		title: 'Eng — Builder',
		desc: 'Writes, reviews, and ships in isolated git worktrees.',
		badge: null,
		badgeCls: '',
	},
	{
		mark: '●',
		href: '/product/agents',
		title: 'Dex — Design',
		desc: 'Design tokens, UI audit, and component specs.',
		badge: 'Q3 2026',
		badgeCls: 'badge badge-soon',
	},
]

const TOP_INTEGRATIONS = [
	{ abbr: 'SL', label: 'Slack',   desc: 'Feature threads',  slug: 'slack',   color: '#4A154B', bg: 'rgba(74,21,75,0.10)' },
	{ abbr: 'GH', label: 'GitHub',  desc: 'PR events & CI',   slug: 'github',  color: '#1a1a1a', bg: 'rgba(26,26,26,0.08)' },
	{ abbr: 'LN', label: 'Linear',  desc: 'Issue updates',    slug: 'linear',  color: '#635BFF', bg: 'rgba(99,91,255,0.10)' },
	{ abbr: 'NT', label: 'Notion',  desc: 'Product specs',    slug: 'notion',  color: '#1a1a1a', bg: 'rgba(26,26,26,0.06)' },
]

function ProductMenu() {
	return (
		<HoverDetails safeAreaOnHover closeAfterNavigate className="relative">
			<summary className={NAV_TRIGGER}>
				Product
				<ChevronIcon />
			</summary>
			<MegaPanel>
				<div className="grid grid-cols-3 gap-8 divide-x divide-(--line)">

					{/* Col 1: Workflow */}
					<div>
						<div className={PANEL_HEADING}>How it works</div>
						{WORKFLOW_ITEMS.map((item) => (
							<a key={item.href + item.title} href={item.href} className={MEGA_ITEM}>
								<span className="text-acc text-[13px] leading-none mt-[2px] flex-shrink-0 w-4">{item.mark}</span>
								<div>
									<div className="text-[13px] font-semibold text-ink leading-snug">{item.title}</div>
									<div className="text-[12px] text-ink-3 mt-0.5 leading-snug">{item.desc}</div>
								</div>
							</a>
						))}
						<a
							href="/#playground"
							className="font-mono text-[11px] tracking-[0.06em] text-acc no-underline hover:underline mt-3 inline-block"
						>
							Try the playground →
						</a>
					</div>

					{/* Col 2: Agents */}
					<div className="pl-8">
						<div className={PANEL_HEADING}>Agents</div>
						{AGENT_ITEMS.map((agent) => (
							<a key={agent.title} href={agent.href} className={MEGA_ITEM}>
								<span className="text-acc text-[13px] leading-none mt-[2px] flex-shrink-0 w-4">{agent.mark}</span>
								<div>
									<div className="flex items-center gap-1.5 flex-wrap">
										<span className="text-[13px] font-semibold text-ink leading-snug">{agent.title}</span>
										{agent.badge && (
											<span className={agent.badgeCls}>{agent.badge}</span>
										)}
									</div>
									<div className="text-[12px] text-ink-3 mt-0.5 leading-snug">{agent.desc}</div>
								</div>
							</a>
						))}
					</div>

					{/* Col 3: Integrations */}
					<div className="pl-8">
						<div className={PANEL_HEADING}>Integrations</div>
						{TOP_INTEGRATIONS.map((int) => (
							<a key={int.abbr} href={`/integrations/${int.slug}`} className={MEGA_ITEM}>
								<span
									className="flex-shrink-0 w-[20px] h-[20px] rounded-[4px] flex items-center justify-center font-mono text-[8px] font-bold border border-(--line) mt-[1px]"
									style={{ background: int.bg, color: int.color }}
								>
									{int.abbr}
								</span>
								<div>
									<div className="text-[13px] font-semibold text-ink leading-snug">{int.label}</div>
									<div className="text-[11px] text-ink-4 mt-0.5">{int.desc}</div>
								</div>
							</a>
						))}
						<a
							href="/integrations"
							className="font-mono text-[11px] tracking-[0.06em] text-acc no-underline hover:underline mt-3 inline-block"
						>
							All 6 integrations →
						</a>
					</div>
				</div>

				<MegaPanelFooter
					links={[
						{ label: 'Changelog', href: '/changelog' },
						{ label: 'Security', href: '/security' },
						{ label: 'Blog', href: '/blog' },
					]}
				/>
			</MegaPanel>
		</HoverDetails>
	)
}

// ── Solutions / Use cases menu ────────────────────────────────────────────────

const USE_CASE_GROUPS = {
	'Engineering': ['feature-delivery', 'bug-triage', 'pr-review'],
	'Operations': ['migrations', 'release-follow-through', 'incident-follow-up'],
} as const

function SolutionsMenu() {
	const useCases = USE_CASES as Record<string, { title: string; problem?: string | null }>

	return (
		<HoverDetails safeAreaOnHover closeAfterNavigate className="relative">
			<summary className={NAV_TRIGGER}>
				Solutions
				<ChevronIcon />
			</summary>
			<MegaPanel>
				<div className="grid grid-cols-2 gap-8 divide-x divide-(--line)">
					{Object.entries(USE_CASE_GROUPS).map(([group, slugs]) => (
						<div key={group} className={group === 'Operations' ? 'pl-8' : ''}>
							<div className={PANEL_HEADING}>{group}</div>
							{slugs.map((slug) => {
								const uc = useCases[slug]
								if (!uc) return null
								return (
									<a key={slug} href={`/use-cases/${slug}`} className={MEGA_ITEM}>
										<span className="text-acc text-[11px] font-mono leading-none mt-[3px] flex-shrink-0">→</span>
										<div>
											<div className="text-[13px] font-semibold text-ink leading-snug">{uc.title}</div>
											{uc.problem && (
												<div className="text-[12px] text-ink-3 mt-0.5 leading-snug line-clamp-1">
													{uc.problem.slice(0, 58)}…
												</div>
											)}
										</div>
									</a>
								)
							})}
						</div>
					))}
				</div>

				<MegaPanelFooter
					links={[
						{ label: 'All use cases', href: '/use-cases' },
						{ label: 'Changelog', href: '/changelog' },
					]}
				/>
			</MegaPanel>
		</HoverDetails>
	)
}

// ── Integrations menu ─────────────────────────────────────────────────────────

function IntegrationsMenu() {
	const integrations = Object.entries(INTEGRATIONS) as [string, { tool: string; domain?: string; category?: string | null }][]
	return (
		<HoverDetails safeAreaOnHover closeAfterNavigate className="relative">
			<summary className={NAV_TRIGGER}>
				Integrations
				<ChevronIcon />
			</summary>
			<DropdownPanel>
				<div className={PANEL_HEADING + ' mb-3'}>Signal sources</div>
				{integrations.map(([slug, int]) => (
					<a key={slug} href={`/integrations/${slug}`} className={DROPDOWN_ITEM}>
						<span className="block text-ink text-[13px] font-medium leading-snug">{int.tool}</span>
						{int.category && (
							<span className="block text-ink-4 text-[11px] font-mono tracking-widest uppercase">{int.category}</span>
						)}
					</a>
				))}
				<div className="border-t border-(--line) mt-2 pt-2">
					<a href="/integrations" className="text-[12px] text-acc font-mono no-underline hover:underline">
						All integrations →
					</a>
				</div>
			</DropdownPanel>
		</HoverDetails>
	)
}

// ── Compare menu ──────────────────────────────────────────────────────────────

function CompareMenu() {
	const comparePages = Object.entries(COMPARE_PAGES)
	return (
		<HoverDetails safeAreaOnHover closeAfterNavigate className="relative">
			<summary className={NAV_TRIGGER}>
				Compare
				<ChevronIcon />
			</summary>
			<DropdownPanel>
				<div className={PANEL_HEADING + ' mb-3'}>Altr vs.</div>
				{comparePages.map(([slug, cp]) => (
					<a key={slug} href={`/compare/${slug}`} className={DROPDOWN_ITEM}>
						<span className="block text-ink text-[13px] font-medium">{cp.competitor}</span>
					</a>
				))}
				<div className="border-t border-(--line) mt-2 pt-2">
					<a href="/compare" className="text-[12px] text-acc font-mono no-underline hover:underline">
						All comparisons →
					</a>
				</div>
			</DropdownPanel>
		</HoverDetails>
	)
}

// ── Main nav ──────────────────────────────────────────────────────────────────

export default function SiteNav() {
	return (
		<nav className="fixed top-[14px] left-0 right-0 z-80 px-5 bg-transparent pointer-events-none">
			<div className="nav-pill pointer-events-auto">
				{/* Left: logo */}
				<div className="justify-self-start flex items-center gap-[14px]">
					<a
						href="/"
						className="text-inherit inline-flex items-center no-underline leading-none"
					>
						<LogoMark className="block w-auto h-[22px]" />
						<span className="sr-only">Altr</span>
					</a>
				</div>

				{/* Center: nav items */}
				<div className="flex items-center gap-5">
					<ProductMenu />
					<SolutionsMenu />
					<IntegrationsMenu />
					<CompareMenu />
					<a
						href="/blog"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Blog
					</a>
					<a
						href="/security"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Security
					</a>
					<a
						href="/#faq"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						FAQ
					</a>
				</div>

				{/* Right: CTAs */}
				<div className="flex items-center gap-[14px] justify-self-end">
					<a href="#close" className="text-[13px] text-ink-2 no-underline hover:text-ink transition-colors">
						Sign in
					</a>
					<a href="#close" className="btn btn-acc">
						Request access →
					</a>
				</div>
			</div>
		</nav>
	)
}
