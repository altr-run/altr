# Altr — infrastructure + account inventory

Living document. Every SaaS account, domain, environment variable, and secret-storage location lives here. When you add a new service or rotate a secret, update this file in the same commit.

**Never commit secrets to this file.** Only non-secret IDs, URLs, account owners, and pointers to where the secret actually lives.

---

## 1. Principle: one shared inbox owns everything

All SaaS accounts use `hello@altr.run` (Google Workspace), never personal emails.

**Rationale:** transferability. If Altr becomes a company, hires people, or changes hands, every account moves with the inbox — no painful account-handoff theater. A side-effect is that you don't get personal-inbox drift when a SaaS adds a new dashboard tab.

---

## 2. Account ownership

| Service | Email | Created | Owner | Status |
|---|---|---|---|---|
| Google Workspace | hello@altr.run | 2026-04-21 | Mukul | ✅ Active |
| Sanity | hello@altr.run | 2026-04-21 | Mukul | ✅ Active |
| Resend | hello@altr.run | 2026-04-21 | Mukul | ⚠️ Key rotation pending confirmation (see §6) |
| Supabase | — | — | — | ⏳ Not yet created |
| Vercel | — | — | — | ⏳ Not yet created |
| PostHog | — | — | — | ⏳ Deferred — create before public launch |
| 1Password / Bitwarden (vault) | — | — | — | ⏳ Recommended before more secrets exist |

---

## 3. Domains + DNS

