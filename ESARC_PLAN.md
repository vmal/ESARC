# ESARC.dev — Master Build Tracker

**Source of truth for the ESARC.dev rebuild.** Every meaningful decision and every task lives here. Tick boxes as we go. If a decision changes, update this file in the same commit as the change.

> **Repo:** `/Users/vaibhavmalhotra/Projects/Agency/ESARC` (`main` is template baseline; work happens on `esarc/v1` worktree).
>
> **Research artifacts (already collected):**
> - `research/resume-source.md` — V8 resume, verbatim bullets
> - `research/linkedin-source.md` — LinkedIn scrape, 7 roles + projects + education
> - `research/seo-aeo-playbook.md` — 2026 SEO/AEO playbook + 55-item checklist
> - `research/repo-and-deploy.md` — (pending; inventory done inline below)

---

## 1. Positioning & goals

**One-liner:** ESARC is an AI engineering consultancy for startups through enterprise. We pair principal-level engineers with our own in-house AI engineering agents to ship 10x faster at a fraction of what big consultancies charge.

**The moat (lead with this on the homepage):** Principal engineers + custom in-house AI agents = 10x delivery at a fraction of Big-4 / Accenture / Deloitte cost. We are not a body shop. Every engagement is led by a senior, augmented by our own agent fleet (planning, codegen, review, eval, ops). The agents are the leverage; the principals are the judgment.

Three lines we should be able to say on the homepage and mean every word:
1. *Senior-only.* No juniors getting trained on your dime. The person on your Slack is the person writing the code.
2. *AI-native delivery.* Our in-house agents do the work that consultancy associates used to bill for. You pay for outcomes, not headcount.
3. *Production-grade.* Voice AI on live calls, multi-agent systems serving real users, infra that handles enterprise traffic. Receipts in `/work`.

**Voice:** Confident, technical, specific. Use "we" — ESARC is a studio, not a freelance gig. Drop agency-fluff vocabulary. Receipts > adjectives.

**Primary goal:** generate qualified inbound from technical founders, VPs of Engineering, and enterprise AI program owners who are evaluating consultancies and want serious senior bandwidth without a Big-4 contract.

**Secondary goals:** partner-network signal (Meta, MyMethod, McGraw Hill, etc. as proof), and recruiting flywheel for principal engineers who want to work with agent leverage.

**Buyer personas (sharpened):**
1. **Startup CTO / technical founder (seed → Series B).** Has an AI feature on the roadmap, no senior AI engineer in-house, doesn't want to wait 4 months to hire one. Wants a principal who can ship in weeks. Searches: "fractional AI engineer," "LLM consultant for startup," "voice AI build partner," "AI MVP development."
2. **Enterprise AI program owner / Head of AI (Series C → public).** Has budget, has a roadmap, is comparing ESARC against Accenture / Deloitte / Slalom / boutique AI shops. Wants to know we can ship safely at their scale. Searches: "AI engineering consultancy," "generative AI implementation partner," "enterprise LLM consultant," "AI agents consultancy."

**Competitive frame (for the homepage and `/services` copy):**
- vs. **Big-4 / Accenture / Deloitte**: same senior caliber, no army of associates, 10x faster because of agent leverage, a fraction of the cost.
- vs. **Boutique AI shops**: we ship production, not slideware. Real case studies on the site, named clients, named outcomes.
- vs. **Freelance marketplaces**: principals only, agent-augmented delivery, studio-level accountability and process.

---

## 1b. Services & engagement model

Four engagement shapes, priced as bands not quotes (AEO + buyer trust per SEO research). Final numbers to lock with Vic before launch.

| Engagement | Who it's for | What you get | Typical scope | Price band (default) |
|---|---|---|---|---|
| **AI Sprint** | Founders / VPs Eng who need a thing shipped in weeks, not quarters | Principal engineer + agent fleet, end-to-end build, prod-deployed | LLM feature, voice AI POC, agent workflow, eval harness | $25–40K, 4–6 weeks |
| **Fractional Principal AI Engineer** | Companies with a roadmap but no senior AI hire | Dedicated principal, 20–40 hrs/wk, embedded in your repo + Slack | Multi-month builds, infra, eval pipelines, handoff to in-house team | $15–25K/mo, 3-mo minimum |
| **AI Audit & Roadmap** | Enterprises evaluating their AI stack, or pre-funding diligence | 2-week deep dive, written report, prioritized roadmap, exec readout | Architecture review, model/tool choice, cost + latency analysis, risk register | $5–15K, 2 weeks |
| **Enterprise AI Program** | Series C+ / public co's running a multi-quarter AI initiative | Principal lead + agent fleet + on-demand specialists, with SLAs | Production agent systems, voice AI at scale, multi-team enablement | $150K+, 6+ months, custom |

