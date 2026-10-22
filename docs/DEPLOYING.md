# Deploying esarc.dev

The site runs on Cloudflare Workers through OpenNext (`@opennextjs/cloudflare`),
the same setup as clearprop.co.

| Trigger | Worker | URL |
| --- | --- | --- |
| Push to `main` | `esarc-staging` | https://staging.esarc.dev |
| Tag `v*` on `main` | `esarc-production` | https://esarc.dev, https://www.esarc.dev |

`.github/workflows/deploy.yml` runs the tests, builds with `npm run cf:build`,
deploys with `opennextjs-cloudflare deploy --env <env>`, then runs
`scripts/smoke.mjs` against the live URL. If the smoke test fails it runs
`wrangler rollback` for that environment.

`cf:build` passes `--dangerouslyUseUnsupportedNextVersion` because OpenNext
refuses to build Next.js 15 now that it is past its two-year support window
(October 2026). The proper fix is upgrading to Next.js 16 and dropping the flag.

Ship to production:

```sh
git tag v1.2.3 origin/main && git push origin v1.2.3
```

## Environments

`SITE_ENV` decides what the site shows. Drafts, TODO badges and mock content
only appear when it isn't `production`. It's set per environment in
`wrangler.jsonc` and also at build time by the deploy job, because most pages
are prerendered.

## One-time setup

1. Add the `esarc.dev` zone to Cloudflare and point the registrar (Porkbun)
   nameservers at it. The Worker custom domains create their own DNS records
   and certificates.
2. Create a Cloudflare API token with Workers Scripts Edit, Account Settings
   Read, Zone Workers Routes Edit and Zone DNS Edit (zone: esarc.dev).
3. In GitHub, add secret `CLOUDFLARE_API_TOKEN` and variable
   `CLOUDFLARE_ACCOUNT_ID`. Optionally add variable `CF_ANALYTICS_TOKEN`
   (Cloudflare Web Analytics site token).
4. Set runtime secrets per environment:

   ```sh
   npx wrangler secret put BREVO_API_KEY --env production
   npx wrangler secret put QUICKBOOKS_CLIENT_ID --env production
   # ...and the other QUICKBOOKS_* values the QuickBooks routes need
   ```

## Local

```sh
npm run dev          # Next dev server
npm run cf:preview   # build and run on the Workers runtime locally
```
