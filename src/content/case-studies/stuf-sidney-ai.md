---
# Imported from esarc-pipeline/case-studies/stuf-sidney-ai.md on 2026-10-12.
# Draft: the owner still has to confirm the metrics before publishing.
title: "Sidney: a voice AI sales agent for Stuf Storage"
slug: stuf-sidney-ai
client: Stuf Storage
clientIsPublic: true
industry: Self-storage / PropTech
year: 2025
role: Project lead and senior engineer (led a team of 3)
stack:
  - Node.js
  - TypeScript
  - Python
  - NestJS
  - Prisma
  - PostgreSQL
  - Express.js
  - GraphQL
  - AWS
  - AWS Lambda
  - OpenAI (GPT, Realtime API)
  - ElevenLabs text-to-speech
services:
  - AI agents
  - RAG
  - Architecture
  - 0→1 build
metrics:
  - label: Better conversion of potential leads to customers
    value: 90%
  - label: Lower sales team cost
    value: 80%
  - label: Qualified leads at ISS Vegas
    value: 150+
  - label: Sales calls analysed
    value: 3,000+
  - label: Demo success
    value: +25%
  - label: Fallback prompts
    value: -60%
summary: We built Sidney, a voice agent that ran Stuf Storage's sales calls and reservations, from first spec to launch. It improved lead-to-customer conversion by 90% and cut sales team costs by 80%.
links:
  - label: stufstorage.com
    href: https://www.stufstorage.com/
draft: true
---

## Challenge

Stuf Storage runs self-storage facilities. People handled its sales calls and reservations, and hiring enough human agents to cover them was expensive.

Stuf wanted an agent that could take those calls and bookings on its own. It had to be good enough that callers actually became customers, which is a harder bar than sounding polite on the phone.

## What we built

Sidney was a voice sales agent for self-storage. It ran sales calls and took reservations with no person on the line, and it answered questions from Stuf's own knowledge base.

We were on it from the first spec through launch. Our lead wrote the product requirements, worked directly with Stuf's founding and product teams, and took a team of three engineers through the architecture and the build.

## How we built it

Conversations ran on OpenAI's Realtime API, with ElevenLabs text-to-speech for the voice. Behind the agent sat a knowledge base, so answers came from Stuf's information and not the model's guesses.

Most of the hard work was in the LLM layer: retrieval over that knowledge base, and a lot of prompt engineering to keep the agent on track during a live call. The call flow was an async-graph state machine on NestJS, with Prisma and Postgres underneath. Around it we built services in Node.js, TypeScript and Python, using Express.js, GraphQL, AWS and Lambda.

We also analysed more than 3,000 sales calls with Sidney GPT.

## Results

- 90% better conversion of potential leads into customers.
- 80% lower sales team costs, because Sidney took calls that used to need human agents.
- 150+ qualified leads at ISS Vegas.
- Demo success up 25%.
- 60% fewer fallback prompts.
- 3,000+ sales calls analysed.

Sidney handled the calls, so Stuf's staff could spend their time on the work that needs a person.
