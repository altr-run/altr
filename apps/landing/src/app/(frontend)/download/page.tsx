import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Download Altr — Mac-native AI Workspace',
	description: 'Download Altr for macOS. Built for Apple Silicon. Local-first, keyboard-centric, and fast.',
}

const WHY_NATIVE = [
	{
		label: 'Zero cloud latency',
		desc: 'Your specs, trails, and context live in SQLite on disk. Nothing leaves your machine on app launch.',
	},
	{
		label: 'OS Keychain for keys',
		desc: 'Your Anthropic and OpenAI API keys live in the macOS Keychain — the same place Safari keeps your passwords.',
	},
	{
		label: 'Works offline',
		desc: 'Local-first means you can plan, spec, and review without a network. Syncs happen when you want them.',
	},
	{
		label: 'Apple Silicon native',
		desc: 'Built with Tauri 2 + Rust. Not Electron. Not a browser tab. Lean binary, fast startup, no JVM tax.',
	},
]

export default function DownloadPage() {
	return (
		<main className="bg-bg text-ink">

			{/* Hero */}
			<section
				className="border-b border-line px-8 py-[120px]"
				style={{ background: 'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--acc) 8%, transparent) 0%, transparent 60%), var(--bg)' }}
			>
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="font-mono text-[11px] tracking-widest uppercase text-acc mb-5">Download</p>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						Built for the Mac.
						<br />
						<em className="italic text-acc">Not the browser.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[48ch] mb-10">
						Altr is a native Mac app built with Tauri 2 and Rust — not a website in a wrapper. Local-first, keyboard-centric, and lean.
					</p>
					{/* Trust pills */}
					<div className="flex flex-wrap gap-2">
						{['macOS 14+', 'Apple Silicon', 'Tauri 2 + Rust', 'Local SQLite', 'Signed & notarized'].map((label) => (
							<span
								key={label}
								className="font-mono text-[10.5px] tracking-wide border border-line rounded-full px-3 py-1 text-ink-3"
								style={{ background: 'var(--bg-1)' }}
							>
								{label}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Download card + why native */}
			<section className="border-b border-line px-8 py-24">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw)' }}>
					<div className="grid gap-12 items-start" style={{ gridTemplateColumns: '1fr 1fr' }}>

						{/* Download card */}
						<div
							className="relative border border-line rounded-[28px] p-10 flex flex-col items-start gap-7 overflow-hidden"
							style={{
								background: 'radial-gradient(80% 70% at 5% 5%, color-mix(in oklab, var(--acc) 9%, transparent) 0%, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(248,248,248,0.94) 100%)',
								boxShadow: 'var(--sh-md), inset 0 1px 0 rgba(255,255,255,0.9)',
							}}
						>
							{/* Grid overlay */}
							<div
								className="absolute inset-0 pointer-events-none opacity-[0.04]"
								style={{
									backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
									backgroundSize: '28px 28px',
								}}
							/>

							{/* Status */}
							<div className="relative flex items-center gap-2 font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink-4">
								<span className="w-1.5 h-1.5 rounded-full bg-acc shadow-[0_0_0_3px_color-mix(in_oklab,var(--acc)_15%,transparent)] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
								Private pilot · invite only · Q2 2026
							</div>

							{/* App icon placeholder */}
							<div className="relative flex items-center gap-5">
								<div
									className="w-16 h-16 rounded-[18px] border border-line flex items-center justify-center flex-shrink-0"
									style={{ background: 'var(--bg)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)' }}
								>
									<span className="font-serif text-[24px] text-acc leading-none">A</span>
								</div>
								<div>
									<h2 className="font-serif text-[22px] tracking-tight text-ink mb-0.5">Altr for macOS</h2>
									<p className="font-mono text-[10px] text-ink-4 tracking-widest uppercase">Universal Binary · Apple Silicon & Intel</p>
								</div>
							</div>

							{/* Requirements */}
							<div className="relative w-full grid grid-cols-2 gap-5 border-t border-line pt-6">
								<div>
									<p className="font-mono text-[9.5px] uppercase tracking-widest text-ink-4 mb-2">Requirements</p>
									<ul className="list-none p-0 m-0 font-sans text-[13px] text-ink-2 flex flex-col gap-1.5">
										<li>macOS 14.0 Sonoma or later</li>
										<li>8 GB RAM minimum</li>
										<li>Apple Silicon (recommended)</li>
									</ul>
								</div>
								<div>
									<p className="font-mono text-[9.5px] uppercase tracking-widest text-ink-4 mb-2">Architecture</p>
									<ul className="list-none p-0 m-0 font-sans text-[13px] text-ink-2 flex flex-col gap-1.5">
										<li>Tauri 2 + Rust core</li>
										<li>Local SQLite engine</li>
										<li>Signed &amp; notarized by Apple</li>
									</ul>
								</div>
							</div>

							<div className="relative w-full flex flex-col gap-3">
								<button
									disabled
									className="btn btn-acc btn-lg w-full opacity-50 cursor-not-allowed pointer-events-none"
								>
									Download v0.1 (.dmg)
								</button>
								<p className="font-sans text-[12px] text-ink-3 text-center">
									Current status: <span className="text-acc font-medium">Private Pilot Only</span>
								</p>
							</div>

							<div className="relative w-full border-t border-line pt-5">
								<p className="font-sans text-[13px] text-ink-3 italic mb-3">Not on a Mac? We&apos;re targeting Linux and Windows after the pilot.</p>
								<a href="/#close" className="font-mono text-[11px] uppercase tracking-widest text-acc no-underline hover:underline">
									Get notified for other platforms →
								</a>
							</div>
						</div>

						{/* Why native */}
						<div className="flex flex-col gap-7">
							<div>
								<p className="font-mono text-[11px] uppercase tracking-widest text-ink-3 mb-3">Why native</p>
								<h2 className="font-serif text-[28px] tracking-tight text-ink">The Mac is the right home.</h2>
							</div>
							<div className="flex flex-col gap-4">
								{WHY_NATIVE.map((item) => (
									<div
										key={item.label}
										className="flex gap-4 p-5 rounded-[14px] border border-line"
										style={{ background: 'var(--bg-1)' }}
									>
										<span className="font-mono text-[14px] text-acc mt-0.5 flex-shrink-0">■</span>
										<div>
											<p className="font-sans font-semibold text-[14px] text-ink mb-1">{item.label}</p>
											<p className="font-sans text-[13px] text-ink-3 leading-relaxed">{item.desc}</p>
										</div>
									</div>
								))}
							</div>

							<div
								className="border border-line rounded-[16px] p-5 flex items-center justify-between gap-4"
								style={{ background: 'color-mix(in oklab, var(--acc) 5%, var(--bg))' }}
							>
								<div>
									<p className="font-sans font-semibold text-[14px] text-ink mb-1">Get pilot access first.</p>
									<p className="font-sans text-[13px] text-ink-2">Join the limited cohort and get the download link direct from the founders.</p>
								</div>
								<a href="/#close" className="btn btn-acc flex-shrink-0">
									Request access →
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related */}
			<section className="px-8 py-14 border-b border-line">
				<div className="mx-auto flex items-center justify-between gap-8" style={{ maxWidth: 'var(--maxw)' }}>
					<p className="font-sans text-[15px] text-ink-3">
						Questions about the architecture or security posture?
					</p>
					<div className="flex gap-3">
						<Link href="/security" className="btn btn-ghost">
							Security & data →
						</Link>
						<Link href="/product" className="btn btn-ghost">
							See the product →
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}
