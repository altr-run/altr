# Handoff — 2026-04-21 (pm)

PR #3 of the landing migration: SanityPress scaffold landed at `apps/landing/`.

## What shipped

- `apps/landing/` — SanityPress (nuotsu/sanitypress-with-typegen) scaffold copied from upstream `main` (commit on `/tmp/sanitypress-src` snapshot 2026-04-21). Pinned versions: Next 16.2.4, React 19.2.5, Sanity 5.21+, Tailwind 4.2+, TS 6.0, Node 22.
- App Router with route groups: `(frontend)` + `(studio)`. Studio mounted at `/admin`. `/blog` route group + `post`/`author`/`category` schemas kept per plan revision 2026-04-21.
- `package.json` renamed to `@altr/landing`. `@altr/ui` added as `workspace:*` dep. `typegen` renamed → `sanity:typegen` to match Turbo task name.
- Upstream project ID `cyu7k2r0` rewritten to our `wyr088n5` in `sanity.cli.ts`. Studio title set to `Altr` in `sanity.config.ts`.
- `@altr/ui` tokens wired in `src/app.css`: `@import '@altr/ui/tokens/base.css'` + `'@altr/ui/tokens/landing.css'`, then Tailwind `@theme` block rebound to `var(--bg)` / `var(--ink)` / `var(--line)` / `var(--acc)` / `var(--f-sans)` / `var(--f-serif)` / `var(--f-mono)`.
- `Geist` → `Mona_Sans` in `(frontend)/layout.tsx` via `next/font/google` (exposes `--font-sans`).
- `.env.example` rewritten with our Sanity + Supabase public IDs + placeholders for server-only secrets. Legacy `.npmrc` (`legacy-peer-deps=true`) deleted — Bun ignores it.
- `turbo.json` — added `sanity:typegen` task (inputs glob `src/sanity`, `src/app`, `src/ui`, configs; outputs `src/sanity/schema.json` + `types.ts`). `typecheck` now depends on it.
- Root `package.json` — added `landing:dev` / `landing:build` / `landing:typegen` scripts.
- `.github/workflows/lite.yml` — added `lint-landing` job (Ubuntu; runs `sanity:typegen` then per-workspace lint + typecheck). Env injected via `env:` block; no untrusted inputs.
- Root `bun install` ran clean (27.74s, 1954 packages). `apps/landing/node_modules/@altr/ui` is a symlink to `packages/ui` — workspace resolution verified.

## What's half-done / deferred

- **Not run locally.** Per CLAUDE.md "do not run dev/build until asked" — haven't booted `bun run landing:dev`. First boot will need `apps/landing/.env.local` with a real `SANITY_API_READ_TOKEN` (get from https://sanity.io/manage/project/wyr088n5/api).
- **Sanity typegen not yet run.** First run will generate `src/sanity/schema.json` + `src/sanity/types.ts`. CI gates on it; local first run is Mukul's call.
- **No commit yet.** PR #3 diff is ready to stage. Mukul's review first.
- **No Vercel project.** DNS control for `altr.run` still unconfirmed (plan §Open Q2). Deploy to Vercel is a separate PR after domain handoff is clear.
- **Module port not started.** PRs #4–#5 (v7 built-ins + custom modules + waitlist API) are the next push.

## Next session target

**PR #4 — port v7 built-ins + Clerk-inspired shell.** One sub-PR per module per plan §Migration order:

1. Nav + Footer via `site` singleton (Clerk-minimal; see plan §Footer pattern — 5 columns).
2. Hero (SaaS module) — wire v7 hero copy into Sanity, add image hotspot.
3. Pricing — `pricing-list` module + 3× `pricing.tier` docs (Solo / Studio / Scale).
4. FAQ — accordion-list.
5. Callout (close CTA) + Flag list (product overview §01).

Commit per module. Verify Presentation tool click-to-edit overlays at each step. Est 7–9h.

## Open questions (unchanged from prior handoff + new)

1. **`SANITY_API_READ_TOKEN`** — Mukul generates at https://sanity.io/manage/project/wyr088n5/api (Viewer perms). Needed before `bun run landing:dev` shows draft content.
2. **CORS origins** — Sanity Studio needs `http://localhost:3000` added for local dev. Go to Manage → API → CORS.
3. **`altr.run` DNS + Vercel project** — blocks PR #3.5 (deploy). PR #4 can proceed without it.
4. **Tailwind `@theme` binding** — I rebound `--color-foreground` → `var(--ink)` etc. The utility classes in `app.css` (`action`, `ghost`, `input`, `prose`) reference `bg-foreground` / `text-foreground` / `border-stroke` etc., so they inherit through the new tokens without edits. If v7 copy exposes any case where the upstream Geist + neutral-scale look bled into a visual, we'll catch it in PR #4.
5. **Next.js Turbopack** — still broken upstream per SanityPress README (`lightningcss` issue). Keeping `--webpack` flag in `dev` / `build` scripts. Revisit when the template upgrades.

## Things I deliberately did NOT do

- Did not run `bun run landing:dev` or `landing:build` — CLAUDE.md rule.
- Did not generate Sanity types locally — first typegen run is gated on `.env.local` existing.
- Did not delete `demo.tar.gz` from upstream (excluded via rsync) — if it matters for seed content, grab from `/tmp/sanitypress-src/`.
- Did not port any v7 modules — that's PR #4.
- Did not install Motion / Scalar / Content Collections / Resend / Supabase SDK yet — land with the features that need them (PRs #5+).
- Did not touch `CLAUDE.md §4 file layout` — waits for `apps/landing/src/app/(frontend|studio)/` to have real Altr content, not stock SanityPress.
