# CLAUDE.md — Altr project constitution

_Read this first. Every session. No exceptions._

> **Purpose:** This file is the brief you read before writing any code in this repo. It captures the non-negotiables, the soul of the product, and the conventions that keep Altr shippable on nights and weekends. If something in this file conflicts with an instruction in a session, **flag it and ask** — don't just follow the newer instruction.

The canonical, long-form plan lives alongside this repo at `MASTER_PLAN.md` (or in the cowork workspace at `altr.run/MASTER_PLAN.md`). Read it once, early. Come back to it for any question about wedge, pricing, competitors, or roadmap.

---

## 1. What Altr is (one paragraph)

Altr is a Mac-native AI-native workspace where humans and four named AI teammates — **Pax** (PM), **Eng** (engineer), **Dex** (designer), **Rae** (researcher) — collaborate on the same artifacts in real time. The anchor metaphor is a **studio loft**: every teammate walks between stations freely, no "sync to Linear," no "export to Figma," just one shared room. The v0.1 wedge is solo mode with Pax + Eng only: idea → spec → tickets → PRs. Everything else is deferred.

The positioning line: _"Altr is the first workspace where humans and AI agents collaborate as teammates — not users and tools."_

---

## 2. Non-negotiables

Things that are **never** up for discussion in a normal session. If a change proposal violates one of these, stop and ask.

1. **Mac-native, Tauri 2 + Rust + React.** Not Electron. Not pure Swift. Not Next.js in a WebView wrapper.
2. **Local-first.** SQLite on disk is the source of truth. Works offline. No network calls at app launch.
3. **BYOK for LLM.** Altr never holds provider credits. User's Anthropic/OpenAI keys live in the OS keychain, never in SQLite, never in logs.
4. **Solo mode is v0.1.** Do not scaffold team mode, CRDTs, or any multi-user plumbing until v0.5. No "we'll need it later" abstractions that pay team-mode tax today.
5. **Two agents only in v0.1: Pax + Eng.** Dex and Rae are stubs (name + mark) at most. Don't implement their runtimes.
6. **The Quivly boundary.** Altr is the creation-side workspace: spec → ticket → code → PR → ship. **Never** build customer-side, CS/RevOps, renewals, churn, QBR, or revenue-analytics features. These compete with Mukul's day job and torch the side-project permission.
7. **BYOK also applies to design.** Dex (when it lands) will call Claude Design via user's key, not an Altr-hosted service.
8. **Signed + notarized for every release.** Including dev builds shared with beta testers.

---

## 3. Tech stack (pinned)

| Layer | Choice | Notes |
|---|---|---|
| Shell | Tauri 2 | `@tauri-apps/api` v2 |
| Package manager | Bun | `bun install`, `bun run <script>`, `bunx`. Lockfile is text-format `bun.lock` — commit it. No npm / yarn / pnpm in this repo. |
| UI | React 18 + TypeScript 5 + Vite | `strict: true`, no `any` without a `// eslint-disable-next-line` + reason |
| Styling | Tailwind CSS 4 | CSS variables for design tokens — see §6 |
| UI state | Zustand | One store per feature, not one global store |
| Async state | TanStack Query | All Rust `invoke`s go through it |
| Editor | TipTap | Spec editor, custom extensions for agent streaming |
| Icons | lucide-react | No custom SVG dumps in components |
| Local DB | SQLite via `tauri-plugin-sql` | Migrations in `src-tauri/migrations/` |
| LLM client | Anthropic SDK (streaming) | Streaming via server-sent events, not polling |
| Subprocess | Rust `std::process` + `portable-pty` | PTY for Claude Code runs, plain Command for git |
| Watcher | Rust `notify` crate | Debounce 100ms |
| Git | Rust `git2` crate | Used for worktree create/prune |
| Secrets | OS keychain via `keyring` crate | No plaintext on disk, ever |
| Auto-update | Sparkle | Point at signed release feed |
| Errors | Sentry (free tier) | Tag `agent` and `node_type` on every event |
| Analytics | PostHog (free tier) | Opt-out on first launch, respect it |

**Do not add a dependency** without a 3-line justification in the PR. Dependency creep is the enemy on a solo timeline.

---

