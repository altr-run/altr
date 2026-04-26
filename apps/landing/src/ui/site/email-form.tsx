'use client'

export default function EmailForm() {
	return (
		<form
			className="inline-flex gap-2 items-center py-[6px] px-[6px] pl-[22px] rounded-full bg-surface border border-line-2 shadow-sm min-w-[460px] max-w-full focus-within:border-[color-mix(in_oklab,var(--acc)_38%,var(--line-2))]"
			style={{ ['--focus-ring' as string]: 'none' }}
			onSubmit={(e) => {
				e.preventDefault()
				const input = e.currentTarget.querySelector('input')
				const btn = e.currentTarget.querySelector('button')
				if (input) input.value = ''
				if (btn) btn.textContent = '✓ on the list'
			}}
		>
			<input
				type="email"
				required
				placeholder="you@company.com"
				className="flex-1 border-0 outline-none bg-transparent font-sans text-[15px] text-ink py-[10px] placeholder:text-ink-4"
			/>
			<button type="submit" className="btn btn-acc">
				Request access →
			</button>
		</form>
	)
}