| Domain | Registrar | DNS host | Points at | Status |
|---|---|---|---|---|
| `altr.run` | TODO confirm | TODO confirm | TODO | Need to verify who controls the zone |
| `staging.altr.run` | — | (same as root) | Vercel (post-PR-#3) | ⏳ Not yet pointed |

DNS records added so far:
- **Google Workspace MX records** for `altr.run` → inbox active
- **Resend domain auth** (SPF / DKIM / DMARC TXT records) for `altr.run` → status: TODO confirm verification

---

## 4. Sanity

| Field | Value |
|---|---|
| Organization | `altr` |
| Project name | `altr` |
| **Project ID** | `wyr088n5` (public, safe to commit) |
| Dataset | `production` |
| Embedded Studio (dev) | http://localhost:3000/admin |
| Embedded Studio (prod) | https://altr.run/admin (post-deploy) |
| API read token | Stored as `SANITY_API_READ_TOKEN` in `apps/landing/.env.local`. Rotate at https://sanity.io/manage/project/wyr088n5/api |
| CORS origins | `http://localhost:3000` (add `https://altr.run` + `https://staging.altr.run` before prod) |
| Dataset backups | Default Sanity retention (14 days on free tier). No custom backups configured yet. |

---

## 5. Supabase (pending)

| Field | Value |
|---|---|
| Organization | TODO create under `hello@altr.run` |
| Project name | `altr-landing` (proposed) |
| Region | TODO pick (likely `us-east-1` or `eu-central-1`) |
| Project URL | TODO (public, safe) — will be `SUPABASE_URL` |
| DB password | TODO — store in 1Password, never here |
| Service role key | TODO — stored as `SUPABASE_SERVICE_ROLE_KEY` in `apps/landing/.env.local` (server-only; never ship to client) |
| Anon key | Not used; all landing-waitlist traffic goes through server routes with the service-role key |

Schema (single table; see `docs/landing-v1-plan.md` §Waitlist-backend for rationale):

```sql
create table public.waitlist (
  id           text primary key,
  email        text not null unique,
  created_at   timestamptz not null default now(),
  confirmed_at timestamptz,
  source       text,
  ua           text
);

alter table public.waitlist enable row level security;
-- no policies: anon + authenticated denied; service-role bypasses RLS
```

---

## 6. Resend

| Field | Value |
|---|---|
| Team | TODO confirm `altr` org name |
| Verified sender domain | `altr.run` — SPF + DKIM + DMARC via DNS |
| Sender address | `hello@altr.run` (or `no-reply@altr.run`) |
| API key | `re_...` stored as `RESEND_API_KEY` in `apps/landing/.env.local`. Rotate at https://resend.com/api-keys |
| Original key pasted in chat 2026-04-21 | **⚠️ Must be revoked** — assume compromised. Replace with new key; confirm rotation before proceeding with PR #5. |

---

## 7. Vercel (pending)

| Field | Value |
|---|---|
| Team | TODO create `altr` under `hello@altr.run` |
| Project | `altr-landing` (proposed) |
| Root directory | `apps/landing` |
| Install command | `bun install --frozen-lockfile` |
| Build command | `turbo run build --filter=@altr/landing` |
| Output directory | `.next` (Next.js default) |
| Environment variables | Mirror of `apps/landing/.env.local` — never paste the secrets anywhere else |

---

## 8. PostHog (deferred)

Sign up before public launch; not needed for PR #3/#4/#5.
- Project name: `altr-landing`
- API host: `https://us.posthog.com` or `https://eu.posthog.com` (pick based on user geography)
- Key: `POSTHOG_KEY` (public, safe to ship in bundle)

---

## 9. Desktop app BYOK (per CLAUDE.md §2)

The Tauri desktop app is BYOK — user's Anthropic/OpenAI keys live in the macOS keychain, not in SQLite, not in env files, not in this doc.

- Service: `run.altr.desktop`
- Account: `anthropic`
- Seed in dev: `security add-generic-password -a anthropic -s run.altr.desktop -w sk-ant-...`

This is end-user state, not project infra — the entry is here for the runbook's sake, not because Altr owns any LLM keys.

---

## 10. Secret storage map

**Principle:** public IDs → committed `.env.local.example` + this doc. Secrets → gitignored `.env.local` on disk during dev; Vercel env vars in prod; 1Password as the canonical vault.

| Secret | Local dev | Production |
|---|---|---|
| `SANITY_API_READ_TOKEN` | `apps/landing/.env.local` | Vercel env |
| `SUPABASE_SERVICE_ROLE_KEY` | `apps/landing/.env.local` | Vercel env |
| `RESEND_API_KEY` | `apps/landing/.env.local` | Vercel env |
| `WAITLIST_SIGNING_SECRET` | `apps/landing/.env.local` | Vercel env |
| `SANITY_REVALIDATE_SECRET` | `apps/landing/.env.local` | Vercel env |
| Anthropic API key (desktop) | macOS keychain | — (user BYOK, per CLAUDE.md §2) |

**Never do:**
- Paste a secret into chat (Claude Code, Slack, Discord, etc.)
- Commit a secret to the repo
- Put a secret in SQLite / logs / analytics events
- Use a secret in a build-time variable that leaks into the client bundle (`NEXT_PUBLIC_*` is the landmine — only **public** values go there)

**Safe:**
- Paste secrets directly into `.env.local` in a terminal (never chat)
- Pull from 1Password CLI: `op item get "Resend – altr" --field "api key"`
- Set in Vercel via dashboard or `vercel env add`

---

## 11. Runbook

### Rotate a Resend / Supabase / Sanity / signing key
1. Service dashboard → delete old key
2. Generate new key
3. Update `.env.local` on dev machine
4. Update Vercel → Settings → Environment Variables for `altr-landing`
5. Redeploy (`vercel --prod` or push to `main`)
6. Update `Created` / `Last rotated` fields in this doc
7. Update the 1Password entry with the new value

### Create a new SaaS account
1. Sign up with `hello@altr.run` (never personal email)
2. Create org `altr` / project `altr-<purpose>`
3. Add a section to this doc: public IDs, secret locations, rotation URL
4. Add an entry to §2 Account ownership
5. Update §10 Secret storage map if it introduces new secrets
6. Commit as `docs(infra): add <service>`

### Onboard a new machine to local dev
1. Clone repo
2. `bun install`
3. `cp apps/landing/.env.local.example apps/landing/.env.local`
4. Fill in secrets from 1Password (never pull from chat or an old machine's env)
5. `bun run landing:dev`

### Handle a leaked secret
1. Revoke immediately at the service dashboard
2. Rotate per runbook entry above
3. If the leak hit a public place (GitHub, chat screenshot, CI logs), audit recent usage for abuse
4. Document the incident in `NOTES/` with timestamp + what leaked + what was replaced

---

## 12. Open TODOs

- [ ] Confirm `altr.run` registrar + DNS host (§3)
- [ ] Rotate original Resend API key (pasted in chat 2026-04-21) and confirm new key is in `.env.local` (§6)
- [ ] Create Supabase project + run waitlist schema (§5)
- [ ] Create Vercel team + link repo once PR #3 renders locally (§7)
- [ ] Create 1Password vault named `altr` and migrate every value in §10 (§2)
- [ ] Before public launch: create PostHog project (§8)
- [ ] Before public launch: verify Resend domain auth is still valid (§6)
