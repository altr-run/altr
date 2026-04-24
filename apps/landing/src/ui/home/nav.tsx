'use client'

import { useEffect, useRef } from 'react'
import LogoMark from './logo-mark'

export default function Nav() {
	const ref = useRef<HTMLElement>(null)

	useEffect(() => {
		const zones = Array.from(
			document.querySelectorAll<HTMLElement>('[data-nav-theme]'),
		)
		if (zones.length === 0) return

		let frame = 0

		function readTone() {
			const navEl = ref.current
			const navRect = navEl?.getBoundingClientRect()
			const probeY = navRect ? navRect.top + navRect.height / 2 : 56

			zones.find((zone) => {
				const rect = zone.getBoundingClientRect()
				return rect.top <= probeY && rect.bottom >= probeY
			}) ?? zones[0]
		}

		function onChange() {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(readTone)
		}

		readTone()
		window.addEventListener('scroll', onChange, { passive: true })
		window.addEventListener('resize', onChange)

		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('scroll', onChange)
			window.removeEventListener('resize', onChange)
		}
	}, [])

	return (
		<nav
			ref={ref}
			className="sticky top-[14px] z-80 px-5 bg-transparent"
		>
			<div className="nav-pill">
				<div className="justify-self-start flex items-center gap-[14px]">
					<a
						href="#"
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
						href="#agents"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Agents
					</a>
					<a
						href="#stack"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Stack
					</a>
					<a
						href="#security"
						className="text-[13px] tracking-[0.01em] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
					>
						Security
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
