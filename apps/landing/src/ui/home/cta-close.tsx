'use client'

import s from './home.module.css'

export default function CTAClose() {
	return (
		<section className={s.close} id="close">
			<h2 className={s.closeH2}>
				Stop rebuilding
				<br />
				the story at every <span className={s.acc}>handoff.</span>
			</h2>
			<p className={s.lede} style={{ margin: '0 auto 32px' }}>
				We&apos;ll walk through Altr using your actual workflow, your stack,
				and your review standards — and show you where the loop closes.
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
