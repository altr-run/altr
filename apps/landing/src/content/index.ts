// Content data layer -- typed maps for compare, use-cases, integrations, changelog, legal
// These serve as fallbacks when Sanity returns null, and for generateStaticParams.

export type { LegalSection, LegalPageContent } from './legal'
export { LEGAL_PAGES } from './legal'

export type FeatureRow = {
	feature: string
	altr: boolean
	them: boolean
	altrNote: string | null
	themNote: string | null
}

export type PainPoint = {
	title: string
	body: string
}

export type ComparePage = {
	competitor: string
	headline: string | null
	subhead: string | null
	painPoints: PainPoint[] | null
	featureTable: FeatureRow[] | null
	counterParagraph: string | null
	ctaLabel: string | null
	metadata: null
}

export type Step = {
	step: number
	label: string
	body: string
}

export type Testimonial = {
	quote: string
	name: string
	title: string
	company: string
}

// relatedUseCases is plain slug strings. Page routes normalize Sanity nested shape.
export type UseCasePage = {
	title: string
	headline: string | null
	subhead: string | null
	problem: string | null
	steps: Step[] | null
	tools: string[] | null
	testimonial: Testimonial | null
	relatedUseCases: string[] | null
	metadata: null
}

export type Signal = {
	signal: string
	description: string
}

export type IntegrationPage = {
	tool: string
	/** Root domain used for Brandfetch logo fetch — e.g. "slack.com" */
	domain: string
	category: string | null
	logo: null
	headline: string | null
	subhead: string | null
	howItWorks: string | null
	signals: Signal[] | null
	relatedUseCases: string[] | null
	metadata: null
}

export type ChangelogEntry = {
	_id: string
	title: string
	version: string | null
	releaseDate: string
	type: string | null
	summary: string | null
	body: null
	metadata: null
}

