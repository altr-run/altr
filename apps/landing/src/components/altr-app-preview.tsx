'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
	IconBolt,
	IconBrandGithub,
	IconBrandSlack,
	IconCheck,
	IconCircleFilled,
	IconCode,
	IconFileText,
	IconGitPullRequest,
	IconInbox,
	IconLayoutKanban,
	IconSettings,
	IconSparkles,
	IconTerminal2,
	IconTimeline,
} from '@tabler/icons-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarInset,
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'

// ── Execution timeline chart data ─────────────────────────────────────────────
const runData = [
	{ hour: '09:00', context: 3, specs: 1, prs: 0 },
	{ hour: '10:00', context: 8, specs: 2, prs: 1 },
	{ hour: '11:00', context: 14, specs: 3, prs: 1 },
	{ hour: '12:00', context: 11, specs: 2, prs: 2 },
	{ hour: '13:00', context: 6, specs: 1, prs: 1 },
	{ hour: '14:00', context: 19, specs: 4, prs: 2 },
	{ hour: '15:00', context: 23, specs: 5, prs: 3 },
	{ hour: '16:00', context: 17, specs: 3, prs: 2 },
	{ hour: '17:00', context: 28, specs: 6, prs: 4 },
]

const chartConfig = {
	context: { label: 'Context trails', color: 'var(--acc)' },
	specs:   { label: 'Specs drafted', color: 'var(--acc-vibrant)' },
	prs:     { label: 'PRs opened',   color: 'var(--indigo-6)' },
} satisfies ChartConfig

// ── Active runs ───────────────────────────────────────────────────────────────
const RUNS = [
	{
		id: 'run-142',
		title: 'Magic-link onboarding',
		agent: 'Eng',
		mark: '▲',
		status: 'building',
		branch: 'eng/magic-link-auth',
		eta: '~18m',
		files: ['invites.ts', 'email-templates/', 'migrations/004.sql'],
		progress: 68,
	},
	{
		id: 'run-141',
		title: 'Rate-limit middleware',
		agent: 'Pax',
		mark: '■',
		status: 'spec-review',
		branch: 'pax/rate-limit-spec',
		eta: 'awaiting approval',
		files: ['specs/rate-limit.md'],
		progress: 100,
	},
	{
		id: 'run-143',
		title: 'Search index rebuild',
		agent: 'Eng',
		mark: '▲',
		status: 'queued',
		branch: null,
		eta: 'queued',
		files: [],
		progress: 0,
	},
]

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV = [
	{ label: 'Inbox',    icon: IconInbox,         active: false, badge: 3 },
	{ label: 'Specs',    icon: IconFileText,       active: true,  badge: 0 },
	{ label: 'Tickets',  icon: IconLayoutKanban,   active: false, badge: 0 },
	{ label: 'Runs',     icon: IconTerminal2,      active: false, badge: 2 },
	{ label: 'Trail',    icon: IconTimeline,       active: false, badge: 0 },
]

const NAV_BOTTOM = [
	{ label: 'Integrations', icon: IconBrandSlack },
	{ label: 'Settings',     icon: IconSettings },
]

// ── Status badge colors ───────────────────────────────────────────────────────
const STATUS_COLOR: Record<string, string> = {
	building:     'bg-[color-mix(in_oklab,var(--acc)_12%,transparent)] text-[var(--acc)] border-[color-mix(in_oklab,var(--acc)_24%,transparent)]',
	'spec-review': 'bg-amber-50 text-amber-700 border-amber-200',
	queued:       'bg-gray-100 text-gray-500 border-gray-200',
	done:         'bg-green-50 text-green-700 border-green-200',
}

// ── Metric cards ──────────────────────────────────────────────────────────────
const METRICS = [
	{ label: 'Context trails',     value: '14,847', delta: '+3 /min',  up: true },
	{ label: 'Specs this week',    value: '31',      delta: '+8 vs prev', up: true },
	{ label: 'PRs shipped',        value: '19',      delta: '63% with AC', up: true },
	{ label: 'Avg spec→PR',        value: '18m',     delta: '−22m saved', up: true },
]

