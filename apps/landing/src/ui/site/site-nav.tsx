'use client'

import HoverDetails from '@/ui/hover-details'
import LogoMark from '@/ui/home/logo-mark'
import { COMPARE_PAGES, INTEGRATIONS, USE_CASES } from '@/content'

// ── Link style helpers ────────────────────────────────────────────────────────

const NAV_TRIGGER =
	'text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink cursor-pointer list-none flex items-center gap-1 [&::-webkit-details-marker]:hidden'

const PANEL_LINK =
	'block text-[13px] text-ink-2 py-1.5 no-underline hover:text-ink transition-colors leading-snug'

const PANEL_HEADING =
	'font-mono text-[10px] tracking-widest uppercase text-ink-4 mb-2 font-medium'

// ── Mega panel wrapper ────────────────────────────────────────────────────────

function MegaPanel({ children }: { children: React.ReactNode }) {
	return (
		<div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-(--panel-strong) border border-(--line) rounded-[var(--r-xl)] shadow-[var(--sh-lg)] p-6 min-w-[520px] z-50">
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

// ── Nav items ─────────────────────────────────────────────────────────────────

function ProductMenu() {
	return (
		<HoverDetails safeAreaOnHover closeAfterNavigate className="relative">
			<summary className={NAV_TRIGGER}>
				Product
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					aria-hidden="true"
					className="opacity-40"
				>
					<path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</summary>
			<MegaPanel>
				<div className="grid grid-cols-2 gap-6">
					<div>
						<div className={PANEL_HEADING}>Platform</div>
						<a href="/#workflow" className={PANEL_LINK}>
							Workflow
						</a>
						<a href="/#agents" className={PANEL_LINK}>
							Agents
						</a>
						<a href="/#stack" className={PANEL_LINK}>
							Stack
						</a>
						<a href="/#playground" className={PANEL_LINK}>
							Try it
						</a>
					</div>
					<div>
						<div className={PANEL_HEADING}>Updates</div>
						<a href="/changelog" className={PANEL_LINK}>
							Changelog
						</a>
					</div>
				</div>
			</MegaPanel>
		</HoverDetails>
	)
}

function SolutionsMenu() {
	const useCases = Object.entries(USE_CASES)
	return (
		<HoverDetails safeAreaOnHover closeAfterNavigate className="relative">
			<summary className={NAV_TRIGGER}>
				Solutions
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					aria-hidden="true"
					className="opacity-40"
				>
					<path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</summary>
			<MegaPanel>
				<div className={PANEL_HEADING + ' mb-3'}>Use cases</div>
				<div className="grid grid-cols-2 gap-x-6">
					{useCases.map(([slug, uc]) => (
						<a key={slug} href={`/use-cases/${slug}`} className={PANEL_LINK}>
							<span className="block text-ink text-[13px] font-medium leading-snug">
								{uc.title}
							</span>
							{uc.problem && (
								<span className="block text-ink-3 text-[12px] mt-0.5 leading-snug line-clamp-1">
									{uc.problem.slice(0, 60)}…
								</span>
							)}
						</a>
					))}
				</div>
				<div className="border-t border-line mt-4 pt-3">
					<a
						href="/use-cases"
						className="text-[12px] text-acc font-mono no-underline hover:underline"
					>
						All use cases →
					</a>
				</div>
			</MegaPanel>
		</HoverDetails>
	)
}

function IntegrationsMenu() {
	const integrations = Object.entries(INTEGRATIONS)
	return (
		<HoverDetails safeAreaOnHover closeAfterNavigate className="relative">
			<summary className={NAV_TRIGGER}>
				Integrations
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					aria-hidden="true"
					className="opacity-40"
				>
					<path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</summary>
			<DropdownPanel>
				<div className={PANEL_HEADING + ' mb-2'}>Integrations</div>
				{integrations.map(([slug, int]) => (
					<a key={slug} href={`/integrations/${slug}`} className={PANEL_LINK}>
						{int.tool}
					</a>
				))}
				<div className="border-t border-line mt-2 pt-2">
					<a
						href="/integrations"
						className="text-[12px] text-acc font-mono no-underline hover:underline"
					>
						All integrations →
					</a>
				</div>
			</DropdownPanel>
		</HoverDetails>
	)
}

function CompareMenu() {
	const comparePages = Object.entries(COMPARE_PAGES)
	return (
		<HoverDetails safeAreaOnHover closeAfterNavigate className="relative">
			<summary className={NAV_TRIGGER}>
				Compare
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					aria-hidden="true"
					className="opacity-40"
				>
					<path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</summary>
			<DropdownPanel>
				<div className={PANEL_HEADING + ' mb-2'}>Compare</div>
				{comparePages.map(([slug, cp]) => (
					<a key={slug} href={`/compare/${slug}`} className={PANEL_LINK}>
						vs {cp.competitor}
					</a>
				))}
				<div className="border-t border-line mt-2 pt-2">
					<a
						href="/compare"
						className="text-[12px] text-acc font-mono no-underline hover:underline"
					>
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
		<nav className="sticky top-[14px] z-80 px-5 bg-transparent">
			<div className="nav-pill">
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
						href="/#faq"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						FAQ
					</a>
				</div>

				{/* Right: CTAs */}
				<div className="flex items-center gap-[14px] justify-self-end">
					<a href="#close" className="text-[14px] text-ink-2 no-underline">
						Sign in
					</a>
					<a href="#close" className="btn btn-primary">
						Request access →
					</a>
				</div>
			</div>
		</nav>
	)
}