## 4. File layout

```
altr-app/
├── CLAUDE.md                  # this file
├── MASTER_PLAN.md             # product plan (source of truth)
├── NOTES/                     # session handoffs — see §11
│   └── handoff-YYYY-MM-DD.md
├── src/                       # React
│   ├── app/                   # app shell, routing, providers
│   ├── features/
│   │   ├── projects/          # project sidebar, project CRUD
│   │   ├── specs/             # TipTap editor + Pax live-edit UX
│   │   ├── tickets/           # board, dependency graph, autonomy flags
│   │   ├── channel/           # team channel (humans + agents interleaved)
│   │   ├── agents/
│   │   │   ├── pax/           # Pax prompt, presence UI, streaming handlers
│   │   │   └── eng/           # Eng runtime client, worktree UI
│   │   └── settings/          # BYOK keys, onboarding
│   ├── components/            # generic UI primitives (button, input, etc.)
│   ├── lib/
│   │   ├── tauri.ts           # typed invoke wrapper (specta/ts-rs generated)
│   │   ├── graph.ts           # shared graph types + event bus client
│   │   └── stream.ts          # LLM streaming helpers
│   ├── styles/
│   │   └── tokens.css         # CSS variables (see §6)
│   └── main.tsx
├── src-tauri/                 # Rust
│   ├── src/
│   │   ├── main.rs
│   │   ├── commands/          # all #[tauri::command] handlers
│   │   ├── graph/             # graph store (SQLite) + event bus
│   │   ├── agents/
│   │   │   ├── mod.rs         # Agent trait, supervisor
│   │   │   ├── pax.rs         # Pax runtime
│   │   │   └── eng.rs         # Eng runtime (Claude Code subprocess)
│   │   ├── providers/         # LLM provider clients (Anthropic first)
│   │   ├── keychain.rs        # key storage wrapper
│   │   └── telemetry.rs       # tracing + Sentry setup
│   ├── migrations/            # SQLx migrations, numbered
│   └── tauri.conf.json
└── README.md                  # short, public-facing
```

**Rule:** If a feature touches both sides of the Tauri boundary, put the Rust side in `src-tauri/src/commands/<feature>.rs` and the TS side in `src/features/<feature>/`. Don't scatter the command surface.

---

## 5. Architecture principles

### The shared graph is the product

Every artifact — project, spec, ticket, message, artifact, event — is a typed node in one SQLite-backed graph. Humans and agents both read and write this graph. Agents are long-running Rust-managed processes that subscribe to graph events, filter for relevance, invoke the LLM, and write results back as new nodes. There is no "agent inbox" or "ticket queue" separate from the graph — those are just views over it.

When in doubt: **add it to the graph, then render it.** Never stash state in React that should be in the graph.

### Agents are processes, not functions

Each agent (Pax, Eng) is a Tokio task supervised by a central runtime in Rust. They are started on app launch, not per-request. They listen to a broadcast channel of graph events. They hold their own rate limits, token budgets, and cancellation tokens. When a run is cancelled, the cancellation propagates through the task tree so in-flight LLM streams and child processes tear down cleanly.

### Streaming is a first-class UX primitive

Pax writing into a spec should feel like a human with a fast cursor — not a chatbot bubble. TipTap gets per-token diffs via Tauri events. The Pax presence indicator ("thinking" → "typing" → idle) drives from the same stream, not from a separate status flag. If streaming looks janky, that's a bug that blocks the release.

### Autonomy is a per-task flag

`autopilot | copilot | human-only` lives on the ticket, not on the agent. The same Eng agent runs all three modes, branching on the flag. This keeps the agent runtime simple and gives the user scalar control.

### The Claude Code worktree pattern

Eng spawns Claude Code in an isolated git worktree per ticket, streams stdout/stderr back into the ticket view, enforces a token budget with auto-pause, and opens a GitHub PR on completion. The worktree is pruned when the PR merges. **Borrow the pattern from Crystal and claude-squad** — don't reinvent.

---

## 6. Design tokens (non-negotiable)

Ship these as CSS variables in `src/styles/tokens.css`. Components reference `var(--*)`, never hardcoded hex.

