import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				ref={ref}
				className={cn(
					'flex-1 border-0 outline-none bg-transparent font-sans text-ink placeholder:text-ink-4',
					className,
				)}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }
