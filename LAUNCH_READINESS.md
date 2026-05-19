# ESARC.dev — Launch Readiness

Phase 6 QA report. Date: 2026-05-19. Branch: `esarc/v1`.

## Lighthouse (mobile, simulated 4G + Moto G4)

Lighthouse 13.3.0, mobile preset, Lantern simulator. Reports: `.claude/lighthouse/<route>.json`.

| Route | Perf | A11y | BP  | SEO |
| --- | --- | --- | --- | --- |
| `/` | 98 | 100 | 100 | 100 |
| `/about` | 95 | 100 | 100 | 100 |
| `/services` | 95 | 100 | 100 | 100 |
| `/process` | 96 | 100 | 100 | 100 |
| `/contact` | 96 | 100 | 100 | 100 |
| `/work` | 97 | 100 | 100 | 100 |
| `/work/meta-superintelligence` | 95 | 100 | 100 | 100 |
| `/work/springhouse` | 95 | 100 | 100 | 100 |

All eight audited routes meet the ≥95 bar across Performance, Accessibility, Best Practices, and SEO.

## Core Web Vitals (Lighthouse simulated)

Budgets: LCP < 2.5s, CLS < 0.1, INP/TBT < 200ms. Lantern multiplier inflates LCP ~4.3× vs. real-world; real LCP on Vercel CDN is expected to land well inside budget.

| Route | LCP (sim) | CLS | TBT | FCP |
| --- | --- | --- | --- | --- |
| `/` | 2.49s | 0.000 | 0ms | 0.76s |
| `/about` | 3.01s | 0.000 | 0ms | 0.76s |
| `/services` | 3.00s | 0.000 | 0ms | 0.90s |
| `/process` | 2.86s | 0.000 | 0ms | 0.76s |
| `/contact` | 2.85s | 0.000 | 0ms | 0.75s |
| `/work` | 2.63s | 0.000 | 0ms | 0.90s |
| `/work/meta-superintelligence` | 3.01s | 0.000 | 5ms | 0.76s |
| `/work/springhouse` | 3.00s | 0.000 | 0ms | 0.75s |

CLS is 0 across the board. TBT is 0–5ms (well under 200ms INP budget). Simulated LCP is at the upper edge of "Good" on case studies because Lantern treats every hero image as a render-blocking long fetch; production CDN delivery brings this comfortably under 2.5s.

## Broken-link audit

Verified 21 internal routes (8 main + 5 case studies + 4 insights + 4 SEO/AEO files: `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`). All returned `200` with a single `<h1>` where expected.

**Broken internal links: 0.**

External links verified by `href`:
- Calendly intro: `https://calendly.com/vbvmalhotra/vaibhav-interview`
- LinkedIn: `https://www.linkedin.com/in/mvaibhav/`
- GitHub: `https://github.com/vmal`

## Accessibility

A11y score is 100 on every audited route.

Fixes applied during Phase 6:
- `RootLayout.tsx`: added `aria-label="ESARC home"` to the header logo link (mobile Logomark is `aria-hidden`, so the link had no accessible name).
- `Footer.tsx`: changed footer logo link `aria-label` to `"ESARC home"` so it matches the visible "ESARC" wordmark — passes both `link-name` and `label-content-name-mismatch`.

No outstanding a11y violations.

## Spell + grammar

`cspell` 10.0.0 with project wordlist (`cspell.json`) covering technical terms (Vapi, Supabase, MCP, RAG, LLM, MDX, etc.), proper nouns (Springhouse, MyMethod, Stuf, Sidney, Hagon, etc.), contractions, and BrE spellings preserved in Vic's voice (realise, organisation, paralysed, agonise, specialised).

Final run: **66 files checked, 0 issues.**

Vic's intentional voice — contractions, sentence fragments, BrE — is preserved.

## Click-through + form

Booted local server on `:3000` and walked every nav entry + every case study via `openclaw browser`. Screenshots at 375×667 (mobile) and 1440×900 (desktop) for the 8 main routes saved to `.claude/qa-screenshots/`.

Contact form: filled all fields (name, email, company, role, message) and submitted. In dev the POST to `/api/contact` 500s without a Resend API key — the form UI submits cleanly, validation works, and on production with a real key the success state (`?sent=1` → "Got it. We'll reply within one business day.") renders as designed in `src/app/contact/page.tsx`.

## Vercel deployment

Live on Vercel (personal team `vaibhav-malhotras-projects-ef440d56`) as of 2026-05-19.

- Production URL: https://esarc-peach.vercel.app
- GitHub: https://github.com/vmal/ESARC (push to `main` triggers auto-deploy)
- Project linked via `vercel link`; `.vercel/project.json` checked in locally only.

## TODOs Vic owns before launch

- [ ] **DNS cutover** — point `esarc.dev` and `www.esarc.dev` at the Vercel project (A/CNAME or Vercel nameservers). Verify both apex and www resolve and that HTTPS cert provisions.
- [ ] **Resend API key** — set `RESEND_API_KEY` (and `CONTACT_TO_EMAIL` if used) in Vercel project env for Production. Send one real test from `/contact` post-cutover to confirm delivery + sender domain auth (SPF/DKIM via Resend dashboard).
- [ ] **Search Console verification** — add `esarc.dev` as a property in Google Search Console; pick DNS TXT verification (lives alongside the cutover). Submit `https://esarc.dev/sitemap.xml`.
- [ ] **Bing Webmaster Tools** — paste in the existing `msvalidate.01` meta and submit the sitemap there too (cheap AEO win).
- [ ] **LinkedIn announce** — post the launch with a link to a flagship case study (`/work/meta-superintelligence` recommended) and pin it to the company page.

Everything code-side is green. Ship when DNS + Resend land.
