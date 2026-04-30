# Product Marketing Context

*Last updated: 2026-04-30*

---

## Product Overview

**One-liner:** Altr closes the execution loop — from Slack thread to merged PR with the original signal permanently attached.

**What it does:** Altr is a Mac-native AI workspace that keeps one unbroken execution trail from the first signal (Slack thread, customer call, Linear issue, monitoring alert) through spec, build, review, and merge. AI teammates (Pax for planning, Eng for building) collaborate in the same space as humans, with every artifact carrying its source. Human review stays the default approval gate at every step.

**Product category:** AI coding agent coordination / execution trail platform. Sits between "AI coding agents" (Cursor, Claude Code, Devin) and "project management tools" (Linear, Jira, ClickUp). The connective tissue both categories miss.

**Product type:** Mac-native desktop application (Tauri 2 + Rust) with local-first SQLite storage. Cloud integration layer for real-time signals from Slack, GitHub, Linear, Notion, Zoom, Datadog.

**Business model:** BYOK (bring your own keys — Anthropic/OpenAI API keys stored in OS keychain, never in Altr servers). Subscription per seat. Currently invite-only early access. Deployment path: Mac-native → managed environments → VPC/on-prem.

---

## Target Audience

**Target companies:** Engineering-led startups and scale-ups, 30–200 people. Already using Linear + Slack + GitHub. Paying for Claude Code or Cursor for their team. Have enough process debt that "context dies at handoff" is a felt daily pain, not a theoretical one.

**Decision-makers:**
- Primary: Engineering lead / VP Engineering (feels the pain directly in code review)
- Secondary: Product Manager / Head of Product (rebuilds the brief at every cycle)
- Champion: Senior engineer who runs Claude Code sessions and hits context loss

**Primary use case:** Keeping the original Slack thread, spec, and acceptance criteria permanently attached to every Linear ticket, PR, and merge — so reviewers see *why*, not just *what*.

**Jobs to be done:**
- "Help me stop rebuilding context at every handoff" — the PM doesn't want to re-explain the thread when the engineer opens the PR
- "Help my team review code against intent, not just diff shape" — the lead wants to see why a scope decision was made without digging through Slack
- "Help our AI agents work with the full story, not just the task description" — the engineer wants Claude Code to have the full spec before it starts writing

**Specific use cases:**
- Feature delivery: Slack thread → AC-driven spec → Linear ticket → PR with intent attached → review against original criteria
- Bug triage: Slack/monitoring alert → structured issue → assign with evidence intact → fix plan linked to original signal
- PR review: every review happens against the original spec, not just the diff
- Release follow-through: changelog, doc updates, and "what changed?" questions answered from the same execution trail
- Migrations: break large refactors into parallel supervised agent tasks with human approval before merge
- Incident follow-up: incident thread → structured fix plan → postmortem trail preserved

---

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Engineering Lead | Code quality, team velocity, review sanity | Reviewers spend as much time reconstructing intent as reviewing code | Every PR opens with the full spec + original thread. Reviews get faster. |
| Product Manager | Feature fidelity, spec → delivery reliability | Writes the brief 3 times: Notion doc → Slack thread → Linear ticket → review comment | Brief gets written once. It travels with the work through every handoff automatically. |
| Senior Engineer | Coding flow, not context-switching | Wastes 45 min per ticket rebuilding the spec context before asking Claude Code to start | Altr MCP feeds Claude Code the full execution trail — Slack thread, AC, open questions — before a single line is written. |
| CTO / Head of Engineering | Visibility, compliance, cost control | Running 3+ AI agents (Claude Code, Cursor, Copilot) with no unified view of what they touched, what they cost, who approved | One execution trail across all agents. Every step auditable. Human approval at every gate. |

---

## Problems & Pain Points

