# Landing v1 — Next.js + SanityPress, full docs + blog + changelog + API reference

Status: **plan, not built.** Drafted 2026-04-20. Revised 2026-04-21 to swap the hand-rolled Next.js scaffold for SanityPress. Revised 2026-04-21 again to make landing the single app serving marketing + blog + docs + API reference + changelog + gated internal zones (after locking architecture decisions with Mukul). Fonts swapped Inter → Mona Sans across product.

---

## Goal

Port `Altr Landing v7.html` to a Next.js 15 app on top of [SanityPress](https://sanitypress.dev) ([nuotsu/sanitypress-with-typegen](https://github.com/nuotsu/sanitypress-with-typegen)), and extend it to host **every public and internal content surface** for Altr:

- Marketing (`altr.run/`)
- Blog (`altr.run/blog`)
- Product docs (`altr.run/docs`) — public + internal
- API reference (`altr.run/api-reference`) — public + internal, Scalar themed
- Tauri command reference (`altr.run/internal/tauri-reference`)
- Changelog (`altr.run/changelog`)
- Gated internal zones (`altr.run/internal/*`)
- Sanity Studio (`altr.run/admin`)
- Waitlist API + other real route handlers (`/api/*`)

One Next.js app, one Vercel deploy, one domain. Single source of truth for all public Altr content.

## Why SanityPress as the base

- Next.js 15 App Router + Sanity v3 + Tailwind 4 + React 19 — the exact stack we'd build by hand, already wired
- Embedded Studio at `/admin` (SanityPress v4 convention); one Vercel project, Presentation tool on with live preview + click-to-edit
- Ships 17 pre-built modules (Hero, Pricing, Accordion, Callout, Flag/Card/Stat/Testimonial lists) — half of v7's marketing sections map straight to built-ins
- **Keep SanityPress's built-in `post` / `author` / `category` schemas** (previously scheduled for deletion — reversed) as our blog CMS
- Typegen fork gives typed GROQ queries — same bar as desktop (CLAUDE.md §7)

## Non-goals (explicit cuts — defend these)

- **No analytics dashboard.** PostHog JS snippet + Vercel Web Analytics only.
- **No A/B framework.** Ship `theme=light accent=amber hero=centered` as the only variant. Keep the data-attribute toggle; don't expose a chooser.
- **No sign-in on the public site.** `/internal/*` gated by Basic Auth middleware (shared password via env var), upgrades to Supabase Auth in v0.5 when team mode arrives.
- **No internationalization.** English only. Skip SanityPress Pro.
- **No tweaks panel in production.** v7's designer tool stays in source; doesn't ship.
- **No comments on blog or docs.** Readers go to Twitter/X / GitHub Discussions.
- **No per-component marketing pages for v0.1.** Clerk has one per component; Altr would have Pax + Eng. Not enough surface to justify; defer to v0.5.
- **No separate docs subdomain, no `apps/docs/` workspace, no Mintlify, no Starlight.** All docs rendering in `apps/landing/` via Content Collections + in-house `@altr/ui`-based MDX components.

## Quivly-boundary check

Landing serves product acquisition + user docs + engineering transparency (blog/changelog). Not customer-side CS/RevOps. Within CLAUDE.md §2.6. Safe.

---

## Repo layout (post-PR-#2)

```
altr.run/
├── apps/
│   ├── desktop/                    # Tauri app (moved in PR #2)
│   └── landing/                    # ← this plan
│       ├── src/
│       │   ├── app/
│       │   │   ├── (marketing)/    # altr.run/, hero/pricing/FAQ, etc.
│       │   │   ├── blog/           # altr.run/blog*
│       │   │   ├── docs/           # altr.run/docs*
│       │   │   ├── api-reference/  # Scalar + OpenAPI
│       │   │   ├── changelog/      # altr.run/changelog*
│       │   │   ├── internal/       # auth-gated via middleware
│       │   │   │   ├── docs/
│       │   │   │   ├── api-reference/
│       │   │   │   └── tauri-reference/
│       │   │   ├── admin/          # Sanity Studio
│       │   │   └── api/            # real route handlers
│       │   │       ├── waitlist/
│       │   │       └── revalidate/
│       │   ├── components/
│       │   │   ├── DocsLayout.tsx  # shared for /docs, /api-reference, /changelog, /internal
│       │   │   └── mdx/            # in-house Mintlify-quality MDX components
│       │   ├── sanity/             # Studio + GROQ queries
│       │   ├── content/            # MDX source
│       │   │   ├── docs/
│       │   │   └── internal/
│       │   └── middleware.ts       # /internal/* Basic Auth gate
│       ├── public/
│       │   ├── llms.txt
│       │   └── openapi.yaml        # generated at build time
│       └── package.json
└── packages/
    └── ui/                         # @altr/ui (tokens + future primitives)
```

## Stack (pinned)

| Layer | Choice | Why |
|---|---|---|
| Template | [SanityPress](https://github.com/nuotsu/sanitypress) (typegen fork) | See §Why SanityPress |
| Framework | Next.js 15 (App Router, RSC) | SanityPress-pinned |
| Runtime | React 19 | SanityPress-pinned |
| Language | TypeScript 5 strict | CLAUDE.md §7 |
| Monorepo runner | Turborepo | Per `docs/engineering-playbook.md` — caches `build` / `typecheck` / `lint` across workspaces |
| CMS | Sanity v3 (embedded Studio at `/admin`) | SanityPress-pinned |
| Styling | Tailwind CSS 4 (CSS-first `@theme`) | Imports `packages/ui/tokens/base.css` + `landing.css` |
| MDX | Content Collections | Type-safe MDX queries for docs + internal |
| Syntax highlighting | Shiki | Build-time, zero runtime cost |
| Typed queries | `@sanity/codegen` via `sanity schema extract` + `sanity typegen generate` | From typegen fork |
| Visual editing | `@sanity/visual-editing` + Presentation tool | On by default in SanityPress v4 |
| Fonts | `next/font` with Instrument Serif + **Mona Sans** (variable) + JetBrains Mono | Self-hosted for perf. Mona Sans via `next/font/google` or `@fontsource-variable/mona-sans`. |
| Email | [Resend](https://resend.com) | Simple, good DX, pay-as-you-go |
| DB (waitlist) | [Supabase](https://supabase.com) (Postgres) | Aligns with global "offload to managed SaaS" rule; free tier absorbs waitlist load; auth + storage available if landing ever needs them |
| API docs | [Scalar](https://scalar.com/) (`@scalar/nextjs-api-reference`) | Themed to @altr/ui tokens (Tier 1); OpenAPI-driven; no external SaaS |
| OpenAPI generation | `@asteasolutions/zod-to-openapi` | Zod schemas in route handlers emit OpenAPI at build time — zero drift |
| Tauri reference | Custom `<FunctionReference>` component on @altr/ui | Tauri IPC ≠ REST; custom shape, generated from `specta` bindings + Rust doc comments |
| Search | MiniSearch (client-side, build-time index) | Covers docs + changelog; no Algolia, no external infra |
| Auth (`/internal/*`) | Basic Auth middleware today → Supabase Auth + Google Workspace SSO at v0.5 | Cheapest gate that doesn't leak; real auth when a team exists |
| Icons | `lucide-react` | Same as desktop |
| Animations | [`motion`](https://motion.dev/) (formerly Framer Motion, renamed 2024) | Import from `motion/react`. v12+ supports React 19 natively. Used for ticker scroll, playground typewriter + response reveal, pricing card hover states, MDX component transitions (Tabs, Accordion, Dialog). `prefers-reduced-motion` honored everywhere. Shared across desktop + landing so motion language stays consistent. |
| Analytics | PostHog JS + Vercel Web Analytics | Funnel + RUM |
| Host | Vercel | One project; `apps/landing` root directory |

No `shadcn/ui`, `tailwind-variants`, `cva`. SanityPress built-ins + @altr/ui primitives are sufficient.

---

## Content-source matrix

| Surface | Source | Why |
|---|---|---|
| Marketing pages | Sanity | Non-technical editor UX, image hotspot, preview |
| Blog (posts, authors, categories) | Sanity (SanityPress built-ins) | Editor UX, image handling, occasional-cadence writing |
| Product docs (public + internal) | MDX in repo (`apps/landing/content/docs/**`) | Engineering-authored, ships with feature PRs, PR-reviewable |
| API reference (OpenAPI spec) | Zod schemas → auto-generated | Single source of truth; eliminates drift |
| Tauri command reference | `specta` bindings + Rust doc comments → auto-generated MDX | Same drift-elimination |
| Changelog | Per-package `CHANGELOG.md` (Changesets output) → build-time MDX | Changesets already writes it |

See `docs/docs-strategy.md` for full rationale on the hybrid Sanity+MDX split.

---

## v7 → SanityPress module map

Every section in v7 is either a **built-in SanityPress module** (just wire and style) or a **custom module** (schema + component we write).

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
| Footer | `site` singleton (built-in) | built-in | Minimal — 5 link groups max (see §Footer pattern) |
| Waitlist form | `form.waitlist` | **custom** | Schema is just copy (heading, sub, CTA label, success text); component POSTs to `/api/waitlist` |

**Blog additions (keep SanityPress built-ins):**

| Surface | Module / doc type | Kind |
|---|---|---|
| Blog index | Built-in `blog` module + `post` list | built-in |
| Blog post | Built-in `post` doctype | built-in |
| Author page | Built-in `author` doctype | built-in |
| Category page | Built-in `category` doctype | built-in |
| RSS feed | `/blog/rss.xml` route handler | **custom** |
| Per-post OG image | `/blog/[slug]/opengraph-image` via `ImageResponse` | **custom** |

**Totals:** ~8 built-ins wired as-is, ~6 custom modules / routes written from scratch. Custom is the long pole.

---

## Sanity schema design

**Documents (singletons + lists):**

- `site` — global site config (nav links, footer link groups, legal, social, waitlist open). Extend SanityPress's default `site` singleton; don't fork it.
- `page` — generic page doc. Home is a single `page` with slug `index`, composed from modules.
- `pricing.tier` — one doc per tier (Solo, Studio, Scale). Fields: `name`, `tagline`, `priceMonthly`, `priceAnnual`, `features[]`, `ctaLabel`, `ctaHref`, `highlighted: boolean`.
- `faq.entry` — question, answer (portable text), category, order.
- `post` — blog post. **Keep SanityPress built-in.** Fields: title, slug, cover, publishedAt, author (ref), categories (ref[]), body (portable text), excerpt, readingTime (derived).
- `author` — **Keep SanityPress built-in.** Fields: name, avatar, bio, social links.
- `category` — **Keep SanityPress built-in.** Fields: name, slug, color.

**Modules** (one schema file per module; each = `{ _type, ...fields }` inside `page.modules[]`):

- Built-in: `hero.saas`, `flag-list`, `pricing-list`, `accordion-list`, `callout`, `blog-list`, `blog-post` — use SanityPress defaults, add fields only where v7 copy demands.
- Custom: `ticker.scrolling`, `playground.prompts`, `stamp.mark`, `form.waitlist` — defined in `src/sanity/schemaTypes/modules/`.

**Fragments** (reusable):
- `link` — inline reference or external URL with label (SanityPress provides)
- `cta` — link + style variant
- `image-with-alt` — required alt text, no empty strings

**Rule:** never store waitlist submissions (emails, IPs, UAs) in Sanity. Those go to Supabase. Sanity is for *published content*.

---

## Custom modules — spec sketch

### `ticker.scrolling`
```ts
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
Component: `src/ui/modules/TickerScrolling.tsx` — Motion's `<motion.div>` with `animate={{ x: [0, -width] }}` on an infinite linear tween; items duplicated for seamless loop; `useReducedMotion()` hook freezes the animation for accessibility. CSS-only fallback via `prefers-reduced-motion` media query if JS fails to load.

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
        defineField({ name: 'response', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'typingMs', type: 'number', initialValue: 1200 }),
      ],
    }]}),
  ],
})
```
Client-only. Cycles through prompts, types out the `response` portable text at a per-prompt `typingMs`. Interactive logic in code, every string in Sanity. Motion-animated: prompt card fade/slide-in on cycle, typewriter cursor blink, streaming response character reveals via Motion's staggered children (respects `useReducedMotion()`).

### `stamp.mark` + `form.waitlist`

Unchanged from prior plan. `stamp.mark` = small "written in Altr" flourish. `form.waitlist` = copy-only schema; component POSTs to `/api/waitlist`.

---

## Routes & API — full tree

```
src/app/
├── (marketing)/
│   ├── layout.tsx             # fonts (Mona Sans via next/font), tokens, PostHog, Presentation bridge
│   ├── page.tsx               # renders home page doc by modules
│   ├── not-found.tsx
│   └── [slug]/page.tsx        # future generic pages
│
├── blog/
│   ├── page.tsx               # featured-post + list layout
│   ├── [slug]/page.tsx        # individual post
│   ├── [slug]/opengraph-image.tsx    # dynamic OG from post fields
│   ├── categories/[slug]/page.tsx    # category archive
│   ├── authors/[slug]/page.tsx       # author archive
│   └── rss.xml/route.ts       # RSS feed (top 20 posts)
│
├── docs/
│   ├── page.tsx               # docs index (card grid)
│   ├── [...slug]/page.tsx     # catch-all MDX renderer
│   ├── search/route.ts        # MiniSearch index serve (build-time generated)
│   └── opengraph-image.tsx    # shared OG for docs pages
│
├── api-reference/
│   ├── page.tsx               # Scalar themed renderer, reads /public/openapi.yaml
│   └── opengraph-image.tsx
│
├── changelog/
│   ├── page.tsx               # reverse-chron index (10 per page)
│   ├── [slug]/page.tsx        # per-version page (e.g., /changelog/desktop-v0.2.0)
│   └── rss.xml/route.ts       # RSS feed for releases
│
├── internal/
│   ├── docs/[...slug]/page.tsx
│   ├── api-reference/page.tsx
│   └── tauri-reference/[...slug]/page.tsx
│
├── admin/[[...index]]/page.tsx   # Sanity Studio
│
├── api/
│   ├── waitlist/
│   │   ├── route.ts              # POST { email } → Supabase + Resend confirm
│   │   └── confirm/route.ts      # GET ?token= → mark confirmed
│   ├── draft-mode/[...]          # SanityPress-provided
│   └── revalidate/[...]          # SanityPress-provided, webhook-gated
│
├── opengraph-image.tsx           # site-wide default OG
├── robots.ts
├── sitemap.ts                    # includes /docs + /blog + /changelog slugs
└── llms.txt/route.ts             # AI-era crawl directive
│
middleware.ts                     # /internal/* Basic Auth gate
```

---

## Changelog pipeline

Pattern stolen from Clerk: per-version URL (`/changelog/desktop-v0.2.0`), RSS feed, visible category badge, shareable.

### Source → build → output

```
packages/ui/CHANGELOG.md          ┐
apps/desktop/CHANGELOG.md         ┤── parse via @changesets/get-release-plan
                                  │   (or a custom parser walking H2 sections)
                                  ▼
                           scripts/build-changelog.ts
                                  │
                                  ▼
apps/landing/src/content/changelog/
                                  │
                                  ▼
       /changelog (index)     /changelog/[slug] (per-version)   /changelog/rss.xml
```

Build-time only — no runtime cost. CI enforces `turbo run changelog:build && git diff --exit-code` to block PRs where the source changelogs changed without the generated pages updating.

### Per-entry design

- Scope badge (`desktop` or `ui` tagged with `@altr/ui` color)
- Version + date
- Release notes (markdown → MDX, same components as docs — can embed `<Callout>`, `<CodeBlock>`, screenshots)
- Optional "breaking changes" callout (auto-shown if Changesets marked a major bump)
- "Copy link" + "Subscribe via RSS"

### Pagination

Numbered, 10 entries per page. Not infinite scroll.

---

## API reference pipeline

### OpenAPI generation (build-time)

1. Each route handler in `apps/landing/src/app/api/**` defines its request/response via Zod schemas
2. `scripts/gen-openapi.ts` calls `@asteasolutions/zod-to-openapi` to consolidate all schemas → emits `apps/landing/public/openapi.yaml`
3. Scalar reads `/openapi.yaml` at page load for `/api-reference` + `/internal/api-reference`
4. CI enforces regeneration: `turbo run openapi:build && git diff --exit-code`

### Scalar theming (Tier 1)

`apps/landing/src/app/api-reference/page.tsx`:

```tsx
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import './scalar-theme.css'; // override Scalar CSS variables with our tokens

export default function ApiReferencePage() {
  return (
    <DocsLayout>
      <ApiReferenceReact configuration={{
        spec: { url: '/openapi.yaml' },
        hideDownloadButton: false,
        hiddenClients: ['python', 'ruby', 'go'],
        defaultHttpClient: { targetKey: 'javascript', clientKey: 'fetch' },
      }} />
    </DocsLayout>
  );
}
```

`scalar-theme.css` remaps their CSS variables to `@altr/ui/tokens/landing.css` ones. Only showable code-sample languages for v0.1: curl + fetch (browser) + Node/Bun.

### Tauri command reference (not OpenAPI)

Separate pipeline (see `docs/docs-strategy.md` §4.5):

1. `#[tauri::command]` in Rust with `///` doc comments + `thiserror` errors
2. `specta` generates TS bindings → `apps/desktop/src/lib/bindings.ts`
3. `scripts/gen-tauri-reference.ts` parses bindings + reads Rust doc comments + error enums → emits one MDX page per command under `apps/landing/src/content/internal/tauri-reference/`
4. Rendered by custom `<FunctionReference>` at `/internal/tauri-reference/[...slug]`

Committed output keeps diffs legible. Regenerated via `turbo run docs:generate`.

---

## Footer pattern (stolen from Clerk)

Minimal. Five links, not fifty.

| Column | Links |
|---|---|
| Product | Docs, Changelog, Pricing |
| Company | Blog, Careers (later), Contact |
| Engineering | GitHub, RSS |
| Legal | Terms, Privacy |
| Social | Twitter/X, LinkedIn |
| Hidden | `llms.txt`, sitemap |

No 200-link mega-footer. The `llms.txt` link lives at the bottom-right as a soft signal for the AI era.

---

## Waitlist backend (unchanged — Supabase)

Two-step flow:

1. `POST /api/waitlist { email }` — validates (zod), writes to Supabase (secret key = `sb_secret_*`, server-side only, bypasses RLS), sends double-opt-in email via Resend with a 30-day signed token (HMAC-SHA256, not a DB-backed nonce — survives DB loss)
2. `GET /api/waitlist/confirm?token=…` — verifies signature, marks `confirmed_at`, shows a small `/confirmed` page

Supabase schema (see `docs/landing-v1-plan.md` §Waitlist-backend for full SQL; RLS **on** with zero policies so anon can't read/write — all traffic uses the secret key on the server).

Rate-limit: Vercel edge-config or in-memory map by IP. Honeypot + client rate-limit. No CAPTCHA.

### Environment variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — `wyr088n5`
- `NEXT_PUBLIC_SANITY_DATASET` — `production`
- `SANITY_API_READ_TOKEN` — viewer token for drafts in preview
- `SANITY_REVALIDATE_SECRET` — webhook secret for on-demand ISR
- `RESEND_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (`sb_secret_*` — server-only; never ship to client, never paste in chat)
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_*` — public, safe in client bundle)
- `WAITLIST_SIGNING_SECRET`
- `POSTHOG_KEY`
- `INTERNAL_DOCS_PASSWORD` — Basic Auth for `/internal/*`; rotated with every team join/leave

All in Vercel project settings; `.env.local` for dev (gitignored).

---

## Design-token sharing (unchanged — see packages/ui)

`packages/ui/tokens/base.css` (spacing only), `packages/ui/tokens/landing.css` (v7 white + amber palette), `packages/ui/tokens/desktop.css` (linen + ochre). Landing imports base + landing. Desktop imports base + desktop.

Both use **Mona Sans** (variable, OFL) as `--font-body` / `--f-sans`. Loaded via `next/font/google` in landing's `(marketing)/layout.tsx`. Loaded via CSS `@font-face` from `@fontsource-variable/mona-sans` in desktop.

---

## `llms.txt`

Static at `apps/landing/public/llms.txt` per the [llmstxt.org spec](https://llmstxt.org/). Lists canonical docs URLs + product description. Linked from footer.

~30 min to write. Free positioning in the AI-era crawler game.

---

## Migration order (safe, PR-per-step)

1. ✅ **PR #1 — monorepo scaffold** (landed `c274b30`). `packages/tokens/` + root workspaces manifest.
2. ✅ **PR #1.5 — rename** (landed `4ae977a`). `@altr/tokens` → `@altr/ui` with nested `tokens/` subdir.
3. ✅ **PR #2 — desktop move + Turborepo** (landed `39440e7`). `src/` + `src-tauri/` → `apps/desktop/`; added `turbo.json`; root scripts via `turbo run`.
4. **PR #3 — SanityPress scaffold.** `bunx create-sanity@latest apps/landing --template nuotsu/sanitypress-with-typegen`. Set project ID `wyr088n5`, dataset `production`. **Keep** `/blog` route group and `blog.*` schemas. Wire `@altr/ui/tokens/landing.css`. Verify `turbo run dev --filter=@altr/landing` serves default home + `/admin`.
5. **PR #4 — Port v7 built-ins + Clerk-inspired shell.** One sub-PR per module, roughly: nav + footer (`site` singleton) → hero → pricing (+3 `pricing.tier` docs) → FAQ → callout → flag list (product overview). Style to match v7. Implement the Clerk-minimal footer. Install Mona Sans via `next/font`. Commit after each module.
6. **PR #5 — Port v7 customs + waitlist API.** `ticker.scrolling` → `playground.prompts` → `stamp.mark` → `form.waitlist` + `/api/waitlist`. Seed copy in Studio. Connect Resend + Supabase. Verify end-to-end flow (submit → email → confirm).
7. **PR #6 — Docs infrastructure** (tracked by `docs/docs-strategy.md` Phase 2). Install Content Collections + Shiki. Build 12 MDX components in `apps/landing/src/components/mdx/`. Build `<DocsLayout>`. Wire `/docs` catch-all route + MiniSearch. Add `/internal/*` Basic Auth middleware.
8. **PR #7 — Content seed.** Write 10 MDX docs pages (intro, quickstart, BYOK, 4 concept pages, 3 reference pages). Add `llms.txt`.
9. **PR #8 — Changelog + API reference.** Build changelog MDX pipeline. Install Scalar + theme. Wire Zod → OpenAPI pipeline. Commit one example route with generated spec.
10. **PR #9 — Blog activation.** Keep SanityPress posts schema live. Seed 1-2 real posts. Wire RSS + OG images + category/author archives.

Each step is shippable. If PR #3 grows teeth (SanityPress version drift, typegen quirks), revert cleanly without losing PRs #1 + #2.

---

## Deployment

- Vercel project `altr-landing` connected to `altr-run/altr` repo, root directory `apps/landing`, `bun install --frozen-lockfile` install
- Build command: `turbo run build --filter=@altr/landing`
- Preview deploys per PR (each gets its own Studio at `$preview.altr-landing.vercel.app/admin` — fine; gated by Sanity auth)
- Production domain `altr.run`; staging `staging.altr.run` auto-deploys `main`
- Desktop app repo does **not** deploy to Vercel — separate release channel (Sparkle, planned)
- Sanity project: one, `altr`, `production` dataset, org owned by `hello@altr.run`. Already created (project ID `wyr088n5`).

---

## CI updates

Extend `.github/workflows/lite.yml`:

- **lint-landing** (ubuntu-latest): `bun install --frozen-lockfile`, `turbo run sanity:typegen --filter=@altr/landing` (generated types current), `turbo run lint typecheck build --filter=@altr/landing`
- **openapi-gate:** `turbo run openapi:build --filter=@altr/landing && git diff --exit-code apps/landing/public/openapi.yaml` — fails if OpenAPI YAML is stale
- **tauri-reference-gate:** `turbo run docs:generate && git diff --exit-code apps/landing/src/content/internal/tauri-reference/` — fails if Tauri reference MDX is stale
- **changelog-gate:** `turbo run changelog:build && git diff --exit-code apps/landing/src/content/changelog/` — fails if CHANGELOG.md rolled forward without regenerated MDX
- **lint-ts** + **lint-rust** + **check-rust**: existing; stay as-is
- Add a commitlint job on PR title (per `docs/engineering-playbook.md` §6)
- Add a changeset-check job (fail if PR touches `apps/desktop/**` or `packages/ui/**` without a `.changeset/*.md` file)

Separate `.github/workflows/release.yml` (new): Changesets action opens/updates a "Version Packages" PR that bumps versions + regenerates CHANGELOG.md (which then roll forward into landing's `/changelog` on next merge).

---

## Definition of done (landing v1)

1. `altr.run` serves v7 at parity. Lighthouse performance ≥ 95 mobile, ≥ 98 desktop
2. Every string/image/list on the marketing page is editable in `/admin` — no hardcoded copy outside layout scaffolding
3. Waitlist submits successfully, confirmation email arrives within 10 seconds, confirm link works. Submission does not write to Sanity.
4. Presentation tool shows live preview with click-to-edit overlays for all modules (built-in + custom)
5. `/docs` renders at least 5 MDX pages with working sidebar + TOC + code blocks + callouts
6. `/changelog` renders current CHANGELOG.md content with per-version URLs + RSS
7. `/api-reference` renders `/api/waitlist` OpenAPI via themed Scalar
8. `/blog` renders at least 1 seeded post with RSS + OG image
9. `/internal/*` blocks unauthenticated requests (Basic Auth)
10. `/llms.txt` present and listed in footer
11. `sanity typegen generate` produces clean types; `tsc --noEmit` passes with `strict: true`
12. Theme `data-theme=light` is the only variant shipped
13. Mona Sans loads via `next/font`; no render-blocking font FOIT/FOUT
14. Desktop continues to build and run — no regressions from monorepo moves
15. CI green on every workflow (lint-ts, lint-landing, lint-rust, check-rust, openapi-gate, tauri-reference-gate, changelog-gate, commitlint, changesets-check)
16. README reflects monorepo layout. `apps/landing/README.md` documents SanityPress upgrade path + how to run typegen/openapi/changelog generators locally
17. `CLAUDE.md` §4 file-layout section updated (drop references to the old flat layout, include `apps/landing/content/**`)
18. Handoff note in `NOTES/` with what shipped + deferred

---

## Patterns adopted from Clerk's landing

See `docs/clerk-research.md` (future) or session notes 2026-04-21 for full analysis. Key patterns:

| Pattern | Where applied |
|---|---|
| Changelog with per-entry URLs + RSS + numbered pagination | `/changelog/[slug]` |
| Separate blog vs. articles content types | **Skipped v0.1** — one `post` type. Split when SEO-driven pillar content arrives. |
| Per-feature marketing pages (Clerk: `/components/sign-in`) | **Skipped v0.1** — Altr's Pax + Eng aren't yet 6 discrete marketing surfaces. Defer to v0.5. |
| Interactive mockups over static screenshots | Playground module does this. Extend in Phase 2. |
| Minimal footer (5-6 groups, `llms.txt` link) | `site` singleton footer |
| Postmortems published as blog posts | Adopted — category `postmortem` added to Sanity schema |
| `llms.txt` in footer | Added, static file |
| Pricing: tiers + separate add-ons + comparison table | Applied to Solo/Studio/Scale. Altr still highlights one tier (Studio) — unlike Clerk's equal-weight approach. |
| Glossary at `/glossary` for long-tail SEO | **Deferred to Phase 3.** Cheap once content is needed. |

---

## Open questions

1. **Logo.** v7 uses `a\tr` wordmark. Real or placeholder? Affects `site` singleton logo + favicon + OG image.
2. **Domain DNS.** Who controls `altr.run`? Is `staging.altr.run` available?
3. **Resend + Supabase accounts.** Under `hello@altr.run`. Supabase project org name = `altr`. Pending creation (see `docs/infrastructure.md` §5).
4. **Copy review.** v7 has aspirational stats ("1,240 teams waiting") — fine while unlinked; must be truthed before public launch.
5. **Blog seed content.** Who writes the first 2-3 posts before the `altr.run` domain goes public? Recommend: Mukul writes a "Why Altr" post + the first post-mortem about the Turso→Supabase decision. Cheap credibility-building.
6. **Per-feature marketing pages — really defer to v0.5?** Confirm before PR #4 planning.
7. **SanityPress Pro?** $10/mo for i18n. Deferred unless non-English market commits before v0.1.
8. **Basic Auth password rotation cadence.** Every 30 days? Every join/leave event? Recommend: manual rotation at team-size changes. Encode in `docs/infrastructure.md` runbook.

---

## Estimated effort (revised for new scope)

| Task | Hours |
|---|---|
| PR #1 — monorepo scaffold + @altr/ui + tokens fork | ✅ done |
| PR #1.5 — rename @altr/tokens → @altr/ui | ✅ done |
| PR #2 — move desktop to apps/desktop + Turborepo | ✅ done |
| PR #3 — SanityPress scaffold, env wiring, typegen setup | 3 |
| PR #4 — marketing built-ins (nav/footer/hero/pricing/FAQ/callout/flag-list) + Mona Sans wiring | 7-9 |
| PR #5 — customs (ticker/playground/stamp/form.waitlist) + /api/waitlist + Supabase + Resend | 7-9 |
| PR #6 — Docs infra: Content Collections, 12 MDX components, `<DocsLayout>`, MiniSearch, `/internal/*` Basic Auth | 20-25 |
| PR #7 — Docs content seed (10 MDX pages) + `llms.txt` | 6-8 |
| PR #8 — Changelog pipeline + API reference (Scalar theme + Zod → OpenAPI) | 8-10 |
| PR #9 — Blog activation (RSS + OG images + archives + 1-2 seeded posts) | 4-6 |
| Tauri reference pipeline (alongside first real command, separate PR) | 4-6 |
| Visual Editing / Presentation wiring tune | 1-2 |
| Content entry in Studio (seeding all copy) | 2-3 |
| CI + deploy + domain + Sanity org setup | 2-3 |
| Polish + Lighthouse pass | 2-3 |

**Total ≈ 66-85 hours.** Up substantially from the prior 28-33h — reflects the shift from "landing marketing site" to "landing hosts everything (marketing + blog + docs + changelog + API reference + internal)." Still doable in 4-6 Saturdays + 6-8 evenings, or one 3-week focused push.

---

## Recommendation on timing

Desktop Week-1 work (graph store in `apps/desktop/src-tauri/src/graph/`) is still the more load-bearing dependency for v0.1. A four-week landing push delays the core product.

Two paths:

**(a) Parallel: desktop Week-1 + landing PR #3–#5 in rotation.** Desktop evenings, landing Saturdays. Ship the minimum landing (marketing + waitlist) in 3-4 weeks while desktop progresses. Docs + changelog + API reference land after the desktop beta is closer.

**(b) Landing first, full scope.** Ship PRs #3–#9 in a 4-5 week landing sprint. Desktop Week-1 slips. Risk: Altr has a shiny site with nothing to sign up for.

**(a) remains the right call.** The landing exists to generate interest; the desktop app exists to fulfill interest. Don't flip the order.

Under (a), scope for "landing MVP" = PRs #3, #4, #5 = **17-21 hours**. Ship this in the first 2-3 weekends. Docs + changelog + API reference + blog follow in subsequent sprints.