// ── Spec pane (the document being authored) ───────────────────────────────────
function SpecPane() {
	return (
		<div className="flex-1 overflow-hidden px-8 py-6 text-left" style={{ background: 'linear-gradient(160deg, color-mix(in oklab, var(--acc) 3%, var(--background)) 0%, var(--background) 60%)' }}>
			{/* Rail cards */}
			<div className="grid grid-cols-3 gap-2.5 mb-6">
				{[
					{ label: 'status',   value: 'drafting' },
					{ label: 'context',  value: 'thread attached' },
					{ label: 'handoff',  value: 'build next' },
				].map(({ label, value }) => (
					<div
						key={label}
						className="p-2.5 rounded-xl border border-border flex flex-col gap-0.5"
						style={{ background: 'rgba(255,255,255,0.82)' }}
					>
						<span className="font-mono text-[9.5px] uppercase tracking-widest text-muted-foreground">{label}</span>
						<b className="font-sans text-[11.5px] font-semibold text-foreground">{value}</b>
					</div>
				))}
			</div>

			<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">§ spec · draft · edited 2 min ago</p>
			<h2 className="font-serif font-normal text-[22px] tracking-tight text-foreground mb-1">Magic-link onboarding</h2>
			<p className="font-mono text-[10.5px] text-muted-foreground mb-5">
				owner: <span className="text-[var(--acc)] font-medium">@mukul</span> · co-authored with <span className="text-[var(--acc)] font-medium">Altr</span>
			</p>

			<h3 className="font-sans font-semibold text-[11px] tracking-widest text-foreground uppercase mb-2">The problem</h3>
			<p className="text-[13px] leading-[1.7] text-muted-foreground mb-4">
				Teams sign up, hit the password step, and 34% bounce before their first workspace.
				We lose them before we learn anything. We want an invite flow that feels like <em>opening a door</em>, not filling out a form.
			</p>

			<h3 className="font-sans font-semibold text-[11px] tracking-widest text-foreground uppercase mb-2">Acceptance criteria</h3>
			<ul className="list-none p-0 m-0 mb-4 space-y-1.5">
				{[
					'Any teammate can be invited by email alone',
					'Invites deliver within 10 seconds of send',
					'Expired invites surface a resend CTA',
					'Rate-limit: 5 invites / user / hour',
				].map((item, i) => (
					<li key={i} className="flex items-start gap-2 text-[12.5px] text-muted-foreground">
						<IconCheck className="size-3.5 text-[var(--acc)] mt-0.5 shrink-0" />
						{item}
					</li>
				))}
				<li className="flex items-start gap-2 text-[12.5px] text-muted-foreground">
					<IconCircleFilled className="size-2 text-[var(--acc)] mt-1.5 shrink-0 animate-pulse" />
					<span>
						Audit log records inviter, invitee, status
						<span className="inline-block w-[1.5px] h-[1em] bg-[var(--acc)] ml-0.5 align-[-2px] animate-[blink_1.1s_steps(2)_infinite]" />
					</span>
				</li>
			</ul>
		</div>
	)
}