export const COMPARE_PAGES: Record<string, ComparePage> = {
	"altr-vs-cursor": {
		competitor: "Cursor",
		headline: "Cursor writes code. Altr carries the reason you are writing it.",
		subhead: "Cursor is the editor. Altr is the pipeline upstream from the Slack thread that sparked the request all the way through to the merged PR.",
		painPoints: [
			{
				title: "No memory of why",
				body: "Cursor has no concept of the Slack thread that prompted the work. By the time you open the file, the original intent is already gone.",
			},
			{
				title: "Spec lives in someone's head",
				body: "Without a structured execution trail, the acceptance criteria exist in a document no one links back to, or a DM that has since scrolled away.",
			},
			{
				title: "Review without context",
				body: "Reviewers see the diff, not the decision. They cannot tell whether the code matches what was agreed, because what was agreed is not attached.",
			},
		],
		featureTable: [
			{ feature: "BYOK -- use your own API key", altr: true, them: false, altrNote: "Keys stay in your OS keychain", themNote: "Cursor manages credits centrally" },
			{ feature: "Local-first -- works offline", altr: true, them: false, altrNote: "SQLite on disk, no cloud at launch", themNote: null },
			{ feature: "Slack thread capture", altr: true, them: false, altrNote: "Thread to spec automatically", themNote: null },
			{ feature: "Spec editor with AI assist", altr: true, them: false, altrNote: "Altr writes specs from thread signal", themNote: null },
			{ feature: "Human review gate before PR", altr: true, them: false, altrNote: "Copilot mode -- you approve before merge", themNote: null },
			{ feature: "Code completion in editor", altr: false, them: true, altrNote: null, themNote: "Cursor's core feature" },
			{ feature: "Cross-tool signal (Slack to GitHub)", altr: true, them: false, altrNote: "Intent attached through the whole trail", themNote: null },
			{ feature: "Mac-native app", altr: true, them: false, altrNote: "Tauri 2 + native SQLite", themNote: "Electron-based" },
		],
		counterParagraph: "Cursor makes you faster in the editor. Altr makes the decision that spawned the editor work visible to everyone who touches it -- before, during, and after the PR.",
		ctaLabel: "See the full trail",
		metadata: null,
	},

	"altr-vs-devin": {
		competitor: "Devin",
		headline: "Devin replaces the engineer. Altr amplifies the team.",
		subhead: "Devin runs autonomously around the clock. Altr defaults to human review gates -- because the team's standards and context are the product.",
		painPoints: [
			{
				title: "Tasks without meaning",
				body: "Devin needs a task handed to it. Altr provides the full execution trail -- the Slack thread, the spec, the acceptance criteria -- that makes the task meaningful to begin with.",
			},
			{
				title: "Autonomous without oversight",
				body: "Devin can open PRs while the team sleeps. Altr defaults to human sign-off -- you choose the autonomy level per ticket.",
			},
			{
				title: "Context lost at handoff",
				body: "When Devin finishes, the original signal lives in an external session log. Altr attaches it to the PR so reviewers see the why alongside the what.",
			},
		],
		featureTable: [
			{ feature: "Human review gate (copilot mode)", altr: true, them: false, altrNote: "Per-ticket autonomy flag", themNote: "Fully autonomous by default" },
			{ feature: "BYOK", altr: true, them: false, altrNote: "Your Anthropic key, your cost", themNote: "Devin manages model access" },
			{ feature: "Slack thread to spec pipeline", altr: true, them: false, altrNote: "Signal captured before the task exists", themNote: null },
			{ feature: "Local-first, offline capable", altr: true, them: false, altrNote: "SQLite on disk", themNote: "Cloud-hosted agent sessions" },
			{ feature: "Autonomous code execution", altr: true, them: true, altrNote: "Autopilot mode, per task", themNote: "Devin's core feature" },
			{ feature: "Intent attached to PR", altr: true, them: false, altrNote: "Full trail travels with the code", themNote: null },
			{ feature: "Mac-native app", altr: true, them: false, altrNote: "Tauri 2 native", themNote: "Web-based interface" },
		],
		counterParagraph: "Devin is impressive when you have a clean, well-defined task. Altr is for the hour before that -- turning a rough Slack thread into a spec your team stands behind, then handing it to an agent that works the way you want it to.",
		ctaLabel: "See how the loop closes",
		metadata: null,
	},

	"altr-vs-github-copilot": {
		competitor: "GitHub Copilot",
		headline: "Copilot finishes the line. Altr closes the loop.",
		subhead: "GitHub Copilot autocompletes code. Altr carries the Slack thread that started the work all the way through the merged PR — so the intent never gets lost.",
		painPoints: [
			{
				title: "Copilot has no upstream context",
				body: "Copilot starts when you open a file. Altr starts when the idea surfaces in Slack — so by the time code is written, the spec and acceptance criteria are already attached.",
			},
			{
				title: "No spec between idea and code",
				body: "Without a structured spec, engineers interpret the requirement directly from a chat message. Altr closes that gap before the first line is written.",
			},
			{
				title: "PR reviewers still have no why",
				body: "Copilot-written code still arrives without context. Altr attaches the original thread and spec to every PR so reviewers can check intent, not just style.",
			},
		],
		featureTable: [
			{ feature: "Slack thread to spec pipeline", altr: true, them: false, altrNote: "Captures intent before the file opens", themNote: null },
			{ feature: "Structured spec with AC", altr: true, them: false, altrNote: "Reviewable before code starts", themNote: null },
			{ feature: "Human review gate before PR", altr: true, them: false, altrNote: "Copilot mode default", themNote: null },
			{ feature: "Intent attached to PR", altr: true, them: false, altrNote: "Full trail with the diff", themNote: null },
			{ feature: "Inline code completion", altr: false, them: true, altrNote: null, themNote: "Copilot's core feature" },
			{ feature: "BYOK", altr: true, them: false, altrNote: "Your Anthropic key", themNote: "GitHub subscription" },
			{ feature: "Mac-native app", altr: true, them: false, altrNote: "Tauri 2 native", themNote: "IDE plugin" },
		],
		counterParagraph: "Copilot makes you faster once you're in the file. Altr makes the decision that created the file visible to everyone who touches it — before, during, and after the PR.",
		ctaLabel: "See the full trail",
		metadata: null,
	},

	"altr-vs-linear": {
		competitor: "Linear",
		headline: "Linear tracks the ticket. Altr carries the thread that created it.",
		subhead: "Linear is the best issue tracker on the market. Altr is what happens before the ticket exists — and what keeps the original signal attached when it does.",
		painPoints: [
			{
				title: "Tickets lose their origin",
				body: "By the time a Slack conversation becomes a Linear ticket, the original context has been summarized or dropped. Altr preserves the full thread and attaches it.",
			},
			{
				title: "No path from spec to PR",
				body: "Linear tracks issues; it does not write specs or open PRs. Altr connects the upstream thread to a structured spec to a PR with the intent attached.",
			},
			{
				title: "Reviewers still lack context",
				body: "Even with a well-written Linear ticket, PR reviewers cannot see the original conversation. Altr attaches the full execution trail to every PR.",
			},
		],
		featureTable: [
			{ feature: "Issue tracking", altr: false, them: true, altrNote: "Creates Linear tickets from specs", themNote: "Linear's core feature" },
			{ feature: "Slack thread to structured spec", altr: true, them: false, altrNote: "Original signal preserved", themNote: null },
			{ feature: "Spec to PR pipeline", altr: true, them: false, altrNote: "Agent opens PR from spec", themNote: null },
			{ feature: "Intent attached to PR", altr: true, them: false, altrNote: "Full trail with the diff", themNote: null },
			{ feature: "Human review gate", altr: true, them: false, altrNote: "Per-ticket autonomy flag", themNote: null },
			{ feature: "BYOK", altr: true, them: false, altrNote: "Your Anthropic key", themNote: null },
			{ feature: "Mac-native app", altr: true, them: false, altrNote: "Tauri 2 native", themNote: "Web app" },
		],
		counterParagraph: "Linear is the best place to track a ticket. Altr is for the hour before the ticket exists — and for making sure the reason it was created travels with the code to merge.",
		ctaLabel: "See the full trail",
		metadata: null,
	},

	"altr-vs-notion": {
		competitor: "Notion",
		headline: "Notion stores the spec. Altr ships it.",
		subhead: "Notion is where specs go to be written and forgotten. Altr connects the spec to the Slack thread that created it and the PR that implemented it — so nothing needs to be rebuilt.",
		painPoints: [
			{
				title: "Specs that never reach engineers",
				body: "A Notion spec is only as useful as the engineer who finds and reads it. Altr attaches the spec directly to the task and the PR — no hunting required.",
			},
			{
				title: "No connection from Slack to Notion to GitHub",
				body: "Notion sits between conversation and code but doesn't bridge them. Altr reads both ends and keeps the thread attached through the whole trail.",
			},
			{
				title: "AI that describes, not executes",
				body: "Notion AI generates text in a doc. Altr's agent reads the Slack thread, writes the spec, and hands it to a second agent that opens the PR.",
			},
		],
		featureTable: [
			{ feature: "Docs and wiki", altr: false, them: true, altrNote: null, themNote: "Notion's core feature" },
			{ feature: "Slack thread to structured spec", altr: true, them: false, altrNote: "Original signal preserved", themNote: null },
			{ feature: "Spec to PR pipeline", altr: true, them: false, altrNote: "Agent opens PR from spec", themNote: null },
			{ feature: "Intent attached to PR", altr: true, them: false, altrNote: "Full trail with every diff", themNote: null },
			{ feature: "Human review gate", altr: true, them: false, altrNote: "You approve before merge", themNote: null },
			{ feature: "BYOK", altr: true, them: false, altrNote: "Your Anthropic key", themNote: "Notion AI subscription" },
			{ feature: "Mac-native app", altr: true, them: false, altrNote: "Tauri 2 native", themNote: "Web app / Electron" },
		],
		counterParagraph: "Notion is where specs live. Altr is how specs travel — from the Slack thread that prompted them to the PR that implements them, with every decision attached.",
		ctaLabel: "See the full trail",
		metadata: null,
	},

	"altr-vs-jira": {
		competitor: "Jira",
		headline: "Jira manages the backlog. Altr carries the context.",
		subhead: "Jira is where work goes to be tracked. Altr is where intent gets preserved — from the Slack thread that identified the need to the PR that ships the fix.",
		painPoints: [
			{
				title: "Tickets without origin",
				body: "Jira tickets are created by someone who summarized a conversation. By handoff, the original signal is gone. Altr captures it at the source.",
			},
			{
				title: "No path from ticket to context-rich PR",
				body: "Jira tracks progress; it doesn't write specs or open PRs with the reasoning attached. Altr does both.",
			},
			{
				title: "Ceremony without clarity",
				body: "Jira's workflow overhead is high and the payoff is a ticket description that still doesn't explain why. Altr skips the ceremony and keeps the why.",
			},
		],
		featureTable: [
			{ feature: "Issue and sprint tracking", altr: false, them: true, altrNote: "Syncs status to Linear", themNote: "Jira's core feature" },
			{ feature: "Slack thread to structured spec", altr: true, them: false, altrNote: "Original signal preserved", themNote: null },
			{ feature: "Spec to PR pipeline", altr: true, them: false, altrNote: "Agent opens PR from spec", themNote: null },
			{ feature: "Intent attached to PR", altr: true, them: false, altrNote: "Full trail with the diff", themNote: null },
			{ feature: "Human review gate", altr: true, them: false, altrNote: "Per-ticket autonomy flag", themNote: null },
			{ feature: "BYOK", altr: true, them: false, altrNote: "Your Anthropic key", themNote: null },
			{ feature: "Mac-native app", altr: true, them: false, altrNote: "Tauri 2 native", themNote: "Web app" },
		],
		counterParagraph: "Jira tells you what is in progress. Altr tells you — and the PR reviewer — why it was ever worth doing.",
		ctaLabel: "See the full trail",
		metadata: null,
	},

	"altr-vs-asana": {
		competitor: "Asana",
		headline: "Asana organizes work. Altr executes it.",
		subhead: "Asana tracks tasks and projects. Altr connects the Slack conversation that identified the work to the spec that defined it and the PR that shipped it.",
		painPoints: [
			{
				title: "No AI execution layer",
				body: "Asana tracks tasks assigned to humans. Altr adds an agent layer that takes a Slack thread and moves it through spec, ticket, and PR — with human approval at each gate.",
			},
			{
				title: "Context lost between tools",
				body: "Work starts in Slack, moves into Asana, then into a GitHub PR — and context bleeds out at every handoff. Altr keeps it attached through the whole chain.",
			},
			{
				title: "Handoff tax at every stage",
				body: "Someone has to summarize the Slack thread into an Asana task and the Asana task into a PR description. Altr does that automatically, preserving the original signal.",
			},
		],
		featureTable: [
			{ feature: "Task and project management", altr: false, them: true, altrNote: null, themNote: "Asana's core feature" },
			{ feature: "Slack thread to structured spec", altr: true, them: false, altrNote: "Signal captured at the source", themNote: null },
			{ feature: "AI-assisted spec writing", altr: true, them: false, altrNote: "From thread to reviewable AC", themNote: null },
			{ feature: "Spec to PR pipeline", altr: true, them: false, altrNote: "Agent opens PR from spec", themNote: null },
			{ feature: "Intent attached to PR", altr: true, them: false, altrNote: "Full trail with every diff", themNote: null },
			{ feature: "BYOK", altr: true, them: false, altrNote: "Your Anthropic key", themNote: null },
			{ feature: "Mac-native app", altr: true, them: false, altrNote: "Tauri 2 native", themNote: "Web app" },
		],
		counterParagraph: "Asana keeps the project on track. Altr keeps the reason the project exists attached to every piece of code that ships.",
		ctaLabel: "See the full trail",
		metadata: null,
	},

	"altr-vs-clickup-codegen": {
		competitor: "ClickUp Codegen",
		headline: "ClickUp needs you to migrate first. Altr works with what you have.",
		subhead: "ClickUp Codegen starts inside ClickUp's workspace. Altr works with Slack, GitHub, and Linear you are already using -- no migration required.",
		painPoints: [
			{
				title: "The migration tax",
				body: "ClickUp needs your team inside its workspace before codegen makes sense. Altr connects to the tools you are already running.",
			},
			{
				title: "Agents that do not pause",
				body: "ClickUp's agents run around the clock without a human checkpoint. Altr defaults to sign-off before merge -- you control the autonomy level.",
			},
			{
				title: "Credit system vs your own keys",
				body: "ClickUp charges credits against their hosted models. Altr is BYOK -- your Anthropic key, your bill, no markup.",
			},
		],
		featureTable: [
			{ feature: "Works with existing Slack / GitHub / Linear", altr: true, them: false, altrNote: "No migration required", themNote: "Needs ClickUp as the workspace hub" },
			{ feature: "Thread to spec to PR pipeline", altr: true, them: false, altrNote: "From original thread to merged PR", themNote: "From task to PR (inside ClickUp)" },
			{ feature: "BYOK -- use your own model key", altr: true, them: false, altrNote: "OS keychain, no markup", themNote: "Credit system against hosted models" },
			{ feature: "Human review gate per ticket", altr: true, them: false, altrNote: "Copilot mode default", themNote: "Autonomous by default" },
			{ feature: "Local-first, offline capable", altr: true, them: false, altrNote: "SQLite on disk", themNote: "Cloud-only" },
			{ feature: "Original intent attached to PR", altr: true, them: false, altrNote: "Full execution trail with the code", themNote: null },
			{ feature: "Mac-native app", altr: true, them: false, altrNote: "Tauri 2 native", themNote: "Web-based" },
		],
		counterParagraph: "ClickUp Codegen closes the loop inside ClickUp. Altr closes the loop inside your actual stack -- from the Slack thread that started it, through the spec, to the PR with the original intent still attached.",
		ctaLabel: "See the full trail",
		metadata: null,
	},
}

