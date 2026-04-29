'use client'

import { motion } from 'motion/react'
import Reveal from './reveal'

const PREVIEW_EASE = [0.2, 0, 0.2, 1] as const

function SceneChrome({ label, status }: { label: string; status: string }) {
	return (
		<div
			className="absolute top-0 left-0 right-0 h-[44px] px-4 grid items-center gap-3 border-b border-line z-[2]"
			style={{
				gridTemplateColumns: 'auto 1fr auto',
				background:
					'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.9))',
				backdropFilter: 'blur(4px)',
			}}
			aria-hidden="true"
		>
			{/* dots */}
			<div className="flex gap-[5px]">
				<span
					className="w-[7px] h-[7px] rounded-full"
					style={{ background: 'var(--macos-close)' }}
				/>
				<span
					className="w-[7px] h-[7px] rounded-full"
					style={{ background: 'var(--macos-minimize)' }}
				/>
				<span
					className="w-[7px] h-[7px] rounded-full bg-acc"
				/>
			</div>
			<span
				className="font-mono text-[10px] uppercase tracking-widest text-ink-3"
				style={{ fontFamily: 'var(--f-mono)' }}
			>
				{label}
			</span>
			<span
				className="font-mono text-[10px] uppercase tracking-widest text-ink-4 justify-self-end text-right"
				style={{ fontFamily: 'var(--f-mono)' }}
			>
				{status}
			</span>
		</div>
	)
}

function SceneGrid() {
	return (
		<div
			className="absolute inset-0 opacity-[0.072] pointer-events-none"
			style={{
				backgroundImage:
					'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
				backgroundSize: '24px 24px',
			}}
		/>
	)
}

function SceneGlow() {
	return (
		<div
			className="absolute bottom-[18px] left-[18px] w-[160px] h-[160px] rounded-full pointer-events-none"
			style={{
				background: 'color-mix(in oklab, var(--acc) 22%, transparent)',
				filter: 'blur(56px)',
				opacity: 0.16,
			}}
		/>
	)
}

