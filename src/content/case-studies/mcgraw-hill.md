---
# Imported from esarc-pipeline/case-studies/edtech-graphql-backend-ai-search.md on 2026-10-12.
# Draft: the owner still has to confirm the metrics before publishing.
title: A federated GraphQL backend and AI search for McGraw Hill's Sharpen app
slug: mcgraw-hill
client: McGraw Hill
clientIsPublic: true
industry: Education / EdTech
year: 2023
role: Backend engineer; helped hire and onboard the backend team
stack:
  - Node.js
  - Express.js
  - TypeScript
  - Federated GraphQL
  - PostgreSQL (AWS RDS)
  - Redis
  - Kubernetes
  - Docker
  - Terraform
  - GitHub Actions
  - New Relic
  - OpenAI
  - Vector database
services:
  - Architecture
  - RAG
metrics:
  - label: Backend we helped build
    value: Sharpen study app
  - label: Deploy and integration test pipeline
    value: Docker, Terraform, GitHub Actions
summary: "We helped stand up the backend for Sharpen, McGraw Hill's study app: a federated GraphQL service, the deployment and test infrastructure behind it, and OpenAI search over a vector database."
links:
  - label: mheducation.com
    href: https://www.mheducation.com/sharpen/study-app.html
draft: true
---

## Challenge

McGraw Hill was launching Sharpen, a new study app, and needed its backend built. The service was a federated GraphQL backend, and the hard part was operational. Deployments and pipelines had to be streamlined, and integration tests had to run efficiently across the service.

## What we built

We helped hire and onboard the backend team, and then built with them.

Our part covered the federated GraphQL service, new microservices, and the infrastructure that deploys the backend and runs its integration tests. We also hooked OpenAI up to a vector database to improve search.

## How we built it

The services are Node.js, Express.js and TypeScript, backed by PostgreSQL on AWS RDS and Redis, with Kubernetes and New Relic in the stack.

We set up deployments and integration test runs with Docker, Terraform and GitHub Actions.

## Results

Sharpen got a solid backend codebase and infrastructure, and a well-optimised API. The OpenAI and vector database work laid the foundation for better search in the app.
