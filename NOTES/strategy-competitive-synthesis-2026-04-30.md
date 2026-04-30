# Altr — Competitive Synthesis & Strategic Brief
*Compiled April 30, 2026. Based on 286-source competitive research + PM-tool-agent supplement.*

---

## Executive Summary

The "context dies at every handoff" thesis is now **consensus** — validated by Anthropic's harness paper, OpenAI Agents SDK, Sourcegraph Amp `/handoff`, XTrace, MindStudio, CleanAim, and every major vendor. The pain is real and confirmed.

The problem: **Altr's current surface (Mac app + persona agents) is the most crowded part of the space.**

The opportunity: **Altr's current architecture is uniquely suited to become the thing nobody else can become — a vendor-neutral, cross-platform execution context layer. But the Mac app is the wrong shape for that product.**

The single most important strategic decision: **Stay a Mac app competing with Intent/Conductor/Claude for Mac/Codex App (and lose), or become the coordination plane that all those agents plug into (and win).**

---

## Part 1: The Competitive Landscape — What Threatens Altr

### Tier 1: Existential threats

**GitHub Copilot Coding Agent** (March 2026)
- Natively assignable from Linear, Slack, Teams, Jira, Azure Boards, Raycast
- Assign issue → Copilot opens draft PR → streams updates to Linear timeline
- Free with GitHub enterprise. This is the same workflow Altr is selling. Already shipped.

**Atlassian Rovo Dev + Agents in Jira** (GA April 2, 2026)
- #1 SWE-bench (41.98%, Nov 2025)
- Every Jira ticket → spin up cloud coding agent session → merge-ready PR
- Bundled into Jira plans, $20/dev add-on. Signal→spec→code→PR natively in Jira.
- Native GitHub Copilot Coding Agent assignment from Jira tickets.

**ClickUp Super Agents + Codegen** (acquired Dec 23, 2025)
- Jay Hack (Codegen founder) is now ClickUp's Head of AI
- His quote: *"The bottleneck is context. ClickUp is the only platform that houses all of that context."* This is **literally Altr's pitch** — said by the person who now has 20M users behind him.
- 500+ skills, infinite memory, multi-LLM routing, audit logs, schedules + triggers.

### Tier 2: Category crowders (Mac app surface)

| Product | Why it crowds Altr |
|---|---|
| Augment Intent | Living spec + Coordinator/Specialist/Verifier + isolated worktrees + macOS + SOC 2 + well-funded |
| Conductor (Melty Labs, YC S24) | Mac parallel runner, free, BYOK, mindshare, Addy Osmani endorsement |
| Claude for Mac + Codex App | First-party runners from model vendors absorbing the runner layer |
| Factory.ai Droid | Enterprise, specialized Code/Knowledge/Reliability/Product agents, #1 Terminal-Bench |
| Steve Yegge Gas Town (OSS) | "Kubernetes for coding agents" narrative, 50+ PRs week 1, exploding dev mindshare |
| Cursor 3 | Async subagents, `/worktree`, `/best-of-n`, acquiring Graphite, $2B ARR |

### Tier 3: Eating from the side

- **Linear AI Agent** — building Altr's Pax functionality natively into Linear. Supports Claude Code, Codex, Cursor as custom coding-tool integrations. Third-party-friendly by design.
- **CodeRabbit Agent for Slack** — connects Jira/Linear/Notion/Asana/Intercom/Zendesk/AWS/Datadog/CircleCI/PostHog/Sentry/PagerDuty/Figma/Canva — one agent for entire SDLC in Slack.
- **Continue Cloud Agents** — bug-report-to-PR via Slack, Mission Control dashboard. Very close to Altr's pitch.
- **Cyrus (OSS)** — self-hosted Linear/Slack/GitHub/GitLab Claude Code background agent.
- **Notion Custom Agents** — Slack triggers, channel-watching, multi-LLM.

### The pincer diagram

```
GitHub Copilot Coding Agent (above)
        ↕  Atlassian Rovo Dev (above)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTR's current surface ← → CodeRabbit/Continue/Cyrus (sides)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        ↕  Conductor/Intent/Factory (below)
Cursor 3 / Claude for Mac / Codex App (below)
```

**Altr is encircled on the current surface.** The only escape is to change shape.

---

