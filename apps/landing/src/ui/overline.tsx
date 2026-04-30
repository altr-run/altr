import { stegaClean } from 'next-sanity'

export default function ({ value, className }: { value?: string; className?: string }) {
	if (!value) return null

	return (
		<p className={['technical text-foreground/50 text-sm', className].filter(Boolean).join(' ')}>{stegaClean(value)}</p>
	)
}
