# Altr — engineering playbook

Living document. Defines how Altr is built, committed, versioned, changelog'd, linted, tested, gated in CI, and released. When the workflow changes, update this file in the same commit.

**Companion docs:**
- `docs/infrastructure.md` — SaaS accounts, domains, secrets, runbook.
- `docs/docs-strategy.md` — product / API / repo docs tooling.
- `docs/landing-v1-plan.md` — specific plan for the landing app.
- `CLAUDE.md` — project constitution (soul / non-negotiables).
- `MASTER_PLAN.md` — product plan.

---

## 1. Guiding principle: cheap now, compounds forever

The tooling we set up in Week 1 runs thousands of times. A 15-minute investment in a pre-commit hook that prevents malformed commits pays back on commit #10. A 1-hour Changesets setup means we never hand-write a CHANGELOG.

Conversely: release-pipeline work for a binary we're 8+ weeks from shipping is speculative. We defer it until the release exists.

So this doc is phased by **when each piece earns its cost**:
- **Phase 1 — Foundation** — commits, versioning, hooks, CI gates. Set up once, compounds immediately.
- **Phase 2 — Docs shell** — scaffold after the product has anything worth documenting (post-landing, pre-beta).
- **Phase 3 — Desktop release** — codesign, notarize, Sparkle appcast. Set up when the first signed DMG is days away.
- **Phase 4 — Public launch prep** — uptime, status page, incident runbook.

---

## 2. Commit conventions

### Standard: Conventional Commits 1.0

Every commit message follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[body]

[footer]
```

**Types (enforced by commitlint):**
- `feat` — new user-facing feature
- `fix` — bug fix
- `perf` — performance improvement (user-facing or build-time)
- `refactor` — internal code change, no behaviour change
- `docs` — documentation only
- `test` — adding / fixing tests
- `chore` — tooling, CI, deps, config — no runtime effect
- `build` — build-system / dependency-manifest change
- `ci` — CI config only
- `revert` — reverting a prior commit (followed by `Reverts: <hash>`)

**Scopes** (not enforced — free-form, but keep a short list):
- `desktop` — Tauri app
- `landing` — marketing site
- `ui` — shared package
- `infra` — accounts, domains, deployment
- `docs` — the docs site or repo docs
- `ci` — workflows
- `release` — release plumbing
- `monorepo` — workspaces / root tooling
- `agents/pax`, `agents/eng` — per-agent desktop work
- Feature scopes as they emerge (`specs`, `tickets`, `channel`, etc.)

**Subject rules:**
- Imperative mood: `add`, not `adds` / `added` / `adding`
- ≤ 60 chars
- No period at end
- Lowercase after the colon unless proper noun

**Body:**
- Wrap at 72 chars
- Explain the *why* — the code explains the *what*
- Reference issues by `#NN` if we start using GitHub Issues

**Breaking changes:**
- Append `!` after the type/scope: `feat(desktop)!: rename graph schema`
- **Or** add `BREAKING CHANGE:` footer describing the break and migration path
- Changesets will bump major when it sees either signal

**Attribution:**
- Never add `Co-Authored-By: Claude` or any AI attribution trailer. All commits authored solely by human collaborators. (See memory: *No Claude co-author in commits*.)

### Enforcement

- **commitlint** via `@commitlint/cli` + `@commitlint/config-conventional` runs on every commit through a Husky `commit-msg` hook
- PR title is also linted on the CI side (a GitHub Action that runs commitlint against the PR title — guards squash-merges)

### Examples

Good:
```
feat(pax): stream edits into TipTap via custom extension
fix(eng): propagate cancellation to child claude-code process
chore(ci): pin tauri-cli to 2.1.0
docs(infra): add Supabase project section
refactor(monorepo): move desktop to apps/desktop/ (PR #2)
feat(desktop)!: rename graph.nodes.type field to kind
```

Bad (rejected by commitlint):
```
Update stuff                    # no type
feat: did the thing             # too vague, no scope
FEAT(UI): Button                # uppercase
feat(ui): added Button.         # past tense, trailing period
```

---

## 3. Versioning strategy

### Per-package SemVer via Changesets