```css
:root {
  /* Backgrounds — no pure white */
  --bg-base:      #FBF7F1;  /* warm off-white, near-linen */
  --bg-raised:    #F5EFE6;
  --bg-elevated:  #EBE3D6;

  /* Text — no pure black */
  --text-primary:   #1E1A16;
  --text-secondary: #5C544B;
  --text-muted:     #8A8176;

  /* Signature accent */
  --accent:  #C4774B;  /* warm ochre */

  /* Semantic */
  --success: #6F8C5A;  /* sage */
  --warning: #C49A4B;  /* honey */
  --error:   #B55A4B;  /* clay */

  /* Typography */
  --font-display: "Iowan Old Style", "Söhne", Georgia, serif;
  --font-body:    "Mona Sans", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;

  /* Spacing: 4px base */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px;  --s-4: 16px;
  --s-6: 24px; --s-8: 32px; --s-12: 48px; --s-16: 64px;
}
```

### Anti-aesthetic (do not ship)

- Gradients of any kind
- Glassmorphism, glow, or neon
- Default Tailwind palette (slate, zinc, etc.)
- Robot-face agent avatars
- Emoji in the UI chrome
- "AI sparkle" icons

### Agent marks

| Agent | Mark | Color token | Role |
|---|---|---|---|
| Pax | ■ filled square | `--accent` (ochre) | Structure |
| Eng | ▲ filled triangle | `--success` (sage) | Build |
| Dex | ● filled circle | `--warning` (honey) | Form (v0.2+) |
| Rae | ◆ filled diamond | `--error` (clay) | Inquiry (v0.3+) |

Marks are ~12×12 CSS shapes, not SVG files — keeps the bundle lean.

---

## 7. Coding conventions

### TypeScript

- `strict: true` + `noUncheckedIndexedAccess: true`
- Types generated from Rust via `specta` or `ts-rs` — never hand-written for command I/O
- Prefer `unknown` + parse over `any`
- Exhaustive switches via `satisfies never`
- No default exports from anything that isn't a page component
- File names: `kebab-case.ts` for modules, `PascalCase.tsx` for components

### React

- Function components only
- State lives in the graph when it should be shared, in Zustand when it's UI-only, in local state when it's ephemeral
- TanStack Query keys: `[domain, id?]` — no strings with commas in them
- Never call `invoke` outside a query/mutation wrapper
- No `useEffect` for data fetching

### Rust

- `thiserror` for library errors, `anyhow` only at the command layer
- `tracing` for logs with structured fields (`agent=pax`, `run_id=...`) — never `println!`
- Every `#[tauri::command]` takes typed params and returns `Result<T, AppError>`
- No `unwrap` in hot paths; `expect` allowed with a message in startup code only
- Async: Tokio, not std — one runtime to rule them all

### Commits

Conventional Commits, imperative mood, short subject line.

```
feat(pax): stream edits into TipTap via custom extension
fix(eng): propagate cancellation to child claude-code process
chore(ci): pin tauri-cli to 2.1.0
docs(master-plan): clarify the Quivly boundary in §11
```

Commit every 30–60 minutes. A noisy git log is a feature, not a bug.

---

## 8. Reference repos

These are cloned next to the app at `../references/`. Read them liberally — pattern-match before inventing.

