# Altr — docs strategy

Living document. Defines which kinds of docs Altr ships, where they live in the repo, what renders them, and how they get deployed. Update in the same commit as any structural change.

**Companion docs:** `docs/engineering-playbook.md`, `docs/infrastructure.md`, `docs/landing-v1-plan.md`, `CLAUDE.md`.

---

## 1. The five kinds of content Altr ships

| Kind | Audience | Lives in | Authored by | Served at |
|---|---|---|---|---|
| **Repo docs** (this file, playbook, plans, CLAUDE.md) | Contributors, future-Mukul, Claude | `docs/`, `NOTES/`, `CLAUDE.md`, `MASTER_PLAN.md` | Markdown in commits | GitHub only — not deployed |
| **Marketing** | Prospects | Sanity CMS | Mukul via Sanity Studio `/admin` | `altr.run/*` (root) |
| **Blog** | Readers, SEO | Sanity CMS (keep SanityPress built-ins) | Mukul via Studio | `altr.run/blog`, `altr.run/blog/[slug]` |
| **Product docs** (public + internal) | Altr users + internal team | MDX in repo (`apps/landing/content/docs/**`) | Engineering, alongside the feature PR | `altr.run/docs`, `altr.run/docs/[...slug]`, `altr.run/internal/docs/**` (gated) |
| **API reference** (public + internal) | Developers | OpenAPI YAML (auto-generated from Zod) + MDX for Tauri function reference | Code generates OpenAPI; Tauri reference generated from Rust doc comments + TS bindings | `altr.run/api-reference`, `altr.run/internal/api-reference`, `altr.run/internal/tauri-reference` |

**Rule:** `docs/` at the repo root is *engineering* (plans, strategy, runbooks). `apps/landing/content/docs/` is *product docs* (what users read at altr.run/docs). They don't cross-reference without reason.

---

## 2. The architectural decision: one Next.js app, four public zones

Everything — marketing, blog, docs, API reference, changelog, internal-gated zones, Sanity Studio — is served by `apps/landing/` as a single Next.js 15 App Router deploy. One Vercel project, one domain, one auth model.

```
altr.run (apps/landing/)
├── /                           marketing                  ← Sanity
├── /blog                       blog index                 ← Sanity
├── /blog/[slug]                blog post                  ← Sanity
├── /docs                       product docs index         ← MDX
├── /docs/[...slug]             product docs page          ← MDX
├── /api-reference              public API docs            ← Scalar + OpenAPI (themed)
├── /changelog                  release history            ← generated from CHANGELOG.md
├── /agents/pax                 per-feature marketing      ← Sanity (optional)
├── /agents/eng                 per-feature marketing      ← Sanity (optional)
├── /internal/*                 auth-gated (Basic Auth → Supabase Auth in v0.5+)
│   ├── /docs/**                internal product docs      ← MDX
│   ├── /api-reference          internal API docs          ← Scalar + OpenAPI
│   └── /tauri-reference        Tauri command reference    ← generated MDX
├── /admin                      Sanity Studio (already gated by Sanity auth)
├── /llms.txt                   AI-era crawl directive     ← static
└── /api/*                      real route handlers (waitlist, revalidate, etc.)
```

No `apps/docs/`. No Mintlify. No Starlight. No separate docs subdomain. One app, one deploy.

---

## 3. Why hybrid content sources (Sanity + MDX), not one-or-the-other

| Content | Source | Reason |
|---|---|---|
| Marketing + blog | **Sanity** | Non-technical editor UX. Image upload + hotspot. Preview. Studio-trained audience. Copy tweaks don't redeploy code. |
| Product docs (public + internal) | **MDX in repo** (`apps/landing/content/docs/**`) | Engineering-authored. Ships with the feature PR that introduces the behavior. PR-reviewable diff. Git blame. Inline code samples without import gymnastics. If a feature PR forgets its docs update, the PR review catches it. |
| API OpenAPI spec | **Auto-generated from Zod** at build time | Eliminates drift. The Zod validator IS the docs. |
| Tauri command reference | **Auto-generated** from Rust doc comments + `specta` TS bindings | Same drift-elimination argument. Keeps Rust code as the source of truth. |
| Changelog | **Auto-generated** from per-package `CHANGELOG.md` (Changesets output) at build time | Single source of truth; Changesets already writes it. |