We use [Changesets](https://github.com/changesets/changesets) for version management. Every PR that changes shippable code includes a changeset file declaring which packages bump and how.

**Why Changesets over release-please / semantic-release:**
- Monorepo-aware — each package in `apps/*` + `packages/*` versions independently
- Declarative — the author decides the bump type in a PR-time `.changeset/*.md` file, not inferred post-hoc from commit messages
- Composable with Conventional Commits — commits enforce discipline, changesets declare release intent
- GitHub-first — the `changesets/action` GitHub Action reads changesets and opens a "Release PR" that when merged bumps versions + tags

**Versioned packages:**

| Package | SemVer? | Published? |
|---|---|---|
| `@altr/desktop` (`apps/desktop`) | Yes — shipped binary | No npm, tagged `desktop@vX.Y.Z`, built to GitHub Releases |
| `@altr/landing` (`apps/landing`) | No — rolling deploy | No release. Vercel main = prod. No version number. |
| `@altr/ui` (`packages/ui`) | Yes — private workspace today, public package later | Not published yet. Internal workspace-only versioning. Flip to `"private": false` when ready to publish. |

**Version scheme per package:**
- `0.x.y` while under heavy churn (most of v0.1)
- `1.0.0` when API / UX is stable enough to commit to
- Pre-release tags: `0.2.0-beta.1` for TestFlight-style desktop betas

**Rules:**
- Non-user-visible PRs (`chore`, `ci`, `refactor` with no behaviour change, `test`, `docs`) **don't need a changeset**. We add an empty `.changeset/empty.md` via the `changeset --empty` command or skip when CI detects a safe type.
- `feat` = minor bump. `fix` / `perf` = patch bump. `!` / `BREAKING CHANGE:` = major bump.
- A changeset can bump multiple packages together when a shared change lands in both.

### Not used

- **No automatic semver inference from commit messages alone.** Humans decide bump type when the PR lands, using the visible diff plus judgment. (semantic-release's inference is too eager and gets breaking bumps wrong.)
- **No SemVer on landing.** It's a rolling-deploy marketing site. A version number adds noise.

---

## 4. Changelog strategy

### Source of truth: Changesets → per-package `CHANGELOG.md`

Every package with changesets gets a `CHANGELOG.md` at its root:
- `apps/desktop/CHANGELOG.md` — user-facing desktop releases (also surfaces in Sparkle update notes)
- `packages/ui/CHANGELOG.md` — for internal humans today, external once published

Changesets' generator produces Markdown from the `.changeset/*.md` files accumulated since the last release.

### Format

Keep-a-Changelog headers + SemVer sections:

```
# @altr/desktop

## 0.2.0

### Minor Changes
- 4a8b92c: Add Pax streaming into TipTap spec editor
- f12c803: Persist ticket autonomy flag across sessions

### Patch Changes
- 39ef221: Fix cancellation propagation to Claude Code subprocess
```

Changesets handles this automatically — we only write the human-readable summary inside each `.changeset/*.md`.

### User-facing release notes

- **Desktop:** the `CHANGELOG.md` section for the tagged version is copied into the GitHub Release body + Sparkle `appcast.xml` `<description>`. Users see it in-app when an update is available.
- **UI package** (when public): npm publishes the CHANGELOG automatically via `npm`'s default behavior.
- **Landing:** no landing-package changelog — landing is rolling-deploy. But landing *hosts* the public changelog at `altr.run/changelog`, generated from `apps/desktop/CHANGELOG.md` + `packages/ui/CHANGELOG.md` via a build-time script (`scripts/build-changelog.ts`). Each released version becomes its own page at `/changelog/[scope]-v[semver]` (e.g., `/changelog/desktop-v0.2.0`). See `docs/docs-strategy.md` §5.6 and `docs/landing-v1-plan.md` §Changelog-pipeline for the full architecture.

**CI gate** prevents drift: `turbo run changelog:build && git diff --exit-code apps/landing/src/content/changelog/` fails if a CHANGELOG.md rolled forward without the corresponding landing pages being regenerated. Author regenerates via `turbo run changelog:build` and commits the output.

### Writing a changeset

Author-side flow:

```
bun changeset
```

Interactive prompt asks:
1. Which packages changed?
2. Bump type for each (major / minor / patch)?
3. Summary — one line, user-facing, imperative mood

Produces a file like `.changeset/quiet-bears-sing.md`:

```markdown
---
"@altr/desktop": minor
---

Add Pax streaming into TipTap spec editor
```

Commit alongside the PR. CI gate fails if a PR touches `apps/desktop/**` or `packages/ui/**` without a changeset.

### Exceptions

- Ops / docs / CI-only PRs use `bun changeset --empty` to satisfy the CI gate without creating version noise.

---

## 5. Pre-commit hooks

### Stack: Husky + lint-staged + commitlint

| Hook | Runs | Why |
|---|---|---|
| `pre-commit` | `lint-staged` (ESLint + Prettier on staged files) | Fast — only checks what you just touched |
| `commit-msg` | `commitlint` | Blocks non-Conventional commits at commit time |
| `pre-push` | `turbo run typecheck` (cached) | Prevents pushing code that doesn't compile. Cached, usually sub-second |

### Install

Phase 1 task, done once. Setup:

```
bun add -D -W husky lint-staged @commitlint/cli @commitlint/config-conventional
bun husky init
```

Creates `.husky/pre-commit` and `.husky/commit-msg`.

### Configuration

Root `package.json` (added by Phase 1):

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,mdx,yaml,yml,css}": ["prettier --write"],
    "*.rs": ["cargo fmt --"]
  },
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