| Repo | What to study |
|---|---|
| `gitbutlerapp/gitbutler` | The gold standard for production Tauri 2 + Rust. Crate layout (`but-*`), `#[tauri::command]` patterns, Sentry + tracing wiring, release CI, worktree ops via `git2` |
| `spacedriveapp/spacedrive` | Another mature Tauri 2 app. Watch how they isolate the core crate from the shell; notify-based watchers; SQLite migrations |
| `stravu/crystal` | Claude Code session management; stdout parsing; worktree lifecycle — **the primary reference for Eng** |
| `smtg-ai/claude-squad` | Terminal orchestrator patterns; tmux-esque session mgmt |
| `melty-sh/melty` | Melty's agent UX; how they surface "what the agent is doing" |
| `OpenHands/OpenHands` | Sandboxed exec patterns; agent SDK shape |
| `tauri-apps/tauri` + `awesome-tauri` | Tauri 2 idioms; example apps; plugin patterns |
| `shadcn-ui/ui` | Accessible primitive patterns (don't install the package — borrow the ideas) |
| `FlorianBruniaux/claude-code-ultimate-guide` | Claude Code flags, session formats, common failure modes |
| `garrytan/gstack` | The workflow layer — slash commands for plan/review/ship cadence. See §14 |

**Rule:** before writing a subsystem that exists in one of these, grep the reference for the equivalent and justify any deviation in the commit.

---

## 9. What NOT to do

Explicit list of anti-patterns that have surfaced in planning and must not recur:

- Don't scaffold team mode, CRDTs, or multi-user auth in v0.1
- Don't build a "generic agent framework" — Pax and Eng are concrete classes
- Don't add a cloud backend before v0.5
- Don't ship a design system library — inline the primitives until there's a reason
- Don't use Electron patterns (BrowserWindow-style multi-window) — stick to Tauri's webview model
- Don't bundle the Anthropic SDK into the webview — all LLM calls go through Rust
- Don't store provider keys in SQLite, env files, or logs
- Don't drift into customer-side features (see §2.6 Quivly boundary)
- Don't ask Pax/Eng to do each other's job — cross-agent coordination is a v1.0 concern
- Don't add a settings panel for things that should be flags on the ticket
- Don't pretty-print the UI before Week 11 — ship ugly, polish late

---

## 10. Asking clarifying questions

Default to asking when:

1. A spec is ambiguous and the wrong guess would cost > 30 minutes to undo
2. A proposed change would touch a §2 non-negotiable
3. The task requires a decision between two design-token-sized options (e.g., "which accent for the decision queue?")

Default to **not** asking when:

1. The decision is reversible in one commit
2. The answer is implied by §2–§9 of this file
3. It's a naming nit — pick one, ship, rename later if it grates

When you ask, do it in the structured form:

```
I can do this two ways:
  (a) <option A> — tradeoff: <X>
  (b) <option B> — tradeoff: <Y>
I'd recommend (a) because <reason>. Which do you want?
```

One question per response. Don't stack five.

---

## 11. Session rhythm and handoffs

### Session cadence

- Sunday evening (3h) — plan the week, do the hard thing
- 2× weekday evenings (2h each) — one sub-task each
- Saturday morning (4h) — integration / big feature

Total ~11h/week. If two sessions get skipped in a row, write a one-paragraph "am I still building this?" note in `NOTES/` before the next session.

### Handoff file

At the end of each session, write `NOTES/handoff-YYYY-MM-DD.md` with:

```
## What shipped
- ...

## What's half-done
- <branch or file>: <state + next step>

## Next session target
- <one concrete thing>

## Open questions
- ...
```

### First line of every session

Claude Code's first action in a new session must be:

```
Read CLAUDE.md and the latest NOTES/handoff-*.md. Summarize in 5 bullets what
you've picked up. Then tell me the one thing you're going to ship this session
and what's the first file you'll touch. Wait for approval before writing code.
```

This is the boot sequence. No exceptions.

---

## 12. Definition of done (per feature)

A feature isn't done until:

1. It writes to the graph, not local state
2. It has a Rust command with typed I/O and a TanStack Query wrapper on the TS side
3. The happy path works offline
4. At least one `tracing` span covers the critical section
5. The UI uses `var(--*)` tokens, not hex
6. There's a one-line note in `NOTES/` about what was cut or deferred
7. A commit was made within the hour

---

## 13. When in doubt

Re-read `MASTER_PLAN.md` §1–2 for product soul, §7 for architecture, §15 for shipping rules. If it's still unclear, ask one question in the structured form above.

**Core shipping principles from the plan:**

1. Ship ugly first. Polish is Week 11.
2. Commit constantly.
3. Dogfood — use Altr to plan Altr.
4. Never skip two weeks.
5. Publish the journey.
6. Respect the Quivly boundary.

That's the whole game.

---

## 14. gstack — the session workflow layer

We use [Garry Tan's gstack](https://github.com/garrytan/gstack) as the slash-command and review-cadence layer inside Claude Code. gstack is opinionated about how a small team (or solo dev + Claude) plans, reviews, ships, and learns. Altr follows that cadence — it maps cleanly onto the Pax + Eng loop.

### One-time install (per machine)

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

`setup` wires up the slash commands under `~/.claude/commands/` and the skills under `~/.claude/skills/gstack/`. Re-run `./setup` to pick up upstream updates — gstack iterates quickly.

Or run the repo's helper: `./scripts/setup-gstack.sh` — it clones (or pulls) into `~/.claude/skills/gstack` and runs `./setup` for you. gstack is **not vendored** into this repo; the commands live at the user level so they stay fresh across projects.

### Slash commands most relevant to the Pax + Eng loop

Use these constantly. Don't invent replacements for them.

| Command | When to reach for it |
|---|---|
| `/plan-ceo-review` | Before starting any multi-day feature. Forces the plan through a strategy lens — great sanity check on scope vs. the Quivly boundary |
| `/plan-eng-review` | After a draft implementation plan. Surfaces architectural traps before they become rewrites |
| `/investigate` | When a bug or behaviour is unclear. Structures the exploration instead of free-grepping |
| `/review` | Before every commit. It's fast, it catches real things, run it even when you think the diff is small |
| `/qa` | Before every push. Drives the "does this actually work offline / in the happy path" check |
| `/ship` | When closing a ticket. Writes the commit + PR text in the house style, nudges a handoff note |
| `/retro` | End of each Sunday session, or any session where something surprised you |
| `/learn` | When a reference repo taught you something worth persisting. Writes to the knowledge base |
| `/office-hours` | When stuck for > 20 minutes. It's a structured way to ask for help without burning the flow |

### House rule

The Pax + Eng loop inside Altr mirrors this workflow — that's not an accident. If gstack has a command that would fit, use it. If you find yourself writing ad-hoc process inside a session, that's a signal something should be a gstack command upstream (or a skill in `~/.claude/skills/`).

---

## 15. CI

We keep CI intentionally thin: one lightweight "is it sane" workflow per PR and push. Full macOS build / code-sign / notarize only runs on release tags.

### `.github/workflows/lite.yml`

Runs on every push and PR. Split across runners because Tauri's Rust side needs macOS:

1. **lint-ts** (ubuntu-latest) — `bun install --frozen-lockfile`, ESLint, `tsc --noEmit`
2. **lint-rust** (macos-14, arm64) — `cargo fmt --check`, `cargo clippy -- -D warnings`
3. **check-rust** (macos-14, arm64) — `cargo check --locked` inside `src-tauri/`

Anything heavier than that — bundling, notarization, DMG production — belongs in a release workflow (not yet written; ship that when we hit v0.1.0-rc1).

### What not to do in CI

- No `cargo test` gate yet — we don't have meaningful tests for the agent runtimes, and fake ones are worse than none. Add this when there's something worth covering.
- No matrix over OSes. Altr is Mac-native; CI should reflect that.
- No Playwright / e2e. The app shells to external processes (Claude Code, git) — brittle to mock, cheaper to dogfood.

---

## 16. Local dev setup (fresh clone)

For a new machine or fresh checkout, in order:

```bash
# 1. Rust toolchain (one-time)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add aarch64-apple-darwin

# 2. Bun (one-time) — our sole JS package manager + runner. No npm / yarn / pnpm.
curl -fsSL https://bun.sh/install | bash

# 3. Tauri CLI
cargo install create-tauri-app --locked  # optional, for scaffolding new apps
cargo install tauri-cli --version '^2.0' --locked

# 4. Repo deps
bun install

# 5. Dev loop
bun run tauri:dev

# 6. Before pushing
bun run lint && bun run typecheck
( cd src-tauri && cargo fmt --check && cargo clippy -- -D warnings )
```

First launch will create `~/Library/Application Support/run.altr.desktop/altr.db` and apply `migrations/0001_initial.sql`. If something is wrong with the schema during dev, delete that file and relaunch — it's safe until we have real user data.

### BYOK secrets — where to put your Anthropic key in dev

Altr reads the key from the OS keychain under service `run.altr.desktop` / account `anthropic`. Until the Settings UI is built, seed it once with:

```bash
security add-generic-password -a anthropic -s run.altr.desktop -w sk-ant-...
```

Never paste the key into an env file, commit, or the SQLite DB. See §2.3.