// ── Agent activity pane ───────────────────────────────────────────────────────
function AgentPane() {
	return (
		<div className="w-[280px] border-l border-border flex flex-col shrink-0" style={{ background: 'var(--sidebar)' }}>
			{/* Header */}
			<div className="px-3.5 py-2.5 border-b border-border flex items-center justify-between">
				<div className="flex items-center gap-1.5">
					<span className="text-[var(--acc)] text-[11px] font-bold">■</span>
					<span className="font-mono text-[10.5px] text-foreground font-medium">Altr</span>
					<span className="font-mono text-[10px] text-muted-foreground">· spec agent</span>
				</div>
				<div className="flex items-center gap-1 font-mono text-[10px] text-[var(--acc)]">
					<span className="w-1.5 h-1.5 rounded-full bg-[var(--acc)] animate-pulse" />
					drafting
				</div>
			</div>

			{/* Stage cards */}
			<div className="px-2.5 py-2 grid gap-1.5 border-b border-border">
				{[
					{ label: 'stage', value: 'plan · writing AC' },
					{ label: 'next',  value: 'build opens worktree' },
				].map(({ label, value }) => (
					<div
						key={label}
						className="px-2.5 py-2 rounded-[10px] border border-border flex flex-col gap-0.5"
						style={{ background: 'rgba(255,255,255,0.68)' }}
					>
						<span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{label}</span>
						<b className="font-sans text-[11.5px] font-semibold text-foreground">{value}</b>
					</div>
				))}
			</div>

			{/* Messages */}
			<div className="flex-1 p-2.5 flex flex-col gap-2 overflow-hidden">
				{[
					{ who: 'Altr', mark: '■', bg: 'var(--acc)', color: 'white', time: '11:02', text: 'Pulled 4 AC from the thread. Added rate-limit from the security review. Ready for build?' },
					{ who: 'mukul', mark: 'm', bg: 'color-mix(in oklab, var(--acc) 10%, white)', color: 'var(--acc)', time: '11:03', text: 'Yes. Also: keep the resend CTA behind a 30s cooldown.' },
					{ who: 'Altr', mark: '▲', bg: '#1a1a1a', color: 'white', time: '11:04', text: 'Drafting PR now. Est. 2h 40m. Touching invites.ts, email-templates/, one new migration.' },
					{ who: 'Altr', mark: '■', bg: 'var(--acc)', color: 'white', time: '11:05', text: "I'll draft the changelog entry once PR lands. Staging link will post here." },
				].map((msg, i) => (
					<div
						key={i}
						className="flex gap-2 px-2.5 py-2 rounded-xl border border-border/60 text-[11.5px] leading-[1.5] text-muted-foreground"
						style={{ background: 'rgba(255,255,255,0.62)' }}
					>
						<div
							className="w-5 h-5 rounded-full shrink-0 grid place-items-center font-mono text-[9px] font-semibold"
							style={{ background: msg.bg, color: msg.color }}
						>
							{msg.mark}
						</div>
						<div>
							<div className="font-mono text-[9.5px] text-muted-foreground mb-0.5">
								<b className="font-sans text-[10.5px] text-foreground font-semibold mr-1">{msg.who}</b>
								{msg.time}
							</div>
							{msg.text}
						</div>
					</div>
				))}

				{/* Typing indicator */}
				<div className="flex gap-2 px-2.5 py-1.5 items-center">
					<div
						className="w-5 h-5 rounded-full shrink-0 grid place-items-center font-mono text-[9px] font-semibold"
						style={{ background: 'var(--acc)', color: 'white' }}
					>
						■
					</div>
					<div className="flex items-center gap-1">
						{[0, 1, 2].map((i) => (
							<span
								key={i}
								className="w-1 h-1 rounded-full bg-muted-foreground/50 animate-bounce"
								style={{ animationDelay: `${i * 0.15}s` }}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

// ── Metrics section preview ───────────────────────────────────────────────────
export function AltrMetricsPreview() {
	return (
		<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
			{METRICS.map((m) => (
				<Card key={m.label} className="border-border/70">
					<CardHeader className="pb-1.5">
						<CardDescription className="text-[11px] uppercase tracking-widest font-mono">{m.label}</CardDescription>
						<CardTitle className="text-3xl font-serif font-normal tracking-tight text-foreground">{m.value}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-[11px] font-mono text-[var(--acc)]">{m.delta}</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

// ── Execution chart preview ───────────────────────────────────────────────────
export function AltrExecutionChart() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-serif font-normal text-[17px]">Execution activity today</CardTitle>
				<CardDescription className="font-mono text-[10px] uppercase tracking-widest">Context trails · specs · PRs</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="h-[180px] w-full">
					<AreaChart data={runData}>
						<defs>
							<linearGradient id="fillContext" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%"  stopColor="var(--acc)" stopOpacity={0.28} />
								<stop offset="95%" stopColor="var(--acc)" stopOpacity={0.04} />
							</linearGradient>
							<linearGradient id="fillSpecs" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%"  stopColor="var(--acc-vibrant)" stopOpacity={0.22} />
								<stop offset="95%" stopColor="var(--acc-vibrant)" stopOpacity={0.02} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} stroke="var(--border)" />
						<XAxis
							dataKey="hour"
							tickLine={false}
							axisLine={false}
							tickMargin={6}
							tick={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dot" />}
						/>
						<Area dataKey="context" type="natural" fill="url(#fillContext)" stroke="var(--acc)" strokeWidth={1.5} stackId="a" />
						<Area dataKey="specs"   type="natural" fill="url(#fillSpecs)"   stroke="var(--acc-vibrant)" strokeWidth={1.5} stackId="a" />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}

// ── Active runs list ──────────────────────────────────────────────────────────
export function AltrRunsList() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-serif font-normal text-[17px]">Active runs</CardTitle>
				<CardDescription className="font-mono text-[10px] uppercase tracking-widest">Execution trails in progress</CardDescription>
			</CardHeader>
			<CardContent className="p-0">
				<div className="divide-y divide-border">
					{RUNS.map((run) => (
						<div key={run.id} className="px-5 py-3.5 flex items-start gap-3">
							<div
								className="w-6 h-6 rounded-full shrink-0 grid place-items-center text-[10px] font-bold mt-0.5"
								style={{
									background: run.agent === 'Eng'
										? 'color-mix(in oklab, var(--acc) 12%, white)'
										: 'color-mix(in oklab, var(--acc-vibrant) 15%, white)',
									color: 'var(--acc)',
								}}
							>
								{run.mark}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-0.5">
									<span className="font-sans text-[13px] font-medium text-foreground truncate">{run.title}</span>
									<span className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-full border ${STATUS_COLOR[run.status] ?? ''}`}>
										{run.status}
									</span>
								</div>
								{run.branch && (
									<div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
										<IconCode className="size-3" />
										{run.branch}
									</div>
								)}
								{run.progress > 0 && run.progress < 100 && (
									<div className="mt-1.5 h-[3px] rounded-full bg-muted overflow-hidden">
										<div
											className="h-full rounded-full bg-[var(--acc)]"
											style={{ width: `${run.progress}%` }}
										/>
									</div>
								)}
							</div>
							<span className="font-mono text-[10px] text-muted-foreground shrink-0">{run.eta}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

// ── Scope wrapper — maps shadcn tokens to Altr design vars ───────────────────
export const PREVIEW_SCOPE_STYLE: React.CSSProperties = {
	['--background' as string]:        'var(--bg)',
	['--foreground' as string]:        'var(--ink)',
	['--muted-foreground' as string]:  'var(--ink-3)',
	['--border' as string]:            'var(--line)',
	['--sidebar' as string]:           'var(--bg-1)',
	['--primary' as string]:           'var(--acc)',
	['--card' as string]:              'var(--bg)',
	['--card-foreground' as string]:   'var(--ink)',
	['--accent' as string]:            'color-mix(in oklab, var(--acc) 10%, transparent)',
	['--muted' as string]:             'var(--bg-1)',
}

export function AltrPreviewScope({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
	return (
		<div className={className} style={{ ...PREVIEW_SCOPE_STYLE, ...style }}>
			{children}
		</div>
	)
}

// ── Full app preview (hero product shot) ─────────────────────────────────────
export function AltrAppPreview({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
	return (
		<div
			className="w-full rounded-xl overflow-hidden"
			style={{
				background: 'var(--bg-1)',
				border: '1px solid var(--line)',
				boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.10), 0 0 0 1px var(--line)',
				// scoped CSS variables so shadcn tokens map to Altr design system inside preview
				['--background' as string]:        'var(--bg)',
				['--foreground' as string]:        'var(--ink)',
				['--muted-foreground' as string]:  'var(--ink-3)',
				['--border' as string]:            'var(--line)',
				['--sidebar' as string]:           'var(--bg-1)',
				['--primary' as string]:           'var(--acc)',
				['--card' as string]:              'var(--bg)',
			} as React.CSSProperties}
		>
			{/* ── macOS title bar ─────────────────────────────────────── */}
			<div
				className="grid items-center border-b border-[var(--line)] px-4 py-3.5"
				style={{
					gridTemplateColumns: 'auto 1fr auto',
					background: 'linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)',
				}}
			>
				<div className="flex items-center gap-[5px]">
					<span className="w-3 h-3 rounded-full bg-[var(--macos-close)]" />
					<span className="w-3 h-3 rounded-full bg-[var(--macos-minimize)]" />
					<span className="w-3 h-3 rounded-full bg-[var(--macos-maximize)]" />
				</div>
				{/* Tabs */}
				<div className="flex items-center gap-0.5 justify-center overflow-hidden">
					{['inbox', 'specs / magic-link-auth.md', 'eng / PR #142', '#launch-magic-link'].map((tab, i) => (
						<span
							key={tab}
							className="font-mono text-[10.5px] px-2.5 py-[5px] rounded-lg truncate max-w-[160px]"
							style={
								i === 1
									? { background: 'rgba(255,255,255,0.88)', color: 'var(--ink)', border: '1px solid var(--line)' }
									: { color: 'var(--ink-3)' }
							}
						>
							{tab}
						</span>
					))}
				</div>
				<div className="font-mono text-[10px] px-2 py-1 border border-[var(--line)] rounded-md text-[var(--ink-3)]">⌘K</div>
			</div>

			{/* ── Body ────────────────────────────────────────────────── */}
			<SidebarProvider
				style={{
					'--sidebar-width': '200px',
					'--header-height': '0px',
					minHeight: 'unset',
				} as React.CSSProperties}
				className="!min-h-0"
			>
				<Sidebar
					collapsible="none"
					className="border-r border-[var(--line)] h-[600px]"
					style={{ background: 'var(--bg-1)' } as React.CSSProperties}
				>
					{/* Logo */}
					<SidebarHeader className="px-4 py-3 border-b border-[var(--line)]">
						<div className="flex items-center gap-2">
							<span className="text-[var(--acc)] text-[14px] font-bold leading-none">■</span>
							<span className="font-sans font-semibold text-[14px] text-[var(--ink)]">Altr</span>
						</div>
					</SidebarHeader>

					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupContent>
								<SidebarMenu>
									{NAV.map((item) => (
										<SidebarMenuItem key={item.label}>
											<SidebarMenuButton
												isActive={item.active}
												className="text-[12.5px] font-sans"
												style={item.active ? { color: 'var(--acc)', background: 'color-mix(in oklab, var(--acc) 8%, transparent)' } : {}}
											>
												<item.icon className="size-4 shrink-0" />
												<span>{item.label}</span>
												{item.badge > 0 && (
													<span className="ml-auto font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--acc)] text-white">
														{item.badge}
													</span>
												)}
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						{/* Integrations section */}
						<SidebarGroup className="mt-auto">
							<SidebarGroupContent>
								<SidebarMenu>
									{[
										{ label: 'GitHub',     icon: IconBrandGithub,  status: 'live' },
										{ label: 'Slack',      icon: IconBrandSlack,   status: 'live' },
										{ label: 'Claude Code',icon: IconSparkles,     status: 'active' },
									].map((int) => (
										<SidebarMenuItem key={int.label}>
											<SidebarMenuButton className="text-[11.5px]">
												<int.icon className="size-3.5 shrink-0" />
												<span className="text-[var(--ink-3)]">{int.label}</span>
												<span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--acc)] shrink-0" />
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>

					<SidebarFooter className="border-t border-[var(--line)] p-3">
						{NAV_BOTTOM.map((item) => (
							<SidebarMenu key={item.label}>
								<SidebarMenuItem>
									<SidebarMenuButton className="text-[11.5px] text-[var(--ink-3)]">
										<item.icon className="size-3.5 shrink-0" />
										{item.label}
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						))}
					</SidebarFooter>
				</Sidebar>

				<SidebarInset className="!min-h-0 flex flex-col" style={{ background: 'var(--bg)' }}>
					{/* Metric strip */}
					<div
						className="flex items-center gap-4 px-5 py-2 border-b border-[var(--line)]"
						style={{ background: 'var(--bg-1)' }}
					>
						<div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest text-[var(--ink-4)]">
							<span className="w-1.5 h-1.5 rounded-full bg-[var(--acc)] animate-pulse" />
							live
						</div>
						{[
							{ v: '14,847', l: 'trails' },
							{ v: '31',     l: 'specs' },
							{ v: '19',     l: 'PRs' },
						].map((m) => (
							<React.Fragment key={m.l}>
								<span className="w-px h-3 bg-[var(--line)]" />
								<span className="font-mono text-[10px]">
									<b className="text-[var(--acc)]">{m.v}</b>{' '}
									<span className="text-[var(--ink-4)]">{m.l}</span>
								</span>
							</React.Fragment>
						))}
					</div>

					{/* Main content: spec + agent */}
					<div className="flex flex-1 min-h-0">
						<SpecPane />
						{variant === 'full' && <AgentPane />}
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
