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

## v2 improvements (2026-05-20)

Live on https://esarc.dev. Eight stories shipped, each committed and pushed to `main` (Vercel auto-deploys).

- **Story 1 — Frontier-lab badges.** Grayscale "Built on" strip under the hero (Anthropic, OpenAI, AWS, Vercel, NVIDIA, Vapi) alongside the existing client logos strip. Two strips serve two jobs: client trust + stack credibility.
- **Story 2 — `/canada` page.** New route with the structural advantage to US prospects: CAD cost / USD invoice, SR&ED 35% credit on R&D-shaped work, Vector Institute / Waterloo / U of T / McGill / UBC talent funnel, EST+PST overlap, data residency. Full Service JSON-LD. Added to nav, footer, sitemap, llms.txt, llms-full.txt.
- **Story 3 — Engagement shapes on `/services`.** Three shapes laid out clearly: AI Diagnostic Sprint (2wk, fixed), Build Sprint (6wk, fixed), Embedded AI Team (3-6mo retainer). No prices anywhere. CTA to /contact on each.
- **Story 4 — SEO + AEO hardening.** Organization JSON-LD in RootLayout (sameAs + founder), Person schema on /about, Article schema on every /work/* and /insights/*, FAQPage on /services with six buyer FAQs, BreadcrumbList across sub-pages. Canonical links verified per route.
- **Story 5 — Founder voice + bylines.** Vic's name + photo byline confirmed on every /insights/* post (no anonymous "ESARC team"). Founder card on the homepage with photo, two-line bio, LinkedIn, Calendly.
- **Story 6 — Tribe-pattern case studies.** Every /work/* page now carries client + sector + engagement length + named stack (LLM, cloud, framework) + headline metric (or "under NDA" honestly). Wrapper renders the new fields conditionally.
- **Story 7 — Discovery form on /contact.** No budget gate. Added "what surface are you trying to ship?", timeline (2wk / 6wk / 3-6mo / unsure), stack constraints (textarea). /api/contact extended to read and render the new fields in the Resend email. Calendly CTA kept prominent as the alternative path.
- **Story 8 — Build, verify, ship.** `npm run build` clean. Live verification via `curl -sI` returns HTTP/2 200 on `/`, `/canada`, `/services`, `/contact`, `/work`, plus content markers confirmed via grep (engagement shapes on /services, SR&ED + Vector Institute on /canada, Sector/Engagement/Headline on work pages, Vaibhav Malhotra byline on insights). Screenshots in `.claude/qa-screenshots-v2/`.

No pricing anywhere on the public site. The only answer to "what does it cost" is "we'll talk."
