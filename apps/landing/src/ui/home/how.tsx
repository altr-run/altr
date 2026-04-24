import Reveal from './reveal'

const STEPS = [
	{
		title: 'Capture — so nothing gets lost before it starts',
		desc: 'Pulls threads, calls, notes, and alerts into the trail. Engineering starts from the original signal, not a second-hand retelling.',
	},
	{
		title: 'Plan — so building never starts on assumptions',
		desc: 'Locks acceptance criteria, flags unresolved decisions, and hands off a reviewable spec. No more discovering the goal mid-PR.',
	},
	{
		title: 'Build — so implementation stays tethered to intent',
		desc: 'Opens the worktree, proposes steps, and drafts changes with the original criteria still attached — visible to every reviewer.',
	},
	{
		title: 'Review — so merge is a decision, not a gamble',
		desc: 'Checks the diff against the original goal, flags regressions and missing criteria, and surfaces risk before it becomes a rollback.',
	},
]

export default function How() {
	return (
		<section
			className="py-[160px] px-8 border-b border-line bg-bg-1"
			id="agents"
		>
			<div className="inner">
				<div className="grid grid-cols-2 gap-20 items-start">
					{/* Left sticky column */}
					<Reveal className="sticky top-[120px] flex flex-col gap-6">
						<span className="over" style={{ display: 'inline-block' }}>
							§ how it works
						</span>
						<h2
							className="heading-2"
							style={{ textWrap: 'balance', marginTop: 20 }}
						>
							Four stages.
							<br />
							<em>One unbroken trail.</em>
						</h2>
						<p className="lede">
							Each stage has a clear job and a visible handoff. No
							reconstruction work, no re-explaining the goal — the context
							travels with the work from first request to merged diff.
						</p>
					</Reveal>

					{/* Steps */}
					<div className="flex flex-col">
						{STEPS.map((step, i) => (
							<Reveal
								key={i}
								delay={i * 80}
								className={[
									'grid grid-cols-[56px_1fr] gap-6 py-9 border-t border-line',
									'transition-transform duration-200 cursor-default',
									'hover:translate-x-[6px]',
									i === STEPS.length - 1 ? 'border-b border-line' : '',
								].join(' ')}
							>
								<div
									className="font-serif text-[44px] leading-none text-acc tracking-tight opacity-[0.36] pt-1 transition-opacity duration-200 hover:opacity-100"
									style={{ fontFamily: 'var(--f-serif)' }}
								>
									{String(i + 1).padStart(2, '0')}
								</div>
								<div>
									<h3
										className="font-serif font-normal text-[22px] tracking-tight mt-1 mb-[10px] text-ink"
										style={{ fontFamily: 'var(--f-serif)' }}
									>
										{step.title}
									</h3>
									<p className="text-[14.5px] text-ink-2 leading-[1.6] m-0">
										{step.desc}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