### Bypass policy

Never use `--no-verify` unless the user explicitly asks. If a hook fails, investigate and fix the underlying issue. (Per `CLAUDE.md` and global Claude Code rules.)

---

## 6. CI gates

### Expand `lite.yml` with release-readiness checks

Current `.github/workflows/lite.yml` runs lint-ts, lint-rust, check-rust (see `CLAUDE.md` §15). Phase 1 adds:

- **`commitlint`** — lint the PR title (in case of squash-merge)
- **`changesets-check`** — fail if any PR touches `apps/desktop/**` or `packages/ui/**` without a `.changeset/*.md` file
- **`turbo run typecheck` / `turbo run lint`** — parity with pre-push, but cached against Turbo remote cache once configured

Phase 2+ adds landing-specific drift gates (see `docs/landing-v1-plan.md` §CI-updates):

- **`openapi-gate`** — `turbo run openapi:build && git diff --exit-code apps/landing/public/openapi.yaml`. Ensures the OpenAPI spec regenerates when Zod request/response schemas change in route handlers.
- **`tauri-reference-gate`** — `turbo run docs:generate && git diff --exit-code apps/landing/src/content/internal/tauri-reference/`. Ensures the Tauri command reference MDX regenerates when `#[tauri::command]` signatures or doc comments change.
- **`changelog-gate`** — `turbo run changelog:build && git diff --exit-code apps/landing/src/content/changelog/`. Ensures the landing `/changelog` pages regenerate when per-package `CHANGELOG.md` files roll forward.

Pattern: all generated files are committed to git so the diff is legible, and CI enforces regeneration discipline rather than trusting authors to remember.

### New workflow: `release.yml`

Triggered on push to `main`. Runs the Changesets action:

1. Detects pending changesets
2. Opens (or updates) a "Version Packages" PR that bumps versions + regenerates CHANGELOG.md
3. When that PR is merged, tags releases + optionally publishes (npm for public `@altr/ui`; GitHub Release for desktop)
4. Empties the `.changeset/` dir

Locked to `main`; no manual cutting.

### What CI does not do (yet)

- No actual binary build on every push (expensive, slow)
- No deploy — landing is Vercel-managed (auto-preview per PR, auto-prod on merge to main)
- No codesign / notarize — Phase 3
- No test suite — CLAUDE.md §15 explicitly punts this until there's something worth testing

---

## 7. Branch strategy

### Trunk-based, PR-always