function IntakeVisualization() {
	return (
		<div className="scene-card relative" aria-hidden="true">
			<SceneChrome label="Room Intake" status="context retained" />
			<SceneGrid />
			<SceneGlow />

			{/* intakeStack: absolute inset offset for chrome bar */}
			<div
				className="absolute grid items-stretch gap-4"
				style={{
					inset: '62px 22px 22px 22px',
					gridTemplateColumns: '196px 92px 1fr',
				}}
			>
				{/* Source card */}
				<div
					className="rounded-[18px] border p-[18px] self-start"
					style={{
						borderColor: 'color-mix(in oklab, var(--line) 80%, transparent)',
						background: 'rgba(255,255,255,0.88)',
						boxShadow:
							'0 4px 12px rgba(17,24,18,0.04)',
						backdropFilter: 'blur(2px)',
					}}
				>
					<span
						className="block mb-[10px] font-mono text-[10px] uppercase tracking-widest text-acc"
						style={{ fontFamily: 'var(--f-mono)' }}
					>
						incoming signal
					</span>
					<strong className="block font-sans text-[14px] tracking-tight text-ink">
						customer call
					</strong>
					<p className="mt-2 text-[12px] leading-[1.5] text-ink-2 max-w-[20ch] m-0 mt-2">
						handoff confusion between spec, eng, and review ownership
					</p>
				</div>

				{/* Column of chips */}
				<div className="flex flex-col justify-center items-start gap-3">
					{['transcript', 'note', 'research'].map((chip) => (
						<span
							key={chip}
							className="py-2 px-[10px] rounded-full border border-line font-mono text-[10px] text-ink-2"
							style={{
								fontFamily: 'var(--f-mono)',
								background: 'rgba(255,255,255,0.82)',
							}}
						>
							{chip}
						</span>
					))}
				</div>

				{/* Spine connector (sits behind, covers the gap between col1 and col3) */}
				<div
					className="absolute"
					style={{
						top: '34px',
						bottom: '34px',
						left: '252px',
						width: '1px',
						background:
							'linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--acc) 44%, var(--line)) 40%, color-mix(in oklab, var(--acc) 44%, var(--line)) 60%, transparent 100%)',
					}}
				>
					<motion.div
						className="absolute left-[-5px] w-[11px] h-[11px] rounded-full bg-acc"
						style={{
							boxShadow:
								'0 0 0 5px color-mix(in oklab, var(--acc) 14%, transparent), 0 0 14px 3px color-mix(in oklab, var(--acc-vibrant) 22%, transparent)',
						}}
						animate={{ top: ['10%', '82%'] }}
						transition={{
							duration: 6.2,
							repeat: Infinity,
							ease: PREVIEW_EASE,
						}}
					/>
				</div>

				{/* Thread card */}
				<div
					className="rounded-[18px] border p-4 flex flex-col justify-center"
					style={{
						borderColor: 'color-mix(in oklab, var(--line) 80%, transparent)',
						background: 'rgba(255,255,255,0.88)',
						boxShadow: '0 4px 12px rgba(17,24,18,0.04)',
						backdropFilter: 'blur(2px)',
					}}
				>
					<div className="flex justify-between mb-3 pb-3 border-b border-line font-mono text-[10px] text-ink-3"
						style={{ fontFamily: 'var(--f-mono)' }}
					>
						<span>room thread</span>
						<b className="text-acc">live</b>
					</div>
					<div className="grid gap-3">
						{[
							{ strong: 'signal attached', span: 'source preserved' },
							{ strong: 'owners named', span: 'spec, eng, review' },
							{ strong: 'context retained', span: 'travels with the work' },
						].map((item) => (
							<div
								key={item.strong}
								className="pl-[14px] relative"
								style={{}}
							>
								<span
									className="absolute top-[7px] left-0 w-[6px] h-[6px] rounded-full bg-acc"
									style={{ display: 'block' }}
								/>
								<strong className="block font-sans text-[13px] font-semibold text-ink">
									{item.strong}
								</strong>
								<span
									className="block mt-0.5 font-mono text-[10px] text-ink-3"
									style={{ fontFamily: 'var(--f-mono)' }}
								>
									{item.span}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

function RoleVisualization() {
	return (
		<div className="scene-card relative" aria-hidden="true">
			<SceneChrome label="Agent Lanes" status="named responsibility" />
			<SceneGrid />

			{/* roleShell */}
			<div
				className="absolute grid gap-[14px]"
				style={{
					inset: '62px 22px 22px 22px',
					gridTemplateRows: 'auto 1fr auto',
				}}
			>
				{/* Signal pill */}
				<div
					className="relative self-start py-2 px-[10px] rounded-full font-mono text-[10px] text-(--acc-ink)"
					style={{
						fontFamily: 'var(--f-mono)',
						background:
							'color-mix(in oklab, var(--acc-soft) 64%, white)',
						boxShadow: '0 2px 6px rgba(17,24,18,0.06)',
					}}
				>
					incoming change
				</div>

				{/* Board */}
				<div
					className="p-5 rounded-[18px] border border-line"
					style={{
						background: 'rgba(255,255,255,0.92)',
						boxShadow: '0 4px 12px rgba(17,24,18,0.04)',
					}}
				>
					<div
						className="font-mono text-[10px] tracking-widest uppercase text-ink-3 mb-[14px]"
						style={{ fontFamily: 'var(--f-mono)' }}
					>
						orchestration lanes
					</div>
					<div className="grid gap-[14px]">
						{/* Plan lane */}
						<div className="grid items-center gap-[14px]" style={{ gridTemplateColumns: '78px 1fr' }}>
							<span
								className="inline-flex items-center justify-center py-[6px] px-2 rounded-full font-mono text-[10px] text-(--acc-ink)"
								style={{
									fontFamily: 'var(--f-mono)',
									background: 'var(--acc)',
								}}
							>
								plan
							</span>
							<div
								className="h-[40px] rounded-full relative overflow-hidden"
								style={{
									background:
										'linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.015))',
								}}
							>
								<motion.div
									className="absolute top-[5px] left-[5px] py-[7px] px-[13px] rounded-full border font-mono text-[10px] text-ink"
									style={{
										fontFamily: 'var(--f-mono)',
										background: 'white',
										borderColor:
											'color-mix(in oklab, var(--acc) 36%, var(--line))',
										backgroundColor:
											'color-mix(in oklab, var(--acc-soft) 60%, white)',
										boxShadow: '0 2px 6px rgba(17,24,18,0.04)',
									}}
									animate={{ x: [0, 4, 0] }}
									transition={{
										duration: 7.2,
										repeat: Infinity,
										ease: PREVIEW_EASE,
									}}
								>
									draft brief
								</motion.div>
							</div>
						</div>

						{/* Build lane */}
						<div className="grid items-center gap-[14px]" style={{ gridTemplateColumns: '78px 1fr' }}>
							<span
								className="inline-flex items-center justify-center py-[6px] px-2 rounded-full bg-ink text-[#f3f7ef] font-mono text-[10px]"
								style={{ fontFamily: 'var(--f-mono)' }}
							>
								build
							</span>
							<div
								className="h-[40px] rounded-full relative overflow-hidden"
								style={{
									background:
										'linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.015))',
								}}
							>
								<motion.div
									className="absolute top-[5px] left-[5px] py-[7px] px-[13px] rounded-full border border-line font-mono text-[10px] text-ink"
									style={{
										fontFamily: 'var(--f-mono)',
										background: 'white',
										boxShadow: '0 2px 6px rgba(17,24,18,0.04)',
									}}
									animate={{ x: [0, 4, 0] }}
									transition={{
										duration: 7.2,
										repeat: Infinity,
										ease: PREVIEW_EASE,
										delay: 1.8,
									}}
								>
									implement
								</motion.div>
							</div>
						</div>

						{/* Review lane */}
						<div className="grid items-center gap-[14px]" style={{ gridTemplateColumns: '78px 1fr' }}>
							<span
								className="inline-flex items-center justify-center py-[6px] px-2 rounded-full bg-ink text-[#f3f7ef] font-mono text-[10px]"
								style={{ fontFamily: 'var(--f-mono)' }}
							>
								review
							</span>
							<div
								className="h-[40px] rounded-full relative overflow-hidden"
								style={{
									background:
										'linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.015))',
								}}
							>
								<motion.div
									className="absolute top-[5px] left-[5px] py-[7px] px-[13px] rounded-full border border-line font-mono text-[10px] text-ink"
									style={{
										fontFamily: 'var(--f-mono)',
										background: 'white',
										boxShadow: '0 2px 6px rgba(17,24,18,0.04)',
									}}
									animate={{ x: [0, 4, 0] }}
									transition={{
										duration: 7.2,
										repeat: Infinity,
										ease: PREVIEW_EASE,
										delay: 3.6,
									}}
								>
									check risk
								</motion.div>
							</div>
						</div>
					</div>
				</div>

				{/* Status stack */}
				<div className="grid grid-cols-3 gap-[10px]">
					{[
						{ b: 'spec', span: 'owns acceptance' },
						{ b: 'eng', span: 'holds delivery' },
						{ b: 'review', span: 'blocks regressions' },
					].map((item) => (
						<div
							key={item.b}
							className="p-[15px_15px_13px] rounded-[14px] border border-line flex flex-col gap-1 min-h-[82px]"
							style={{ background: 'rgba(255,255,255,0.88)' }}
						>
							<b className="font-sans font-semibold text-[13px] text-ink">
								{item.b}
							</b>
							<span className="text-[12px] text-ink-2 leading-[1.4]">
								{item.span}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

function ChainVisualization() {
	return (
		<div className="scene-card relative" aria-hidden="true">
			<SceneChrome label="Artifact Trail" status="thread → spec → pr" />
			<SceneGrid />

			{/* chainShell */}
			<div
				className="absolute grid items-center gap-6"
				style={{
					inset: '62px 22px 22px 22px',
					gridTemplateColumns: '1fr 256px',
				}}
			>
				{/* Chain line: thread → connector → spec */}
				<div
					className="grid items-center"
					style={{ gridTemplateColumns: 'minmax(156px,1fr) 88px minmax(168px,1fr)' }}
				>
					{/* Thread node */}
					<div
						className="p-[20px_18px] rounded-[16px] border border-line flex flex-col justify-center min-h-[126px]"
						style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 12px rgba(17,24,18,0.04)' }}
					>
						<span
							className="block mb-[10px] font-mono text-[10px] uppercase tracking-widest text-ink-3"
							style={{ fontFamily: 'var(--f-mono)' }}
						>
							thread
						</span>
						<strong className="font-sans text-[14px] font-semibold text-ink tracking-tight">
							incident context
						</strong>
					</div>

					{/* Connector */}
					<div
						className="relative self-center h-px w-full overflow-visible"
						style={{
							background:
								'color-mix(in oklab, var(--acc) 36%, var(--line))',
						}}
					>
						<motion.div
							className="absolute top-[-5px] w-[11px] h-[11px] rounded-full bg-acc"
							style={{
								boxShadow:
									'0 0 0 4px color-mix(in oklab, var(--acc) 16%, transparent), 0 0 12px 3px color-mix(in oklab, var(--acc-vibrant) 20%, transparent)',
							}}
							animate={{ left: ['8%', '82%'] }}
							transition={{
								duration: 6.8,
								repeat: Infinity,
								ease: PREVIEW_EASE,
							}}
						/>
					</div>

					{/* Spec node (accent) */}
					<div
						className="p-[20px_18px] rounded-[16px] border flex flex-col justify-center min-h-[126px]"
						style={{
							borderColor:
								'color-mix(in oklab, var(--acc) 28%, var(--line))',
							background:
								'linear-gradient(135deg, color-mix(in oklab, var(--lime-3, #ecfdf5) 70%, transparent) 0%, white 100%)',
							boxShadow: '0 4px 12px rgba(17,24,18,0.04)',
						}}
					>
						<span
							className="block mb-[10px] font-mono text-[10px] uppercase tracking-widest text-ink-3"
							style={{ fontFamily: 'var(--f-mono)' }}
						>
							spec
						</span>
						<strong className="font-sans text-[14px] font-semibold text-ink tracking-tight">
							acceptance locked
						</strong>
					</div>
				</div>

				{/* PR dock */}
				<div
					className="rounded-[18px] border border-line overflow-hidden flex flex-col justify-stretch min-h-[224px]"
					style={{
						background: 'rgba(255,255,255,0.96)',
						boxShadow: '0 4px 12px rgba(17,24,18,0.04)',
					}}
				>
					{/* Dock bar */}
					<div
						className="flex gap-[6px] p-[12px_14px] border-b border-line"
						style={{
							background:
								'linear-gradient(to bottom, rgba(250,250,250,1), rgba(242,242,242,1))',
						}}
					>
						<span className="w-[8px] h-[8px] rounded-full bg-ink-4/30" />
						<span className="w-[8px] h-[8px] rounded-full bg-ink-4/30" />
						<span className="w-[8px] h-[8px] rounded-full bg-ink-4/30" />
					</div>

					{/* Dock body */}
					<div className="p-[14px_14px_16px] flex-1 flex flex-col">
						{/* PR row */}
						<div
							className="flex flex-col gap-[6px] p-[16px_14px] rounded-[14px] border"
							style={{
								background:
									'color-mix(in oklab, var(--acc-soft) 46%, white)',
								borderColor:
									'color-mix(in oklab, var(--acc) 24%, var(--line))',
							}}
						>
							<b
								className="font-mono text-[12px] text-acc-2"
								style={{ fontFamily: 'var(--f-mono)' }}
							>
								pr #142
							</b>
							<span className="text-[13px] text-ink-2">full trail attached</span>
						</div>

						{/* Meta chips */}
						<div className="grid grid-cols-2 gap-2 mt-[14px]">
							{['thread', 'spec', 'tests', 'review'].map((tag) => (
								<span
									key={tag}
									className="py-[7px] px-[10px] rounded-full border border-line font-mono text-[10px] text-ink-2 text-center"
									style={{
										fontFamily: 'var(--f-mono)',
										background: 'var(--bg-1)',
									}}
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function Triptych() {
	return (
		<section
			className="pt-[140px] pb-[120px] px-8 border-b border-line"
			id="context"
		>
			<div className="inner">
				{/* Head */}
				<Reveal className="inner-narrow mx-auto mb-20 text-center">
					<span
						className="over"
						style={{ display: 'inline-block', marginBottom: 20 }}
					>
						connected context
					</span>
					<h2 className="heading-2">
						The context that
						<br />
						<em>stays attached.</em>
					</h2>
					<p className="lede" style={{ marginTop: 24 }}>
						Signal, assignment, and artifact stay linked through every stage
						of the work — captured once, carried all the way through.
					</p>
				</Reveal>

				{/* Grid */}
				<div className="border-t border-b border-line" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px' }}>
					{/* Cell 1 */}
					<Reveal
						delay={0}
						className="p-[44px_32px_36px] border-r border-b border-line flex flex-col gap-[14px] relative transition-all group cursor-default hover:[background:color-mix(in_oklab,var(--panel-soft)_46%,white)]"
					>
						<span
							className="font-mono text-[10.5px] tracking-widest uppercase text-acc inline-flex items-center gap-2 before:content-[''] before:inline-block before:w-[18px] before:h-px before:bg-acc transition-all group-hover:before:w-[28px]"
							style={{ fontFamily: 'var(--f-mono)' }}
						>
							01 · capture
						</span>
						<h3
							className="font-serif font-normal text-[30px] tracking-tight leading-[1.05] text-ink"
							style={{ fontFamily: 'var(--f-serif)' }}
						>
							Signals become <em>working context.</em>
						</h3>
						<p className="text-[15px] text-ink-2 leading-[1.6] max-w-[32ch] m-0">
							Requests, notes, customer calls, and internal discussion enter the
							same room first. Work starts from the original signal, not from a
							summary pasted somewhere else.
						</p>
						<IntakeVisualization />
					</Reveal>

					{/* Cell 2 */}
					<Reveal
						delay={80}
						className="p-[44px_32px_36px] border-b border-line flex flex-col gap-[14px] relative transition-all group cursor-default hover:[background:color-mix(in_oklab,var(--panel-soft)_46%,white)]"
					>
						<span
							className="font-mono text-[10.5px] tracking-widest uppercase text-acc inline-flex items-center gap-2 before:content-[''] before:inline-block before:w-[18px] before:h-px before:bg-acc transition-all group-hover:before:w-[28px]"
							style={{ fontFamily: 'var(--f-mono)' }}
						>
							02 · assign
						</span>
						<h3
							className="font-serif font-normal text-[30px] tracking-tight leading-[1.05] text-ink"
							style={{ fontFamily: 'var(--f-serif)' }}
						>
							Each stage is <em>distinct and visible.</em>
						</h3>
						<p className="text-[15px] text-ink-2 leading-[1.6] max-w-[32ch] m-0">
							Planning, building, and reviewing run in separate lanes with
							clear handoffs. You can see what is in progress, what is blocked,
							and what moves next — at any moment, without asking.
						</p>
						<RoleVisualization />
					</Reveal>

					{/* Cell 3 — full-width, two-column internal layout */}
					<Reveal
						delay={160}
						className="col-span-2 p-[56px_48px] flex flex-col gap-[14px] relative transition-all group cursor-default hover:[background:color-mix(in_oklab,var(--panel-soft)_46%,white)]"
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gridTemplateRows: 'auto auto auto auto',
							gap: '0 72px',
							padding: '56px 48px',
						}}
					>
						<span
							className="font-mono text-[10.5px] tracking-widest uppercase text-acc inline-flex items-center gap-2 before:content-[''] before:inline-block before:w-[18px] before:h-px before:bg-acc transition-all group-hover:before:w-[28px]"
							style={{ fontFamily: 'var(--f-mono)' }}
						>
							03 · carry
						</span>
						<h3
							className="font-serif font-normal tracking-tight leading-[1.05] text-ink"
							style={{
								fontFamily: 'var(--f-serif)',
								fontSize: '36px',
								maxWidth: '20ch',
							}}
						>
							Thread to spec to PR.
							<br />
							<em>One continuous trail.</em>
						</h3>
						<p className="text-[15px] text-ink-2 leading-[1.6] max-w-[32ch] m-0">
							The same context follows the work all the way through. Acceptance
							criteria do not drift, review has the original rationale, and the
							PR lands with the full trail attached.
						</p>
						{/* Illustration spans col 2, rows 1-4 */}
						<div
							style={{
								gridColumn: 2,
								gridRow: '1/5',
								height: 'auto',
								minHeight: '180px',
								marginTop: 0,
							}}
						>
							<ChainVisualization />
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	)
}