**Core problem:** Context dies at every handoff in the engineering cycle. The Slack thread that prompted the request is gone by the time the spec is written. The spec is paraphrased by the time the Linear ticket is created. The ticket has lost nuance by the time the PR opens. Every reviewer has to reconstruct what the engineer actually knew when they wrote the code.

**Why alternatives fall short:**
- **GitHub Copilot Coding Agent** — one agent, one vendor. Works natively in Linear/Jira/Slack but gives no unified view across multiple agents. Not context-agnostic.
- **Atlassian Rovo Dev in Jira** — bundled into Atlassian stack. Not useful to Linear-native engineering teams. Locked to Atlassian context graph.
- **ClickUp Super Agents + Codegen** — requires ClickUp as the workspace center. Engineering-led teams already chose Linear; they won't migrate.
- **Cursor / Claude Code (standalone)** — coding agents, not coordination tools. No spec layer, no signal ingestion, no execution trail.
- **Linear AI Agent** — assigns agents to tickets but doesn't attach the original Slack thread or structured spec. Still loses context at handoff.
- **Notion Custom Agents** — docs and knowledge, not execution trail. No build/review coordination.

**What it costs them:**
- 6+ hours per engineer per week rebuilding context that already exists somewhere
- 40–60% of AI-generated PRs need re-scoping because the agent had incomplete context
- Review comments explaining the original intent instead of catching real issues
- Release notes written from memory, not the actual execution trail

**Emotional tension:** The brief was perfect in the Slack thread. By the time the PR opens, it's a game of telephone. Engineers feel like they're constantly context-switching just to find context. PMs feel like their specs don't travel. Leads feel like AI agents are making code that matches the ticket description but misses the original intent.

---

## Competitive Landscape

**Direct competitors (same problem, same solution shape):**
- **Augment Intent** — macOS, living spec, Coordinator/Specialist/Verifier agents, isolated worktrees. Well-funded, enterprise GTM. Falls short: locked to macOS, Augment's context engine, enterprise pricing, beta instability.
- **Conductor (Melty Labs, YC S24)** — Mac parallel runner, free, BYOK. Falls short: no spec/PM layer, no signal sources (just runs Claude Code in parallel), no execution trail.
- **Continue Cloud Agents** — bug-report-to-PR via Slack. Falls short: limited signal sources, no persistent trail, no BYOK.

**Secondary competitors (same problem, different solution):**
- **GitHub Copilot Coding Agent** in Linear/Slack/Jira — context-light, one vendor, no audit trail across agents.
- **Atlassian Rovo Dev** — Jira-native signal→code→PR, but locked to Atlassian stack, $20/dev seat on top of Jira.
- **ClickUp Super Agents + Codegen** — 20M users, but requires ClickUp as the workspace. Not for Linear/GitHub shops.
- **Factory.ai Droid** — enterprise specialized agents, no Mac-native consumer surface, opaque pricing.

**Indirect competitors (conflicting approach):**
- **Running agents manually** (paste Slack thread into Claude Code context) — current default behavior. Loses context on every new session.
- **Heavy PM tools** (detailed Notion specs + manual handoff) — high ceremony, doesn't scale with agent-assisted development.

---

## Differentiation

**Key differentiators:**
- **Vendor-neutral / BYOA:** Works with Claude Code, Cursor, Copilot, Devin — not instead of them. The only coordination layer that doesn't require picking one agent vendor.
- **Agent-agnostic MCP context layer:** Engineers use Altr inside Claude Code via MCP — no new surface to learn. The execution trail injects automatically before the agent starts.
- **Human approval at every gate:** Not autonomous. Every spec needs approval before build starts. Every PR needs review. Contrast with Devin/Rovo's "ship and tell" mode.
- **BYOK + local-first:** Keys live in OS keychain. SQLite on disk. Works offline. No Altr server ever sees code or API keys.
- **Cross-tool, not cross-workspace:** Doesn't replace Linear, Slack, or GitHub. Makes each richer by keeping the thread attached.
- **Execution trail as the product:** The trail is the value — not the agents, not the UI. Every artifact traces back to its signal. Reviewers see why, not just what.