## Part 2: The Whitespace — What Nobody Has Built

### Still genuinely open

1. **Vendor-neutral, cross-platform execution context layer.**
   GitHub/Atlassian/ClickUp/Asana all want to be the center. None of them can play the center-neutral role. Real enterprises run Jira *and* Linear *and* ClickUp *and* Asana simultaneously. The coordination plane that survives treats all of them as signal sources without picking a winner.

2. **Durable execution semantics for coding agents.**
   Temporal/Restate/Conductor-OSS have the primitives. Nobody has packaged them as a coding-agent-native product. "Every step is persisted; if iteration 12 waits for human review for 3 weeks, iteration 13 picks up exactly where it left off" — nobody ships this for the Slack→spec→PR trail.

3. **Fleet governance / observability across agent providers.**
   CTO scenario: Copilot Coding Agent in Jira, Cursor agents in dev branches, Claude Code in production, Devin async, Rovo Dev hitting the codebase — no single tool gives a unified view of agent cost, activity, and risk. This is genuinely unowned.

4. **MCP-first ambient context layer for the product cycle.**
   tryclean.ai owns this for codebase memory. Nex owns it for org-wide context (60-tool MCP server). Nobody owns it specifically for the *product development trail* (Slack thread → spec → Linear ticket → PR → merge → release notes) as a persistent, queryable, MCP-exposed feed.

5. **Eval / verification harness for agent outputs.**
   Anthropic published their evaluator-generator-planner harness; nobody productizes it. Third-party trust layer for "did the agent actually do what the spec said?"

---

## Part 3: The Pivot — What Altr Should Become

### The new positioning

> **Altr is the execution context layer for product teams — an ambient daemon that keeps the full story (Slack thread → spec → Linear ticket → PR → merge) permanently attached and accessible, wherever your team works.**

Not another agent. Not another Mac app. The **coordination substrate** that makes whichever agents you already use more trustworthy and observable.

### The new architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ALTR CONTEXT DAEMON                       │
│  (Always-on, local-first, BYOK, SQLite-backed)              │
├──────────┬──────────┬──────────┬──────────┬─────────────────┤
│  Slack   │  Linear  │  GitHub  │  Notion  │ Figma/Zoom/DD   │
│  ingest  │  ingest  │  ingest  │  ingest  │    ingest       │
└──────────┴──────────┴──────────┴──────────┴─────────────────┘
                            │
              ┌─────────────▼──────────────┐
              │   EXECUTION TRAIL GRAPH    │
              │  (persistent, replayable,  │
              │   durable, auditable)      │
              └─────────────┬──────────────┘
                            │
        ┌───────────────────┼────────────────────┐
        ▼                   ▼                    ▼
  ┌──────────┐       ┌──────────────┐     ┌──────────────┐
  │ MCP for  │       │  Slack bot   │     │   Mission    │
  │Claude/   │       │  (everyone   │     │  Control     │
  │Cursor/   │       │   can use)   │     │  Dashboard   │
  │Codex     │       └──────────────┘     └──────────────┘
  └──────────┘
        │
  Engineers use it
  inside their agent
  (no new surface)
