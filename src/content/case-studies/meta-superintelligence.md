---
# Imported from esarc-pipeline/case-studies/big-tech-ai-lab-agentic-automations.md on 2026-10-12.
# Draft: the owner still has to confirm the metrics before publishing.
title: Agentic automations for Meta Muse Spark, and a generative video ad studio
slug: meta-superintelligence
client: Meta (Meta Superintelligence Labs)
clientIsPublic: true
industry: Consumer technology / AI research
year: 2025
role: Applied AI software engineer; lead AI engineer on the ad studio
stack:
  - Python
  - TypeScript
  - Node.js
  - LLM tool calling
  - Veo / Sora-class video models
services:
  - AI agents
  - 0→1 build
metrics:
  - label: AI-generated ad concepts shipped on
    value: Instagram and Facebook
  - label: Generative video ad studio
    value: Inception to launch
summary: We build automations that Meta Muse Spark runs inside Meta's products, including AI-generated ad concepts that shipped on Instagram and Facebook, and we led the 0 to 1 build of a generative video ad studio.
draft: true
---

## Challenge

Meta's AI Pathfinding team in Meta Superintelligence Labs wanted Muse Spark to run automations inside Meta's own products. Every automation had to fit how the owning product team already worked. And the output had to be good enough to ship to real Instagram and Facebook users, which is a much higher bar than a demo.

## What we built

We prototype and build automations that Muse Spark can run inside Meta products. One of them generates AI ad concepts. We prototyped it and shipped it on Instagram and Facebook.

We also led a 0 to 1 build of an AI-native ad platform. It makes short-form video ads personalised to each viewer, and every impression renders its own video through Veo / Sora-class models, so there is no pre-produced creative at all. On top sits a conversational editor for marketers. They ask for edits in plain language, like "make the hat red" or "tighten the cut at 0:03". Edits stack across frames and takes without overwriting earlier changes, so nobody scrubs a timeline or starts a prompt over.

## How we built it

The core is agentic workflows built on tool calling, written in Python and TypeScript, with Node.js services and API design for the ad studio.

The rest is iteration. We tune prompts and model behaviour until the output is ready to ship, and we work directly with the product team that owns each surface so the automation fits how their product already works.

## Results

We shipped AI-generated ad concepts on Instagram and Facebook. We took the generative video ad studio from inception to launch, including a conversational editor that lets marketers change an ad by describing the edit.
