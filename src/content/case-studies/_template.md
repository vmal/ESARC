---
# Copy this file to <slug>.md. Files starting with "_" are ignored.
# Schema: src/lib/case-studies/schema.ts
title: What the work was, in plain words
slug: my-case-study            # must match the file name
client: Client display name    # only a name the client agreed to
industry: Industry
year: 2026
role: What ESARC did
status: Production             # Production | Pilot | Prototype | Internal (optional)
stack: [Next.js, Postgres]
services: [0-to-1 build]
metrics:
  - label: What was measured
    value: The number
summary: One or two sentences for cards and the meta description.
links:                         # optional
  - label: Live product
    href: https://example.com
images:                        # optional, files go in /public
  - src: /case-studies/my-case-study/hero.png
    alt: Describe the image
draft: true                    # remove once the client has approved it
---

## Challenge

What was the situation before, and why did it matter?

## What we built

The product or system, described for a founder, not an engineer.

## How

Architecture, the agent/architect split, evals, the decisions that mattered.

## Results

What changed, with numbers where you have them.