**Why we can charge less than Big-4 and still ship faster** (this is the explanation copy for `/services`):
- Our in-house agents handle the work that a Big-4 staffs 4 associates on: scaffolding, codegen, test writing, doc generation, eval harness, observability wiring, code review first-pass.
- A principal directs the fleet. The fleet does not direct itself. You are paying for senior judgment, not seat-time.
- Overhead is near zero. No partner-track pyramid. No offices in 14 cities. No 40-page SOW templates.
- We don't bill for slideware. The deliverable is running code in your prod environment, or money back.

**Mandatory FAQ items on `/services`** (each gets `FAQPage` JSON-LD):
- "How are you faster than a Big-4 consultancy?" → moat copy above.
- "Who is actually working on my project?" → principal + named agents. Not associates.
- "Do you sign NDAs / DPAs / SOC 2 paperwork?" → yes (or as applicable).
- "What stacks do you work in?" → Python/TS, Pydantic AI, LangGraph, OpenAI/Anthropic/Bedrock, Vapi/LiveKit, AWS/GCP/Vercel, Postgres/Supabase.
- "How does the agent-augmented delivery work — is my code training data?" → no. Private context. Spell this out.
- "Can you augment our existing team?" → yes (fractional model).

---

## 2. Information architecture

| Route | Source page | What it does |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero, positioning, marquee of client logos, 3 featured case studies, services tease, contact CTA |
| `/work` | `src/app/work/page.tsx` | Full case study index (filterable by tech if scope allows) |
| `/work/<slug>` | `src/app/work/<slug>/page.mdx` | Long-form case study (problem → approach → outcome) |
| `/services` *(NEW)* | new `src/app/services/page.tsx` | Engagement models + scope examples + pricing ranges |
| `/about` | `src/app/about/page.tsx` | Founder bio, principles, named clients, photo, contact CTA |
| `/process` | `src/app/process/page.tsx` | How an engagement runs (discovery → build → ship → handoff) |
| `/insights` *(rename of `/blog`)* | `src/app/insights/page.tsx` + mdx posts | Technical writeups; not required at launch |
| `/contact` | `src/app/contact/page.tsx` | Form + email + booking link |

Decisions to lock before build:
- [x] Rename `/blog` → `/insights`? *(default: yes, fits consulting voice; redirect old slugs)*
- [x] Ship `/services` page at v1? *(default: yes)*
- [ ] Launch with how many insights posts? *(default: 0 at launch, 3 within 30 days)*

---

## 3. Case studies — content slate

Each case study lives at `/work/<slug>` as MDX. **All copy must read human** — short paragraphs, specific verbs, concrete numbers, occasional sentence fragments. Run the `humanizer` skill on every draft before commit.

Mandatory structure per case study (also good for SEO — problem/approach/outcome maps to `CaseStudy` schema fields):

```
hero image
client + role + dates + tech stack badges
TL;DR (3 lines)
The brief (what they asked for, in plain language)
What we built (technical narrative, with diagrams or screenshots if shareable)
Outcomes (named, quantified)
Lessons / what we'd do again
Pull-quote (testimonial — when we have one)
```

### Confirmed case studies (Vic-requested)

