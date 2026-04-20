# ALTR — Master Research & Product Plan

_The complete research, strategy, competitive analysis, and build plan for Altr. Compiled April 2026._

**altr.run · The AI-native company OS for product teams.**

---

## Table of Contents

1. Executive Summary
2. The Product: What Altr Is
3. The Journey: How We Got Here
4. Market Landscape Research
5. Competitive Analysis
6. Positioning & Wedge Strategy
7. Technical Architecture
8. Product Design Vision
9. The 12-Week Build Plan
10. Pricing & Go-to-Market
11. Risks & Mitigations
12. Naming Research
13. Infrastructure Decisions
14. The Roadmap: v0.1 → v1.0 → Beyond
15. Execution Playbook
16. Appendix: Research Notes

---

## 1. Executive Summary

### The product in one sentence

Altr is the first workspace where humans and AI agents collaborate as teammates — not users and tools — on the same artifacts, in real time, inside one Mac-native app.

### The thesis

Three beliefs the product bets on:

1. **The 3-person team is the new 30-person team.** Small teams with agent leverage will out-ship traditional product orgs by 5–10× in the next 24 months.
2. **Integration cost is the bottleneck, not AI capability.** Product teams don't need better individual tools — they need one surface where PM, designer, engineer, researcher (and their AI counterparts) work together without context switching.
3. **Agents are teammates, not features.** Altr introduces four named AI teammates — Pax (PM), Dex (designer), Eng (engineer), Rae (researcher) — that live in the same workspace and read/write the same data as humans.

### The wedge (v0.1)

One Mac-native workspace. Two AI teammates (Pax + Eng). One core loop: idea → spec → tickets → code → PR. Humans direct or fully automate, configurable per-task.

### The stack

Tauri 2 + Rust + React + TypeScript + Tailwind + SQLite. Runs offline. BYOK for LLM. Ships as a signed macOS `.app`.

### The 12-week ambition

Ship v0.1 as a signed macOS app. Launch on HN + PH. Hit 200 signups, 30 paying, $1–2K first-week MRR. Earn the right to build Dex, Rae, team mode, and the full agency-OS vision in months 4–12.

### The longer bet

Altr becomes the OS for AI-native companies — the substrate where any product team with agent leverage does their work. 18-month horizon: Altr is to AI-native companies what Slack was to remote work.

---

## 2. The Product: What Altr Is

### The anchor metaphor

**Altr is a studio loft.**

In one open room:

- The researcher's wall of pinned sources and synthesis
- The PM's spec and roadmap board
- The designer's canvas with wireframes and variants
- The engineer's task list, code view, and PR feed
- The shared channel where humans and AI discuss decisions

Every teammate — human or agent — walks between stations freely. There's no "sync to Linear" or "export to Figma." There's just the loft.

### The four AI teammates

Each is a named, personality-bearing agent. Not amorphous "AI." Actual teammates with roles.

| Agent | Role | What they do |
|---|---|---|
| **Rae** (Researcher) | Deep dives | Owns the "Research" surface; synthesizes competitors, pain points, technical approaches; proactively adds context when specs start |
| **Pax** (PM) | Intent → structure | Turns ideas into specs, breaks them into tickets, maintains roadmap, writes release notes; asks clarifying questions inline |
| **Dex** (Designer) | Form | Generates wireframes, iterates on mockups, maintains design system consistency; pairs with humans in the canvas |
| **Eng** (Engineer) | Execution | Picks up tickets, writes code, opens PRs, responds to review comments; works fully autonomous or paired with humans |

Every agent:

- Has a minimal abstract visual mark (not robot faces)
- Appears in the team channel like any human (`Pax: "Should this work mobile-first?"`)
- Can be dialed between autopilot (ships without asking) and copilot (asks before acting)
- Can be scoped per-ticket, per-agent, per-team

### A day in Altr (end-to-end narrative)

**9:15 AM** — PM opens Altr. The loft is already alive. Rae has overnight-synthesized three competitor releases. Pax has drafted two spec variants for yesterday's discussion. Dex has three wireframes ready. Eng has two PRs awaiting review. No tab-switching needed.

**9:22 AM** — PM refines a spec. Opens Pax's draft, edits two paragraphs, adds an edge case. Pax proposes task decomposition. PM approves. Eight tickets appear on the board.

**9:30 AM** — Autopilot tickets launch. Five tickets tagged "autopilot" go to Eng. Five parallel Claude Code subagents start shipping in isolated worktrees. Live status in the sidebar.

**9:45 AM** — PM pairs with Dex. Opens design canvas. Dex has three variants. PM types "make variant 2 feel more playful." Dex iterates live. They settle. PM approves. Ticket goes to Eng.

**11:10 AM** — Engineer joins. Opens Altr. Sees: two PRs need review, one agent is blocked on a question, one ticket is human-only assigned directly. Day decided for her by the same loft.

**4:00 PM** — Retro with humans and agents. Altr auto-generates team digest: what shipped, what's blocked, who did what (humans and agents side-by-side), tomorrow's priority. Pax writes it; team edits; it goes out.

### What makes this different

| Tool | Scope | Who does work |
|---|---|---|
| Linear | Engineering tickets | Humans |
| Notion | Docs | Humans + AI-at-margin |
| Figma | Design | Humans + AI-assist |
| Cursor / Claude Code | Code | AI writes, humans review |
| Pentagon / Amika | Agents | AI works, humans supervise |
| **Altr** | **All four functions** | **Humans + AI as co-equals on same artifacts** |

The difference isn't integration. It's **co-inhabitance**.

---

## 3. The Journey: How We Got Here

This section documents the exploration that shaped Altr, so future decisions can be made with full context.

### Phase 1: "Top US tech companies with no Indian counterpart"

