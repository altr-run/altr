'use client'

import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { clsx } from 'clsx'
import Reveal from './reveal'
import { Button } from '@/components/ui/button'

type Example = {
	text: string
	est: string
	cost: string
	ac: string[]
	plan: string[]
	diff: string
}

const EXAMPLES: Record<string, Example> = {
	invite: {
		text: 'Let users invite teammates by email. Magic-link style — no passwords. Should take less than 90 seconds end-to-end.',
		est: '2h 40m',
		cost: '$0.82',
		ac: [
			'A teammate receives the invite within 10 seconds of send',
			'Expired invites (7 days) surface a resend CTA',
			'Rate-limit 5 invites per user per hour',
			'Audit log records inviter, invitee, status',
		],
		plan: [
			'New route POST /api/invites with Zod validation',
			'Resend webhook handler for delivery events',
			'Add invites table · 5 columns · 2 indexes',
			'Integration tests covering all 4 AC',
		],
		diff: `# src/server/invites.ts
+ export async function createInvite(email: string) {
+   const token = crypto.randomBytes(32).toString("hex");
+   await db.invites.insert({ email, token, expiresAt: ... });
+   await resend.emails.send({ to: email, ... });
+ }
# tests/invites.test.ts · +3 cases`,
	},
	search: {
		text: 'Add full-text search across specs, threads, and PRs. Should feel instant — no loading spinner under 200ms.',
		est: '3h 15m',
		cost: '$1.04',
		ac: [
			'Search indexes specs, threads, and PR descriptions',
			'Results surface in under 200ms for the 95th percentile',
			'Highlighted match snippets in results',
			'Keyboard-first: ⌘K opens, ↑↓ navigates, ↵ opens',
		],
		plan: [
			'Postgres tsvector column + GIN index',
			'Debounced query endpoint (120ms)',
			'Command palette UI with snippet rendering',
			'Backfill job for existing rows',
		],
		diff: `# migrations/20260812_search.sql
+ ALTER TABLE specs ADD COLUMN search_vec tsvector;
+ CREATE INDEX specs_search_idx ON specs USING GIN (search_vec);
# src/server/search.ts
+ export async function search(q: string) { ... }`,
	},
	billing: {
		text: 'Add Stripe billing for Studio plan. Per-seat, with monthly and annual pricing. Must handle seat upgrades mid-cycle.',
		est: '5h 20m',
		cost: '$1.91',
		ac: [
			'Users pick monthly or annual at checkout',
			'Seat upgrades prorate within the current cycle',
			'Failed payments surface a 7-day recovery banner',
			'All receipts and invoices are downloadable',
		],
		plan: [
			'Stripe subscriptions + seat-based quantity',
			'Webhook handler: subscription.updated',
			'Org page: seats · plan · next invoice',
			'Dunning banner with recovery CTA',
		],
		diff: `# src/billing/stripe.ts
+ export async function createSub(org, seats, plan) { ... }
+ export async function updateSeats(org, seats) { ... }
# src/webhooks/stripe.ts · handles 6 events`,
	},
}

