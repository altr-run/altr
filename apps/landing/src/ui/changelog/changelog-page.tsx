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
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-24 border-b border-line">
				<p className="font-mono text-[11px] tracking-widest uppercase text-ink-3 mb-6">Changelog</p>
				<h1
					className="font-serif text-ink"
					style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.1, textWrap: 'balance' }}
				>
					What shipped
				</h1>
				<p className="text-ink-2 mt-4 text-lg leading-relaxed max-w-xl">
					Every release, every fix, every improvement — in the open.
				</p>
			</section>

			{/* Entries */}
			<section className="max-w-[var(--maxw-narrow)] mx-auto px-6 py-16">
				{entries.length === 0 ? (
					<p className="text-ink-3 font-mono text-sm">No entries yet. Check back soon.</p>
				) : (
					<ol className="flex flex-col gap-12">
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
								<li key={entry._id} className="border-b border-line pb-12 last:border-0 last:pb-0">
									<div className="flex flex-wrap items-center gap-3 mb-4">
										{entry.version && (
											<span className="font-mono text-xs text-ink-3 border border-line rounded-full px-3 py-1">
												{entry.version}
											</span>
										)}
										{badge && (
											<span
												className={`font-mono text-xs border rounded-full px-3 py-1 ${badge.color}`}
											>
												{badge.label}
											</span>
										)}
										{date && (
											<time className="font-mono text-xs text-ink-3" dateTime={entry.releaseDate}>
												{date}
											</time>
										)}
									</div>
									<h2 className="font-serif text-2xl text-ink mb-3">{entry.title}</h2>
									{entry.summary && (
										<p className="text-ink-2 leading-relaxed">{entry.summary}</p>
									)}
								</li>
							)
						})}
					</ol>
				)}
			</section>
		</main>
	)
}
