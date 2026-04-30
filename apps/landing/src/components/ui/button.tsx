import * as React from 'react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'default' | 'primary' | 'ghost' | 'acc' | 'outline' | 'bare'
export type ButtonSize = 'default' | 'sm' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	asChild?: boolean
}

const variantClass: Record<ButtonVariant, string> = {
	default: 'btn',
	primary: 'btn btn-primary',
	ghost: 'btn btn-ghost',
	acc: 'btn btn-acc',
	outline: 'btn btn-ghost',
	bare: 'cursor-pointer bg-transparent border-0 p-0 m-0 appearance-none',
}

const sizeClass: Record<ButtonSize, string> = {
	default: '',
	sm: 'btn-sm',
	lg: 'btn-lg',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'default', size = 'default', ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(variantClass[variant], sizeClass[size], className)}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button }
