import type { Form } from '@/sanity/types'
import { Button } from '@/components/ui/button'
import { Input, InputWrapper, Textarea } from '@/components/ui/input'

export default function ({ form }: { form: Form }) {
	return (
		<form className="grid gap-4" action={form.endpoint} method="POST">
			<label className="grid gap-1.5">
				<span className="font-sans text-[13px] font-medium text-[var(--ink-2)]">Name</span>
				<InputWrapper>
					<Input
						name="name"
						type="text"
						autoComplete="name"
						placeholder="Your name"
					/>
				</InputWrapper>
			</label>

			<label className="grid gap-1.5">
				<span className="font-sans text-[13px] font-medium text-[var(--ink-2)]">Email</span>
				<InputWrapper>
					<Input
						name="email"
						type="email"
						autoComplete="email"
						placeholder="you@company.com"
						required
					/>
				</InputWrapper>
			</label>

			<label className="grid gap-1.5">
				<span className="font-sans text-[13px] font-medium text-[var(--ink-2)]">Message</span>
				<InputWrapper className="items-start py-3">
					<Textarea
						name="message"
						placeholder="What are you trying to solve?"
						rows={4}
					/>
				</InputWrapper>
			</label>

			<Button variant="acc" className="w-full max-md:w-full justify-center mt-1" type="submit">
				Send message
			</Button>
		</form>
	)
}