export default function Playground() {
	const [active, setActive] = useState<Example | null>(null)
	const [visibleSteps, setVisibleSteps] = useState<number[]>([])
	const inputRef = useRef<HTMLTextAreaElement>(null)

	function run() {
		const txt = (inputRef.current?.value ?? '').trim().toLowerCase()
		let ex = EXAMPLES.invite
		if (txt.includes('search')) ex = EXAMPLES.search
		else if (txt.includes('bill') || txt.includes('stripe') || txt.includes('pay'))
			ex = EXAMPLES.billing

		setActive(ex)
		setVisibleSteps([])
		;[0, 1, 2].forEach((i) =>
			setTimeout(() => setVisibleSteps((prev) => [...prev, i]), 150 + i * 300),
		)
	}

	function loadExample(key: string) {
		const ex = EXAMPLES[key]
		if (inputRef.current) inputRef.current.value = ex.text
		inputRef.current?.focus()
	}

	return (
		<section className="py-[140px] px-8 border-b border-line" id="playground">
			<div className="inner">
				<Reveal className="grid grid-cols-2 gap-16 items-end mb-14">
					<div>
						<span className="over inline-block mb-4">demo</span>
						<h2 className="heading-2">
							Drop in a rough request.
							<br />
							Watch Altr <em>structure the work.</em>
						</h2>
					</div>
					<p className="lede">
						Start with the kind of messy ask teams actually get. Altr
						will turn it into acceptance criteria, an implementation plan,
						and a draft PR. It&apos;s a mock, but the workflow is the point.
					</p>
				</Reveal>
				<Reveal>
					<div
						className="grid overflow-hidden"
						style={{
							gridTemplateColumns: 'minmax(0,0.92fr) minmax(0,1.08fr)',
							borderRadius: '28px',
							border: '1px solid color-mix(in oklab, var(--line) 84%, transparent)',
							background: 'radial-gradient(80% 120% at 0% 0%, color-mix(in oklab, var(--acc) 3%, transparent) 0%, transparent 52%), var(--surface)',
							boxShadow: '0 14px 32px rgba(17,24,18,0.05)',
						}}
					>
						{/* Left pane */}
						<div
							className="p-7 border-r border-line min-h-[520px]"
							style={{
								background: 'linear-gradient(180deg, rgba(248,248,248,0.96) 0%, rgba(243,243,243,0.96) 100%)',
							}}
						>
							<div className="flex justify-between items-center gap-3 mb-3.5">
								<div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-ink-4">
									<b className="font-sans text-[13px] font-semibold text-ink tracking-tight normal-case">Your spec</b>
									<span className="ml-2">Altr is listening</span>
								</div>
								<div
									className="py-[7px] px-2.5 rounded-full font-mono text-[10px] text-acc-ink"
									style={{
										border: '1px solid color-mix(in oklab, var(--acc) 20%, var(--line))',
										background: 'color-mix(in oklab, var(--acc-soft) 46%, white)',
									}}
								>
									rough prompt
								</div>
							</div>
							<div
								className="p-[18px] rounded-[22px] border border-line"
								style={{
									background: 'rgba(255,255,255,0.84)',
									boxShadow: '0 10px 20px rgba(17,24,18,0.035), inset 0 1px 0 rgba(255,255,255,0.82)',
									backdropFilter: 'blur(10px)',
								}}
							>
								<textarea
									ref={inputRef}
									className="w-full min-h-[200px] font-sans text-[15.5px] leading-[1.55] text-ink-1 bg-transparent border-0 outline-none resize-none p-0 m-0 placeholder:text-ink-4 placeholder:italic placeholder:font-serif placeholder:text-[17px]"
									style={{ fieldSizing: 'content' } as React.CSSProperties}
									placeholder="Let users invite teammates by email. Magic-link style — no passwords. Should take less than 90 seconds end-to-end."
								/>
							</div>
							<div className="flex gap-2 mt-[18px] flex-wrap">
								<span className="w-full font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-0.5">Try one of these →</span>
								<Button variant="ghost" size="sm" onClick={() => loadExample('invite')}>
									invite teammates
								</Button>
								<Button variant="ghost" size="sm" onClick={() => loadExample('search')}>
									full-text search
								</Button>
								<Button variant="ghost" size="sm" onClick={() => loadExample('billing')}>
									stripe billing
								</Button>
							</div>
							<div className="flex justify-between items-center gap-4 mt-5 pt-[18px] border-t border-dashed border-line">
								<div className="flex gap-2">
									{['acceptance', 'plan', 'draft diff'].map((label) => (
										<span key={label} className="badge">
											{label}
										</span>
									))}
								</div>
								<div>
									<Button variant="acc" onClick={run}>
									Run it →
								</Button>
								</div>
							</div>
						</div>

						{/* Right pane */}
						<div
							className="p-7 min-h-[520px] relative"
							style={{
								background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,248,248,0.98) 100%)',
							}}
						>
							{!active && (
								<div className="absolute inset-4 flex flex-col items-center justify-center text-ink-4 font-serif italic text-[18px] text-center p-10 rounded-[18px] border border-dashed border-line/70 bg-bg-1/60">
									<div className="font-mono not-italic text-[10px] uppercase tracking-widest text-acc opacity-70 mb-3.5">§ waiting for input</div>
									Pick an example or type a rough request.
									<br />
									<span className="text-[14px] font-mono not-italic mt-[10px] block text-ink-5">plan · build · output appears here</span>
								</div>
							)}
							{active && (
								<motion.div
									animate={{ opacity: 1, y: 0 }}
									initial={{ opacity: 0, y: 6 }}
									transition={{ duration: 0.55, ease: [0.2, 0, 0.2, 1] }}
								>
									<div className="flex justify-between items-baseline mb-4 pb-4 border-b border-line">
										<div className="font-sans font-semibold text-[18px] tracking-tight text-ink">
											<em className="font-serif font-normal italic text-acc">Execution output</em> · PR draft
										</div>
										<div className="font-mono text-[10.5px] text-ink-3 tracking-widest">
											~{active.est} · {active.cost}
										</div>
									</div>
									<div className="grid grid-cols-3 gap-2.5 mb-[18px]">
										{[
											{ label: 'owner', value: 'Altr' },
											{ label: 'risk', value: 'moderate' },
											{ label: 'scope', value: '1 endpoint' },
										].map(({ label, value }) => (
											<div
												key={label}
												className="p-[12px_14px] rounded-[14px] border border-line"
												style={{ background: 'rgba(255,255,255,0.86)' }}
											>
												<span className="block mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-4">{label}</span>
												<b className="font-sans text-[13px] font-semibold text-ink">{value}</b>
											</div>
										))}
									</div>

									{/* Output blocks */}
									{[
										{ label: '■ acceptance criteria', items: active.ac, idx: 0 },
										{ label: '▲ implementation plan', items: active.plan, idx: 1 },
									].map(({ label, items, idx }) => (
										<div
											key={label}
											className={clsx(
												'mt-[18px] p-[14px] rounded-[16px] border transition-all duration-[550ms]',
												visibleSteps.includes(idx)
													? 'opacity-100 translate-y-0'
													: 'opacity-0 translate-y-2',
											)}
											style={{
												borderColor: 'color-mix(in oklab, var(--line) 84%, transparent)',
												background: 'rgba(255,255,255,0.88)',
												boxShadow: '0 6px 14px rgba(17,24,18,0.03), inset 0 1px 0 rgba(255,255,255,0.84)',
											}}
										>
											<div className="font-mono text-[10px] tracking-widest uppercase text-ink-4 mb-3 inline-flex gap-1.5 items-center">
												<span className="w-[5px] h-[5px] bg-acc rounded-full" />
												{label}
											</div>
											<ul className="list-none p-0 m-0 flex flex-col gap-2">
												{items.map((item, i) => (
													<li
														key={i}
														className="text-[13.5px] text-ink-1 leading-[1.55] pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-ink-4 before:font-mono before:text-[11px] before:top-0.5"
													>
														{item}
													</li>
												))}
											</ul>
										</div>
									))}

									{/* Diff block */}
									<div
										className={clsx(
											'mt-[18px] p-[14px] rounded-[16px] border transition-all duration-[550ms]',
											visibleSteps.includes(2)
												? 'opacity-100 translate-y-0'
												: 'opacity-0 translate-y-2',
										)}
										style={{
											borderColor: 'color-mix(in oklab, var(--line) 84%, transparent)',
											background: 'rgba(255,255,255,0.88)',
											boxShadow: '0 6px 14px rgba(17,24,18,0.03), inset 0 1px 0 rgba(255,255,255,0.84)',
										}}
									>
										<div className="font-mono text-[10px] tracking-widest uppercase text-ink-4 mb-3 inline-flex gap-1.5 items-center">
											<span className="w-[5px] h-[5px] bg-acc rounded-full" />
											○ draft diff · preview
										</div>
										<pre
											className="font-mono text-[12px] leading-[1.7] border border-line rounded-[14px] p-[14px_16px] text-ink-2 whitespace-pre overflow-x-auto"
											style={{ background: 'rgba(255,255,255,0.84)' }}
										>
											{active.diff}
										</pre>
									</div>
								</motion.div>
							)}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
