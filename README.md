# Altr

_The AI-native workspace where humans and AI teammates ship in the same room._

Altr is a Mac-native app where you and four named AI teammates — **Pax** (PM), **Eng** (engineer), **Dex** (designer), **Rae** (researcher) — work on the same artifacts in real time. No "sync to Linear," no "export to Figma." One loft, one graph, one flow.

v0.1 ships the solo Pax + Eng loop: **idea → spec → tickets → PRs**.

---

## Canonical reading order

Before touching code, read these two files in order. They are load-bearing.

1. [`CLAUDE.md`](./CLAUDE.md) — the project constitution. Non-negotiables, stack, conventions, session rhythm.
2. [`MASTER_PLAN.md`](./MASTER_PLAN.md) — the product plan. Wedge, competitors, 12-week build schedule, GTM.

Any time the two conflict, flag it — don't guess.

---

## Quick start

```bash
# one-time
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
curl -fsSL https://bun.sh/install | bash
cargo install tauri-cli --version '^2.0' --locked
./scripts/setup-gstack.sh     # optional but recommended — see CLAUDE.md §14

# every session
bun install
bun run tauri:dev
```

> Bun is the sole package manager for this repo. Don't mix in `npm` or `pnpm` — the lockfile is `bun.lock`.

First launch creates `~/Library/Application Support/run.altr.desktop/altr.db` and applies the initial schema. See `CLAUDE.md` §16 for more.

### Seed your Anthropic key (BYOK)

Altr reads the key from the macOS keychain. Until the Settings UI exists:

```bash
security add-generic-password -a anthropic -s run.altr.desktop -w sk-ant-...
```

Keys never touch SQLite, logs, or env files. See `CLAUDE.md` §2.3.

---

## Layout

```
altr.run/
├── CLAUDE.md                  # read this first
├── MASTER_PLAN.md             # product plan (source of truth)
├── NOTES/                     # one-per-session handoffs
├── scripts/                   # setup + dev helpers
├── src/                       # React frontend
└── src-tauri/                 # Rust backend
    ├── migrations/            # SQLite migrations (numbered)
    └── src/
        ├── agents/            # Pax + Eng runtimes
        ├── commands/          # #[tauri::command] handlers
        ├── graph/             # SQLite-backed graph + event bus
        ├── providers/         # LLM clients (Rust side only)
        └── keychain.rs        # BYOK secret storage
```

---

## Status

**Week 0 — scaffolded.** Tauri 2 + React + TS + Tailwind 4 + SQLite up, empty runtimes wired, migration 0001 applied on first launch. No agent logic yet.

Next up: Pax runtime streaming into TipTap. See the latest file in `NOTES/`.

---

## License

Not yet decided. Until it is, treat this as source-available-for-reading, all-rights-reserved.