| # | Slug | Client | Status | Source material | Notes |
|---|---|---|---|---|---|
| 1 | `meta-superintelligence` | Meta — Superintelligence Labs | [ ] | Resume + LinkedIn (Lead Applied AI Engineer, Oct 2025–present) | NDA scope; describe domain (conversational AI, tool-calling, MCP, agent evals) without revealing internals. Confirm with Vic what's publishable. |
| 2 | `springhouse` | Springhouse — Pydantic AI food-planning multi-agent | [ ] | Resume; also active engagement; can reference dev branch (don't link prod) | Pydantic AI + FastAPI + Postgres. Multi-agent orchestration. |
| 3 | `mymethod` | MyMethod — Vapi/LiveKit voice AI | [ ] | Resume; named in EPT ticket history | Voice AI infra, eval pipelines, latency tuning. Sophia for Schulson Collective is the shippable demo. |
| 4 | `mcgraw-hill` | McGraw Hill | [ ] | Resume (Scrubs/ESARC era) | Need Vic to confirm scope/details — what was the engagement? |
| 5 | `clearprop` | ClearProp (own product) | [ ] | Local repo `/Users/vaibhavmalhotra/Projects/clearprop` | Pilot logbook app. Framed as "what we build when we build for ourselves." |
| 6 | `scrubs-co-pilot` | Scrubs Co-Pilot | [ ] | Resume + LinkedIn (Co-founder, 2 yrs) | MVP → 100+ MAU in 3 months. RAG + Whisper + structured doctor notes. |
| 7 | `stuf-sidney-ai` | Stuf Storage — Sidney Voice AI | [ ] | Resume (Lead AI SE, Jan 2025–Oct 2025) | 150+ leads at ISS Vegas, 25% demo success, 60% fewer fallbacks, Sidney GPT (NLP on 3K calls). |
| 8 | `amazon-shipping-ai` | Amazon — Shipping pricing pipeline | [ ] | Resume (SDE II, 4y 2mo) | 1M req/day, $100K+ saved, 50% latency cut, Native AWS migration. Frame as foundation work. |

### Optional / fill-in case studies (use if we need volume)

- [ ] NextDay AI (consulting via ESARC)
- [ ] Just a Drink (consulting via ESARC)
- [ ] TOCCA — Senior Backend (LinkedIn, 1 yr)

**Decision needed from Vic:**
- [ ] Confirm Meta case study is publishable as a named client (NDA check)
- [ ] McGraw Hill scope details — what to write?
- [ ] Any clients we should NOT name? (Schulson Collective?)
- [ ] Order of "featured 3" on home page — default: Meta, Stuf (Sidney AI), Scrubs Co-Pilot

---

## 4. Brand & design direction

**Starting point:** Tailwind UI Studio template. Dark default (`bg-neutral-950`), serif/sans-mix, Mona Sans display font, big editorial type, generous whitespace, grid patterns.

**Tweaks to make it ESARC, not stock Studio:**
- [ ] Replace `Logo.tsx` SVG with ESARC mark (need to design or commission)
- [ ] Pick accent color — default suggestion: a single warm accent (e.g. `#E8FF6B` lime, or signal-orange) to break the all-neutral palette
- [ ] Replace all stock images (laptop.jpg, meeting.jpg, whiteboard.jpg, team photos) with either:
  - real photos from Vic's projects (Sidney demo at ISS Vegas, screenshots, headshot), OR
  - generated abstract art via the `frontend-design` skill, OR
  - stripped-back svg/illustration set
- [ ] Replace all stock client logos in `src/images/clients/*` with actual ESARC client logos (where licensed) or text-mark fallbacks
- [ ] Replace stock case study heros (family-fund, phobia, unseal jpgs) with screens/diagrams from real projects
- [ ] Founder photo for `/about` and footer

**Optional design upgrade:** Run `frontend-design` skill on the home page hero to make it distinctive (not generic Tailwind UI). Default: yes for hero only, leave content pages clean.

---

## 5. SEO / AEO build checklist

Mirrored from `research/seo-aeo-playbook.md`. Grouped by phase.

### Technical foundation
- [ ] Set up `next-sitemap` (or hand-rolled `app/sitemap.ts`); auto-include all case studies + insights
- [ ] `app/robots.ts` — allow all reputable bots, block known scrapers if any
- [ ] Canonical URLs via `metadata.alternates.canonical` on every page
- [ ] Default metadata in `layout.tsx`: title template, description, OG image, Twitter card
- [ ] Per-page `generateMetadata` for `/work/<slug>`, `/about`, `/services`, `/insights/<slug>` — pulling title/description/OG from page front-matter
- [ ] Custom OG image generation via `@vercel/og` — branded card per case study
- [ ] `Organization` JSON-LD in root layout (name: ESARC, founder: Person → Vaibhav, sameAs: [LinkedIn, GitHub, X])
- [ ] `Person` JSON-LD on `/about` (full E-E-A-T linking)
- [ ] `Service` JSON-LD on `/services` (serviceType, areaServed, provider)
- [ ] `CaseStudy` / `Article` JSON-LD on each `/work/<slug>` (datePublished, author, about)
- [ ] `BreadcrumbList` JSON-LD on nested pages
- [ ] `FAQPage` JSON-LD on `/services` (3–5 buyer-intent FAQs)
- [ ] Minimal `llms.txt` at root (hedge — research says low impact but cheap)
- [ ] `/sitemap.xml` reachable, submitted to Google Search Console
- [ ] Verify single H1 per page, semantic H2/H3 below
- [ ] All images have meaningful `alt`, explicit `width`/`height`, `priority` on LCP image only
- [ ] Open Graph image dimensions 1200×630, Twitter `summary_large_image`

### Performance
- [ ] LCP < 2.5s on 4G — measure with `next build && next start` and Lighthouse mobile
- [ ] INP < 200ms — avoid framer-motion on first paint elements
- [ ] CLS < 0.1 — explicit dimensions on every image, reserve space for fonts (Mona Sans is already self-hosted ✓)
- [ ] No render-blocking third-party scripts at launch (no analytics tag bloat; use Vercel Analytics + Plausible)
- [ ] Use Next 13.4 `next/image` everywhere (already wired in template ✓)

### Content quality (the actual ranking lever in 2026)
- [ ] Every case study has named author + datePublished + dateModified + real photos or diagrams
- [ ] Quantified outcomes in every case study (resume already has these — use them)
- [ ] No "vibrant," "leverage," "synergies," "in today's fast-paced" — `humanizer` skill on every draft
- [ ] Internal linking: each case study links to ≥2 others + `/services` + `/about`
- [ ] External outbound link from each case study to public proof (LinkedIn, GitHub, press, demo URL)
- [ ] Author byline on every page (Vaibhav Malhotra, Founder)

### Off-site (the 2026 game)
- [ ] Update Vic's LinkedIn About to mirror ESARC.dev positioning + featured link
- [ ] Update LinkedIn featured section to link `esarc.dev/work/<top-3>`
- [ ] Replace `vbvmalhotra.vercel.app` link on LinkedIn with `esarc.dev`
- [ ] Cross-post first 3 insights to LinkedIn as native articles (within 30 days post-launch)
- [ ] Set up GitHub README profile linking to ESARC.dev
- [ ] Consider 1 Reddit/HN/Indie-Hackers post per case study within 60 days

### Analytics & verification
- [ ] Vercel Analytics enabled
- [ ] Plausible or GA4 (privacy-friendly, Plausible preferred)
- [ ] Google Search Console verified, sitemap submitted
- [ ] Bing Webmaster verified (cheap, helps Copilot citations)
- [ ] Run Lighthouse mobile + desktop pre-launch; record baseline
- [ ] Run Ahrefs/Semrush free site audit; fix all critical

---

## 6. Repo + deploy plan

**ESARC repo state (inventoried):**
- Next.js 13.4.16 (Pages Router still no — it's App Router ✓), MDX wired, Mona Sans self-hosted, framer-motion for animations
- Root layout already says "ESARC" (template was pre-customized to that name; everything else is stock Studio content)
- 23 components in `src/components/` — reusable. No teardown needed.
- Stock images need full swap (clients/, team/, work hero jpgs, laptop/meeting/whiteboard)

**ClearProp Vercel pattern (to mirror):**
- Vercel team: `team_iGzbX59QUF3CcEjJR0F3oAG1` (Vic's personal team)
- `vercel.json` is minimal (only used for cron config — ESARC won't need crons at v1)
- No `.nvmrc`; relies on Vercel default Node (20.x)
- `.env.local` + `.env.example` pattern for env vars (ESARC v1 = no env vars)
- GH Actions: `claude-code-review.yml`, `claude.yml`, `test-unit.yml` (we can add `test-unit.yml` later; not blocking launch)

**Recommended deploy steps for ESARC.dev:**
1. [ ] `cd /Users/vaibhavmalhotra/Projects/Agency/ESARC && vercel link` (team: vmal's personal)
2. [ ] Project name: `esarc-dev`
3. [ ] Framework auto-detect → Next.js
4. [ ] Build cmd default (`next build`), output default (`.next`)
5. [ ] No env vars at v1
6. [ ] Add custom domain `esarc.dev` + `www.esarc.dev` (redirect www → apex)
7. [ ] Verify DNS — need Vic to confirm domain registrar (Namecheap? Google Domains? Porkbun?) and add A `76.76.21.21` + CNAME `cname.vercel-dns.com`
8. [ ] Enable Vercel Analytics
9. [ ] Set production branch to `main`; preview deploys on every PR

**Decision needed from Vic:**
- [ ] Is `esarc.dev` registered, and where?
- [ ] Same Vercel team as ClearProp, or new team for ESARC?

---

## 7. Build phases

Track each phase as a PR off `esarc/v1` worktree branch. **No PR is merged without Vic's explicit approval.**

### Phase 0 — Plan approval ⏳ (this doc)
- [x] Research collected (resume, LinkedIn, SEO, repo)
- [x] Master tracker written
- [ ] **Vic approves plan** ⬅ blocking gate

### Phase 1 — Repo prep
- [x] Create worktree `esarc/v1` under `Projects/Agency/ESARC/.claude/worktrees/`
- [x] Branch off `main`
- [x] Rename `/blog` → `/insights` (folder move + 308 redirect in `next.config.mjs`)
- [x] Scaffold `/services` (TODO stub) and `/contact` (form skeleton)
- [ ] Move stock content under `_template/` (or just delete; we have git history)
- [ ] Wire up `humanizer` skill in repo (note in CLAUDE.md if we add one)
- [ ] Update `package.json` name → `esarc-dev`
- [ ] Add `.nvmrc` (`20`)

### Phase 2 — Brand & shell
- [x] Replace Logo.tsx (ESARC wordmark + accent square mark)
- [x] Pick + apply accent color in `tailwind.config.ts` (`#2C39FF` electric cobalt)
- [x] Update default metadata in `layout.tsx` (+ `Organization` JSON-LD)
- [x] Footer rewrite (no fake offices; LinkedIn + GitHub + Calendly only)
- [x] Header/nav order = Work / Services / About / Process / Insights / Contact (Contact = CTA)
- [x] Homepage hero + 3 pillars + 4 engagement shapes rewritten (no stock laptop image, no fake clients/testimonials)
- [ ] Replace remaining stock images on case-study + about + process pages (Phase 3+)

### Phase 3 — Content pages (no case studies yet)
- [ ] Home (`/`) — hero, positioning, featured 3 (with placeholders), services tease, contact CTA
- [ ] About (`/about`) — founder bio, principles, named clients strip, photo
- [ ] Services (`/services`) — engagement models, scope examples, pricing ranges, FAQ
- [ ] Process (`/process`) — how an engagement runs (4–5 steps)
- [ ] Contact (`/contact`) — form + email + Cal.com link

### Phase 4 — Case studies (one PR each, or batched 2–3 per PR)
- [ ] `/work/meta-superintelligence` (subject to NDA review)
- [ ] `/work/springhouse`
- [ ] `/work/mymethod`
- [ ] `/work/scrubs-co-pilot`
- [ ] `/work/stuf-sidney-ai`
- [ ] `/work/amazon-shipping-ai`
- [ ] `/work/clearprop`
- [ ] `/work/mcgraw-hill` (scope TBD)
- [ ] `/work` index page rewritten to show real case studies
- [ ] Every case study run through `humanizer` skill
- [ ] Every case study reviewed manually by Vic ⬅ blocking gate per study

### Phase 5 — SEO / AEO pass
- [ ] Sitemap + robots
- [ ] All schema markup
- [ ] Per-page metadata + OG images
- [ ] Internal linking pass
- [ ] llms.txt
- [ ] Search Console + Bing Webmaster setup

### Phase 6 — QA & launch
- [ ] Lighthouse mobile ≥ 95 across the board
- [ ] CWV measured + within budget
- [ ] Manual click-through every link + form on staging (`openclaw browser`)
- [ ] Spell + grammar pass
- [ ] Vic final review ⬅ blocking gate
- [ ] DNS cutover for `esarc.dev`
- [ ] Submit sitemap
- [ ] Announce on LinkedIn

---

## 8. Decisions — LOCKED (2026-05-16)

1. ✅ **Meta publishable as named client.** Use Meta name + logo. Case study can describe domain (Superintelligence Labs, applied AI engineering) without revealing proprietary internals.
2. ⏸️ **Domain (`esarc.dev`) — deferred.** Build + deploy to Vercel default URL first (e.g. `esarc-dev.vercel.app`). Domain cutover handled later.
3. ⏸️ **Domain redirects — deferred** with #2.
4. ⏸️ **McGraw Hill scope — deferred.** Vic will provide details before that case study lands. Skip from launch slate if no input by Phase 4.
5. ✅ **Brand direction — use `frontend-design` skill.** Distinctive accent + hero treatment, not template defaults. Worker has discretion.
6. ✅ **Contact = form only.** Submits to `vbvmalhotra@gmail.com`. Email is NOT shown publicly anywhere on the site. Use Resend or formspree-style backend; for v1 a serverless API route (`/api/contact`) that posts via Resend is fine.
7. ✅ **Pricing = "Talk to us" + cost calculator.** Public page does NOT show fixed ranges. Instead: a "Why we cost less" block with a rough per-hour rate for *1 principal + 4–5 ESARC AI agents* vs. Big-4 blended day rate, showing total-cost-of-engagement delta. Make the comparison concrete and defensible.
8. ✅ **Insights — ship 3 seed posts within 30 days of launch.** Mandatory `humanizer` skill pass on every post. Topics TBD; first drafts can be derived from Stuf / Springhouse / Pydantic AI case-study material.
9. ✅ **Calendly:** `https://calendly.com/vbvmalhotra/vaibhav-interview` — use as the booking CTA on `/contact` and footer.
10. ✅ **Logo — stylish typographic wordmark for "ESARC."** Generated via `frontend-design` skill (custom SVG, not a font drop-in). Worker iterates until distinctive.
11. ✅ **Client logos — fetch and use real logos.** Including Meta. Source priority: official brand/press kit → simpleicons.org → Wikimedia Commons → LinkedIn company page. Store at `public/logos/<slug>.svg` (or .png). For startups without public press kits (Springhouse, MyMethod, Scrubs Co-Pilot, Stuf), use LinkedIn company page logo.
12. ✅ **Founder photo — extract from LinkedIn profile** (`https://www.linkedin.com/in/mvaibhav/`). Save to `public/vaibhav.jpg`. Use authenticated openclaw browser profile.

## 8b. Git workflow override (Vic, 2026-05-16)

**No PRs for ESARC.** Push directly to `main` at the end of each phase. Still work in a worktree on `esarc/v1`, still run `simplify` + skim diff before pushing, but no review ceremony. Vic owns the repo and reviews live by looking at the deployed site.

Sequence per phase:
1. Worker works in `.claude/worktrees/esarc-v1` on branch `esarc/v1`.
2. On phase completion: `simplify` pass, screenshot evidence, return to Tokki.
3. Tokki verifies visually via browser, then: `git checkout main && git merge --ff-only esarc/v1 && git push origin main` (fast-forward only — if not possible, rebase `esarc/v1` on `main` first).
4. Worker continues from the same worktree on the next phase.

---

## 9. Parked / non-blocking

- Testimonial sourcing — defer. Ask Stuf / Scrubs / NextDay AI for pull-quotes after v1 is live, then drop into existing case studies as a Phase 7.
- Vancouver photographer — defer. LinkedIn photo is fine for v1.
- LinkedIn About rewrite — defer. Site first, then mirror the positioning back to LinkedIn.

---

## 9. Ground rules (don't break these)

- All code lives in `/Users/vaibhavmalhotra/Projects/Agency/ESARC/` — never `/tmp/`.
- All implementation work happens in a git worktree under `.claude/worktrees/`.
- Never push to `main`. PRs only. Vic approves every PR.
- Never claim "done" / "fixed" / "working" without running `openclaw browser` against the dev server with screenshots as evidence.
- Every case study draft runs through the `humanizer` skill before commit.
- Every PR runs `simplify` + code review subagent + `codex review` before opening.
- This file is the source of truth. Update it in the same commit as any decision change.
