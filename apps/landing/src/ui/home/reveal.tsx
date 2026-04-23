'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import s from './home.module.css'

export default function Reveal({
	children,
	className,
	delay = 0,
}: {
	children: ReactNode
	className?: string
	delay?: number
}) {
	const ref = useRef<HTMLDivElement>(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					if (delay > 0) {
						const t = setTimeout(() => setVisible(true), delay)
						return () => clearTimeout(t)
					}
					setVisible(true)
					observer.unobserve(el)
				}
			},
			{ threshold: 0.15 },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [delay])

	return (
		<div
			ref={ref}
			className={[s.reveal, visible && s.revealVisible, className]
				.filter(Boolean)
				.join(' ')}
		>
			{children}
		</div>
	)
}
