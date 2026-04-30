'use client'

import { Button } from '@/components/ui/button'
import LogoMark from './logo-mark'

const NAV_LINKS = [
	{ label: 'Workflow', href: '#workflow' },
	{ label: 'Use cases', href: '/use-cases' },
	{ label: 'Integrations', href: '/integrations' },
	{ label: 'Compare', href: '/compare' },
	{ label: 'FAQ', href: '#faq' },
]

export default function Nav() {
	return (
		<nav className="sticky top-[14px] z-80 px-5 bg-transparent">
			<div className="nav-pill">
				{/* Logo */}
				<div className="justify-self-start flex items-center gap-[14px]">
					<a
						href="/"
						className="text-inherit inline-flex items-center no-underline leading-none"
					>
						<LogoMark className="block w-auto h-[22px]" />
						<span className="sr-only">Altr</span>
					</a>
				</div>

				{/* Center links */}
				<div className="flex items-center gap-6">
					{NAV_LINKS.map(({ label, href }) => (
						<a
							key={label}
							href={href}
							className="text-[13px] tracking-[-0.005em] text-[var(--ink-2)] no-underline transition-colors duration-150 hover:text-[var(--ink)]"
						>
							{label}
						</a>
					))}
				</div>

				{/* Right CTAs */}
				<div className="flex items-center gap-3 justify-self-end">
					<a
						href="#close"
						className="text-[13px] text-[var(--ink-3)] no-underline transition-colors duration-150 hover:text-[var(--ink-2)] hidden sm:block"
					>
						Sign in
					</a>
					<Button variant="acc" size="sm" href="#close" className="font-[560] tracking-[-0.01em]">
						Request access →
					</Button>
				</div>
			</div>
		</nav>
	)
}
