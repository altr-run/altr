import Image from 'next/image'
import { getBrandLogoUrl } from '@/lib/brand'
import Reveal from './reveal'

const SOURCE_LOGOS = [
	{ label: 'Slack threads', tool: 'Slack', domain: 'slack.com' },
	{ label: 'GitHub PRs', tool: 'GitHub', domain: 'github.com' },
	{ label: 'Linear issues', tool: 'Linear', domain: 'linear.app' },
	{ label: 'Docs and specs', tool: 'Notion', domain: 'notion.so' },
	{ label: 'Customer calls', tool: 'Zoom', domain: 'zoom.us' },
	{ label: 'CI and monitoring', tool: 'Datadog', domain: 'datadoghq.com' },
] as const

export default function Manifesto() {
	return (
		<section
			id="stack"
			className="relative overflow-hidden pt-[180px] pb-[160px] px-8 border-b border-(--line)"
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

			<div className="relative z-[1] inner">
				<Reveal className="text-center mb-20">
					<span
						className="over inline-block"
						style={{ marginBottom: 20 }}
					>
						connected stack
					</span>
					<h2
						className="font-serif font-normal leading-[1.05] tracking-[-0.03em] mt-5 mx-auto"
						style={{
							fontSize: 'clamp(32px, 3.6vw, 52px)',
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
						className="grid gap-0 font-serif text-[24px] leading-[1.55] text-(--ink-1) tracking-[-0.005em]"
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
								context disappears. The brief gets rewritten from scratch &mdash; every single time.
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
						<div
							className="relative overflow-hidden rounded-[28px] border border-(--line) p-4 md:p-5"
							style={{
								background:
									'linear-gradient(180deg, color-mix(in oklab, var(--panel) 92%, white 8%) 0%, color-mix(in oklab, var(--panel) 96%, var(--bg) 4%) 100%)',
								boxShadow:
									'inset 0 1px 0 rgba(255,255,255,0.8), 0 24px 60px rgba(20, 26, 34, 0.08)',
							}}
						>
							<div
								className="pointer-events-none absolute inset-y-0 left-[36%] w-px opacity-80"
								style={{
									background:
										'linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--acc) 50%, transparent) 16%, color-mix(in oklab, var(--line) 85%, transparent) 50%, color-mix(in oklab, var(--acc) 50%, transparent) 84%, transparent 100%)',
								}}
							/>
							<div
								className="pointer-events-none absolute inset-x-[18%] top-1/2 h-px -translate-y-1/2"
								style={{
									background:
										'linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--line) 70%, transparent) 14%, color-mix(in oklab, var(--acc) 24%, transparent) 50%, color-mix(in oklab, var(--line) 70%, transparent) 86%, transparent 100%)',
								}}
							/>

							<div
								className="overflow-hidden"
								style={{
									maskImage:
										'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
									WebkitMaskImage:
										'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
								}}
							>
								<div className="flex w-max gap-4 animate-[marquee_26s_linear_infinite]">
									{[...SOURCE_LOGOS, ...SOURCE_LOGOS].map((source, index) => {
										const src = getBrandLogoUrl(source.domain, {
											height: 24,
											type: 'logo',
											theme: 'dark',
											fallback: 'transparent',
										})
										return (
											<div
												key={`${source.tool}-${index}`}
												className="group flex min-w-[216px] items-center gap-3 rounded-[20px] border border-(--line) px-4 py-3"
												style={{
													background:
														'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, color-mix(in oklab, var(--panel) 90%, white 10%) 100%)',
													borderColor:
														'color-mix(in oklab, var(--line) 82%, transparent)',
												}}
											>
												<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 ring-1 ring-black/5">
													<Image
														src={src}
														alt={source.tool}
														height={24}
														width={72}
														className="max-h-6 w-auto object-contain grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
														unoptimized
													/>
												</div>
												<div className="min-w-0">
													<div className="font-mono text-[9px] uppercase tracking-[0.16em] text-(--ink-4)">
														{source.tool}
													</div>
													<div className="truncate font-sans text-[13px] text-(--ink-2)">
														{source.label}
													</div>
												</div>
											</div>
										)
									})}
								</div>
							</div>

							<div
								className="mt-4 overflow-hidden"
								style={{
									maskImage:
										'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
									WebkitMaskImage:
										'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
								}}
							>
								<div className="flex w-max gap-4 [animation-direction:reverse] animate-[marquee_32s_linear_infinite]">
									{[...SOURCE_LOGOS.slice().reverse(), ...SOURCE_LOGOS.slice().reverse()].map((source, index) => {
										const src = getBrandLogoUrl(source.domain, {
											height: 28,
											type: 'icon',
											theme: 'dark',
											fallback: 'lettermark',
										})
										return (
											<div
												key={`${source.label}-${index}`}
												className="flex min-w-[172px] items-center gap-3 rounded-full border border-(--line) px-3.5 py-2"
												style={{
													background:
														'color-mix(in oklab, var(--bg) 72%, var(--panel) 28%)',
													borderColor:
														'color-mix(in oklab, var(--line) 78%, transparent)',
												}}
											>
												<Image
													src={src}
													alt={source.tool}
													height={28}
													width={28}
													className="rounded-full object-contain"
													unoptimized
												/>
												<span className="font-mono text-[10px] tracking-[0.05em] text-(--ink-3)">
													{source.label}
												</span>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