**How it's done differently:** Instead of running as another agent dashboard, Altr runs as a daemon with multiple consumption surfaces: Claude Code (MCP), Slack (bot), Dashboard (mission control). Each role uses Altr in their natural habitat.

**Why customers choose Altr over alternatives:**
- "We use Linear, not Jira. Atlassian doesn't apply."
- "We already pay for Claude Code. We don't want another agent — we want our agents to have better context."
- "Copilot is one agent. We run Claude Code AND Cursor AND Devin. We need one trail across all of them."

---

## Objections

| Objection | Response |
|-----------|----------|
| "GitHub Copilot already does this in Linear" | Copilot is one agent. Altr coordinates the signal trail regardless of which agent — Claude Code, Cursor, Copilot, Devin — executes the work. It also works for Linear-native teams without requiring Atlassian or GitHub Enterprise. |
| "We already use Linear AI Agent" | Linear Agent assigns tickets to agents. Altr keeps the original Slack thread, customer call, and spec attached to that ticket so whichever agent picks it up has the full story — not just the ticket description. |
| "Mac-only is a dealbreaker for us" | Mac desktop is the local SQLite host. Slack bot + web dashboard + MCP work on any machine. Engineers who don't use Mac can still participate via Slack and the dashboard. |
| "We're not ready to give Claude Code / Cursor users another tool to manage" | Altr doesn't add a tool. The MCP server means the context shows up inside Claude Code automatically — no new surface, no new habit. |
| "We'll just use ClickUp Brain" | ClickUp's AI sits inside ClickUp. Altr's engineering-led teams chose Linear specifically because they didn't want ClickUp. Altr works with Linear, GitHub, Slack — it doesn't require switching to a new workspace. |

**Anti-persona:**
- Teams that use Jira + Bitbucket + Confluence exclusively and are happy with Atlassian's bundled Rovo Dev
- Teams that need Windows or Linux desktop app support as a hard requirement right now
- Fully autonomous "ship without approval" mode teams — Altr is explicitly human-in-the-loop
- Pre-product, solo founders who haven't hit the handoff problem yet

---

## Switching Dynamics

**Push (frustration driving away from status quo):**
- "I can't see why the engineer made that scope decision — the Slack thread is gone"
- "Every AI session starts from scratch — the agent has no idea what we decided last week"
- "I wrote the brief three times and it's still wrong by the time the PR opens"
- "Claude Code keeps going off-spec because it only saw the ticket, not the original thread"

**Pull (what attracts them to Altr):**
- The MCP demo — seeing the execution trail injected into Claude Code before the agent starts
- "Thread to spec in 18 minutes" stat for PMs who write briefs for hours
- The PR review showing original AC alongside the diff
- "Human approval at every gate" for teams burned by autonomous agents shipping wrong things

**Habit (what keeps them stuck):**
- Already invested in Linear workflows and don't want to migrate
- "We just paste the Slack thread into Claude Code — it's annoying but it works"
- Skeptical of another SaaS tool that won't survive if the startup fails
- "Our PMs write good specs in Notion — it's just not connected"

**Anxiety (worries about switching):**
- "Another tool the team won't adopt"
- "Mac-only means my Windows engineers are second-class citizens"
- "What happens to our execution trail if Altr shuts down?" (BYOK + local SQLite is the answer)
- "Our security team won't approve anything that sees our code" (code never leaves Mac, keys never stored)

---

## Customer Language

**How they describe the problem:**
- "By the time the PR opens, the original intent is already gone"
- "Every review, I'm guessing at why they built it that way"
- "We're basically doing archaeology every time we open a ticket"
- "The AI doesn't know what we decided in the Slack thread — it just sees the task description"
- "I wrote the brief in Notion but the engineer got the ticket description — those are not the same thing"
- "Context dies at every handoff"