- `main` is always shippable
- Feature work on short-lived branches `feat/<scope>-<kebab-summary>` or `fix/<scope>-…`
- Push to branch → open PR → CI green → squash-merge
- No long-running release branches (we don't have the parallel-version problem yet)

### PR hygiene

- PR title uses Conventional Commits format (linted by CI)
- PR description explains **why** — code explains **what**
- Include a changeset if the PR touches shipped code (`apps/desktop/**`, `packages/ui/**`)
- For docs / chore / refactor-only PRs, mark with `[no-changeset]` in the description or use `bun changeset --empty`
- Self-review before asking — reduces "oh I left a `console.log`" churn

### Squash-merge default

Per-PR, the merged commit in `main` is the PR title. Keeps history linear + readable. Intra-PR commits are not preserved; that's fine — the PR body has the details.

**Exception:** PRs explicitly designed as a commit sequence (e.g., migration PRs where each step must be atomically revertable) can use rebase-merge. Rare. Document in the PR body.

---

## 8. Release cadence (per package)

### `@altr/desktop`

- **Pre-v0.1:** no tagged releases. Running off `main`. Mukul dogfoods own builds.
- **v0.1.0-beta.x:** first tagged beta when the Pax + Eng loop works end-to-end. ~Week 8-10 per MASTER_PLAN.
- **v0.1.0:** public beta at week 11. Shared on socials / show HN.
- **After v0.1:** monthly-ish cadence. Version bumps driven by Changesets on every feature PR.

### `@altr/ui`

- **Pre-extraction:** private workspace, no versions. Co-located at `packages/ui` but no one consumes `@altr/ui` as a published dep.
- **Post-extraction** (when the "3-primitives-duplicated" trigger fires — see `docs/landing-v1-plan.md`): flip `private: false`, start publishing patch/minor on every change.
- **Stable v1.0:** when the API is proven in production across both desktop + landing.

### `@altr/landing`

- No versions. Rolling deploy on merge to `main` via Vercel. Never tagged. Never changelog'd publicly.

---

## 9. Phased execution

### Phase 1 — Foundation (this session, ~60-90 min)

1. Install: `husky`, `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`, `@changesets/cli`
2. Init Husky: `bun husky init`
3. Hooks:
   - `.husky/pre-commit` → `bunx lint-staged`
   - `.husky/commit-msg` → `bunx commitlint --edit $1`
   - `.husky/pre-push` → `bunx turbo run typecheck`
4. Root `package.json` adds `lint-staged` + `commitlint` config
5. `bunx changeset init` — creates `.changeset/config.json` + `.changeset/README.md`
6. Configure `.changeset/config.json`:
   - `baseBranch: "main"`
   - `access: "restricted"` (nothing published yet)
   - `updateInternalDependencies: "patch"`
   - `ignore: ["@altr/landing"]` (landing doesn't version)
7. `.github/workflows/lite.yml` — add commitlint on PR title + changeset check job
8. `.github/workflows/release.yml` — new workflow for the Changesets Release PR flow
9. Run a test commit through the new hooks to verify
10. Document the dev-onboarding flow (what to do on fresh-clone → `bun install` → `bun husky init` if not auto-run)

### Phase 2 — Docs shell (after PR #3 lands)

See `docs/docs-strategy.md`.

### Phase 3 — Desktop release pipeline (~Week 8)

Scope (own dedicated plan doc before implementation — `docs/release-desktop.md`):
- Apple Developer account ($99/yr)
- Code-sign cert + entitlements
- Notarization via `notarytool` in CI
- DMG build via `tauri build`
- Sparkle appcast.xml published to a signed feed (Cloudflare Pages or S3)
- GitHub Release per tag with DMG artefact
- In-app update UX (`@tauri-apps/plugin-updater` + Sparkle-compatible appcast)

### Phase 4 — Public launch prep

- Landing: OG image, robots, sitemap (scoped in landing-v1-plan §Routes-&-API)
- Uptime: Betteruptime or Vercel Analytics' uptime widget
- Status page: deferred, skip until first real incident

---

## 10. Anti-patterns we're explicitly avoiding

- **No semantic-release.** Its commit-message-driven auto-bumping produces wrong bumps in our monorepo. Changesets is the right tool.
- **No Lerna.** Abandoned-then-unabandoned; Changesets does what Lerna did better.
- **No pre-v1.0 `1.x` version numbers.** Ship `0.x.y` until the product is stable. Semver before stability is fiction.
- **No full-matrix CI.** Altr is Mac-only; Linux/Windows build matrices are theatre.
- **No code-coverage gates.** A coverage number ≠ test quality. We'll add tests where they earn their cost.
- **No Dependabot spam.** Dependabot on, auto-merge off, batched weekly at most. Tooling drift is a known-knowns problem; we'll do it on a day we choose.
- **No release-branch strategy (`release/1.0`, `main`, `develop`).** Trunk-based until proven insufficient.
- **No AI attribution in commits or CHANGELOGs.** All commits authored by Mukul.

---

## 11. Open decisions

- [ ] **Prettier config.** Do we ship a root `.prettierrc` or inherit Prettier defaults? Recommend: root `.prettierrc` with `{ "semi": true, "singleQuote": false, "printWidth": 100, "trailingComma": "all" }`. Low-controversy, matches our existing code.
- [ ] **Should commitlint enforce `scope` as required?** Recommend: required with a warning (not error) that allows new scopes to emerge.
- [ ] **Dependabot vs. Renovate?** Recommend Renovate — better monorepo support, groups related deps. Off until Phase 4.
- [ ] **Do we want auto-merge for Renovate dep bumps?** Recommend: no, not until there's a test suite.
- [ ] **1Password CLI integration?** Recommend: yes for `.env.local` seeding. Phase 2.

---

## 12. Handoff note discipline

At the end of each coding session, write `NOTES/handoff-YYYY-MM-DD.md` per CLAUDE.md §11. Handoffs reference this playbook by link — they describe *what shipped*, not *how we work*.
