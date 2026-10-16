---
# Imported from esarc-pipeline/case-studies/meal-planning-agent-memory.md on 2026-10-12.
# Draft: the owner still has to confirm the metrics before publishing.
title: Agent runtime and long-term memory for Springhouse's AI meal planner
slug: springhouse
client: Springhouse
clientIsPublic: true
industry: Consumer AI / Food tech
year: 2026
role: Lead AI engineer (led a team of 2)
stack:
  - Python
  - AWS
  - PostgreSQL + pgvector
  - LLM tool calling
services:
  - AI agents
  - RAG
  - LLM ops and evals
  - Architecture
metrics:
  - label: Memory tiers on pgvector, each with its own flag and spend ceiling
    value: "3"
  - label: Tools loaded per turn
    value: Only the ones it needs
summary: We rebuilt the agent runtime behind Springhouse's LLM meal planner so turns stay fast, and designed the three-tier memory system that lets the agent remember a household across conversations.
links:
  - label: springhouse.co
    href: https://springhouse.co/
draft: true
---

## Challenge

Springhouse is a meal planner you talk to. Users tell an AI agent about their dietary constraints, preferences, pantry and schedule. The agent plans meals around all of that, sources ingredients, adapts recipes and keeps track of nutrition goals over time.

Two parts of that job are hard. Long conversations get slow, because the history keeps growing and loading every tool on every turn adds weight. And the agent has to remember things between sessions. If someone mentions a dietary restriction once, the agent should still know it next month.

## What we built

We work on Springhouse's backend and agent runtime, and two pieces stand out.

The first is a faster turn. We reshaped the conversation history pipeline so old history gets trimmed and tool results are compressed into a structured form before they go back to the model. We also added keyword-driven tool groups, so each turn loads only the tools it actually needs instead of the whole catalogue.

The second is Springhouse's persistent memory system, which we designed.

## How we built it

Memory has three tiers on PostgreSQL and pgvector: the raw conversation log, structured user memories, and semantic recall. The agent has an in-band save tool, so it can store a memory in the middle of a conversation. Constraints like dietary restrictions go through a confirmation flow with the user before they stick.

Each tier has its own feature flag and spend ceiling, so tiers can be switched on one at a time and costs stay bounded. We also mapped privacy and consent across the whole memory system.

The stack is Python on AWS. Our lead runs a team of two.

## Results

Springhouse's agent now trims its own history, compresses tool results and loads only the tools each turn needs. We also designed its long-term memory: three tiers on pgvector, an in-band save tool, a confirmation step for dietary constraints, and per-tier flags and spend ceilings, with privacy and consent mapped across all of it.
