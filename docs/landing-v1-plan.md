# Landing v1 — Next.js + SanityPress port of v7

Status: **plan, not built.** Drafted 2026-04-20. Revised 2026-04-21 to swap the hand-rolled Next.js scaffold for SanityPress as the base.

---

## Goal

Port `Altr Landing v7.html` to a Next.js 15 + Sanity CMS app on top of [SanityPress](https://sanitypress.dev) ([nuotsu/sanitypress](https://github.com/nuotsu/sanitypress)), wire a real waitlist backend, and ship it at `altr.run`. All marketing copy, pricing tiers, FAQ entries, playground examples, and ticker content are editable in the embedded Sanity Studio — no redeploys for text tweaks.

## Why SanityPress

- Next.js 15 App Router + Sanity v3 + Tailwind 4 + React 19 — the exact stack we'd build by hand, already wired.
- Embedded Studio (same Next.js app, route `/admin` since v4.0.0) — one Vercel project, one domain, Presentation tool on by default with live preview + click-to-edit overlays.
- Ships 17 pre-built modules (Hero, Pricing list, Accordion list, Callout, Flag/Card/Stat/Testimonial list, etc.) — ~half of v7's sections map straight to built-ins.
- OSS (free to clone + modify). SanityPress Pro ($10/mo) only needed for first-class i18n, which we don't need in v1.
- We'll base off the **typegen fork** ([nuotsu/sanitypress-with-typegen](https://github.com/nuotsu/sanitypress-with-typegen)) so GROQ queries are typed from the schema — same bar as the desktop app (CLAUDE.md §7).

## Non-goals (explicit cuts — defend these)

- **No blog, changelog, or docs routes.** SanityPress ships with `/blog` scaffolding under `src/app/(site)/blog/`. **Delete it** in PR #3. Visible in nav as `#` links the way v7 has them until we have something to show.
- **No analytics dashboard.** PostHog JS snippet + Vercel Web Analytics only.
- **No A/B framework.** Ship `theme=light accent=amber hero=centered` as the only variant. Keep the data-attribute toggle; don't expose a chooser.
- **No authentication on the public site.** Only auth in play is Sanity's own login for Studio access at `/admin`.
- **No internationalization.** English only. Skip SanityPress Pro.
- **No tweaks panel in production.** v7's designer tool stays in the source HTML; it doesn't ship.

## Quivly-boundary check

Landing is product-acquisition for Altr. Not a customer-side CS/RevOps feature. Within the §2.6 boundary. Safe to build.

---

## Repo layout — conversion to bun workspaces monorepo

Current state is a flat repo at `altr-run/altr`. Convert in one PR so history is legible.

Before:
```
altr.run/
├── src/                 # Tauri React
├── src-tauri/           # Rust
├── package.json
└── bun.lock
```

After:
```
altr.run/
├── apps/
│   ├── desktop/               # moved from repo root — the Tauri app
│   │   ├── src/
│   │   ├── src-tauri/
│   │   ├── package.json
│   │   └── tauri.conf.json
│   └── landing/               # SanityPress-based Next.js app
│       ├── src/
│       │   ├── app/
│       │   │   ├── (site)/           # public routes
│       │   │   │   └── page.tsx      # the one long scroll
│       │   │   ├── admin/            # embedded Sanity Studio
│       │   │   └── api/
│       │   │       └── waitlist/     # Resend + Supabase route handler
│       │   ├── sanity/
│       │   │   ├── schemaTypes/
│       │   │   │   ├── documents/    # site, page, pricing.tier
│       │   │   │   ├── modules/      # one file per module
│       │   │   │   └── fragments/    # reusable schema bits
│       │   │   ├── lib/              # client, queries, loader
│       │   │   └── presentation/     # Presentation-tool config
│       │   ├── ui/                   # React components (1:1 with modules)
│       │   ├── lib/
│       │   └── sanity.config.ts
│       └── package.json
├── packages/
│   └── tokens/                # shared design tokens (CSS + TS)
│       ├── tokens-base.css    # typography, spacing, semantic names
│       ├── tokens-desktop.css # linen + ochre
│       ├── tokens-landing.css # white + amber
│       ├── index.ts
│       └── package.json
├── package.json               # workspaces manifest
├── bun.lock                   # single lockfile at root
├── CLAUDE.md
├── MASTER_PLAN.md
└── ...
```

Rationale:
- `apps/desktop` name is clearer than leaving it unnamed at the root.
- `packages/tokens` is the one shared primitive day 1. `packages/ui` stays unborn until the **extraction trigger** fires: 3 primitives duplicated across `apps/desktop` and `apps/landing` with matching prop shapes. TipTap editor primitives and marketing hero primitives diverge — only generics (Button, Input, Card, Dialog, Tooltip, Badge) should migrate.
- **Shared-ready discipline** in both apps from day 1, so extraction is a lift, not a rewrite:
  - Styling via Tailwind classes + CSS token vars only (`bg-[var(--bg-raised)]`, never hardcoded hex).
  - No framework-specific imports in primitives — no `next/*`, no `@tauri-apps/*` inside Button/Input/etc.
  - Props accept `className` + `asChild`/`as` for element override (Radix-style). Lets landing wrap primitives in `<Link>`, desktop wrap in `invoke` handlers, without forking the component.
  - Neutral names — `Button`, not `PaxButton` or `MarketingButton`.
  - Co-located at `src/components/ui/` in each app until the trigger fires.
- SanityPress uses `src/app/` (not `app/` at app root). We follow that convention — its docs and generators assume it.

Root `package.json` scripts:
```json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "desktop:dev":  "bun --cwd apps/desktop tauri:dev",
    "landing:dev":  "bun --cwd apps/landing dev",
    "landing:studio": "bun --cwd apps/landing dev # /admin served on the same dev server",
    "landing:typegen": "bun --cwd apps/landing sanity:typegen",
    "lint":      "bun --filter '*' lint",
    "typecheck": "bun --filter '*' typecheck"
  }
}
```

## Stack (pinned)

| Layer | Choice | Why |
|---|---|---|
| Template | [SanityPress](https://github.com/nuotsu/sanitypress) (typegen fork) | See §Why SanityPress |
| Framework | Next.js 15 (App Router, RSC) | SanityPress-pinned |
| Runtime | React 19 | SanityPress-pinned |
| Language | TypeScript 5 strict | CLAUDE.md §7 |
| CMS | Sanity v3 (embedded Studio at `/admin`) | SanityPress-pinned |
| Styling | Tailwind CSS 4 (CSS-first `@theme`) | SanityPress-pinned. Imports `packages/tokens/tokens-landing.css` |
| Typed queries | `@sanity/codegen` via `sanity schema extract` + `sanity typegen generate` | From the typegen fork; keeps GROQ responses typed |
| Visual Editing | `@sanity/visual-editing` + Presentation tool | On by default in SanityPress v4 |
| Fonts | `next/font` with Instrument Serif + Inter + JetBrains Mono | v7 uses Google Fonts directly; `next/font` self-hosts for perf |
| Email | [Resend](https://resend.com) | Simple, good DX, pay-as-you-go |
| DB (waitlist) | [Supabase](https://supabase.com) (Postgres) | Aligns with the global "offload to managed SaaS" rule; free tier absorbs the waitlist load; auth + storage available if landing ever needs them |
| Icons | `lucide-react` | Same as desktop |
| Analytics | PostHog JS + Vercel Web Analytics | Funnel + RUM |
| Host | Vercel | One project; `apps/landing` root directory |

No `shadcn/ui`, `tailwind-variants`, `cva`. SanityPress's built-in primitives are sufficient.

## v7 → SanityPress module map

Every section in v7 becomes either a **built-in SanityPress module** (just wire and style) or a **custom module** (schema + component we write). "All content in Sanity" means every string, image, and list item below lives in the Studio.

| v7 section | SanityPress module | Kind | Notes |
|---|---|---|---|
| Nav | `site` singleton (built-in) | built-in | Logo, links, CTA button, waitlist-open flag |
| Hero (centered) | **Hero (SaaS)** | built-in | Headline, sub, primary CTA; image optional |
| Ticker | `ticker.scrolling` | **custom** | Array of `{ label, href?, mark? }`; CSS marquee in component |
| Product Overview (§01) | **Flag list** | built-in | Feature tiles with icon + title + body |
| Playground | `playground.prompts` | **custom** | Array of `{ prompt, streamedResponse, persona }`; interactive client component consumes content |
| Pricing (Solo/Studio/Scale) | **Pricing list** + `pricing.tier` docs | built-in | Three `pricing.tier` documents; referenced from the pricing module |
| FAQ | **Accordion list** | built-in | Native `<details>` rendering; each item is a schema row |
| Close CTA | **Callout** | built-in | Heading + body + CTA pointing to waitlist |
| Stamp ("written in Altr") | `stamp.mark` | **custom** | Short text + optional href; rendered as a small footer flourish |
| Footer | `site` singleton (built-in) | built-in | Link groups, legal text, social |
| Waitlist form | `form.waitlist` | **custom** | Schema is just copy (heading, sub, CTA label, success text); component POSTs to `/api/waitlist` |

**Totals:** 6 built-ins wired as-is, 4 custom modules written from scratch. The custom work is the long pole.

## Sanity schema design

Documents (singletons + lists):
- `site` — global site config (nav links, footer link groups, legal, social, waitlist open). Extend SanityPress's default `site` singleton; don't fork it.
- `page` — keep SanityPress's generic page doc. Home is a single `page` with slug `index`, composed from modules.
- `pricing.tier` — one doc per tier (Solo, Studio, Scale). Fields: `name`, `tagline`, `priceMonthly`, `priceAnnual`, `features[]`, `ctaLabel`, `ctaHref`, `highlighted: boolean`.
- `faq.entry` — question, answer (portable text), category, order.

Modules (one schema file per module; each = `{ _type, ...fields }` inside `page.modules[]`):
- Built-in: `hero.saas`, `flag-list`, `pricing-list`, `accordion-list`, `callout` — use SanityPress defaults, add fields only where v7 copy demands.
- Custom: `ticker.scrolling`, `playground.prompts`, `stamp.mark`, `form.waitlist` — defined in `src/sanity/schemaTypes/modules/`.

Fragments (reusable):
- `link` — inline reference or external URL with label (SanityPress provides).
- `cta` — link + style variant.
- `image-with-alt` — required alt text, no empty strings.

**Rule:** never store waitlist submissions (emails, IPs, UAs) in Sanity. Those go to Supabase. Sanity is for *published content*.

## Custom modules — spec sketch

### `ticker.scrolling`
```ts
// src/sanity/schemaTypes/modules/ticker.scrolling.ts
defineType({
  name: 'ticker.scrolling',
  type: 'object',
  fields: [
    defineField({ name: 'items', type: 'array', of: [{
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', validation: r => r.required() }),
        defineField({ name: 'mark', type: 'string', options: { list: ['pax', 'eng', 'dex', 'rae', 'human'] } }),
        defineField({ name: 'href', type: 'url' }),
      ],
    }]}),
    defineField({ name: 'speed', type: 'string', options: { list: ['slow', 'medium', 'fast'] }, initialValue: 'medium' }),
  ],
})
```
Component: `src/ui/modules/TickerScrolling.tsx` — CSS marquee; items duplicated in markup for seamless loop; `prefers-reduced-motion` fallback stops animation.

### `playground.prompts`
```ts
defineType({
  name: 'playground.prompts',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'prompts', type: 'array', of: [{
      type: 'object',
      fields: [
        defineField({ name: 'prompt', type: 'text' }),
        defineField({ name: 'persona', type: 'string', options: { list: ['pax', 'eng'] } }),
        defineField({ name: 'response', type: 'array', of: [{ type: 'block' }] }),  // portable text
        defineField({ name: 'typingMs', type: 'number', initialValue: 1200 }),
      ],
    }]}),
  ],
})
```
Component: client-only, cycles through prompts, types out the `response` portable text at a per-prompt `typingMs`. Interactive logic in code, every string in Sanity.

### `stamp.mark`
```ts
defineType({
  name: 'stamp.mark',
  type: 'object',
  fields: [
    defineField({ name: 'line1', type: 'string', initialValue: 'written in' }),
    defineField({ name: 'line2', type: 'string', initialValue: 'Altr' }),
    defineField({ name: 'href', type: 'url' }),
  ],
})
```

### `form.waitlist`
```ts
defineType({
  name: 'form.waitlist',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'sub', type: 'text' }),
    defineField({ name: 'ctaLabel', type: 'string', initialValue: 'Request access' }),
    defineField({ name: 'placeholder', type: 'string', initialValue: 'you@domain.com' }),
    defineField({ name: 'successMessage', type: 'string', initialValue: 'Check your inbox — confirmation link sent.' }),
    defineField({ name: 'legal', type: 'string', description: 'fine print under the button' }),
  ],
})
```

## Routes & API

SanityPress layout:
```
src/app/
├── (site)/
│   ├── layout.tsx      # fonts, tokens, PostHog, Presentation bridge
│   ├── page.tsx        # renders the home page doc by modules
│   ├── not-found.tsx
│   └── [slug]/page.tsx # future pages — built-in but no content yet
├── admin/              # Sanity Studio (embedded)
├── api/
│   ├── waitlist/
│   │   ├── route.ts           # POST { email } -> Supabase + Resend confirm
│   │   └── confirm/route.ts   # GET ?token= -> mark confirmed
│   ├── draft-mode/[...]       # SanityPress-provided
│   └── revalidate/[...]       # SanityPress-provided, webhook-gated
├── opengraph-image.tsx        # dynamic OG from site singleton
├── robots.ts
└── sitemap.ts
```

Delete before shipping: SanityPress's default `(site)/blog/` route group and `blog.*` schema files.

## Waitlist backend (Supabase — not a Sanity concern)

Two-step flow:

1. `POST /api/waitlist { email }` — validates (zod), writes to Supabase (service-role key, server-side only), sends double-opt-in email via Resend with a 30-day signed token (HMAC-SHA256, not a DB-backed nonce — survives DB loss).
2. `GET /api/waitlist/confirm?token=…` — verifies signature, marks `confirmed_at`, shows a small `/confirmed` page (also a Sanity-driven page with a `confirmation.message` module — optional, nice to have).

Supabase schema (single table, lives in the `public` schema; RLS **on** with zero policies so anon can't read/write — all traffic uses the service-role key on the server):

```sql
create table public.waitlist (
  id           text primary key,            -- ULID
  email        text not null unique,
  created_at   timestamptz not null default now(),
  confirmed_at timestamptz,
  source       text,                        -- UTM / referrer
  ua           text                         -- truncated user agent
);

alter table public.waitlist enable row level security;
-- no policies: anon + authenticated are denied by default.
```

Rate-limit: Vercel edge-config or in-memory map by IP. Honeypot + client rate-limit. No CAPTCHA.

Environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (= `production`)
- `SANITY_API_READ_TOKEN` — viewer token for drafts in preview
- `SANITY_REVALIDATE_SECRET` — webhook secret for on-demand ISR
- `RESEND_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` — server-only; never ship to the client
- `WAITLIST_SIGNING_SECRET`
- `POSTHOG_KEY`

All in Vercel project settings; `.env.local` for dev (gitignored).

## Design-token sharing

Move `apps/desktop/src/styles/tokens.css` to `packages/tokens/tokens-base.css` (shared: typography, spacing, semantic color names), and fork the palette into two files:

- `tokens-desktop.css` — linen (`#FBF7F1`) + ochre (`#C4774B`). Desktop imports both base + desktop.
- `tokens-landing.css` — white + amber (`#D9562A`) + moss. Landing imports both base + landing.

Tailwind 4 reads from `@theme` blocks in CSS. SanityPress's `src/app/(site)/layout.tsx` gets `@import "@altr/tokens/tokens-base.css"` and `@import "@altr/tokens/tokens-landing.css"` in its global stylesheet.

**File a followup:** reconcile palettes before public launch. Desktop's linen is older; v7's white+amber is the refined design. Lean landing → desktop at v0.1 RC.

## Migration order (safe, PR-per-step)

Five small PRs — do **not** do this in one giant commit.

1. **Monorepo scaffold.** Add `packages/tokens` (copy, don't move yet; fork into base + desktop + landing at this step). Add root `package.json` with workspaces. `bun install` still works. Desktop dev loop unaffected.

2. **Move desktop to apps/desktop.** `git mv src → apps/desktop/src`, `git mv src-tauri → apps/desktop/src-tauri`. Update `tauri.conf.json`, CI paths. Verify `bun run desktop:dev` end-to-end on Mac. Delete `apps/desktop/src/styles/tokens.css` in favor of importing from `@altr/tokens`.

3. **Scaffold SanityPress at apps/landing.** `bunx create-sanity@latest apps/landing --template nuotsu/sanitypress-with-typegen`. Set Sanity project ID + dataset. Delete the default `blog/` route group and `blog.*` schemas. Wire token imports. Verify `bun run landing:dev` serves the default hello page and `/admin` serves Studio.

4. **Port v7 built-ins.** One PR per module, typically: nav+footer (`site` singleton) → hero → pricing (+ three `pricing.tier` docs) → FAQ (accordion list) → callout → flag list (product overview). Style each to match v7. Commit after each.

5. **Port v7 customs + waitlist API.** `ticker.scrolling` → `playground.prompts` → `stamp.mark` → `form.waitlist` + `/api/waitlist` route handlers. Seed all copy into Studio. Connect Resend + Supabase. Verify full waitlist flow end-to-end (submit → email → confirm).

Each step is shippable. If PR #3 grows teeth (SanityPress version drift, typegen quirks), revert cleanly without losing PRs #1 + #2.

## Deployment

- Vercel project `altr-landing` connected to `altr-run/altr` repo, root directory `apps/landing`, `bun` install command.
- Preview deploys per PR (each gets its own Studio at `$preview.altr-landing.vercel.app/admin` — fine; gated by Sanity auth).
- Production domain `altr.run`; staging `staging.altr.run` auto-deploys `main`.
- Desktop app repo does **not** deploy to Vercel — it has its own release channel (Sparkle, later).
- Sanity project (one, `altr`, `production` dataset) created under a team account owned by the `altr.run` domain. Not Mukul's personal — transferability matters later.

## CI updates

Extend `.github/workflows/lite.yml`:

- **lint-landing** (ubuntu-latest): `bun install --frozen-lockfile`, `bun --cwd apps/landing sanity:typegen` (so generated types are current), `bun --cwd apps/landing lint`, `bun --cwd apps/landing typecheck`, `bun --cwd apps/landing build`.
- **lint-ts** (existing): scope to desktop, or use `bun --filter '*' lint` to run both in parallel with per-workspace artifact caching.
- Rust jobs stay as-is — nothing under `apps/landing` touches Rust.
- Add a pre-commit check (or CI gate) that fails if `sanity.types.ts` is stale. Cheap insurance against untyped GROQ drift.

## Definition of done (landing v1)

1. `altr.run` serves v7 at parity. Lighthouse performance ≥ 95 mobile, ≥ 98 desktop.
2. Every string, image, and list on the page is editable in `/admin` — no hardcoded copy outside layout scaffolding.
3. Waitlist form submits successfully, confirmation email arrives within 10 seconds, confirm link works. Submission does not write to Sanity.
4. Presentation tool shows live preview with click-to-edit overlays for all modules (built-in + custom).
5. `sanity typegen generate` produces clean types; `tsc --noEmit` passes with `strict: true`.
6. Theme `data-theme=light` is the only variant shipped; dark is plumbed but not linked in nav.
7. Desktop app continues to build and run — no regressions from the monorepo move.
8. CI green on every workflow (lint-ts, lint-landing, lint-rust, check-rust).
9. README at the repo root reflects the monorepo layout. `apps/landing/README.md` documents SanityPress upgrade path and how to run typegen locally.
10. `CLAUDE.md` §4 file-layout section updated. Non-negotiables unchanged.
11. Handoff note in `NOTES/` with what shipped + deferred.

## Open questions to resolve before starting work

1. **Logo.** v7 uses `a\tr` wordmark. Real or placeholder? Affects `site` singleton logo field, favicon, OG image.
2. **Sanity organization.** Create `altr` org in Sanity under a shared `hello@altr.run` email — not Mukul's personal. Transferability matters if the company model changes.
3. **Domain DNS.** `altr.run` — who controls the zone, and is it pointed at anything today? Same for `staging.altr.run`.
4. **Resend + Supabase accounts.** Also under `hello@altr.run`, not personal. Supabase project org lives under the shared email too.
5. **Copy review.** "1,240 teams waiting" and similar aspirational strings in v7 — fine as placeholder while the page is unlinked; must be truthed up before public launch.
6. **SanityPress Pro?** $10/mo for i18n. Deferred unless we commit to a non-English market before v0.1.
7. **Blog deletion — really?** SanityPress defaults make adding `/blog` later cheap. Confirm we want to strip it in PR #3 vs. leave it unlinked.

## Estimated effort

| Task | Hours |
|---|---|
| PR #1 — monorepo scaffold + tokens fork | 2 |
| PR #2 — move desktop to apps/desktop | 2 |
| PR #3 — SanityPress scaffold, env wiring, blog strip, typegen setup | 3 |
| PR #4 — built-in module ports (nav/footer/hero/pricing/FAQ/callout/flag-list) with v7 styling | 6–8 |
| PR #5 — custom modules (ticker/playground/stamp/form.waitlist) | 5–7 |
| Waitlist API — Resend + Supabase + confirm flow | 3 |
| Visual Editing / Presentation wiring tune | 1–2 |
| Content entry in Studio (seeding all copy) | 2 |
| CI + deploy + domain + Sanity org setup | 2 |
| Polish + Lighthouse pass | 2 |

**Total ≈ 28–33h.** ~3 Saturdays + a handful of evenings, or one two-week push. Up from the hand-rolled estimate (17–20h) because "all content in Sanity" means schema design plus Studio seeding; SanityPress absorbs structural cost but adds content-modeling cost.

## Recommendation on timing

Two paths:

**(a) Ship the monorepo move now, defer Sanity.** Do PRs #1 + #2 this coming Saturday (~4h). Lossless win regardless — unblocks landing work without committing to the full 28–33h. Then schedule landing as its own two-week push when desktop Week-1 is behind us.

**(b) Full sprint.** Block two Saturdays + four evenings in the next two weeks. Ship landing v1 end-to-end. Desktop Week-1 slips by a week.

**I'd recommend (a).** Desktop Week-1 (graph store + first real `#[tauri::command]`) is the foundation everything else bolts onto. A one-week slip there is worth more than two weeks on a landing page nobody is waiting on yet.
