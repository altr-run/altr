'use client'

import { useState } from 'react'
import s from './home.module.css'
import Reveal from './reveal'

const ITEMS = [
	{
		q: 'What does Altr connect to?',
		a: 'The core direction is Slack, GitHub, Linear, docs, calls, CI, and monitoring signals. The point is to pull those sources into one execution trail without forcing your team to abandon the systems they already use.',
	},
	{
		q: 'How do the role agents differ?',
		a: 'Altr uses named responsibilities instead of one generic assistant. @intake captures the signal, @spec structures the work, @eng executes, and @review checks risk and drift before merge.',
	},
	{
		q: 'How is this different from Devin or Cursor?',
		a: 'Those tools are centered on coding agents. Altr is centered on the full execution loop: intake, planning, implementation, review, and follow-through, with the artifact trail preserved end to end.',
	},
	{
		q: 'Who controls models, keys, and agent behavior?',
		a: 'Teams choose providers, keep keys in the OS keychain, and set rollout rules for who can create or run agents. Human review remains the default approval point for important work.',
	},
	{
		q: 'Can we run Altr in a more controlled environment?',
		a: 'Yes. The path is Mac-native first, then managed environments, VPCs, or on-prem for teams with stricter security, compliance, or procurement requirements.',
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
							Questions teams ask
							<br />
							<em>before they roll it out.</em>
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