export const USE_CASES: Record<string, UseCasePage> = {
	"feature-delivery": {
		title: "Feature delivery",
		headline: "Turn rough requests into reviewable change.",
		subhead: "From the Slack thread to a spec with acceptance criteria, to a PR the team can actually review -- without rebuilding the story at every step.",
		problem: "A feature request starts in Slack, gets summarized in a Linear ticket by whoever happened to be online, partially speced in Notion, and then handed to an engineer who reads the ticket and guesses the rest. By the time the PR opens, the original intent is three degrees of separation away.",
		steps: [
			{ step: 1, label: "Capture the thread", body: "Altr watches your designated Slack channels and identifies threads that are feature requests. The original signal -- every message, every reaction, every clarification -- is captured in full." },
			{ step: 2, label: "Altr writes the spec", body: "Altr turns the thread into a structured spec: headline, problem statement, acceptance criteria, open questions. You review and edit. Nothing gets resolved without a human in the loop." },
			{ step: 3, label: "Altr opens the PR", body: "Altr works the spec in an isolated git worktree, streams progress back to you, and opens a PR with the spec and acceptance criteria attached. Reviewers see the why alongside the diff." },
			{ step: 4, label: "Intent travels with the code", body: "The PR links back to the spec, which links back to the original thread. Six months from now, anyone can trace the decision." },
		],
		tools: ["Slack", "GitHub", "Linear", "Notion"],
		testimonial: null,
		relatedUseCases: ["pr-review", "bug-triage"],
		metadata: null,
	},

	"bug-triage": {
		title: "Bug triage",
		headline: "Move from report to owner without losing the signal.",
		subhead: "Slack message or monitoring alert to structured issue with reproduction steps, routed to the right person with the evidence intact.",
		problem: "A bug report arrives in #incidents or #bugs. Someone screenshots it into a Linear ticket, strips the thread context, and assigns it to the person who happened to be in the channel. The engineer opens the ticket and spends the first hour reconstructing what the reporter actually saw.",
		steps: [
			{ step: 1, label: "Capture the report", body: "Altr identifies bug reports in Slack -- and can read monitoring alerts directly. The full signal: stack trace, reproduction steps, affected users, timeline." },
			{ step: 2, label: "Structure the issue", body: "Altr turns the raw signal into a structured issue: observed vs expected behavior, severity, affected surface, reproduction steps. No information lost." },
			{ step: 3, label: "Route with evidence", body: "The issue routes to the right owner -- with the full original signal attached. No one asks for the original thread again." },
		],
		tools: ["Slack", "Linear", "GitHub", "PagerDuty"],
		testimonial: null,
		relatedUseCases: ["incident-follow-up", "feature-delivery"],
		metadata: null,
	},

	"pr-review": {
		title: "PR review",
		headline: "Review against intent, not just diff shape.",
		subhead: "The spec and open questions travel with the code. Reviewers see the why alongside the what.",
		problem: "A PR arrives with a description that says it fixes the thing from last Tuesday's call. The reviewer approves based on code quality because they cannot easily get to the original conversation. Three weeks later someone files a follow-up ticket that should have been a question in the review.",
		steps: [
			{ step: 1, label: "Spec attached at open", body: "Altr attaches the spec -- acceptance criteria, open questions, original thread -- to every PR Altr opens. The context is there from the first comment." },
			{ step: 2, label: "Review against criteria", body: "Reviewers can check the implementation against the stated acceptance criteria without switching windows or pinging the author." },
			{ step: 3, label: "Open questions resolved", body: "Any open questions from the spec are surfaced in the PR. They get answered in context -- or escalated before merge, not after." },
		],
		tools: ["GitHub", "Linear", "Slack"],
		testimonial: null,
		relatedUseCases: ["feature-delivery", "incident-follow-up"],
		metadata: null,
	},

	"incident-follow-up": {
		title: "Incident follow-up",
		headline: "Carry incident context into the actual fix.",
		subhead: "Incident room to scoped implementation -- without rebuilding the timeline from memory.",
		problem: "The incident resolves at 2am. The postmortem gets filed. Three days later an engineer opens a ticket to implement the fix and spends an hour reading the postmortem, the Slack thread, and the runbook before they can write the first line.",
		steps: [
			{ step: 1, label: "Capture the incident trail", body: "Altr reads the incident Slack channel, the postmortem doc, and any linked monitoring alerts. The full timeline -- not a summary -- is captured." },
			{ step: 2, label: "Scope the fix", body: "Altr extracts the agreed remediation from the postmortem and structures it as a spec: what broke, what was decided, what the fix should do, what it should not change." },
			{ step: 3, label: "Implement with context", body: "Altr works the fix with the full incident context attached. The PR references the postmortem and the incident thread -- so reviewers can verify the fix matches what was decided." },
		],
		tools: ["Slack", "GitHub", "PagerDuty", "Notion"],
		testimonial: null,
		relatedUseCases: ["bug-triage", "pr-review"],
		metadata: null,
	},

	"migrations": {
		title: "Migrations",
		headline: "Break large refactors into supervised agent work.",
		subhead: "Parallel tasks, human approval before merge -- Altr keeps big migrations from becoming big bets.",
		problem: "A large migration -- database schema, API version, framework upgrade -- gets scoped in a one-hour meeting and then dropped into a single epic with ten tickets. Engineers work in parallel, context fragments, and the original constraints from the meeting are long forgotten by merge day.",
		steps: [
			{ step: 1, label: "Capture the migration brief", body: "Altr reads the design doc, the meeting notes, or the Slack thread where the migration was decided. Altr structures a migration spec: scope, constraints, rollback plan, acceptance criteria." },
			{ step: 2, label: "Break into supervised tasks", body: "Altr proposes a task breakdown. Each task runs in its own worktree. You control the autonomy level per task -- some automated, some with review gates." },
			{ step: 3, label: "Approval before merge", body: "Each task PR comes with the original constraint set attached. You approve before merge. The migration lands in pieces you have seen, not in a batch you are trusting." },
		],
		tools: ["GitHub", "Linear", "Slack", "Notion"],
		testimonial: null,
		relatedUseCases: ["feature-delivery", "pr-review"],
		metadata: null,
	},

	"release-follow-through": {
		title: "Release follow-through",
		headline: "Close the loop after the code lands.",
		subhead: "Release notes, doc updates, and stakeholder comms -- generated from the execution trail, not written from memory.",
		problem: "The code ships on Friday. On Monday someone asks for the release notes. The PM writes them from memory, misses two changes, gets corrected in Slack, edits the doc, and pastes a link into three different channels. The doc update for the new API endpoint does not happen until a customer asks.",
		steps: [
			{ step: 1, label: "Trail is already there", body: "Every spec, ticket, and PR from the release cycle is in the Altr execution trail. There is nothing to reconstruct." },
			{ step: 2, label: "Generate release notes", body: "Altr reads the merged PRs and their attached specs to generate accurate, audience-appropriate release notes. Human edits before publish." },
			{ step: 3, label: "Surface follow-on work", body: "Altr identifies doc updates, API changelog entries, and follow-on tickets from the trail. They surface as tasks -- not as surprises six weeks later." },
		],
		tools: ["GitHub", "Slack", "Notion", "Linear"],
		testimonial: null,
		relatedUseCases: ["feature-delivery", "pr-review"],
		metadata: null,
	},
}

