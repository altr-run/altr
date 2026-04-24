import Reveal from './reveal'

const SOURCES = [
	'Slack threads',
	'GitHub PRs',
	'Linear issues',
	'Docs and specs',
	'Customer calls',
	'CI and monitoring',
] as const

export default function Manifesto() {
	return (
		<section
			id="stack"
			className="relative overflow-hidden py-[180px] px-8 pb-[160px] border-b border-(--line)"
			style={{
				background:
					'radial-gradient(50% 60% at 20% 30%, var(--acc-soft) 0%, transparent 60%), radial-gradient(40% 50% at 90% 80%, color-mix(in oklab, var(--acc) 6%, transparent) 0%, transparent 60%), var(--bg)',
			}}
		>
			{/* decorative center vertical line */}
			<div
				className="pointer-events-none absolute inset-0 opacity-60"
				style={{
					backgroundImage:
						'linear-gradient(90deg, transparent 0, transparent calc(50% - 1px), color-mix(in oklab, var(--line) 40%, transparent) calc(50% - 1px), color-mix(in oklab, var(--line) 40%, transparent) calc(50%), transparent calc(50%))',
				}}
			/>

			<div className="relative z-[1] max-w-[1040px] mx-auto">
				<Reveal className="text-center mb-20">
					<span
						className="over inline-block"
						style={{ marginBottom: 20 }}
					>
						§ connected stack
					</span>
					<h2
						className="font-serif font-normal leading-[1.05] tracking-[-0.03em] mt-5 mx-auto"
						style={{
							fontSize: 'clamp(36px, 4.4vw, 60px)',
							maxWidth: 920,
						}}
					>
						Your signal is already there.
						<br />
						<em className="italic text-(--acc)">Stop rewriting it.</em>
					</h2>
				</Reveal>

				<Reveal>
					{/* quote body */}
					<div
						className="grid gap-0 font-serif text-[22px] leading-[1.55] text-(--ink-1) tracking-[-0.005em]"
						style={{ gridTemplateColumns: '60px 1fr 60px' }}
					>
						{/* opening quote mark */}
						<div className="font-serif italic text-[96px] text-(--acc) leading-none text-center opacity-70">
							&ldquo;
						</div>

						<div>
							<p className="mb-[22px]">
								<span
									className="float-left text-[72px] leading-none mr-2.5 mt-1.5 italic text-(--acc)"
								>
									Y
								</span>
								our team&apos;s signal lives in five different tools. Slack
								threads, GitHub issues, Linear specs, call recordings, monitoring
								alerts. Every handoff, someone re-summarizes. Every review,
								context disappears. The brief gets rewritten from scratch &mdash;
								every single time.
							</p>
							<p className="mb-[22px]">
								Altr runs on your Mac, pulls the full story from your existing
								stack, and keeps it attached through every stage of the work. The
								thread that prompted the request is still visible when the PR
								opens. Reviewers see why, not just what. Human review stays the
								default gate.
							</p>
							<p className="mb-[22px]">
								No new workspace. No cloud lock-in. No autonomous agent that
								ships before a human has signed off. Just the{' '}
								<b className="font-normal text-(--acc) italic">
									same story, visible across the tools you already trust.
								</b>
							</p>
							<p className="text-(--ink-2) text-[18px]">
								Your stack. Your keys. Your approval gates.
							</p>
						</div>

						{/* closing quote mark */}
						<div className="font-serif italic text-[96px] text-(--acc) leading-none text-center opacity-70 self-end">
							&rdquo;
						</div>
					</div>

					{/* sources rail */}
					<div
						className="mt-12 pt-6 border-t border-(--line) grid gap-6 items-start"
						style={{ gridTemplateColumns: '180px minmax(0, 1fr)' }}
					>
						<div className="font-mono text-[10px] tracking-[0.14em] uppercase text-(--ink-4) pt-1.5">
							Typical sources
						</div>
						<div className="flex flex-wrap gap-2.5">
							{SOURCES.map((source) => (
								<span
									key={source}
									className="py-2 px-3 rounded-full border border-(--line) font-mono text-[10.5px] tracking-[0.03em] text-(--ink-2)"
									style={{
										background: 'color-mix(in oklab, var(--panel) 88%, white 12%)',
										boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.72)',
										borderColor: 'color-mix(in oklab, var(--line) 82%, transparent)',
									}}
								>
									{source}
								</span>
							))}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
