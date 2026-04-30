type ChangelogEntry = {
	_id: string
	title: string
	version: string | null
	releaseDate: string
	type: string | null
	summary: string | null
	body: unknown[] | null
	metadata: { slug: { current: string } | null } | null
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
	new:      { label: 'New',      color: 'text-[var(--success,#6F8C5A)] border-[var(--success,#6F8C5A)]/30' },
	improved: { label: 'Improved', color: 'text-[var(--warning,#C49A4B)] border-[var(--warning,#C49A4B)]/30' },
	fixed:    { label: 'Fixed',    color: 'text-ink-2 border-line' },
	removed:  { label: 'Removed',  color: 'text-[var(--error,#B55A4B)] border-[var(--error,#B55A4B)]/30' },
}

export default function ChangelogPage({ entries }: { entries: ChangelogEntry[] }) {
	return (
		<main className="bg-(--bg) text-ink">
			{/* Header */}
			<section className="px-8 py-[160px] border-b border-line">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="over mb-6">Changelog</p>
					<h1 className="heading-2 mb-8">
						What shipped
					</h1>
					<p className="lede">
						Every release, every fix, every improvement — in the open.
					</p>
				</div>
			</section>

			{/* Entries */}
			<section className="px-8 py-32">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					{entries.length === 0 ? (
						<p className="text-ink-3 font-mono text-sm">No entries yet. Check back soon.</p>
					) : (
						<ol className="flex flex-col gap-24">
							{entries.map((entry) => {
								const badge = entry.type ? TYPE_LABELS[entry.type] : null
								const date = entry.releaseDate
									? new Date(entry.releaseDate).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})
									: null

								return (
									<li key={entry._id} className="pb-12 last:pb-0">
										<div className="flex flex-wrap items-center gap-3 mb-6">
											{entry.version && (
												<span className="font-mono text-[11px] text-ink-3 border border-line rounded-full px-3 py-1 uppercase tracking-wide">
													{entry.version}
												</span>
											)}
											{badge && (
												<span
													className={`font-mono text-[11px] border rounded-full px-3 py-1 uppercase tracking-wide ${badge.color}`}
												>
													{badge.label}
												</span>
											)}
											{date && (
												<time className="font-mono text-[11px] text-ink-3 uppercase tracking-wide" dateTime={entry.releaseDate}>
													{date}
												</time>
											)}
										</div>
										<h2 className="heading-3 mb-5">{entry.title}</h2>
										{entry.summary && (
											<p className="text-ink-2 text-[17px] leading-relaxed">{entry.summary}</p>
										)}
									</li>
								)
							})}
						</ol>
					)}
				</div>
			</section>
		</main>
	)
}