export const INTEGRATIONS: Record<string, IntegrationPage> = {
	slack: {
		tool: "Slack",
		domain: "slack.com",
		category: "communication",
		logo: null,
		headline: "From Slack thread to execution trail -- without losing a word.",
		subhead: "Altr watches designated channels, identifies threads that are requests, bugs, or decisions, and routes them into the execution trail with the original thread preserved.",
		howItWorks: "You designate the Slack channels Altr should watch -- #feature-requests, #bugs, #incidents, whatever fits your team. Altr reads new threads, identifies signals (requests, bug reports, decisions), and creates a structured entry in the execution trail. The original thread is attached in full -- not summarized, not stripped.",
		signals: [
			{ signal: "Feature requests", description: "Threads that describe something the product should do differently." },
			{ signal: "Bug reports", description: "User-reported or team-reported issues with reproduction context." },
			{ signal: "Decisions", description: "Threads where a direction is agreed -- architecture choices, scope calls, trade-off resolutions." },
			{ signal: "Incident signals", description: "Alerts from monitoring tools, on-call pings, and incident threads." },
		],
		relatedUseCases: ["feature-delivery", "bug-triage", "incident-follow-up"],
		metadata: null,
	},

	github: {
		tool: "GitHub",
		domain: "github.com",
		category: "code",
		logo: null,
		headline: "PRs that carry the reason they exist.",
		subhead: "Altr reads GitHub issues and PRs, attaches intent from the originating Slack thread or Linear ticket, and surfaces the original rationale during review.",
		howItWorks: "When Altr opens a PR, Altr attaches the spec and the original execution trail -- Slack thread, acceptance criteria, open questions. Reviewers see the why alongside the diff. Altr also reads existing GitHub issues and can route them into the Altr execution trail alongside Slack signals.",
		signals: [
			{ signal: "PR open events", description: "Altr attaches spec context when a PR opens." },
			{ signal: "GitHub issues", description: "Existing issues can be imported into the Altr execution trail." },
			{ signal: "Review comments", description: "Open questions from reviewers surface back into the spec trail." },
			{ signal: "Merge events", description: "Merged PRs close the loop -- triggering release follow-through tasks." },
		],
		relatedUseCases: ["pr-review", "feature-delivery", "release-follow-through"],
		metadata: null,
	},

	linear: {
		tool: "Linear",
		domain: "linear.app",
		category: "project-tracking",
		logo: null,
		headline: "Linear stays your tracker. Altr keeps the thread attached.",
		subhead: "Altr creates Linear tickets from specs and syncs status. Your tracker stays accurate -- and the original signal stays with every ticket.",
		howItWorks: "Altr creates Linear tickets from approved specs and keeps status in sync as Eng works. Linear remains your source of truth for project tracking. Altr adds the layer Linear cannot provide: the original Slack thread, the full spec, and the acceptance criteria -- attached to every ticket so they travel with the work.",
		signals: [
			{ signal: "Ticket creation from spec", description: "Altr creates structured Linear tickets from approved specs." },
			{ signal: "Status sync", description: "Ticket status updates as Altr progresses -- in-progress, in-review, done." },
			{ signal: "Existing issue import", description: "Linear issues can be imported into Altr to attach the full spec context." },
			{ signal: "Acceptance criteria", description: "Criteria from the spec travel with the Linear ticket -- no copy-paste required." },
		],
		relatedUseCases: ["feature-delivery", "bug-triage", "migrations"],
		metadata: null,
	},

	notion: {
		tool: "Notion",
		domain: "notion.so",
		category: "docs",
		logo: null,
		headline: "Requirements that actually reach the engineer.",
		subhead: "Altr reads Notion docs to extract requirements and decisions, and attaches relevant context to specs so nothing gets rebuilt at handoff.",
		howItWorks: "Product specs, design briefs, and architecture decisions often live in Notion. Altr reads designated Notion pages and attaches their content to the execution trail -- so when Altr writes a spec, it has access to the full background doc, not just the summary someone typed into a Slack thread.",
		signals: [
			{ signal: "Product specs", description: "Full product requirement docs attached to Altr specs as source context." },
			{ signal: "Architecture decisions", description: "ADR pages read and attached to relevant implementation tasks." },
			{ signal: "Design briefs", description: "Design context from Notion linked to the relevant spec." },
			{ signal: "Runbooks", description: "Operational runbooks surfaced during incident follow-up workflows." },
		],
		relatedUseCases: ["feature-delivery", "incident-follow-up", "migrations"],
		metadata: null,
	},
}

