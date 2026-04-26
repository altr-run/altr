# Website Analysis Playbook

Full end-to-end flow for downloading and deeply analyzing any website locally.
Covers: all pages, SEO, on-page, code, assets, UI/animations, tech stack.

---

## Stack

| Tool | Role |
|------|------|
| **Firecrawl** (self-hosted) | URL map, SEO data, structured content per page |
| **website-scraper** + puppeteer | All files on disk (HTML, CSS, JS, fonts, images) |

---

## One-time Setup

### 1. Firecrawl (self-hosted)

```bash
git clone https://github.com/mendableai/firecrawl
cd firecrawl
cp apps/api/.env.example apps/api/.env
docker compose up -d
# Running at http://localhost:3002
```

### 2. website-scraper

```bash
mkdir site-analysis && cd site-analysis
npm init -y
npm install website-scraper website-scraper-puppeteer
```

Create `scrape.mjs`:

```js
import scrape from 'website-scraper'
import PuppeteerPlugin from 'website-scraper-puppeteer'

const TARGET = 'https://example.com'   // ← change this
const OUTPUT = './site-local'           // ← change this

await scrape({
  urls: [TARGET],
  directory: OUTPUT,
  plugins: [new PuppeteerPlugin({
    launchOptions: { headless: true }
  })],
  recursive: true,
  maxDepth: 3,
  filenameGenerator: 'bySiteStructure',
  sources: [
    { selector: 'script', attr: 'src' },
    { selector: 'link[rel=stylesheet]', attr: 'href' },
    { selector: 'img', attr: 'src' },
    { selector: 'source', attr: 'srcset' },
    { selector: 'link[rel*=icon]', attr: 'href' },
    { selector: 'video', attr: 'src' },
  ]
})

console.log('Done. Files saved to', OUTPUT)
```

---

## Run the Analysis

### Step 1 — Map all URLs

```bash
curl -X POST http://localhost:3002/v1/map \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' \
  | jq '.' > url-map.json
```

Output: `url-map.json` — every URL on the site.

---

### Step 2 — Full crawl (SEO + content + meta per page)

```bash
curl -X POST http://localhost:3002/v1/crawl \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "limit": 200,
    "scrapeOptions": {
      "formats": ["markdown", "html", "links"],
      "includeTags": ["meta", "script", "link", "title"]
    }
  }' | jq '.' > crawl-output.json
```

Output: `crawl-output.json` — per page:
- Title, meta description, canonical URL
- OG tags (og:title, og:description, og:image)
- All headings (H1–H6)
- Internal + external links
- Structured data / schema.org
- Full markdown text
- Raw HTML

---

### Step 3 — Download all files locally

```bash
node scrape.mjs
```

Output: `./site-local/` folder:

```
site-local/
├── index.html
├── about/
│   └── index.html
├── css/
│   └── *.css          ← all stylesheets, animations
├── js/
│   └── *.js           ← all JS bundles
├── fonts/
│   └── *.woff2
└── images/
    └── *.{png,jpg,svg,webp}
```

Open `site-local/` in VS Code to inspect:
- CSS animations / keyframes
- JS animation libraries (Framer Motion, GSAP, etc.)
- Component structure
- Design tokens
- Font choices

---

## What to Review

### SEO (`crawl-output.json`)
- [ ] Title tag — keyword-rich, under 60 chars?
- [ ] Meta description — under 155 chars, includes CTA keyword?
- [ ] H1 — only one? includes primary keyword?
- [ ] Canonical URL — present on every page?
- [ ] OG tags — title, description, image all set?
- [ ] Structured data — SoftwareApplication, Organization, FAQ schema?
- [ ] robots.txt — present, correct?
- [ ] sitemap.xml — present, all URLs listed?

### On-page content (`crawl-output.json` markdown)
- [ ] Narrative arc — hook → problem → solution → proof → CTA?
- [ ] CTA copy — specific and benefit-oriented?
- [ ] Social proof — logos, quotes, numbers?
- [ ] Keyword density — primary keywords in H2s and body?
- [ ] Voice — consistent, specific, not generic AI-speak?

### Code & UI (`site-local/`)
- [ ] CSS animation approach — keyframes, transitions, custom properties?
- [ ] JS animation library — Framer Motion, GSAP, Lottie, vanilla?
- [ ] Typography system — font families, scale, weights?
- [ ] Color tokens — CSS variables, design system?
- [ ] Component patterns — how sections are structured?
- [ ] Performance hints — image formats, lazy loading, bundle size?

### Tech stack (check `site-local/js/` filenames + `crawl-output.json` scripts)
- [ ] Framework — Next.js, Nuxt, Astro, etc.?
- [ ] Analytics — GA4, PostHog, Mixpanel, Segment?
- [ ] A/B testing — Optimizely, LaunchDarkly?
- [ ] Chat / support — Intercom, Crisp, Drift?
- [ ] Forms — HubSpot, Typeform, custom?

---

## Feed into Claude for Analysis

Once you have the files, paste into Claude:

```
Here is the crawl output for [site]: [paste crawl-output.json]

Review this against:
1. April Dunford's Obviously Awesome positioning framework
2. SEO best practices (title, meta, H1, canonical, OG)
3. Narrative arc (hook → tension → resolution → proof → CTA)
4. Copy quality (specificity, voice, CTA strength)

Give me 10 specific actionable improvements.
```

Or for code review:

```
Here is the CSS from [site]: [paste relevant CSS]

Extract:
1. Animation approach and easing values used
2. Typography scale and font choices  
3. Color system and design tokens
4. Spacing rhythm
5. Layout patterns worth adopting
```

---

## Quick Reference Commands

```bash
# Start Firecrawl
cd firecrawl && docker compose up -d

# Map URLs
curl -X POST http://localhost:3002/v1/map \
  -d '{"url": "https://TARGET.com"}' | jq > url-map.json

# Full crawl
curl -X POST http://localhost:3002/v1/crawl \
  -H "Content-Type: application/json" \
  -d '{"url":"https://TARGET.com","limit":200,"scrapeOptions":{"formats":["markdown","html","links"]}}' \
  | jq > crawl-output.json

# Download files
node scrape.mjs

# Stop Firecrawl
cd firecrawl && docker compose down
```

---

## Notes

- Firecrawl free tier (cloud) limits to 500 pages/month — self-host to bypass
- `maxDepth: 3` in scrape.mjs covers most marketing sites — increase for large sites
- Some sites block headless browsers — add `--user-agent` or use residential proxy
- JS-heavy sites (Next.js, Nuxt) need `waitUntil: networkidle` — already handled by puppeteer plugin
- WACZ format (Browsertrix) is better for pixel-perfect replay if you need animations running offline