**Pushback on "everything in Sanity":** Sanity's Studio DX doesn't help when the author is the same engineer shipping the feature. Sanity is great for copy-tweaking and image handling — not great for engineering content with lots of code examples and tight code-doc coupling. Split to both tools' strengths.

**When the split flips:** if a non-engineer eventually owns product docs (v1.0+?), migrate those from MDX to Sanity. The in-app reader is the same either way — it just swaps its data source.

---

## 4. Rendering stack

### 4.1 Shared layout and navigation (`<DocsLayout>`)

Everything under `/docs`, `/api-reference`, `/changelog`, and `/internal/*` shares one layout component in `apps/landing/src/components/DocsLayout.tsx`:
- Global nav (from Sanity `site` singleton — same one the marketing pages use)
- Left sidebar (tree from MDX frontmatter or explicit config)
- Main content area
- Right TOC (auto from headings)
- "Last updated" from git log + "Edit on GitHub" link
- Footer (minimal: Docs / Blog / Changelog / [llms.txt])

Uses `@altr/ui` primitives (Button, Input, etc.) but the MDX-rendering components live **only in landing** — not shared with desktop.

### 4.2 MDX stack — Content Collections

- [Content Collections](https://www.content-collections.dev/) for type-safe MDX queries. Zod schemas for frontmatter. Generated types consumed by pages.
- **Shiki** for syntax highlighting (build-time, zero runtime cost, beautiful output).
- **rehype-slug** + **rehype-autolink-headings** for heading anchors.
- **remark-gfm** for tables, checklists, strikethrough.
- **remark-reading-time** for per-post metadata.
- **MiniSearch** or **FlexSearch** for client-side search across docs + changelog at build time.

No Algolia, no external search infra until docs volume forces it.

### 4.3 Mintlify-quality MDX components (in `apps/landing/src/components/mdx/`)

Built in-house on `@altr/ui` primitives. Shopping list:

| Component | Purpose |
|---|---|
| `<Callout type="info\|warn\|tip\|success\|danger">` | Admonition blocks |
| `<CodeBlock>` | Shiki highlighting + copy-to-clipboard + multi-language tabs |
| `<Tabs>` / `<Tab>` | Per-framework examples, per-OS instructions |
| `<Accordion>` | Collapsible FAQ-style entries |
| `<Steps>` / `<Step>` | Numbered walkthroughs |
| `<Card>` / `<CardGrid>` | Nav tiles on index pages |
| `<ApiEndpoint>` | HTTP method + path + params + request/response example (wrapper over Scalar primitives) |
| `<FunctionReference>` | Tauri command signature: name + params + return + errors + example |
| `<VideoEmbed>` | For demo loops without YouTube lock-in |
| `<Keystroke>` | Inline `Cmd+K`-style chip |

Total build cost: ~20-30h across Phase 2. Built once, reused across docs + API reference + changelog forever.

### 4.4 API reference — Scalar themed to @altr/ui (Tier 1)

- `@scalar/nextjs-api-reference` embeds at `/api-reference`.
- Remap Scalar's CSS variables to Altr's (`--scalar-color-1` → `var(--ink)`, `--scalar-color-accent` → `var(--accent)`, etc.). Zero style-file churn, themed via token overrides.
- Wrap in `<DocsLayout>` so the outer chrome (nav, sidebar, footer) is 100% Altr — only the spec-rendering panel inside shows through Scalar's UI, now colored like the rest of the site.
- Result: 95% visual consistency at 10% of the cost of rebuilding OpenAPI rendering from scratch.
- Revisit full-custom renderer (Tier 3) at v1.0 if the API becomes a platform differentiator.

### 4.5 Tauri command reference — custom, not OpenAPI

Tauri commands are IPC, not HTTP. Forcing them into OpenAPI is semantically wrong.

- `specta` generates TypeScript bindings from `#[tauri::command]` signatures (already mandated by CLAUDE.md §7).
- A build script (`scripts/gen-tauri-reference.ts`) parses the bindings + reads adjacent Rust doc comments + error enums → emits one MDX page per command under `apps/landing/content/internal/tauri-reference/`.
- Rendered by the custom `<FunctionReference>` component (§4.3).
- Committed to git so diffs stay legible; no hidden generator state.

Defers until the first real Tauri command exists (Week 1 desktop — graph store).

---

## 5. Content zones in detail

### 5.1 `/docs` — public product docs (MDX)

**Priority 1 content for v0.1 launch:**

Onboarding track (written first, kept short):
- `introduction.mdx` — one-page "what's Altr, who's it for, what makes it different"
- `quickstart.mdx` — 10-minute install → launch → first spec → watch Eng run
- `byok-setup.mdx` — why BYOK, how to add keys to keychain, cost expectations

Concepts track (written second, backlinked from everywhere):
- `concepts/shared-graph.mdx`
- `concepts/agents-pax-eng.mdx`
- `concepts/autonomy-flags.mdx`
- `concepts/worktrees.mdx` — why Eng runs Claude Code in isolated per-ticket worktrees

Reference track (written alongside code as features ship):
- `reference/keyboard-shortcuts.mdx`
- `reference/config-file.mdx`
- `reference/troubleshooting.mdx` (Tauri permissions, keychain denied, Claude Code rate limits)

Non-goals for v0.1: Dex/Rae docs, plugin API, team-mode docs, any customer-side/CS/RevOps content (Quivly boundary).

### 5.2 `/internal/*` — gated internal content

For content that isn't secret but isn't ready for prospects (sharp design notes, in-progress specs, engineering RFCs, internal API surfaces).

Gating: Next.js `middleware.ts` checks Basic Auth header against `INTERNAL_DOCS_PASSWORD` env var. Not real identity — not needed yet. Flips to Supabase Auth + Google Workspace SSO in v0.5 when a team exists. URL shape (`/internal/...`) stays stable across that transition.

### 5.3 `/api-reference` — public API docs (Scalar)

Two endpoints at v0.1: `POST /api/waitlist`, `GET /api/waitlist/confirm`. Source of truth is Zod schemas in `apps/landing/src/app/api/`, converted via `@asteasolutions/zod-to-openapi` at build time. Spec published at `/openapi.yaml`; rendered at `/api-reference`.

As new public endpoints ship, add their Zod schemas; spec + docs update automatically.

### 5.4 `/internal/api-reference` — gated internal API docs

Same Scalar/OpenAPI mechanism, but for endpoints gated by auth. v0.1 has none; infrastructure sits ready for when it's needed.

### 5.5 `/internal/tauri-reference` — Tauri command reference (custom)

Generated from `apps/desktop/src-tauri/src/commands/**/*.rs` via `scripts/gen-tauri-reference.ts`. Output: one MDX page per command, rendered with `<FunctionReference>`. Lives under `/internal` because it's an implementation detail, not a public API.

### 5.6 `/changelog` — release history

Generated at build time from `apps/desktop/CHANGELOG.md` + `packages/ui/CHANGELOG.md`. Each version becomes its own page at `/changelog/[slug]` (e.g., `/changelog/desktop-v0.2.0`, `/changelog/ui-v0.0.5`). Index page is a reverse-chronological timeline.

Per-entry design (steal from Clerk's changelog):
- Date + version + scope badge (desktop / ui)
- Title linked for share
- Markdown body of the release notes
- Inline screenshots (optional, authored in the changeset message)
- RSS subscribe link at the top

Pagination: numbered, 10 entries per page.

### 5.7 `/blog` — editorial (Sanity)

Keep SanityPress's built-in `post` / `author` / `category` schemas. Previously scheduled for deletion in the landing plan — reverse that decision.

Categories for v0.1 (small, expands later):
- `engineering` — build journal, patterns, tradeoffs
- `company` — Altr is, Altr roadmap updates, Altr pricing changes
- `postmortem` — incident posts (Clerk-style, builds trust)

Post-level metadata: cover image, author, category, tags, reading time, OG image (Next.js `ImageResponse`), canonical URL.

Routes:
- `/blog` index (featured latest + list)
- `/blog/[slug]` post
- `/blog/categories/[slug]` category
- `/blog/authors/[slug]` author
- `/blog/rss.xml` RSS feed
- `/blog/[slug]/opengraph-image` dynamic OG

No comments. Link to @altrrun on Twitter/X for discussion.

### 5.8 `/llms.txt` — AI-era discovery

Static file at `apps/landing/public/llms.txt` following the [llmstxt.org](https://llmstxt.org/) spec. Lists the canonical docs URLs + a one-paragraph product description, optimized for LLM crawlers.

30 minutes of work. Free positioning for the "AI era."

### 5.9 Per-feature marketing pages (optional, deferred)

Pattern stolen from Clerk's `/components/sign-in`, `/components/user-button` model. Each major Altr surface gets its own landing page with live mockup + feature list + code example + getting-started links.

Candidates for v0.5+:
- `/agents/pax`
- `/agents/eng`
- `/worktrees`
- `/shared-graph`

Not v0.1. Adds marketing surface area before there's a product to back it up.

---

## 6. Authoring + publishing workflow

### 6.1 Product docs (MDX)

```
bun --cwd apps/landing dev
# Open http://localhost:3000/docs, edit apps/landing/content/docs/**.mdx
```

Write → commit on a `feat/docs-...` branch → PR → Vercel preview deploy → merge → auto-deploy to production. Changesets not required for docs-only PRs.

### 6.2 Marketing + blog (Sanity)

```
open http://localhost:3000/admin   # Sanity Studio embedded
```

Live Presentation preview (click-to-edit). Publishes on "Publish" — revalidation webhook triggers Next.js on-demand ISR. No deploy needed.

### 6.3 Tauri command reference + OpenAPI

```
turbo run docs:generate
git add apps/landing/content/internal/tauri-reference/*.mdx apps/landing/public/openapi.yaml
```

Generator is committed output → git-diffable → PR-reviewable. Enforced in CI: fail if generated files are out of sync with source (`turbo run docs:generate && git diff --exit-code`).

### 6.4 Changelog

Authored indirectly — every shippable-code PR adds a `.changeset/*.md` file describing the change. On release (Changesets Release PR merge), those files consolidate into `CHANGELOG.md` at each package's root. A build step turns `CHANGELOG.md` into `/changelog/[slug]` pages.

No direct editing of the `/changelog/*` MDX output — edit the source changeset message instead, re-run the transform, commit.

---

## 7. Style guide

- **Second person, present tense:** "Run the command. Altr opens the studio."
- **Short sentences.** ≤20 words. If longer, split.
- **No marketing tone in docs.** Docs are instructions + reference. Voice lives on altr.run marketing; docs are precise and dry.
- **Code blocks show real output.** Use the demo project's seed data. No fabricated responses.
- **Never say "simply" / "just" / "easy".** Presumes.
- **Link liberally.** Every concept mentioned has a backlink to its concept page.
- **Admonitions sparingly.** Callouts are for genuine gotchas, not decorative emphasis.
- **Images over screenshots where possible.** SVG > PNG for chrome. PNG only for product screenshots.
- **Alt text mandatory.** No empty `alt=""` outside truly decorative imagery.

---

## 8. Search, feedback, analytics

### Search
- Client-side index built at build time over all MDX + changelog pages using **MiniSearch**
- `Cmd+K` opens a modal, search-as-you-type
- No Algolia. Content stays under 10 MB of indexed text for the foreseeable future — client-side is fast enough and zero external infra.

### Feedback
- "Was this helpful?" thumbs at page bottom
- Submits to PostHog as an event tagged with the doc slug
- Top-empty-searches + thumbs-down pages drive content roadmap

### Analytics
- PostHog page-views + search queries + feedback events
- Vercel Web Analytics for RUM (LCP, CLS, INP) per page

---

## 9. Versioned docs (deferred)

Neither MDX-in-repo nor Content Collections versions docs today. That's fine for v0.1.

At v1.0, if users are on older desktop versions and need version-specific docs: duplicate `/docs` into `/docs/v1/`, `/docs/v2/` trees. Content Collections handles this via input globs. Decision deferred.

---

## 10. Phased execution

### Phase 1 — Foundation (separate doc, `docs/engineering-playbook.md`)

Commits, versioning, changesets, hooks, CI gates. Set up once, compounds forever. Not docs-tooling work.

### Phase 2 — Docs infrastructure (after PR #3 scaffolds SanityPress)

1. Install Content Collections + Shiki + rehype plugins in `apps/landing/`
2. Build the 12 MDX components (§4.3) in `apps/landing/src/components/mdx/`
3. Build `<DocsLayout>` shared chrome
4. Wire `/docs` route with MiniSearch index
5. Wire `/changelog` build pipeline from `CHANGELOG.md`
6. Write the 10 MDX docs pages (§5.1)
7. Add `llms.txt` (§5.8)

Est ~30-40h across 2-3 weeks.

### Phase 3 — API docs + Tauri reference (alongside first real command)

1. Install `@scalar/nextjs-api-reference` + theme remap
2. Install `@asteasolutions/zod-to-openapi` in landing
3. Wire Zod schemas in `/api/waitlist` handler to emit OpenAPI
4. Build `/api-reference` route
5. Write `scripts/gen-tauri-reference.ts`
6. Wire `turbo run docs:generate` task
7. First Tauri command lands (graph store) — its docs land in same PR

Est ~10-15h once the first command exists.

### Phase 4 — Content growth + polish

- Per-feature marketing pages (§5.9) only if Phase 2 analytics show the homepage saturating on specific-feature traffic
- Versioned docs if v1.0 lands with users on older versions
- Auth upgrade (Basic → Supabase Auth) for `/internal/*`

---

## 11. Open decisions

- [ ] `/changelog` page generation step — build-time script reading MD into React components, or at-request ISR from the raw MD in the repo? Recommend build-time static, zero runtime cost.
- [ ] MDX components — do we start with Radix primitives as the accessibility layer, or build from scratch on `@altr/ui` + HTML? Recommend Radix for primitives that need real a11y work (Tabs, Accordion, Dialog); raw HTML for static ones (Callout, CodeBlock).
- [ ] Search index — build-time full-content or frontmatter-only? Recommend full-content (MiniSearch handles MB-scale fine).
- [ ] Per-feature marketing pages — which features get their own page at v0.1? Recommend: none. Add at v0.5 if analytics demand.

---

## 12. What we explicitly don't do

- **No Mintlify, Starlight, Nextra, Docusaurus.** In-house rendering on `@altr/ui` + Content Collections gives full control + zero external hosting cost.
- **No separate `apps/docs/` workspace.** All docs live in `apps/landing/`.
- **No Algolia, no external search.** MiniSearch client-side until content volume forces it.
- **No versioned docs at v0.1.** One version on disk, latest deployed.
- **No docs analytics dashboard.** PostHog events + Vercel Web Analytics cover it.
- **No comments on blog or docs.** Conversation lives on Twitter/X + GitHub Discussions (eventually).
