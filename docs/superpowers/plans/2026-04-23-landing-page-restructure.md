# Landing Page Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Altr landing page to follow a tighter persuasion arc (Sarvam.ai-inspired): position → trust → differentiate → prove → remove objections → act.

**Architecture:** Reorder existing sections in `home-page.tsx`, add a hero one-liner + second CTA, create a new `Trust` section component, and remove the standalone `Stamp` section (its content absorbs into Trust).

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules (`home.module.css`), motion/react

---

## File Map

| Action | File | What changes |
|---|---|---|
| Modify | `apps/landing/src/ui/home/home-page.tsx` | New section order |
| Modify | `apps/landing/src/ui/home/hero.tsx` | Add one-liner tagline above heroSub |
| Create | `apps/landing/src/ui/home/trust.tsx` | New "Built for trust" section |
| Modify | `apps/landing/src/ui/home/home.module.css` | Trust section styles + heroTagline style |
| Delete | `apps/landing/src/ui/home/stamp.tsx` | Absorbed into Trust |

---

### Task 1: Add hero one-liner tagline

**Files:**
- Modify: `apps/landing/src/ui/home/hero.tsx`
- Modify: `apps/landing/src/ui/home/home.module.css`

The hero headline is poetic but doesn't say what Altr *is*. Add a short tagline above the `heroSub` paragraph that answers "what is this?" in one line.

- [ ] **Step 1: Add `.heroTagline` style to `home.module.css`**

Find the `.heroSub` rule and add immediately before it:

```css
.heroTagline {
	font-family: var(--f-mono);
	font-size: 11px;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--hero-ink-3);
	border: 1px solid var(--hero-line);
	border-radius: 999px;
	padding: 5px 14px;
	display: inline-block;
}
```

- [ ] **Step 2: Add tagline element to `hero.tsx`**

In `hero.tsx`, add a `<p>` with the tagline between the `<h1>` and the existing `<p className={s.heroSub}>`:

```tsx
<p className={s.heroTagline}>
	AI workspace · spec → ticket → PR · mac-native
</p>
```

- [ ] **Step 3: Verify visually**

Start dev server (`bun run dev` in `apps/landing`), open the hero, confirm the pill tag sits between headline and description text.

- [ ] **Step 4: Commit**

```bash
git add apps/landing/src/ui/home/hero.tsx apps/landing/src/ui/home/home.module.css
git commit -m "feat(landing): add hero tagline pill — answers 'what is Altr'"
```

---

### Task 2: Create the Trust section

**Files:**
- Create: `apps/landing/src/ui/home/trust.tsx`
- Modify: `apps/landing/src/ui/home/home.module.css`

Altr's local-first + BYOK story is a real differentiator. Surface it as a dedicated section to remove the main enterprise objection ("who holds my data / keys?").

- [ ] **Step 1: Create `trust.tsx`**

```tsx
import s from './home.module.css'
import Reveal from './reveal'

const PILLARS = [
	{
		mark: '■',
		title: 'Local-first',
		body: 'SQLite on your machine is the source of truth. Altr works fully offline. No network calls at launch, no sync required.',
	},
	{
		mark: '▲',
		title: 'Bring your own keys',
		body: 'Your Anthropic and OpenAI keys live in the OS keychain — never in a database, never on a server, never in logs.',
	},
	{
		mark: '◆',
		title: 'No vendor lock-in',
		body: 'Your specs, tickets, and artifacts are plain files in a local SQLite DB. Export or migrate any time. Altr never holds your work hostage.',
	},
] as const

export default function Trust() {
	return (
		<section className={s.trust} id="trust">
			<div className={s.trustIn}>
				<Reveal className={s.trustHead}>
					<span
						className={s.over}
						style={{ display: 'inline-block', marginBottom: 20 }}
					>
						§ security &amp; privacy
					</span>
					<h2 className={s.h2}>
						Built for trust.
						<br />
						<em>Not built on it.</em>
					</h2>
					<p className={s.trustSub}>
						Most AI tools ask you to trust their cloud. Altr is
						designed so you never have to.
					</p>
				</Reveal>
				<Reveal>
					<div className={s.trustGrid}>
						{PILLARS.map((p) => (
							<div key={p.title} className={s.trustCard}>
								<span className={s.trustMark}>{p.mark}</span>
								<h3 className={s.trustTitle}>{p.title}</h3>
								<p className={s.trustBody}>{p.body}</p>
							</div>
						))}
					</div>
				</Reveal>
				<Reveal>
					<div className={s.trustMeta}>
						<span>mac-native · Tauri 2 + Rust</span>
						<span className={s.trustMetaSep} />
						<span>keys in OS keychain</span>
						<span className={s.trustMetaSep} />
						<span>SQLite on disk</span>
						<span className={s.trustMetaSep} />
						<span>works offline</span>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
```

- [ ] **Step 2: Add Trust section styles to `home.module.css`**

Find the end of the existing section styles (before the responsive breakpoints) and add:

```css
/* ================= TRUST ================= */
.trust {
	padding: 112px 32px;
	background: var(--bg-raised);
	border-top: 1px solid var(--line);
	border-bottom: 1px solid var(--line);
}
.trustIn {
	max-width: 1020px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 64px;
}
.trustHead {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20px;
}
.trustSub {
	font-size: clamp(15px, 1.4vw, 18px);
	color: var(--ink-2);
	max-width: 480px;
	line-height: 1.6;
}
.trustGrid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2px;
}
.trustCard {
	background: var(--bg-base);
	border: 1px solid var(--line);
	padding: 36px 32px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.trustCard:first-child {
	border-radius: var(--r-lg) 0 0 var(--r-lg);
}
.trustCard:last-child {
	border-radius: 0 var(--r-lg) var(--r-lg) 0;
}
.trustMark {
	font-size: 20px;
	color: var(--acc);
	line-height: 1;
}
.trustTitle {
	font-family: var(--f-serif);
	font-size: 22px;
	font-weight: 400;
	color: var(--ink);
	margin: 0;
	line-height: 1.2;
}
.trustBody {
	font-size: 14px;
	color: var(--ink-2);
	line-height: 1.7;
	margin: 0;
}
.trustMeta {
	display: flex;
	align-items: center;
	gap: 16px;
	font-family: var(--f-mono);
	font-size: 11px;
	letter-spacing: 0.06em;
	color: var(--ink-3);
}
.trustMetaSep {
	width: 3px;
	height: 3px;
	border-radius: 50%;
	background: var(--ink-4);
	flex-shrink: 0;
}
```

- [ ] **Step 3: Verify**

Confirm the three-column trust grid renders correctly with the warm cream background and that marks (■ ▲ ◆) appear in accent colour.

- [ ] **Step 4: Commit**

```bash
git add apps/landing/src/ui/home/trust.tsx apps/landing/src/ui/home/home.module.css
git commit -m "feat(landing): add Trust section — local-first, BYOK, no lock-in"
```

---

### Task 3: Reorder sections in `home-page.tsx`

**Files:**
- Modify: `apps/landing/src/ui/home/home-page.tsx`

New order (Sarvam-inspired arc):
```
Hero → Logos → Triptych → Playground → How → Trust → Metrics → Manifesto → Testimonials → TalkTeam → FAQ → CTAClose → Footer
```

Changes from current:
- `Manifesto` moves from position 3 → after `Metrics` (earns its place after proof)
- `Trust` (new) inserts after `How`
- `Stamp` removed (absorbed into Trust)
- Order: Triptych comes before Playground (why → prove)

- [ ] **Step 1: Update `home-page.tsx`**

```tsx
import s from './home.module.css'
import Nav from './nav'
import Hero from './hero'
import HeroShader from './hero-shader'
import Logos from './logos'
import Triptych from './triptych'
import Playground from './playground'
import How from './how'
import Trust from './trust'
import Metrics from './metrics'
import Manifesto from './manifesto'
import Testimonials from './testimonials'
import TalkTeam from './talk-team'
import FAQ from './faq'
import CTAClose from './cta-close'
import FooterHome from './footer-home'

export default function HomePage() {
	return (
		<div data-home-page="">
			<div className={s.pageShell}>
				<div className={s.topShell} data-nav-theme="dark">
					<HeroShader isHovered={false} />
					<Nav />
					<Hero />
				</div>
				<div data-nav-theme="light">
					<Logos />
					<Triptych />
					<Playground />
					<How />
					<Trust />
					<Metrics />
					<Manifesto />
					<Testimonials />
					<TalkTeam />
					<FAQ />
					<CTAClose />
					<FooterHome />
				</div>
			</div>
		</div>
	)
}
```

- [ ] **Step 2: Delete `stamp.tsx`**

```bash
rm apps/landing/src/ui/home/stamp.tsx
```

- [ ] **Step 3: Verify full page renders without errors**

```bash
bun run dev
```

Open `http://localhost:3000`, scroll through all sections. Check console for import errors.

- [ ] **Step 4: Commit**

```bash
git add apps/landing/src/ui/home/home-page.tsx
git rm apps/landing/src/ui/home/stamp.tsx
git commit -m "feat(landing): reorder sections — tighter persuasion arc, add Trust, remove Stamp"
```

---

### Task 4: Responsive styles for Trust section

**Files:**
- Modify: `apps/landing/src/ui/home/home.module.css`

The three-column trust grid needs to stack on mobile.

- [ ] **Step 1: Find the mobile breakpoint block** (search for `@media` near the bottom of `home.module.css`) and add inside it:

```css
	.trust {
		padding: 72px 20px;
	}
	.trustGrid {
		grid-template-columns: 1fr;
		gap: 1px;
	}
	.trustCard:first-child {
		border-radius: var(--r-lg) var(--r-lg) 0 0;
	}
	.trustCard:last-child {
		border-radius: 0 0 var(--r-lg) var(--r-lg);
	}
	.trustMeta {
		flex-wrap: wrap;
		gap: 10px;
	}
```

- [ ] **Step 2: Verify on mobile viewport**

In browser DevTools, switch to 390px wide. Confirm cards stack vertically with correct border-radius on first/last.

- [ ] **Step 3: Commit**

```bash
git add apps/landing/src/ui/home/home.module.css
git commit -m "fix(landing): responsive styles for Trust section"
```
