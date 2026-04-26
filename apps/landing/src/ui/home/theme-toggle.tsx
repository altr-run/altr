'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const [dark, setDark] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('altr-theme')
		if (saved === 'dark') {
			setDark(true)
			document.documentElement.classList.add('dark')
		}
	}, [])

	function toggle() {
		const next = !dark
		setDark(next)
		document.documentElement.classList.toggle('dark', next)
		localStorage.setItem('altr-theme', next ? 'dark' : 'light')
	}

	return (
		<button
			onClick={toggle}
			aria-label="Toggle dark mode"
			className="font-mono text-[11px] text-ink-3 hover:text-ink transition-colors cursor-pointer"
		>
			{dark ? '☀' : '☽'}
		</button>
	)
}
