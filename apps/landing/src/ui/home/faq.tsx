'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import Reveal from './reveal'
import { Button } from '@/components/ui/button'

const ITEMS = [
	{
		q: 'What does Altr connect to?',
		a: 'The core direction is Slack, GitHub, Linear, docs, calls, CI, and monitoring signals. The point is to pull those sources into one execution trail without forcing your team to abandon the systems they already use.',
	},
	{
		q: 'How does Altr handle different stages of the workflow?',
		a: 'Altr breaks the execution loop into four stages — capture, plan, build, and review — each with a clear job and a visible handoff. Context flows forward automatically so nothing gets rebuilt from scratch at each step.',
	},
	{
		q: 'How is this different from ClickUp, Linear, or Notion?',
		a: 'ClickUp Codegen and similar tools run inside their own workspace and go from task to PR. Altr runs on your Mac, connects your existing tools — Slack, Linear, GitHub, calls, docs — and carries the original signal through every handoff. The thread that started the work is still attached when the PR opens. You keep your stack. Human review stays the default gate. Altr is the pipeline before work reaches Linear or ClickUp, not a replacement for either.',
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
	const [openValue, setOpenValue] = useState<string>('')

	return (
		<section className="py-[160px] px-8 border-b border-line" id="faq">
			<div className="inner">
				<Reveal className="grid grid-cols-12 gap-12 lg:gap-24 items-end mb-24">
					<div className="col-span-12 lg:col-span-7">
						<span className="over inline-block mb-4">faq</span>
						<h2 className="heading-2">
							Questions teams ask
							<br />
							<em>when evaluating.</em>
						</h2>
					</div>
					<div className="col-span-12 lg:col-span-5">
						<p className="lede">
							If yours isn&apos;t here, write{' '}
							<a
								href="mailto:hello@altr.run"
								className="text-ink no-underline border-b border-acc"
								style={{ borderBottomWidth: '1.5px' }}
							>
								hello@altr.run
							</a>{' '}
							— a human reads every one.
						</p>
					</div>
				</Reveal>
				<Reveal>
					<Accordion.Root
						type="single"
						collapsible
						value={openValue}
						onValueChange={setOpenValue}
						className="border-t border-line"
					>
						{ITEMS.map((item, i) => {
							const isOpen = openValue === String(i)
							return (
								<Accordion.Item
									key={i}
									value={String(i)}
									className="border-b border-line group/item hover:bg-[color-mix(in_oklab,var(--acc)_2%,var(--bg))] transition-colors duration-200"
								>
									<Accordion.Header>
										<Accordion.Trigger asChild>
											<Button variant="bare" className="flex justify-between items-center w-full py-[32px] px-2 text-left font-serif text-[24px] font-normal tracking-[-0.015em] text-ink cursor-pointer gap-8">
												<span>{item.q}</span>
												<motion.span
													animate={{ rotate: isOpen ? 45 : 0 }}
													transition={{ duration: 0.25 }}
													className="w-7 h-7 rounded-full border border-line-2 grid place-items-center font-sans font-normal text-ink-2 text-[16px] flex-shrink-0 transition-colors"
													style={isOpen ? { background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)' } : {}}
												>
													+
												</motion.span>
											</Button>
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content forceMount asChild>
										<AnimatePresence initial={false}>
											{isOpen && (
												<motion.div
													key="content"
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
													style={{ overflow: 'hidden' }}
												>
													<p className="text-[15px] text-ink-2 leading-[1.65] pb-[22px] px-2">
														{item.a}
													</p>
												</motion.div>
											)}
										</AnimatePresence>
									</Accordion.Content>
								</Accordion.Item>
							)
						})}
					</Accordion.Root>
				</Reveal>

				<Reveal className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-t border-line pt-7">
					<p className="font-mono text-[11px] text-ink-4 tracking-widest">
						evaluating alternatives?
					</p>
					<Link
						href="/compare"
						className="font-mono text-[12px] text-acc no-underline hover:opacity-80 transition-opacity"
					>
						See side-by-side comparisons →
					</Link>
				</Reveal>
			</div>
		</section>
	)
}
