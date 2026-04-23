'use client'

import s from './home.module.css'

export default function CTAClose() {
	return (
		<section className={s.close} id="close">
			<h2 className={s.closeH2}>
				Bring your next
				<br />
				product loop into <span className={s.acc}>one room.</span>
			</h2>
			<p className={s.lede} style={{ margin: '0 auto 32px' }}>
				If your team is tired of rebuilding context between every handoff,
				we&apos;ll walk you through Altr with your own workflow, your own
				stack, and your own standards.
			</p>
			<form
				className={s.closeForm}
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
					className={s.closeFormInput}
				/>
				<button type="submit" className={`${s.btn} ${s.btnAcc}`}>
					Request access →
				</button>
			</form>
			<div className={s.closeNote}>
				founder-led onboarding · no spam · unsubscribe anytime
			</div>
		</section>
	)
}