```

### Consumption surfaces (how it reaches each role)

| Who | How they interact with Altr |
|---|---|
| Engineers | Claude Code MCP — `@altr context` injects the full execution trail into the agent context window before coding starts |
| PMs | Slack — `@altr spec this thread` → Pax drafts AC, creates Linear ticket, attaches original thread |
| Engineering leads | Dashboard (mission control) — see all running agent sessions, approve/reject, view cost attribution |
| Everyone | Slack — status queries, approvals, notifications from any in-flight work |
| Automation | REST API / webhooks — wire Altr trail events into Zapier, n8n, Pipedream, custom workflows |

### The non-threatening angle

Altr does not replace:
- **Linear** — still your tracker; Altr makes it richer
- **Slack** — still your comms; Altr listens and routes
- **GitHub** — still your code platform; Altr attaches context to PRs
- **Cursor/Claude Code** — still your agents; Altr feeds them context via MCP
- **Figma** — still your design tool; Altr reads specs and attaches to execution trail

Altr is the **glue layer** — not a tool replacement. This is how it avoids threatening incumbents and avoids the "why not just use Linear's AI" objection.

---

## Part 4: Specific Recommendations

### 1. Re-shape the product surface (most urgent)

The Mac desktop app remains valid as the *daemon host* — something needs to run locally for BYOK + local SQLite. But it should not be the primary user experience.

**Phase 1 (now):** Ship the Claude Code MCP server. This is the highest-leverage distribution move. Every Claude Code user (the most-used AI coding tool among professional engineers) gets Altr context injected for free. Zero new surface to learn.

**Phase 2 (next):** Ship the Slack bot. This is how PMs and leads use Altr without installing anything. The daemon runs on one engineer's machine per team; the bot surfaces to everyone.

**Phase 3 (after):** Ship the Mission Control dashboard as a web UI. Fleet view, cost attribution, approval queue, execution trail browser.

### 2. Anchor on Linear, not Slack

Linear is the only major PM tool *not* building its own coding-agent platform. It deliberately ships a third-party-friendly AI Agent layer (Claude Code, Codex, Cursor as custom coding-tool integrations). Linear-shop teams are the most likely early buyers for a neutral coordination plane.

The wedge: *"Altr makes your Linear AI Agent context-aware — the Slack thread that originated the ticket travels with every Linear task, spec, and PR."*

### 3. Lead with MCP, not persona agents

Pax/Eng/Dex as named persona agents is now table stakes (ClickUp Super Agents, Factory Droids, Asana AI Teammates all do this). The differentiation is not *who* the agent is — it's *what context the agent has access to*.

Drop "meet Pax, your AI PM teammate" as the lead. Lead with: *"Every agent you already use, now with the full story attached."*

### 4. Durable execution as the technical moat

Borrow from Temporal/Conductor-OSS semantics for the execution trail:
- Every step in the trail is a persisted Activity
- Full replay if a session dies mid-stream
- Human approval gates as first-class (not bolted on)
- Cost attribution per step
- Idempotent reruns

This is the thing ClickUp/Atlassian/GitHub **cannot** do without rebuilding from scratch. Their workflow engines are not designed for coding-agent durable execution. This is Altr's technical moat if built correctly.

### 5. Open-source the trail protocol

Define a **Coding Agent Trail** format — a structured, typed artifact that any agent can emit when it starts work, hands off, or completes. Think OpenTelemetry spans but for coding-agent work. Publish it as OSS.

This is the same playbook as: Temporal (OSS durable execution), OpenTelemetry (OSS observability), MCP (OSS agent protocol). The protocol gets adopted; the hosted runtime with governance dashboard gets monetized.

### 6. Counter the GitHub Copilot threat head-on

The only credible defense against "GitHub already does this" is: *we work with ALL agents, not just Copilot.* Altr's trail tracks Claude Code sessions, Cursor agent runs, Devin tasks, Rovo Dev sessions, and Copilot PRs — all in one place. GitHub can't do this (they're one of the agents, not the platform above the agents).

The pitch for this: *"Altr is the coordination plane above your agents — whichever agents your team runs."*

### 7. Publish hard

Altr currently has no external content pull — no HN Show post, no engineering blog, no benchmark, no open-source project. Augment, Conductor, Gas Town, Anthropic, Sourcegraph all earned their mindshare with engineering blogs and benchmarks.

Priority content:
1. *"Why context dies at every coding-agent handoff and what to do about it"* (anchor the thesis, cite the research)
2. MCP server for Claude Code (show code, show demo, post on HN)
3. *"We benchmarked 5 coding agents running the same ticket — here's how they performed"* (fleet observability story)

### 8. Simplify the agent story

Current: Pax (PM), Eng (builder), Dex (design Q3), Rae (research later)

The persona framing is fine but four named agents before v0.1 ships is scope creep. Trim to:
- **v0.1:** Context daemon + MCP server + Slack bot. No "agent personalities." Just: "Altr keeps the story attached."
- **v0.2:** Pax — adds the spec-drafting / AC-generation layer. Now there's a reason for a named agent.
- **v0.5:** Fleet view + multi-agent governance. Eng runs in worktrees. This is where the real differentiation is.

Dex (design) should only ship when there's a real Figma MCP workflow to wrap, not as a placeholder agent.

---

## Part 5: Landing Page Implications

The research findings should drive specific messaging changes on altr.run:

### Hero section — change the frame

**Current frame:** "Close the execution loop" (good) + "Mac-native workspace" (wrong shape signal)

**Revised frame:** Lean harder into the context-layer framing:
- Lead line: *"The execution trail for your entire product cycle."*
- Sub-line: *"Every agent you run, every tool your team uses — connected by one persistent story. Slack thread to merged PR, nothing lost."*
- Remove or demote "Mac-native" from the hero — it signals consumer app, not platform
- Add: *"Use in Claude Code, Slack, or the web. Works with your agents, not instead of them."*

### Remove placeholder stats

The homepage currently shows `0× faster`, `0% less time`, `0m median` — these are placeholder numbers that destroy credibility. Either replace with real pilot data or replace with a qualitative claim. *"Every review, the original spec is still there"* is better than a fake metric.

### Replace fictional social proof

The pilot team logos and testimonials reference companies like Northline, MESA, Holt & Co — these read as invented to outside visitors. Either:
- Replace with real design partner quotes (even anonymized: *"Engineering lead, 60-person B2B SaaS"*)
- Or remove entirely and lean on the product demonstration

### Add MCP integration to the integrations section

The current integrations show Slack, GitHub, Linear, Notion, Zoom, Datadog as *signal sources*. Add a second dimension: *consumption surfaces* — Claude Code (MCP), Cursor (MCP), Slack (bot), Dashboard. This reframes Altr from "another tool" to "the layer that connects your existing tools."

### Lead the compare pages with agent-agnostic angle

On `altr-vs-github-copilot`: *"Copilot is one agent. Altr coordinates all of them."*
On `altr-vs-cursor`: *"Cursor writes code. Altr keeps the reason it was written."*
On `altr-vs-linear`: *"Linear tracks work. Altr keeps the original signal attached."*

---

## Part 6: The Wedge in One Paragraph

**Target buyer:** Engineering lead at a 30–200 person startup that runs Linear + Slack + GitHub and has started paying for Claude Code or Cursor for their team.

**Problem they feel:** Every time a ticket gets assigned to an agent, the original Slack thread is gone. By the time the PR opens, nobody can remember why the scope was what it was. Reviews get nit-picky because the reviewer doesn't know the original intent. Context is rebuilt in every review comment.

**What Altr does:** Keeps the Slack thread, the spec, and the acceptance criteria permanently attached to every ticket, PR, and merge — accessible inside Claude Code via MCP without switching tools, and visible in Slack without installing a dashboard.

**Why not GitHub Copilot:** Copilot is an agent. Altr works with Copilot *and* Claude Code *and* Cursor — it's above the agents, not one of them.

**Why not Linear AI Agent:** Linear Agent codes. Altr ensures the code matches the original intent — and it works whether you're using Linear's agent, Cursor's agent, or Claude Code.

**Why not ClickUp/Atlassian:** Those platforms want to be your entire workspace. Altr doesn't touch ClickUp or Jira. It works natively with Linear-first engineering teams.

---

## Summary: 10 Concrete Changes

| # | Change | Priority |
|---|---|---|
| 1 | Ship Claude Code MCP server as the primary v0.1 distribution surface | Critical |
| 2 | Ship Slack bot for Pax-style spec drafting and status queries | Critical |
| 3 | Remove placeholder stats (0× faster, 0%, 0m) from homepage | Urgent |
| 4 | Replace fictional pilot logos with real/anonymized design partner quotes | Urgent |
| 5 | De-emphasize "Mac-native" above the fold; lead with context-layer framing | High |
| 6 | Add consumption surfaces (Claude Code, Slack, Dashboard) to integrations section | High |
| 7 | Rewrite compare page angles to lead with "agent-agnostic" differentiation | High |
| 8 | Open-source a Coding Agent Trail spec (protocol, not app) | Medium |
| 9 | Publish engineering content — HN post for MCP server launch, context-handoff blog | Medium |
| 10 | Defer Dex/Rae personas; ship depth on context trail + MCP before breadth on agents | Medium |

---

*This document synthesizes the April 2026 competitive deep-dive (286 sources), PM-tool-agent supplement, and the product evolution direction discussed in session. Treat competitive claims about ClickUp, Atlassian, and Rovo Dev pricing/timing as current as of April 2026 — the space moves fast.*
