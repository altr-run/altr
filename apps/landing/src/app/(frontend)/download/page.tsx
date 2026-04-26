import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Download Altr — Mac-native AI Workspace',
	description: 'Download Altr for macOS. Built for Apple Silicon. Local-first, keyboard-centric, and insanely fast.',
}

export default function DownloadPage() {
	return (
		<main className="bg-bg text-ink">
			<section className="border-b border-line px-8 py-[120px] text-center">
				<div className="mx-auto flex flex-col items-center" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<p className="font-mono text-[11px] tracking-widest uppercase text-acc mb-5">Native Power</p>
					<h1
						className="font-serif font-normal tracking-[-0.03em] text-ink mb-6"
						style={{ fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.04, textWrap: 'balance' }}
					>
						Built for the Mac.
						<br />
						<em className="italic text-acc">Faster than the cloud.</em>
					</h1>
					<p className="font-sans text-[18px] leading-[1.62] text-ink-2 max-w-[48ch]">
						Altr isn&apos;t a website in a wrapper. It&apos;s a native Mac app built with Swift and Rust for teams that demand zero-latency execution.
					</p>
				</div>
			</section>

			<section className="border-b border-line px-8 py-24">
				<div className="mx-auto" style={{ maxWidth: 'var(--maxw-narrow)' }}>
					<div className="bg-bg-1 border border-line rounded-[32px] p-12 flex flex-col items-center text-center gap-10 shadow-sm relative overflow-hidden">
						{/* Subtle background decoration */}
						<div className="absolute top-0 right-0 w-64 h-64 bg-acc opacity-[0.03] blur-[100px] pointer-events-none" />
						
						<div className="flex flex-col items-center gap-4">
							<div className="w-20 h-20 bg-bg border border-line rounded-[20px] flex items-center justify-center shadow-inner mb-2">
								<span className="text-[40px]"></span>
							</div>
							<h2 className="font-serif text-[32px] tracking-tight">Altr for macOS</h2>
							<p className="font-mono text-[11px] text-ink-4 tracking-widest uppercase">Universal Binary (Apple Silicon & Intel)</p>
						</div>

						<div className="flex flex-col gap-4 w-full max-w-[320px]">
							<button disabled className="btn btn-primary btn-lg opacity-50 cursor-not-allowed">
								Download v0.1.2026 (.dmg)
							</button>
							<p className="font-sans text-[13px] text-ink-3">
								Current status: <span className="text-acc font-medium">Private Pilot Only</span>
							</p>
						</div>

						<div className="grid grid-cols-2 gap-8 w-full border-t border-line pt-10">
							<div className="text-left">
								<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-2">Requirements</p>
								<ul className="list-none p-0 m-0 font-sans text-[13px] text-ink-2 flex flex-col gap-1">
									<li>macOS 14.0 or later</li>
									<li>8GB RAM minimum</li>
									<li>Apple Silicon (Recommended)</li>
								</ul>
							</div>
							<div className="text-left">
								<p className="font-mono text-[10px] uppercase tracking-widest text-ink-4 mb-2">Architecture</p>
								<ul className="list-none p-0 m-0 font-sans text-[13px] text-ink-2 flex flex-col gap-1">
									<li>Swift + Rust Core</li>
									<li>Local SQLite Engine</li>
									<li>Native Metal Rendering</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="mt-16 text-center">
						<p className="font-sans text-ink-3 mb-6 italic">Not on a Mac? We&apos;re currently optimizing the Windows engine.</p>
						<a href="/#close" className="font-mono text-[11px] uppercase tracking-widest text-acc no-underline hover:underline">
							Get notified for Windows Beta →
						</a>
					</div>
				</div>
			</section>
		</main>
	)
}
