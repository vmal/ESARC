# ESARC ROI + AEO Implementation Checklist

Source research: Rex Automaton homepage, services, case studies, blog, booking flow, sitemap/schema, and ROI calculator reviewed on desktop and mobile.

## 1. ESARC ROI calculator

- [x] Create a dedicated `/roi` page.
- [x] Model ESARC-specific workflow types: voice agent, RAG/internal search, support triage, internal ops agent, eval harness, document workflow, and legacy AI modernization.
- [x] Accept inputs for hours per week, people affected, loaded hourly cost, error/rework rate, automation coverage, and risk/compliance sensitivity.
- [x] Output annual hours reclaimed, opportunity cost, rework/error savings, implementation complexity, confidence level, and recommended engagement shape.
- [x] Avoid public ESARC pricing, fee ranges, hourly rates, or quote-like language.

## 2. Shareable calculator URLs

- [x] Encode calculator state in URL query parameters.
- [x] Read query parameters on load.
- [x] Update the URL as inputs change without a full page reload.
- [x] Add a copy-link action with a visible copied state.
- [x] Keep links readable enough for campaign/social use.

## 3. Transparent business-case math

- [x] Show the formulas behind each output.
- [x] Separate direct time savings, rework reduction, opportunity cost, and risk adjustment.
- [x] Explain assumptions in plain language without sounding like pricing.
- [x] Include a calculator FAQ that answers accuracy, sharing, pricing-free estimates, and when to talk to ESARC.

## 4. Metric-led case studies

- [x] Make homepage work cards more metric-forward.
- [x] Improve `/work` cards so each study surfaces client, sector, service, headline metric, and the operational outcome.
- [x] Keep NDA-sensitive work honest instead of inventing metrics.
- [x] Add links from ROI recommendations to related case studies.

## 5. AEO/SEO content cluster

- [x] Add production-AI ROI articles under `/insights`.
- [x] Cover AI ROI, RAG/internal-search ROI, voice-agent ROI, eval-harness ROI, and consultancy-vs-hiring intent.
- [x] Use answer-style headings and concise summary blocks that AI answer engines can extract.
- [x] Link the content cluster back to `/roi`, `/services`, and relevant case studies.

## 6. Richer structured data

- [x] Add `ProfessionalService` schema for ESARC.
- [x] Add `WebApplication` schema for the ROI calculator.
- [x] Add `FAQPage` schema for the ROI page.
- [x] Add `BreadcrumbList` schema for `/roi`.
- [x] Ensure article/case-study schema still validates after new content.
- [x] Add `/roi` and new insight articles to the sitemap.

## Ralph-loop verification

- [x] Run build/type verification.
- [x] Run lint or document known lint limitations.
- [x] Run local server.
- [x] Verify `/`, `/roi`, `/work`, `/services`, `/insights`, and new articles in the browser.
- [x] Verify desktop layout.
- [x] Verify mobile layout.
- [x] Verify ROI interactions and query-string round trip.
- [x] Verify copied links restore the same calculator state.
- [x] Verify no ESARC pricing is exposed.
- [x] Verify page titles, descriptions, canonical URLs, JSON-LD, and sitemap output.
- [ ] Verify live deployment after pushing.
