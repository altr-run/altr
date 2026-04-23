'use client'

import { useEffect, useRef, useState } from 'react'
import s from './home.module.css'

export default function Nav() {
	const ref = useRef<HTMLElement>(null)
	const [tone, setTone] = useState<'dark' | 'light'>('dark')

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

			const active =
				zones.find((zone) => {
					const rect = zone.getBoundingClientRect()
					return rect.top <= probeY && rect.bottom >= probeY
				}) ?? zones[0]

			const nextTone =
				active.dataset.navTheme === 'light' ? 'light' : 'dark'
			setTone((current) => (current === nextTone ? current : nextTone))
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
			className={[s.nav, tone === 'light' ? s.navLight : s.navDark].join(
				' ',
			)}
		>
			<div className={s.navIn}>
				<div className={s.navLeft}>
					<a href="#" className={s.logo}>
						a<span className={s.logoSlash}>\</span>tr
					</a>
					<span className={s.navBadge}>
						v0.1 · <b>coming soon</b>
					</span>
				</div>
				<div className={s.navLinks}>
					<a href="#product">Product</a>
					<a href="#playground">Try it</a>
					<a href="#pricing">Pricing</a>
					<a href="#faq">FAQ</a>
					<a href="#manifesto">Manifesto</a>
				</div>
				<div className={s.navRight}>
					<a href="#close" className={s.navSignin}>
						Sign in
					</a>
					<a
						href="#close"
						className={`${s.btn} ${s.navCta}`}
					>
						Request access →
					</a>
				</div>
			</div>
		</nav>
	)
}
