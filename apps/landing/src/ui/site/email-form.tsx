'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function EmailForm() {
	const inputRef = useRef<HTMLInputElement>(null)
	const btnRef = useRef<HTMLButtonElement>(null)

	return (
		<form
			className="inline-flex gap-2 items-center py-2 px-2 pl-8 rounded-full bg-surface border border-line shadow-sm min-w-[520px] max-w-full focus-within:border-[color-mix(in_oklab,var(--acc)_38%,var(--line))]"
			style={{ ['--focus-ring' as string]: 'none' }}
			onSubmit={(e) => {
				e.preventDefault()
				if (inputRef.current) inputRef.current.value = ''
				if (btnRef.current) btnRef.current.textContent = '✓ on the list'
			}}
		>
			<Input
				ref={inputRef}
				type="email"
				required
				placeholder="you@company.com"
				className="text-[17px] py-[14px]"
			/>
			<Button ref={btnRef} type="submit" variant="acc" size="lg" className="px-8">
				Request access →
			</Button>
		</form>
	)
}