export const CHANGELOG: Record<string, ChangelogEntry> = {
	"v0-1-2": {
		_id: "v0-1-2",
		title: "Mac-native app beta",
		version: "v0.1.2",
		releaseDate: "2026-04-15",
		type: "new",
		summary: "Thread capture, spec editor, and AI agent available to pilot teams. Mac-native via Tauri 2. Local-first SQLite. BYOK for Anthropic.",
		body: null,
		metadata: null,
	},
	"v0-1-1": {
		_id: "v0-1-1",
		title: "Slack thread capture improvements",
		version: "v0.1.1",
		releaseDate: "2026-03-28",
		type: "improved",
		summary: "Improved signal extraction from threaded Slack conversations -- better identification of feature requests vs. decisions vs. noise. Reduced false positives by 60%.",
		body: null,
		metadata: null,
	},
	"v0-1-0": {
		_id: "v0-1-0",
		title: "Private alpha launch",
		version: "v0.1.0",
		releaseDate: "2026-03-10",
		type: "new",
		summary: "Altr is live for the first pilot cohort. Thread capture, Altr spec generation, and the execution trail graph are live. Worktree support in the next release.",
		body: null,
		metadata: null,
	},
	"v0-0-9": {
		_id: "v0-0-9",
		title: "Spec editor streaming fix",
		version: "v0.0.9",
		releaseDate: "2026-02-20",
		type: "fixed",
		summary: "Fixed streaming drops on long agent sessions in the spec editor. Token budget tracking now matches the actual stream state rather than estimating from message count.",
		body: null,
		metadata: null,
	},
}
