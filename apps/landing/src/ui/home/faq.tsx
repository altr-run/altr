'use client'

import { useState } from 'react'
import s from './home.module.css'
import Reveal from './reveal'

const ITEMS = [
	{
		q: <>Where do my <em>files live?</em></>,
		a: 'On your Mac, encrypted at rest. Agents call models over your API keys; nothing becomes training data. Full details in the security whitepaper.',
	},
	{
		q: <>Which models power the <em>teammates?</em></>,
		a: '@spec runs on Claude Sonnet. @eng wraps Claude Code. BYO keys, or use ours with $20 of credits per seat per month on Studio.',
	},
	{
		q: <>How is this different from <em>Devin?</em></>,
		a: "Devin is an autonomous cloud engineer. Altr is a workspace where humans and several agents collaborate on your machine, with humans in the driver's seat. Different problem, different shape.",
	},
	{
		q: <>Do you have <em>SOC 2?</em></>,
		a: 'Type II audit in progress. Type I and DPA available today for Studio and Scale customers.',
	},
	{
		q: <>Can I <em>self-host?</em></>,
		a: 'Scale customers can run Altr on a dedicated instance, on-prem, or in a VPC of their choice. Talk to sales for specifics.',
	},
]

export default function FAQ() {
	const [openIdx, setOpenIdx] = useState<number | null>(null)

	return (
		<section className={s.faq} id="faq">
			<div className={s.faqIn}>
				<Reveal className={s.faqHead}>
					<div>
						<span className={s.over} style={{ display: 'inline-block', marginBottom: 16 }}>
							§ faq
						</span>
						<h2 className={s.h2}>
							Questions serious teams ask
							<br />
							<em>before they switch.</em>
						</h2>
					</div>
					<p className={s.lede}>
						If yours isn&apos;t here, write{' '}
						<a
							href="mailto:hello@altr.run"
							style={{
								color: 'var(--ink)',
								borderBottom: '1.5px solid var(--acc)',
								textDecoration: 'none',
							}}
						>
							hello@altr.run
						</a>{' '}
						— a human reads every one.
					</p>
				</Reveal>
				<Reveal>
					<div className={s.faqList}>
						{ITEMS.map((item, i) => (
							<div
								key={i}
								className={`${s.faqItem} ${openIdx === i ? s.faqItemOpen : ''}`}
							>
								<button
									className={s.faqQ}
									onClick={() => setOpenIdx(openIdx === i ? null : i)}
								>
									<span>{item.q}</span>
									<span className={s.faqIcon}>+</span>
								</button>
								<div className={s.faqA}>
							<div className={s.faqAInner}>{item.a}</div>
						</div>
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	)
}
