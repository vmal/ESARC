# Redesign inspiration

Reviewed on 2026-10-12. These notes are about ideas only. Nothing here copies
another studio's copy, assets, logos or brand marks.

Tribe AI is the primary reference for what ESARC should become: an outcome-led
applied-AI engineering partner that can grow past one person. Rare Days is the
reference for visual craft. The rest fill in specific gaps.

## Tribe AI (tribe.ai), primary reference

What they do: an applied-AI firm that embeds engineers inside companies and
stays until the work is in production.

Positioning
- The whole site argues one point: deployment is the hard part, not access to
  models. Every section leads back to "in production".
- The hero is a single outcome-led line, a one-sentence subhead about how they
  work, and one CTA. No feature lists above the fold.
- A short problem statement right after the hero names the gap between having
  AI tools and getting results.

How it shows credibility
- Case studies carry most of the weight. Each card leads with the client and a
  before/after number (days down to minutes, hours removed).
- The case study detail page has a metadata panel: client, engagement status
  (for example "Production"), model, cloud services and application type, then
  one big headline metric, then a narrative (client, challenge, why us, build,
  how it works, results, what working together was like). Pull quotes come
  from a named client executive.
- Security and compliance get their own band (certifications, "your data stays
  in your environment").
- Named leadership and platform partnerships appear in the insights feed
  rather than in a logo wall.

Services and engagements
- Services are framed as a three-step method, not a product catalogue. Each
  step is one short paragraph about the outcome, not the deliverables.
- There is no public pricing. The engagement is "embedded, end to end, until
  production".

CTAs and structure
- One primary CTA, phrased as an invitation to talk, repeated in the header,
  the hero and the closing band. A secondary "join us" CTA signals a firm that
  is hiring and growing.
- The order runs hero, problem, method, partnerships, insights, press, closing
  CTA, security, footer.

Worth borrowing for ESARC
1. Outcome-led framing throughout: "shipped to production" beats "AI
   solutions". Every section should answer "what does this get me?"
2. The case study shape: a headline metric, a metadata panel (engagement
   status, stack, role) and the challenge / build / how / results narrative.
   This maps directly onto the data-driven case study schema.
3. One primary CTA used consistently, plus a short note on how client code and
   data are handled. That answers a real buyer worry without inventing
   certifications ESARC doesn't hold.
4. A visible insights strip on the homepage, so the existing /insights
   articles do credibility work.

Where ESARC should differ
- Tribe sells a team of embedded engineers to enterprises. ESARC sells one
  principal architect running an agent crew, to founders and small teams going
  from 0 to 1. The method section has to show that model, not a generic
  three-step method.
- No compliance badges, client logos or quotes unless they're real. Gaps are
  marked TODO.

## Rare Days (raredays.com), visual craft reference

1. Type as the main visual. A huge, characterful wordmark and headlines carry
   the page instead of stock imagery.
2. Work shown as an index of ruled rows with big titles and capability tags,
   which scans faster than a grid of cards.
3. Playful micro-copy in small places (a yes/no closing question, footer
   asides), with confident and plain main copy.

## Metalab (metalab.com)

1. Minimal hero copy. A short headline with almost nothing else above the fold.
2. Small corner metadata (founded, location, focus) that reads like a spec
   sheet rather than marketing.

## basement.studio

1. A blunt, confident tagline and a compact nav.
2. A live status indicator in the chrome, which makes the studio feel present.

## Evil Martians (evilmartians.com)

1. Services named by the concrete job, such as "LLM benchmarking" or "CI
   speedup", instead of abstract categories.
2. Proof through hard numbers and open source.
3. A named person in the CTA ("talk to <name>"), which suits a principal-led
   studio.

## thoughtbot (thoughtbot.com)

1. "Senior team" framing and a featured case study with the metric up front.
2. A productized AI sprint with a fixed shape, close to ESARC's 0-to-1 sprint.

## Fractional AI and similar AI consultancies

Mostly a list of things to avoid: dark gradient heroes, glowing orbs, walls of
testimonials, and "AI solutions for the enterprise" copy that could belong to
anyone.

## Design direction for ESARC

**Concept: the architect's drawing set.** Agents draft, the architect checks
and redlines, the client ships. The page borrows from engineering drawings:
graph-paper grid, a title block, revision marks and redline annotations. It
should still read as a modern product studio, not a nostalgic blueprint theme.

**Structure, following Tribe.** Outcome-led hero with one primary CTA, then
proof (where Vaibhav has shipped), a short point of view, the architect +
agents model as a diagram, what we build and for which industries, case studies
led by metrics, engagements, the ROI calculator (kept at `#roi`), a numbered
process including how code and data are handled, the principal, recent
insights, and a closing CTA.

**Craft, following Rare Days.** Typography does the work. Case studies are a
ruled index, not cards. Micro-copy can be playful in small places only.

**Palette**
- Drafting film `#F2F3EF`: the page background. Cool, not cream.
- Graphite ink `#1A1D29`: text and dark surfaces.
- Ultramarine `#2C39FF`: the existing ESARC accent, kept for continuity with
  the OG images.
- Blueprint tint `#DCE0FF`: grid lines and quiet fills.
- Redline `#E5484D`: used only for review marks in the model diagram and the
  hero title block. Never for buttons or body text.

**Type.** One family, Mona Sans, which is already self-hosted. Its width axis
is the personality: wide (125) for display, normal for body, condensed (75)
for annotations and labels, in place of the usual monospace labels. The hero
headline loads once from condensed to wide. That is the only orchestrated
motion, and reduced motion turns it off.

**Avoid:** all-caps eyebrows over every heading, mono labels, arrows on every
link, identical rounded cards, gradient washes, invented logos or quotes.
