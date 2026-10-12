---
# Imported from esarc-pipeline/case-studies/voice-agents-service-businesses.md on 2026-10-12.
# Draft: the owner still has to confirm the metrics before publishing.
title: Voice agents and an embeddable chat widget for MyMethod
slug: mymethod
client: MyMethod
clientIsPublic: true
industry: Voice AI / Hospitality and local services
year: 2026
role: Lead AI engineer (led a team of 2)
stack:
  - Node.js
  - React
  - Voice AI (LLM + speech)
services:
  - AI agents
  - LLM ops and evals
  - Full-stack
metrics:
  - label: Restaurant voice agents tuned for accuracy and latency
    value: Live deployments
  - label: Chat widget, schema to embeddable React
    value: Built end to end
summary: We tuned MyMethod's live restaurant voice agents for accuracy and speed, and built the multi-tenant chat widget that lets brands put the same agents on their own websites.
links:
  - label: mymethod.ai
    href: https://mymethod.ai/
draft: true
---

## Challenge

MyMethod builds voice agents for service businesses. A business plugs MyMethod into its phone lines and website, and the agents take reservations, run customer intake and answer inbound questions. Live deployments include restaurant groups booking tables by voice and pet-services brands answering questions over voice and chat.

The restaurant agents needed work. They sometimes hallucinated, and in demos they sometimes broke character, which is about the worst thing that can happen in a sales demo. They also needed to answer faster. Separately, MyMethod wanted brands to be able to drop conversational AI straight onto their own sites.

## What we built

On the voice side, we reworked the restaurant agents' prompts to cut hallucinations and character breaks, and we tightened how they handle reservations. Then we tuned for speed by adjusting turn detection and picking models with latency in mind. Those settings live in shared presets, so a speed fix made once reaches every agent.

On the platform side, we built the web chat widget end to end: the database schema, a session-based chat API, and an embeddable React widget that each client can customise.

## How we built it

The platform backend is Node.js and serves many tenants. The widget is React, built to embed on other people's sites, with configuration per client.

Our lead runs a team of two across the voice prompts, the backend and the widget.

## Results

The restaurant agents we tuned are on MyMethod's live restaurant deployments. We reworked them to cut hallucinations and character breaks, handle reservations more tightly and answer with less latency. The speed settings sit in shared presets, so every agent gets them. On the web side, MyMethod has a multi-tenant chat widget, from schema to session API to embeddable React, that each brand can customise and put on its own site.