Initial exploration identified genuinely structural gaps India can't fill — defense tech (Anduril, Shield AI), humanoid robotics (Figure, Agility), nuclear fusion (Commonwealth, Helion), frontier AI (Anthropic, xAI), quantum hardware (PsiQuantum), BCIs (Neuralink).

_Key insight:_ The gaps aren't execution — they're structural access (US government clearances, FDA approvals, frontier compute, semiconductor fabs).

### Phase 2: "What indie developers can build"

Pivoted to indie-buildable opportunities. Discovered categories:

- US-specific infrastructure: HOA management, gun shop FFL compliance, cannabis dispensary tools, bail bonds
- US regulatory niches: 1099 compliance, OSHA tracking, COI management
- Healthcare billing: Prior auth automation, medical credentialing
- Real estate specific: MLS listing automation, short-term rental compliance
- Education: School district compliance, Greek life management, NCAA compliance

Then India-specific versions: GST reconciliation, TDS dashboards, RERA compliance, FSSAI tools, CBSE/ICSE affiliation, housing society management, AYUSH clinic software.

### Phase 3: 50 creative product ideas

Deep research produced 50 ideas across 5 categories (Dev Tools, AI-Native Consumer, Marketing/GTM, Business Ops, Revenue/CS). Top picks included:

- MCP economy tooling (pre-monetization, 11,000+ servers, <5% monetized)
- AgentCheckpoint (session replay for AI coding)
- ChatSort (vault for ChatGPT/Claude/Gemini conversations)
- BurnRate (token budget menu bar app)
- QBRforge (CS adjacent — Mukul's home-field)

### Phase 4: "What's trending in YC"

Mapped the user's interest list of 37 YC W26/F25/P26 companies:

- Coding agents: Approxima, Compyle, Amika, Pentagon, Aemon, Sazabi
- AI employees: Bubble Lab, Mantle, o11, Tasklet, Modern
- GTM AI: Sherpa, Karumi, Cardinal, Bear
- Hardware: Pocket (heypocket), BaseFrame
- Infrastructure: Moss, Runtime, Foaster
- Crow, Sauna, Selfin, Openroll, etc.

_Critical insight:_ The space is saturated with counter-positioning — every coding agent now positions against autonomy-maximalism. Compyle = "less autonomous." Pentagon = "agents that communicate." Amika = "multiplayer sandboxes." The signal: "better coding agent" is dead; only philosophical wedges survive.

### Phase 5: The original product vision (coding-agent-focused)

Initial ask was "a Mac-native coding agent better than Conductor/Superset, with integrated task manager, PM, designer, and engineer fleet doing end-to-end."

Two plans proposed:

- **Plan A: "Fleet"** — Mac-native mission control for existing coding agents (Claude Code, Cursor, Codex). Trojan horse: own the runtime layer first.
- **Plan B: "Prelude"** — Spec-first trojan horse. AI PM that writes specs and hands off to existing agents.

Both rejected: "these all exist."

### Phase 6: The real product emerged

User's real gut pull: "all-in-one agency with engineering, SRE, DevOps, product design and execution, task management."

Reframe: **Not a dev tool. An AI-native company OS.**

First draft as "agency OS with operator dashboard" → rejected.

The true product: _"A company OS specifically for product teams where everyone collaborates in one AI-native tool, AI runs the show (coding, research), humans direct or fully automate."_

### Phase 7: Naming

Explored 50+ names across categories:

- **Mythic:** Sovereign, Archon, Maestro
- **Weird-distinctive:** Zeroth, Fulcrum, Keystone, Mote, Cairn
- **Single-syllable:** Yar, Fen, Rook, Volt, Writ
- **Portmanteaux:** AlterFleet, Workwrought, Theforge
- **Dark horses:** Houseful, Stead, Terrace, Lintel

Converged on **Altr**. Evaluated domains: `altr.com` (taken — Series B data-security company), `altr.ai` (likely taken), `altr.so`/`altr.app`/`altr.run`/`altr.works`.

User purchased `altr.run`.

---

## 4. Market Landscape Research

### The orchestration era (April 2026)

The AI coding space consolidated around an orchestrator model where developers manage fleets of autonomous agents rather than pair-program with a single assistant.

**Cursor 2.0 (October 2025):** Introduced Composer (MoE model, 4× faster, ~250 tokens/sec). Up to 8 parallel agents per prompt in isolated worktrees. $1B ARR by Nov 2025. $2.3B Series D at $29.3B valuation.

**Claude Code Agent Teams (v2.1.32, February 2026):** Research preview. Peer-to-peer agent communication. Shared task lists with file-locking. 3–4× tokens vs. sequential but meaningful wall-clock savings. Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + Opus 4.6.

**OpenAI Codex (relaunched 2025):** Cloud agent + Rust CLI + IDE extension. GPT-5.4 flagship. Moved to token-based pricing April 2, 2026. Bundled into ChatGPT (Plus $20, Pro $200).

### Three-tier ecosystem (Addy Osmani's framework)

1. **Tier 1 (Interactive):** Claude Code CLI, Cursor in-editor, Cline — synchronous pair programming.
2. **Tier 2 (Local orchestration):** Cursor Cloud Agents, Claude Code Agent Teams, Conductor, Gas Town, Multiclaude, Vibe Kanban — 3–10 parallel agents with dashboards.
3. **Tier 3 (Cloud/async):** Claude Code Web, Copilot Coding Agent, Jules, Codex Web — assign and close laptop.

### Open-source state (April 2026)

| Tool | Stars | License | Strength |
|---|---|---|---|
| OpenCode | 95K+ | MIT | Go terminal UI, 75+ models, Build/Plan modes |
| OpenHands | 68K+ | MIT | Sandboxed execution, Agent SDK, $18.8M funded |
| Cline | 59K+ | Apache 2.0 | Permission-per-step, Enterprise SSO/RBAC |
| Aider | 43.5K+ | Apache 2.0 | Repo map, auto-git commits, top SWE-bench |
| Roo Code | — | Apache 2.0 | Architect/Code/Debug/Ask modes, VS Code |
| Kilo Code | — | Apache 2.0 | Cline+Roo hybrid, Orchestrator Mode |

### Pricing crisis

Every major tool shifted to credit/token-based pricing mid-2025. Community reaction uniformly negative. Consequence: heavy agent-mode usage routinely pushes monthly spend above base plan prices. Teams need internal usage monitoring. Two countertrends:

- BYOK open-source (Roo, Cline, Kilo, Aider) gaining because developers pay model providers directly
- Auto/routing modes handling 70–80% of tasks on cheap models

### YC W26 batch reality (47% AI agents)

~190 companies in W26. Nearly half are AI-agent plays. This means:

- Distribution is crowded. HN/PH virality requires sharper wedges than in 2024.
- Investors are picky. Valuations for generic AI agent tools normalizing down.
- "AI employee for X" is saturated. Pocket, Mantle, Bubble Lab, Modern carving vertical slices.

### Hardware resurgence

- Pocket (heypocket): Physical AI note-taking device
- BaseFrame: AI for hardware design itself
- Moss: Rust/WASM runtime (infrastructure-heavy)

Signal: Pure-software AI wrappers being devalued. Performance, specialization, or physical touchpoints are the new differentiators.

---

## 5. Competitive Analysis

### Direct competitors (coding-agent orchestration)

| Product | Position | Funding | Gap Altr exploits |
|---|---|---|---|
| Conductor (Melty) | Mac app, local git worktrees | Solo/indie | Electron, no PM/design layer |
| Crystal (stravu) | Electron app for Claude Code sessions | OSS | Session manager only, no product surface |
| Claude Squad | Go-based terminal orchestrator | OSS | Terminal-only, not multi-modal |
| Pentagon (pentagon.run) | Agents as teammates in group chats | YC P26, solo founder | No PM/design surface, not Mac-native |
| Amika (amika.dev) | Multiplayer sandboxes, BYO-agent | YC W26 | Cloud-first, team-first, not solo-native |
| Compyle (compyle.ai) | Less autonomous coding agent | YC F25 | Counter-positioning on autonomy only |
| Approxima (approxima.ai) | AI agents testing every PR | YC W26 | CI/CD layer only |
| Superset (superset.sh) | Agent orchestration | — | Cloud infrastructure, enterprise pricing |

### Adjacent competitors (different angles)

**Cloud autonomous agents:** Devin (Cognition), Factory.ai (Droid), Jules (Google), GitHub Copilot Coding Agent.

**PM tools with AI:** Linear (adding AI features), Height.app (AI-first PM), Plane.so (OSS Linear).

**AI design tools:** v0.dev (Vercel), Lovable, Bolt.new, Figma Make, Subframe, Claude Design (launched April 17, 2026).

### The positioning map

```
          Workflow Integration
          (full product lifecycle)
                    ▲
                    │
         Altr ✨    │
                    │
                    │
   Linear ●         │         ● Factory.ai
                    │
                    │
   Pentagon ●       │       ● Amika
   ─────────────────┼─────────────────▶
                    │      Orchestration Breadth
                    │     (single → fleet)
   Claude Code ●    │
   Crystal ●        │
                    │
                    │
          Code-only ▼
```

The empty quadrant (top, full-lifecycle + fleet orchestration) is Altr's territory.

### The three moats against incumbents

1. **Against Pentagon/Amika:** Mac-native performance + solo-first local-first + integrated PM/design layer. They're cloud-first and team-first.
2. **Against Linear:** AI-native from first principle. Linear will add AI features; Altr **IS** AI teammates as the substrate.
3. **Against Claude Design:** Altr is the workspace; Claude Design is one tool. Altr can leverage Claude Design as Dex's rendering engine.

---

## 6. Positioning & Wedge Strategy

### The positioning statement

> "Altr is the first workspace where humans and AI agents collaborate as teammates — not users and tools. Our product team is already four AI agents by default. You bring the humans."

### Why "AI-native company OS for product teams" beats alternatives

- Broader TAM than "coding agent" — PM + design + eng + research, not just eng
- Clearer wedge than "agency OS" — product teams have sharper, more universal pain than agencies
- More defensible than "dashboard" — owning the creative substrate vs. surfacing data
- More ambitious than "better Linear" — reinventing for a world where half the team isn't human

### The v0.1 wedge

**One project. Two agents (Pax + Eng). The core loop:**

```
Idea → Pax writes spec → Human approves → Pax decomposes →
Tickets → Eng picks up → Ships PRs → Human reviews
```

### The magical moment

A PM spec being live co-edited by a human and Pax simultaneously — Pax streaming suggestions, human refining in real time. This should feel like Figma multiplayer, not ChatGPT-in-a-sidebar.

### What's deliberately NOT in v0.1

- Team mode (solo only first)
- Dex (designer agent)
- Rae (researcher agent)
- Figma-like canvas
- Client-facing anything
- Complex integrations beyond GitHub + Claude Code CLI

### The distribution angle

- Solo AI-native founders as first 100 users
- Indie hackers in Claude Code ecosystem as amplifier community
- Gain Grow Retain + AI Engineer Discord for mid-funnel
- Mac-native craft as the differentiator
- Pre-launch pitch: "I'm building the workspace where I want to run my own agency"

---

## 7. Technical Architecture

### Stack decision: Tauri 2 + Rust + React

Decision matrix:

| Dimension | Tauri 2 + Rust + React | Native Swift | Electron |
|---|---|---|---|
| Time to first shippable | 2–3 weeks | 5–7 weeks | 1–2 weeks |
| Velocity (user already knows) | High (React) | Zero | High |
| Binary size | ~15 MB | ~8 MB | ~200 MB |
| Cold launch (M-series) | 200–400ms | 100–200ms | 1–3s |
| RAM with 10 agents | 250–400 MB | 150–250 MB | 800 MB+ |
| Subprocess spawning | Native via Rust | Native via Swift | Via Node |
| Reference repo reuse | 90% | 30% | 95% |
| Cross-platform later | Day one | Never | Day one |
| Talent pool | Huge | Tiny | Huge |

**Verdict:** Tauri 2 + Rust + React. Reasons:

1. Keeps React/TS velocity for 80% of UI code
2. Direct portability of Conductor/Crystal (TS) patterns
3. Performance gap (200 vs 400ms) invisible at orchestrator scale
4. Rust is only needed for subprocess + file I/O + SQLite
5. Linux/Windows viable later without rewrite

### Architecture in one sentence

A local-first Mac-native app with a shared typed graph of `projects → specs → tickets → artifacts → conversations`, where every node can be read/written by humans or agents, and agents are long-running processes that subscribe to graph changes via an event bus.

### Concrete stack

| Layer | Technology |
|---|---|
| Shell | Tauri 2 |
| UI framework | React 18 + TypeScript 5 + Vite |
| Styling | Tailwind CSS 4 + CSS variables |
| State (UI) | Zustand |
| State (async) | TanStack Query |
| Local DB | SQLite via `tauri-plugin-sql` |
| LLM layer | Anthropic SDK (streaming), BYOK |
| Editor | TipTap (rich text + multiplayer-ready) |
| Icons | lucide-react |
| Subprocess | Rust `std::process` + `portable-pty` |
| File watching | Rust `notify` crate |
| Git ops | Rust `git2` crate |
| Sync (future) | CRDT layer — Automerge or Yjs |
| Transactional email | Resend |
| Error tracking | Sentry |
| Analytics | PostHog |

### The shared graph

Every artifact is a typed node:

```
Project
 ├── Specs[]
 │    └── SpecVersions[] (append-only)
 ├── Tickets[]
 │    ├── dependencies: Ticket[]
 │    ├── autonomy: 'autopilot' | 'copilot' | 'human-only'
 │    └── agent: 'pax' | 'eng' | 'dex' | 'rae' | 'human'
 ├── Messages[] (team channel)
 ├── Events[] (graph-change log)
 └── Artifacts[] (design canvas, code, research notes)
```

Both humans and agents read/write this graph. Agents are subscribers that act on changes.

### Agent runtime

Each agent is a long-running Rust-managed process that:

1. Subscribes to graph events
2. Filters events relevant to its role
3. Invokes LLM streaming when triggered
4. Writes results back as new graph nodes
5. Respects per-task autonomy flags

Eng specifically spawns Claude Code subprocesses in isolated git worktrees when picking up tickets, streams stdout/stderr back into the ticket view, and opens PRs on completion.

### Why local-first

- Works offline (core requirement)
- Zero server costs at launch
- Data sovereignty (user's code never leaves machine)
- Sync is additive, not primary

### The sync roadmap

- **v0.1:** Solo only, local SQLite
- **v0.5:** Team mode via CRDT (Automerge)
- **v1.0:** Multiplayer editing of specs (Figma-grade)

---

## 8. Product Design Vision

### The aesthetic pitch

> "A beautifully designed studio loft where humans and AI agents work together."

Aesthetics aren't decoration — they're the pitch. This is where Linear won vs. Jira, Notion won vs. Evernote, Raycast won vs. Alfred.

### Brand direction

- Linear's restraint + Notion's warmth + Raycast's precision
- Studio loft, not command center. Warm wood, not cold steel.
- Hand-crafted, not machine-generated
- Typography-forward. Type does the heavy lifting.
- Quiet confidence. No gradients, no glows, no AI-looking glass.
- A hint of old-world / craft / artisanal
- **Opposite of "AI slop."** If it looks like ChatGPT, Claude, or Perplexity, we've failed.

### Color system (warm-neutral palette)

```
--bg-base:       #FBF7F1  (warm off-white, near-linen)
--bg-raised:     #F5EFE6  (slightly darker warm)
--bg-elevated:   #EBE3D6
--text-primary:  #1E1A16  (warm near-black)
--text-secondary:#5C544B
--text-muted:    #8A8176
--accent:        #C4774B  (warm ochre — Altr's signature)
--success:       #6F8C5A  (sage green)
--warning:       #C49A4B  (honey amber)
--error:         #B55A4B  (clay red)
```

No pure white. No pure black. No cold greys. No default Tailwind palette.

### Typography

- **Display/Headings:** Iowan Old Style or Söhne (serif, warm, characterful)
- **Body:** Inter with font-features `cv11`, `ss01`
- **Monospace:** JetBrains Mono

### Spacing

4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64. Rule: _"If you can add more air, add more air."_

### Agent visual marks (placeholder until design system lands)

| Agent | Mark | Color | Meaning |
|---|---|---|---|
| Pax (PM) | ■ filled square | Ochre | Structure |
| Eng (Engineer) | ▲ filled triangle | Sage | Build |
| Dex (Designer) | ● filled circle | Honey | Form |
| Rae (Researcher) | ◆ filled diamond | Clay | Inquiry |

### The signature moments

1. **Pax streaming a spec live** — human sees edits appear in real time, cursor motion matters
2. **Agent avatars in the channel** — interleaved with human messages as equals
3. **The ⌘K palette** — fastest navigation in any app; Raycast-grade
4. **Autopilot launch** — click "ship," watch five agents spin up in parallel, each with its own worktree
5. **Daily digest** — auto-generated team retro that feels hand-written

### Reference inspiration

- Linear's app icon (shape + confidence)
- Things 3 by Cultured Code (warmth + restraint)
- Are.na (calm, serif-forward, anti-algorithmic)
- Raycast (precision without coldness)
- Typography of read.cv and pitch.com
- Arc browser's confident minimal marks

### Anti-references

- ChatGPT / Claude.ai / Perplexity generic AI aesthetic
- Every "AI productivity tool" on Product Hunt in 2025
- Corporate enterprise SaaS (Atlassian, Salesforce)
- Crypto/Web3 neon/glass
- Anything with a gradient

---

## 9. The 12-Week Build Plan

_Assumption: ~15 hours/week × 12 weeks = 180 hours. Tight but doable for a focused wedge._

### Weeks 1–2: Foundations

**Deliverable:** Altr.app launches, sidebar exists, SQLite works, first project can be created.

Tasks:

- Bootstrap Tauri 2 + Vite + React + Tailwind
- SQLite schema v0: `projects`, `specs`, `tickets`, `messages`, `events`
- Project sidebar + main canvas shell
- Local file watcher for autosave
- Anthropic API client with streaming (BYOK from settings)
- Cmd-K palette scaffolding

### Weeks 3–4: Pax — the PM agent

**Deliverable:** Type "I want to build X." Pax generates a spec. Lives in the project. Responds to human edits.

Tasks:

- Spec editor (TipTap with custom extensions)
- Pax presence UI: avatar, "thinking" indicator, "typing" indicator
- Pax streams edits into documents live
- Clarifying questions appear as inline comments
- Spec version history (append-only)
- Pax reads existing project docs as context

_This is the hardest week. The UX of live human+AI co-editing is where Altr lives or dies. Must feel like Figma multiplayer, not ChatGPT-in-a-sidebar._

### Weeks 5–6: Spec → tickets → board

**Deliverable:** Pax breaks specs into tickets. Linear-style board UI.

Tasks:

- Ticket data model with dependencies
- Keyboard-first board UI (⌘K everywhere)
- Drag to reorder, dependency graph visualization
- Autopilot/copilot/human-only flag per ticket
- Pax proposes breakdowns, humans edit freely

### Weeks 7–8: Eng — the engineer agent

**Deliverable:** Autopilot ticket gets picked up by Eng. Code gets written. PR opens.

Tasks:

- Eng spawns Claude Code subprocess in isolated git worktree
- Stream stdout/stderr into ticket view (live)
- Token budget per ticket with auto-pause
- PR opens to GitHub on completion
- Human review approval flow in Altr
- Checkpoint UX: Eng pauses and asks in team channel when unsure

### Weeks 9–10: Team channel + decision queue

**Deliverable:** Humans and agents talk in one Slack-like surface. Priority decisions bubble to a queue.

Tasks:

- Channel view: messages from humans and agents interleaved
- Agents can @mention humans for decisions
- Decision queue: "3 things need your attention"
- Native macOS notifications for queue items
- Daily digest auto-generated by Pax

### Week 11: Polish

**Deliverable:** Shippable, signed, notarized `.dmg` that feels premium.

Tasks:

- Custom app icon (spend $200–500 on Dribbble/Twitter designer)
- Native window chrome, traffic lights, fullscreen
- Onboarding: 3 screens, 60 seconds to first spec
- Sparkle auto-update
- Demo video — 90 seconds of the magic loop
- Apple Developer ID signing + notarization
- Sentry + PostHog integration

### Week 12: Launch

**Deliverable:** 200 signups, 30 paying, $1–2K first-week MRR.

Tasks:

- `altr.run` landing page rebuild — single-page, 90-second Loom hero
- Pricing page
- Show HN post: "Show HN: Altr — the AI-native workspace where my AI teammates and I ship in the same room"
- Product Hunt Tuesday launch
- Twitter thread with hero Loom
- Tag @skirano, @levelsio, @swyx, @jxnlco, @OfficialLoganK
- Indie Hackers, Gain Grow Retain, AI Engineer Discord, r/SideProject, r/ClaudeAI
- DM 50 hand-picked builders for private beta with lifetime codes

---

## 10. Pricing & Go-to-Market

### The pricing tiers

| Tier | Price | For | Limits |
|---|---|---|---|
| **Solo** | $29/mo | 1 human, Pax + Eng, unlimited projects | BYOK |
| **Studio** | $79/mo | 3 humans, Pax + Eng, real-time co-editing | BYOK + team channel |
| **Squad** | $199/mo | 10 humans, all four agents | BYOK + audit log + SSO |
| **Founding Member** | $499 one-time | Lifetime Solo (200 seats only) | Sells out week 1 if launch hits |

**Critical principle:** BYOK for all LLM usage. Altr never carries token costs. This is what makes the pricing sustainable.

### Launch goals

**Week 1:**

- 200 signups
- 30 paying ($29–79)
- 5–10 Founding Members ($499 × 5–10 = $2.5–5K upfront)
- $1–2K MRR

**Month 3:**

- 1,000 installs
- 300 weekly actives
- 100 paying
- $3–5K MRR

**Month 6:**

- 3,000 installs
- 800 weekly actives
- 300 paying
- $8–15K MRR
- First Altr Intake feature shipped
- Seeing Solo → Studio conversion

### Distribution channels (ranked by impact)

1. **Hacker News Show HN** — Tuesday morning PST, screenshot-native
2. **Product Hunt** — Tuesday launch, 3 hunter-quality screenshots
3. **Twitter/X build-in-public** — 90-second hero Loom of magic loop
4. **Indie Hackers** — milestone posts, weekly
5. **Private beta DM** — 50 hand-picked builders, lifetime codes for testimonials
6. **Gain Grow Retain / AI Engineer Discord** — community-first, not spammy
7. **r/ClaudeAI, r/SideProject, r/indiehackers** — show don't pitch
8. **Influencer partnerships** — @skirano, @levelsio, @swyx (seeded lifetime codes)

### The launch narrative

**Headline:** "I built the workspace where my AI teammates and I ship in the same room."

Supporting story:

- "I got tired of switching between Linear, Figma, Cursor, and Slack"
- "What if the workspace treated AI as teammates, not tools?"
- "Here's what 12 weeks solo builds: Pax writes specs, Eng ships PRs, I review at checkpoints"
- "Altr ships ugly. Altr ships real. Download it."

### The 90-second demo script

1. **0:00–0:15** — Altr opens. Warm loft aesthetic. "This is Altr."
2. **0:15–0:30** — Type "Add magic-link auth to my app" — Pax starts streaming spec
3. **0:30–0:45** — Human edits two lines of spec. Pax adapts in real time.
4. **0:45–1:00** — Spec → tickets. Five autopilot. Eng picks them up. Watch them spawn.
5. **1:00–1:15** — Cut to 5 minutes later: PRs open on GitHub, notifications pop up
6. **1:15–1:30** — "One human. Two agents. One afternoon. Ship."

---

## 11. Risks & Mitigations

### Execution risks

| Risk | Probability | Mitigation |
|---|---|---|
| Burnout by week 6 | 40% | Hard rule: one weekday eve + Sunday. Never skip two weeks. Ship ugly. |
| Can't find 20 paying customers in launch week | 35% | Pre-launch 50-DM list. Founder-as-ICP content. |
| Claude Code changes session format, breaks reader | 40% | Abstract the watcher. Fallback to manual import. |
| Graph + CRDT complexity blocks team mode | 30% | Defer CRDT to month 6. Solo-only in v0.1. |

### Strategic risks

| Risk | Probability | Mitigation |
|---|---|---|
| Linear adds "AI teammates" feature | 50% | Moat is product feel + Mac-native + solo-first. Harder to copy than features. |
| Pentagon/Amika extends into PM/design | 40% | They're cloud-first and team-first. Different DNA. |
| Anthropic ships official fleet features | 60% | Leverage them — Altr uses Claude Code as Eng runtime. |
| Cognition ships Mac Devin | 25% | Would be a years-long project for them. Altr has head start. |

### Political risks

| Risk | Impact | Mitigation |
|---|---|---|
| Quivly co-founders push back on side project | High | Proactive email this week. Document that Altr is product-team OS, not CS/RevOps. Get written OK. |
| Altr adjacency drift to Quivly CS territory | Medium | **Never build CS features.** Altr is creation-side; Quivly is customer-side. |

### Financial risks

| Risk | Impact | Mitigation |
|---|---|---|
| LLM cost at scale (if not fully BYOK) | High | Strict BYOK from day one. No trial tokens. |
| Apple Developer account cost ($99/yr) | Low | Required for signing. Pay it. |
| Domain + Google Workspace | Low | $100–150/year total. Negligible. |

---

## 12. Naming Research

### The final choice: Altr → `altr.run`

### Evaluation criteria

1. `.com` or `.ai` availability at normal price
2. Google-ownable (page 1 clean after 60 days of effort)
3. Trademark-filable
4. Says something meaningful about the product

### Why Altr

- **Meaning:** Latin _alter_ = "the other, to change." Altr **alters** what one person can accomplish. Truncation signals modern tech (Tumblr → Flickr → Grindr → Altr).
- **Short:** 4 letters, 1 syllable. Fastest typing in category.
- **Flexible:** Verb, noun, command. "Altr this design." "Open Altr." "Altrd by me."
- **Brand room:** Not locked to "fleet" or "agent" — pivot-safe.
- **Dock-friendly:** Altr.app reads professionally.

### Why `altr.run` (not `altr.com` or `altr.ai`)

- `altr.com`: Taken by ALTR Inc. (Series B data-security). Not buyable.
- `altr.ai`: Almost certainly squatted. $5–15K aftermarket.
- `altr.run`: Purchased. $15/yr. Reads as command (`altr run` = "run altr"). Signals operational software (bun.sh, arc.net, fly.io vibe).

### The SEO acknowledgment

"Altr" / "Altra" namespace is somewhat congested:

- ALTR Inc. (altr.com) — data security
- Altra Running (altrarunning.com) — VF Corp running shoes
- ALTR Fitness (altrfit.com) — gym brand
- Altair Engineering (ALTR on NASDAQ) — engineering software

**Strategy:** Accept SEO handicap for 12 months. Lean on `altr.run` direct branding. Dominate "altr run ai workspace" / "altr app" search space specifically.

### Backup domains to register

- `altr.works` (~$30/yr) — backup marketing URL if "altr.run" feels too dev-tool later
- `getaltr.com` — fallback for email signups

### Naming alternatives that didn't win (for reference)

Top 10 considered:

1. **Yar** (`yar.app`) — nautical term for "ship responsive to single sailor." Unique, meaningful, but slightly obscure.
2. **Stead** (`stead.so`) — "in your stead." Warm, premium.
3. **Maestro** — too on-the-nose.
4. **Atelier** — premium, craft, but hard to spell.
5. **Zeroth** — mathematical precision.
6. **Cairn** — path-marking metaphor. Beautiful.
7. **Kiln** — craft transformation. Pottery conflict.
8. **Fleet** — conflict with JetBrains Fleet.
9. **Prelude** — spec-first positioning only.
10. **Conductor** — already an existing product.

---

## 13. Infrastructure Decisions

### Email

**Google Workspace Business Starter** — $7.20/user/month

Primary user: `mukul@altr.run`

Aliases to create (all free on one seat):

- `hello@altr.run` — public "talk to us"
- `support@altr.run` — customer issues
- `founders@altr.run` — investor intros
- `team@altr.run` — institutional tone
- `press@altr.run` — media
- `security@altr.run` — responsible disclosure
- `abuse@altr.run` — RFC compliance
- `billing@altr.run` — Stripe contact

### Transactional email: Resend

- Free tier: 3,000/mo
- Best DX in 2026
- React Email templates
- Route from `pax@altr.run`, `eng@altr.run` for agent-sent emails (reinforces branding)

### Domain

- **Primary:** `altr.run` — purchased
- **Consider buying:** `altr.works` as backup marketing URL

### Handles to claim

- Twitter/X: `@altr_run`
- GitHub org: `altr-run` or `altrhq`
- Product Hunt maker: `Altr`
- LinkedIn company: `Altr`

### Dev infrastructure

- **Code hosting:** GitHub (private repo → public at launch)
- **CI/CD:** GitHub Actions
- **Error tracking:** Sentry (free tier)
- **Analytics:** PostHog (free tier)
- **Apple Developer:** $99/year (required for signing)
- **Sparkle:** Free (auto-update for macOS)

### Payments (post-launch)

- Stripe for subscriptions
- Paddle as alternative (handles VAT for EU)

### AI API

- User brings own key (Anthropic primary, OpenAI fallback)
- Altr stores key locally, never transmits
- No token costs for Altr at launch

---

## 14. The Roadmap: v0.1 → v1.0 → Beyond

### v0.1 (Weeks 1–12) — The Core Loop

- One human, Pax + Eng, solo mode
- Spec editor + ticket board + team channel
- Claude Code subprocess integration
- Mac-native, signed, polished

### v0.2 (Months 4–6) — The Designer

- Dex launches — native canvas for wireframes
- Integration with Claude Design API for rendering
- Pair-with-Dex UX in the canvas
- Export to Figma, HTML, Canva

### v0.3 (Months 7–9) — The Researcher

- Rae launches — proactive competitive/pain research
- Context wall for pinned sources
- Synthesis bubbles into Pax's specs automatically
- Web scraping + MCP integration for data

### v0.5 (Months 10–12) — Team Mode

- CRDT-backed real-time collaboration (Automerge)
- Multi-user spec editing (Figma-grade)
- Shared channel across teammates
- Solo → Studio tier conversions
- Tiny Supabase-backed sync server

### v1.0 (Months 13–18) — The Showcase

- The "AI-native company" demo: 3-person team runs Altr, ships production app live on Twitter
- This demo sells Altr for the next 18 months
- First enterprise deals

### v2.0 (Months 19–24) — The Platform

- Integrations marketplace (connectors for Vercel, Sentry, Slack, etc.)
- MCP-based agent extension system
- Custom agents (users define their own)
- Altr becomes substrate; agents become the app store

### Long-term vision (3–5 years)

Altr is the OS for AI-native companies. Every small team with agent leverage uses Altr as their daily work surface. Altr is to AI-native companies what Slack was to remote work — the default.

Revenue trajectory ambition:

- **Year 1:** $50–100K MRR
- **Year 2:** $500K MRR
- **Year 3:** $2–5M MRR
- **Year 4:** Series A territory or sustainable bootstrap

---

## 15. Execution Playbook

### The pre-flight checklist (Week 0 — this weekend)

**Political (1 hour):**

1. Email Quivly co-founders: "Side project disclosure — Altr." Document it's product-team OS (not CS/RevOps). Get written OK.

**Commitment (5 minutes):**

2. Put "Altr v0.1 launch — [12 weeks from today]" on calendar. Public-ish commitment.

**Handles (10 minutes):**

3. Grab `@altr_run` on X, `altr-run` on GitHub, Altr on Product Hunt, Altr on LinkedIn.

**Infrastructure (15 minutes):**

4. Google Workspace on `altr.run` ($7.20/mo), set up aliases.
5. Resend account, verify domain.
6. (Optional) Buy `altr.works` as backup (~$30).

**Landing page (30 minutes):**

7. Spin up one-page landing at altr.run: "Altr — where your team and your AI teammates work in the same room." Email capture.

### The Claude Code development workflow

**Directory structure:**

```
~/code/altr/
├── altr-app/          # the product
│   ├── CLAUDE.md      # agent brief (critical)
│   ├── src/           # React
│   ├── src-tauri/     # Rust
│   └── ...
└── references/        # reference repos for Claude to read
    ├── crystal/
    ├── claude-squad/
    ├── opencode-openhands/
    ├── melty/
    ├── tauri/
    ├── awesome-tauri/
    ├── shadcn-ui/
    └── claude-code-ultimate-guide/
```

**CLAUDE.md — the project's constitution:**

Must include:

- Product soul and vision
- Tech stack (non-negotiable)
- Architecture principles
- File layout
- Coding conventions
- Design tokens (color, typography, spacing)
- Agent avatars
- Reference repo index
- What NOT to do
- Commit style
- How to ask clarifying questions

**The five rules:**

1. Always ask Claude to read before writing
2. Never start a session without CLAUDE.md
3. Commit every 30–60 minutes
4. Use reference repos liberally
5. Explicitly hand-off between sessions via `NOTES/handoff-YYYY-MM-DD.md`

### Session rhythm

| Session | Time | Goal |
|---|---|---|
| Sunday evening | 3 hours | Plan the week; do the hard thing |
| Weekday 1 | 2 hours | One specific sub-task |
| Weekday 2 | 2 hours | One specific sub-task |
| Saturday morning | 4 hours | Integration / big feature |

Total: ~11 hours/week. Honors the side-project constraint.

### First Claude Code session prompt

```
Before we write any code, do three things:

1. Read CLAUDE.md fully. Summarize in 5 bullets.
2. Read reference repos: crystal/, tauri/examples/, claude-squad/.
   Tell me in 3-5 bullets what patterns we should borrow.
3. Propose a Week 1 milestone: minimum thing we can ship in 10 hours
   that (a) proves stack works end-to-end and (b) creates foundation
   for the rest of Altr.

Do not write code yet. Think, read, and report back.
```

### Design system kickoff (Claude Design prompt)

Use the complete Claude Design prompt documented in this research to produce:

- Brand pillars
- Color system (with 2 accent options)
- Typography (display, body, mono)
- Spacing scale
- Components (sidebar, buttons, input, teammate avatar, message bubble)
- Five logo variants (serif wordmark, geometric sans, wordmark+glyph, typographic, wildcard)
- App icon set (1024, 512, 256, 128, 64, 32)

### Shipping principles

1. **Ship ugly first.** Week 1–10 will be rough. Polish is Week 11.
2. **Commit constantly.** Clean git history is your rollback button.
3. **Dogfood.** Use Altr to plan Altr from day one.
4. **Never skip two weeks.** The enemy is silent abandonment.
5. **Publish the journey.** Weekly Indie Hackers milestone post. Compounds.
6. **Respect the Quivly boundary.** Every feature gets a "does this compete with Quivly?" check.

---

## 16. Appendix: Research Notes

### YC W26 Demo Day reality (March 2026)

- ~190 companies in W26
- AI was "buzzword again"
- Nearly 50% of batch = AI agents
- Post-YC valuations for generic AI agent tools normalizing down
- Vertical and specialized agents commanding premium
- Hardware re-entering the conversation

### Cursor's trajectory (as positioning benchmark)

- October 2025: Cursor 2.0 launches with Composer
- Up to 8 agents per prompt
- $1B ARR by November 2025
- November 2025: $2.3B Series D at $29.3B valuation
- March 2026: Credit-based pricing controversy peaks

### Claude Code Agent Teams (February 2026)

- Research preview in v2.1.32
- Peer-to-peer agent communication
- Shared task lists with file-locking
- Requires Opus 4.6 + experimental flag
- 3–4× tokens vs. sequential sessions
- Third-party orchestrators fill gaps for solo devs

### The MCP economy (April 2026)

- 11,000+ MCP servers total
- <5% are monetized
- Pre-monetization window closing by Q3 2026
- First movers: 21st.dev, MCPize, Smithery, Glama
- Per-call billing gateways not yet dominant
- Mukul's stack (ClickHouse + Next.js) is the exact fit

### Claude Design (launched April 17, 2026)

- Powered by Claude Opus 4.7
- Available to Pro/Max/Team/Enterprise
- Brilliant case study: "20 prompts in competitors → 2 prompts in Claude Design"
- Datadog: "week-long cycle → single conversation"
- Figma stock dropped 7% on launch day
- Altr strategy: Leverage Claude Design API as Dex's rendering engine

### The indie SaaS landscape (State of 2025–2026)

- 39% of independent SaaS founders are solo
- $100K MRR achievable for niche-focused founders
- BYOK pricing becoming standard for LLM-heavy apps
- Chrome extensions + Mac native apps increasingly viable
- Subreddit communities (r/ClaudeAI, r/cursor, r/LocalLLaMA) = distribution hubs

### User's unique advantages

- **Stack match:** Next.js/TypeScript/Supabase/ClickHouse → Tauri + Rust + React is a natural extension
- **Domain adjacency:** Founding engineer at Quivly (AI-native CS/RevOps) → understands agent orchestration, multi-tenant SaaS, embedded analytics
- **Community access:** AI Engineer Discord, Indian SaaS founders, Chrome extension experience
- **Timing:** Claude Design launched days ago, MCP economy pre-monetization, YC W26 validating the "AI teammates" thesis

### Key quotes from research

- "Better coding agent is dead; only philosophical wedges survive." — synthesis from YC W26 counter-positioning pattern
- "The center of gravity for 2026 dev tools has moved from 'AI writes code' to agent orchestration, provenance, and cognitive load."
- "Craft is the moat." — Linear vs Jira, Notion vs Evernote, Raycast vs Alfred pattern
- "Make the name earn meaning is better than picking a name that's already overloaded." — naming strategy principle

### Reference repos to clone (for Claude Code context)

```bash
git clone https://github.com/stravu/crystal.git
git clone https://github.com/smtg-ai/claude-squad.git
git clone https://github.com/OpenHands/OpenHands.git
git clone https://github.com/melty-sh/melty.git
git clone https://github.com/FlorianBruniaux/claude-code-ultimate-guide.git
git clone https://github.com/tauri-apps/tauri.git
git clone https://github.com/tauri-apps/awesome-tauri.git
git clone https://github.com/shadcn-ui/ui.git
```

### Further reading & community sources

**Technical:**

- Tauri 2 docs: tauri.app
- Claude Code docs: docs.anthropic.com/claude-code
- Addy Osmani on agent orchestration: addyosmani.com/blog/code-agent-orchestra
- O'Reilly Radar: "Conductors to Orchestrators"

**Community:**

- Indie Hackers: milestone posts, launch threads
- Gain Grow Retain (CS-specific): 20K+ listeners
- AI Engineer Discord
- r/ClaudeAI, r/cursor, r/LocalLLaMA, r/SideProject

**Inspiration:**

- Linear engineering blog
- Raycast blog
- Anthropic engineering blog
- PostHog founder content
- Lenny Rachitsky newsletter

---

## Final words

This document is the complete research, strategy, and build plan for Altr as of April 2026. It represents hundreds of web searches, community threads, and synthesis cycles — distilled into one source of truth.

**The core bet:** A Mac-native workspace where humans and AI agents work as teammates will be the default operating system for small, high-leverage product teams in the next 24 months.

**The wedge:** Pax + Eng + one core loop, shipped in 12 weeks solo.

**The moat:** Craft, product feel, Mac-native performance, solo-first design — all harder to copy than features.

**The challenge:** Shipping this on nights and weekends without breaking.

**The next step:** Email Quivly co-founders this weekend. Start Week 1 on Sunday evening.

Good luck. Ship it.

---

_Document compiled April 2026. Update as research evolves._
