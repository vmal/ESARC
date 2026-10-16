---
# Imported from esarc-pipeline/case-studies/scrubs-co-pilot.md on 2026-10-12.
# Draft: the owner still has to confirm the metrics before publishing.
title: "Scrubs Co-Pilot: real-time AI documentation for clinicians"
slug: scrubs-co-pilot
client: Scrubs Co-Pilot
clientIsPublic: true
industry: Healthcare
year: 2024
role: Co-founder and backend lead (led a team of 3)
stack:
  - Node.js
  - Next.js
  - PostgreSQL + pgvector
  - Azure
  - OpenAI GPT
  - OpenAI Whisper
  - NLP
  - REST APIs
services:
  - 0→1 build
  - Architecture
  - RAG
metrics:
  - label: Monthly clinician users within 3 months
    value: 100+
  - label: Less time spent on documentation
    value: 60%
  - label: Better documentation accuracy
    value: 85%
  - label: AI transcription and dictation used by clinicians
    value: 200 hours
summary: "We built Scrubs Co-Pilot from scratch: a platform that transcribed medical consultations in real time and turned them into documentation. It went from zero to 100+ monthly clinician users within 3 months."
draft: true
---

## Challenge

Clinicians lose hours to paperwork that could go to patients. The documentation tools they had were slow, let errors through, and didn't always meet health data standards.

We wanted to give that time back by doing the documentation during the consult itself.

## What we built

Scrubs Co-Pilot transcribed medical consultations in real time and helped doctors manage their consults and notes. It was our own product. We co-founded the company and built the platform from nothing to launch.

We owned the backend: the APIs, the AI model layer, and the integrations with the EHR and EMR systems clinics already ran. Scalability and security were part of that job from day one, since the data was patient health information.

## How we built it

Transcription ran on Whisper. The backend was Node.js and PostgreSQL on Azure, exposed through REST APIs, with pgvector for retrieval (RAG). The web app was Next.js. The AI layer used OpenAI's GPT models, NLP and MedPrompting.

A team of three developers did the build, and our lead took them through the NLP and GPT work.

## Results

- Zero to 100+ monthly clinician users within 3 months.
- 60% less time spent finishing documentation.
- 85% better documentation accuracy, from our proprietary LLM.
- 200 hours of AI transcription and dictation used by clinicians.
