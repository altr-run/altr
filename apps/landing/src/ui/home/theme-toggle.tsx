'use client'

import { useEffect, useState } from 'react'
import s from './home.module.css'

export default function ThemeToggle() {
	const [dark, setDark] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('altr-theme')
		if (saved === 'dark') {
			setDark(true)
			document.documentElement.dataset.theme = 'dark'
		}
	}, [])

	function toggle() {
		const next = !dark
		setDark(next)
		document.documentElement.dataset.theme = next ? 'dark' : 'light'
		localStorage.setItem('altr-theme', next ? 'dark' : 'light')
	}

	return (
		<button
			onClick={toggle}
			className={s.themeToggle}
			aria-label="Toggle dark mode"
		>
			{dark ? '☀' : '☽'}
		</button>
	)
}
