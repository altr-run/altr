'use client'

import { useState, type ComponentProps } from 'react'
import { VscCheck, VscCopy } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function ({
	value,
	className,
	children = <VscCopy />,
	childrenWhenCopied = <VscCheck />,
	...props
}: {
	value?: string
	childrenWhenCopied?: React.ReactNode
} & ComponentProps<'button'>) {
	const [copied, setCopied] = useState(false)

	return (
		<Button
			variant="bare"
			className={cn(
				'cursor-copy',
				copied && 'copied pointer-events-none',
				className,
			)}
			onClick={async () => {
				if (typeof window === 'undefined' || !value) return

				await navigator.clipboard.writeText(value)

				setCopied(true)
				setTimeout(() => setCopied(false), 1000)
			}}
			title="Click to copy"
			{...props}
		>
			{copied ? childrenWhenCopied : children}
		</Button>
	)
}
