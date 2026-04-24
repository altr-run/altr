'use client'

import { useRef, useState } from 'react'
import s from './home.module.css'
import Reveal from './reveal'

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
		<section className={s.pg} id="playground">
			<div className={s.pgIn}>
				<Reveal className={s.pgHead}>
					<div>
						<span className={s.over} style={{ display: 'inline-block', marginBottom: 16 }}>
							§ 02 · try it · no signup
						</span>
						<h2 className={s.h2}>
							Type a spec.
							<br />
							Watch it <em>become a PR.</em>
						</h2>
					</div>
					<p className={s.lede}>
						Drop a rough idea on the left.{' '}
						<span className={s.mono} style={{ color: 'var(--acc)' }}>
							@spec
						</span>{' '}
						will structure it;{' '}
						<span className={s.mono} style={{ color: 'var(--ink)' }}>
							@eng
						</span>{' '}
						will draft the implementation. It&apos;s a mock — but the{' '}
						<em>moves</em> are real.
					</p>
				</Reveal>
				<Reveal>
					<div className={s.pgStage}>
						<div className={s.pgLeft}>
							<div className={s.pgPaneBar}>
								<div className={s.pgLabel}>
									<b>Your spec</b>
									<span>@spec is listening</span>
								</div>
								<div className={s.pgPill}>rough prompt</div>
							</div>
							<div className={s.pgComposer}>
								<textarea
									ref={inputRef}
									className={s.pgTextarea}
									placeholder="Let users invite teammates by email. Magic-link style — no passwords. Should take less than 90 seconds end-to-end."
								/>
							</div>
							<div className={s.pgExamples}>
								<span className={s.pgExLabel}>Try one of these →</span>
								<button className={s.pgExBtn} onClick={() => loadExample('invite')}>
									invite teammates
								</button>
								<button className={s.pgExBtn} onClick={() => loadExample('search')}>
									full-text search
								</button>
								<button className={s.pgExBtn} onClick={() => loadExample('billing')}>
									stripe billing
								</button>
							</div>
							<div className={s.pgComposerFoot}>
								<div className={s.pgComposerMeta}>
									<span>acceptance</span>
									<span>plan</span>
									<span>draft diff</span>
								</div>
								<div className={s.pgAction}>
									<button className={`${s.btn} ${s.btnAcc}`} onClick={run}>
										Run it →
									</button>
								</div>
							</div>
						</div>
						<div className={s.pgRight}>
							{!active && (
								<div className={s.pgEmpty}>
									<div className={s.pgEmptyMk}>§ Output</div>
									&ldquo;@spec will structure your spec,
									<br />
									@eng will draft the PR.&rdquo;
								</div>
							)}
							{active && (
								<div className={`${s.pgOutput} ${s.pgOutputOn}`}>
									<div className={s.pgPrHead}>
										<div className={s.pgPrTitle}>
											<em>PR draft</em> · auto-generated
										</div>
										<div className={s.pgPrMeta}>
											~{active.est} · {active.cost}
										</div>
									</div>
									<div className={s.pgStatRow}>
										<div className={s.pgStat}>
											<span>owner</span>
											<b>@eng</b>
										</div>
										<div className={s.pgStat}>
											<span>risk</span>
											<b>moderate</b>
										</div>
										<div className={s.pgStat}>
											<span>scope</span>
											<b>1 endpoint</b>
										</div>
									</div>
									<div
										className={`${s.pgOutBlock} ${visibleSteps.includes(0) ? s.pgOutBlockIn : ''}`}
									>
										<div className={s.pgOutBlockLbl}>
											<span className={s.pgOutBlockPt} />
											@spec · acceptance criteria
										</div>
										<ul>
											{active.ac.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									</div>
									<div
										className={`${s.pgOutBlock} ${visibleSteps.includes(1) ? s.pgOutBlockIn : ''}`}
									>
										<div className={s.pgOutBlockLbl}>
											<span className={s.pgOutBlockPt} />
											@eng · plan
										</div>
										<ul>
											{active.plan.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									</div>
									<div
										className={`${s.pgOutBlock} ${visibleSteps.includes(2) ? s.pgOutBlockIn : ''}`}
									>
										<div className={s.pgOutBlockLbl}>
											<span className={s.pgOutBlockPt} />
											draft diff · preview
										</div>
										<pre className={s.pgCode}>{active.diff}</pre>
									</div>
								</div>
							)}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
