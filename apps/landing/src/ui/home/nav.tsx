import LogoMark from './logo-mark'

export default function Nav() {
	return (
		<nav className="sticky top-[14px] z-80 px-5 bg-transparent">
			<div className="nav-pill">
				<div className="justify-self-start flex items-center gap-[14px]">
					<a
						href="/"
						className="text-inherit inline-flex items-center no-underline leading-none"
					>
						<LogoMark className="block w-auto h-[22px]" />
						<span className="sr-only">Altr</span>
					</a>
				</div>
				<div className="flex items-center gap-5">
					<a
						href="#workflow"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Workflow
					</a>
					<a
						href="/use-cases"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Use cases
					</a>
					<a
						href="/integrations"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Integrations
					</a>
					<a
						href="/compare"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Compare
					</a>
					<a
						href="#faq"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						FAQ
					</a>
				</div>
				<div className="flex items-center gap-[14px] justify-self-end">
					<a
						href="#close"
						className="text-[14px] text-ink-2 no-underline"
					>
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