**How they describe the solution:**
- "The thread that started the work is still attached when the PR opens"
- "One unbroken trail from the Slack thread to the merged PR"
- "The agent already knows what we decided — I didn't have to paste anything"
- "Reviews happen against the original intent, not just the diff"

**Words to use:**
- Execution trail, signal, intent, handoff, original brief, spec, gate, attached, unbroken, permanent
- "Carries the reason with the code"
- "Context that travels with the work"
- BYOK, human-approval, agent-agnostic, local-first

**Words to avoid:**
- "Autonomous" (scares engineering leads)
- "Workflow automation" (sounds like Zapier, not dev tooling)
- "AI workspace" (too vague, sounds like Notion AI)
- "Platform" (too enterprise, wrong buyer signal for early stage)
- "Replace" anything (Altr connects, doesn't replace)

**Glossary:**

| Term | Meaning |
|------|---------|
| Execution trail | The persistent, linked chain of artifacts: signal → spec → ticket → PR → merge |
| Signal | The originating input: Slack thread, customer call, monitoring alert, Linear issue |
| Gate | A human approval point between stages (spec approval, build start, PR review) |
| Pax | Altr's AI PM teammate — drafts specs, writes AC, flags open questions |
| Eng | Altr's AI builder — opens worktrees, writes code, opens PRs |
| BYOK | Bring your own keys — user's LLM provider keys stay in OS keychain, not Altr servers |
| Worktree | Isolated git worktree that Eng uses per ticket — cleaned up on PR merge |

---

## Brand Voice

**Tone:** Confident and precise. No hype. Engineering-native — talks to engineers the way an engineer would. Trusts the reader's intelligence.

**Style:** Direct and spare. Short sentences. Active voice. Serif type for editorial weight, mono for technical precision. No "AI will change everything" rhetoric. No emoji in product copy.

**Personality:**
- Meticulous (every artifact, every handoff tracked)
- Skeptical of hype (doesn't claim autonomy it doesn't have)
- Craft-oriented (cares about the quality of the execution trail, not just speed)
- Human-first (agents assist; humans approve)
- Local-first (your keys, your data, your control)

---

## Proof Points

**Metrics (current, real):**
- 6h saved per engineer per week (pilot data)
- 18 minutes from thread to first reviewable spec
- 100% human approval at every gate (explicit design choice)
- 10 teams on limited invite-only pilot (as of Q1 2026)

**Target customers (design partner profile):**
- Engineering-led B2B SaaS, 30–100 people
- Linear + Slack + GitHub stack
- Already paying for Claude Code or Cursor at team scale
- Have had at least one "why did we build it this way?" moment in code review

**Value themes:**

| Theme | Proof |
|-------|-------|
| Context never dies | Thread attached at spec creation, visible at PR review, preserved in merge trail |
| Human stays in control | Every gate requires human approval — explicit design choice, not a configuration |
| Works with your stack | Integrates with Linear, Slack, GitHub, Notion, Zoom, Datadog — replaces none of them |
| Your keys, your data | BYOK, OS keychain, local SQLite — Altr never stores API keys or code |
| Agent-agnostic | Works with Claude Code, Cursor, Copilot, Devin via MCP — not tied to one vendor |

---

## Goals

**Business goal:** Grow from invite-only pilot to 100 paying teams by end of 2026. Target: engineering-led startups on Linear stack. Secondary: establish Altr as the context coordination layer for Claude Code users.

**Key conversion actions (in order):**
1. Request early access (primary CTA on all pages)
2. Talk to the founders (for teams evaluating)
3. Read the compare pages (bottom-funnel consideration)

**Current metrics:**
- 10 pilot teams (invite-only, Q1 2026)
- Pre-revenue, design-partner phase
- No organic search traffic yet — pre-SEO
- Primary acquisition: founder network, HN, developer Twitter

---

*Other marketing skills will reference this file automatically. Update by running `/product-marketing-context`.*
