'use client'

import s from './home.module.css'

export default function CTAClose() {
	return (
		<section className={s.close} id="close">
			<span className={s.chip}>
				<span className={s.chipDot} />
				private beta opens <b>soon</b>
			</span>
			<h2 className={s.closeH2}>
				Run your next
				<br />
				sprint with <span className={s.acc}>Altr.</span>
			</h2>
			<p className={s.lede} style={{ margin: '0 auto 32px' }}>
				Request access and we&apos;ll send your invite on day one of the
				beta, before the waitlist sees it.
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
				no spam · unsubscribe anytime
			</div>
		</section>
	)
}
