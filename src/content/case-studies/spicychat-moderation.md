---
# Imported from esarc-pipeline/case-studies/ai-character-platform-moderation.md on 2026-10-12.
# Draft: the owner still has to confirm the metrics before publishing.
title: Memory, moderation and faster releases for Spicychat
slug: spicychat-moderation
client: Spicychat (Nextday)
clientIsPublic: true
industry: Consumer AI / Entertainment
year: 2024
role: Senior backend engineer (led a team of 3)
stack:
  - Node.js
  - TypeScript
  - JavaScript
  - AWS
  - DynamoDB
  - Microservices
services:
  - Architecture
  - LLM ops and evals
metrics:
  - label: More efficient bot moderation cycle
    value: 80%
  - label: Faster release cycle for features and deployments
    value: 30%
  - label: Off backend API response times
    value: ~5ms
summary: We led the backend team at Spicychat, where users create and publish their own AI chatbots. We improved semantic memory, built an AI-plus-human moderation workflow that made moderation 80% more efficient, and sped up releases by 30%.
links:
  - label: spicychat.ai
    href: https://spicychat.ai/
draft: true
---

## Challenge

On Spicychat, users create AI chatbots with their own personalities and publish them for other people to talk to. Nextday, the company behind it, needed three things fixed at once. Conversations had to get better. The community had to stay safe on a platform where anyone can publish a bot. And the release cycle had to speed up.

## What we built

We led a team of three on the backend.

For conversation quality, we improved the bots' semantic memory so dialogue got richer. For safety, we built a bot moderation workflow that pairs AI moderation with human review. For the team, we reworked the release cycle for features and deployments, which also made the developers more productive.

## How we built it

The backend is Node.js and TypeScript microservices on AWS, with DynamoDB for storage. We also spent time on API design and endpoint latency, which sped up bot deployments and updates.

## Results

- Bot moderation became 80% more efficient.
- Features and deployments ship 30% faster.
- Backend API response times dropped by about 5ms.
