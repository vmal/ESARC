// Post-deploy smoke test: node scripts/smoke.mjs https://staging.esarc.dev
// Exits non-zero if any page fails, so the deploy job can roll back.
const base = (process.argv[2] ?? '').replace(/\/$/, '')
if (!base) {
  console.error('usage: node scripts/smoke.mjs <base-url>')
  process.exit(2)
}

const checks = [
  ['/', 'ESARC'],
  ['/work', null],
  ['/services', null],
  ['/contact', null],
  ['/insights', null],
  ['/robots.txt', 'Sitemap'],
  ['/sitemap.xml', '<urlset'],
  ['/opengraph-image', null],
]

let failed = 0
for (const [path, needle] of checks) {
  let ok = false
  let detail = ''
  for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    try {
      const res = await fetch(base + path, { redirect: 'follow' })
      const body = needle ? await res.text() : ''
      ok = res.ok && (!needle || body.includes(needle))
      detail = `${res.status}${needle && !body.includes(needle) ? ` (missing "${needle}")` : ''}`
    } catch (err) {
      detail = String(err)
    }
    if (!ok && attempt < 3) await new Promise((r) => setTimeout(r, 5000))
  }
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${path} ${detail}`)
  if (!ok) failed++
}

process.exit(failed ? 1 : 0)
