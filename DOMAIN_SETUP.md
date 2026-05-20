# Custom domain setup — `owner.edullent.com`

Before Play Store submission you should move off `owner-dashboard-blue.vercel.app`
to a real branded domain. Reasons:

- **Trust signal** for Play reviewers + end users.
- **TWA host immutability** — once published, the TWA's `host` cannot change
  without re-listing as a new app. Lock in the right domain upfront.
- **Email deliverability** — outbound Resend mails from `noreply@edulent.dgion.com`
  look strange when the app lives at `vercel.app`. Aligning domains helps inbox
  placement.
- **SEO + Knowledge Graph** — Google clusters under the eTLD+1; vercel subdomains
  share rank with all other Vercel apps. Your own domain owns its rep.

## Recommendation

Use a subdomain of your main brand domain (you mentioned `edulent.dgion.com`
in the email config). Suggested: **`owner.edullent.com`** if you own
`edullent.com`, otherwise **`owner.edulent.dgion.com`** if you only own
`dgion.com`.

This guide assumes you'll point a subdomain via DNS. Same steps work for an
apex (root) domain.

## Step 1 — Add the domain in Vercel

1. Open the project in Vercel: `owner-dashboard-blue`.
2. Settings → **Domains** → **Add**.
3. Enter the subdomain (e.g. `owner.edullent.com`).
4. Vercel will show you the DNS record(s) to create at your registrar:
   - **CNAME** `owner` → `cname.vercel-dns.com` (for subdomains)
   - **A** `@` → Vercel's IP (only for apex domains)

## Step 2 — Configure DNS at your registrar / Cloudflare

### If using Cloudflare:
1. Cloudflare dashboard → DNS → Records → **Add record**.
2. Type: `CNAME`, Name: `owner`, Target: `cname.vercel-dns.com`.
3. Proxy status: **DNS only** (gray cloud). Vercel issues + manages its own
   SSL — Cloudflare's "proxied" mode would conflict.
4. TTL: Auto.

### If using your registrar directly (Namecheap, GoDaddy, etc.):
1. Domain → DNS settings.
2. Add record → Type `CNAME`, Host `owner`, Value `cname.vercel-dns.com`.
3. Save.

DNS propagation: usually ≤5 min, can take up to 1 hour.

## Step 3 — Verify in Vercel

Back in Vercel → Domains → the new domain should flip from "Invalid Configuration"
to "Valid Configuration" within a few minutes. Vercel auto-issues an SSL cert
via Let's Encrypt.

If it stays "Invalid" for >30 min, run:
```bash
dig owner.edullent.com CNAME +short
# Expected: cname.vercel-dns.com.
```

## Step 4 — Update app config (3 spots)

Once the new domain serves the app over HTTPS, sync these references so the
PWA + TWA + email + analytics all match:

### a) `owner-dashboard/index.html`
Find all `https://owner-dashboard-blue.vercel.app/` → replace with `https://owner.edullent.com/`:
- `<link rel="canonical">`
- `<meta property="og:url">`
- `<meta property="og:image">`
- `<meta name="twitter:image">`
- JSON-LD `@id` and `url` fields

### b) `owner-dashboard/public/.well-known/assetlinks.json`
No change here yet (this file is hosted at whichever domain the user visits),
but **the SHA-256 fingerprint inside MUST match the Android signing certificate
for the TWA built against the new host.** If you already shipped a TWA against
`vercel.app`, you'll need to re-issue a new TWA against the new host (see
`bubblewrap/BUILD.md`).

### c) `owner-dashboard/bubblewrap/twa-manifest.json`
Change every URL to the new domain:
- `host`
- `iconUrl`, `maskableIconUrl`
- `webManifestUrl`
- `fullScopeUrl`
- All `shortcuts[].iconUrl`

Then regenerate the TWA:
```bash
cd owner-dashboard/bubblewrap
bubblewrap update    # picks up new twa-manifest.json
bubblewrap build     # signs new AAB
```

### d) `owner-dashboard/vite.config.ts` (proxy target — dev only)
```ts
proxy: {
  "/api": {
    target: "https://owner.edullent.com",   // was vercel.app
    changeOrigin: true,
    secure: true,
  },
},
```

### e) `owner-dashboard/vercel.json` (CSP `connect-src`)
The CSP currently whitelists `https://owner-dashboard-blue.vercel.app` in
`connect-src`. Add the new domain there too (or remove the old once cutover
is complete):
```
connect-src 'self' ... https://owner.edullent.com ...
```

## Step 5 — Optional — keep the vercel.app domain as redirect

While the new domain becomes the canonical, you can keep the old `.vercel.app`
URL as a 301 redirect so existing links don't break.

In Vercel → Settings → Domains → click the `.vercel.app` entry → enable
"Redirect to" → choose the new primary domain.

## Step 6 — Re-deploy + Lighthouse

```bash
cd owner-dashboard
npm run build
git add -A && git commit -m "switch domain to owner.edullent.com"
git push   # triggers Vercel auto-deploy
```

Then run Lighthouse PWA audit against the new domain:
1. Open `https://owner.edullent.com` in Chrome.
2. DevTools → Lighthouse → check **PWA** + **Performance**.
3. Confirm the manifest preview shows the right `start_url` + screenshots.

## Step 7 — Update Play Store listing (if already submitted)

If you've already published to Play with the old host:
- Bubblewrap signed against `owner-dashboard-blue.vercel.app` — the URL bar
  was hidden because that host had matching assetlinks.json.
- After domain switch, the OLD TWA still hides the URL bar (assetlinks.json on
  vercel.app is still valid), but loads the SAME content from vercel.app.
- To fully cut over, build a NEW AAB pointing at the new host + replace
  assetlinks.json on the new domain + upload as an APP UPDATE (same package
  ID, bumped versionCode).

Critical: do NOT change the Android `packageId` — same package, same listing,
same reviews. Just the underlying host changes.

---

**Estimated total time:** 30 min DNS + 15 min config edits + 5 min testing.

**Estimated cost:** $10-15/year for a domain registration.
