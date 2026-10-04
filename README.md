# Organic Origin – O2

Single-page marketing site for **Organic Origin (O2)**, an organic farming
brand based in Kalimpong, West Bengal. Built with React + Vite.

The design is an original web interpretation of the brand's print brochure
(`docs/sample-website.jpeg`) — same sections, copy and palette, rebuilt as a
responsive site rather than a direct image copy. All photography is a
placeholder (CSS/SVG), ready to swap for real photos — see below.

## Stack

- React 19 + Vite
- Plain CSS (CSS custom properties for the design tokens in `src/index.css`)
- [lucide-react](https://lucide.dev) for iconography

## Project structure

```
src/
  components/    one component + co-located .css per section
  data/content.js  all copy, product list, process steps, contact info
public/
  favicon.svg
docs/
  sample-website.jpeg   original brochure used as the design reference
```

To edit copy (products, mission bullets, phone/email, social links), edit
`src/data/content.js` — nothing else needs to change.

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

Requires Node 18+.

## Replacing placeholder imagery

Product tiles and the hero/CTA mountain graphic are currently drawn with CSS
and inline SVG (`src/components/MountainScene.jsx`, `src/components/Logo.jsx`)
instead of stock photos, so there's nothing to license or swap out before
launch. When real photography is ready:

1. Drop images into `src/assets/`.
2. Replace the relevant icon/placeholder markup with an `<img>` tag.
3. Replace `src/components/Logo.jsx` with the real logo file if a vector/PNG
   version of the brand mark becomes available.

## Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com), click **Add New → Project** and import
   the repo.
3. Framework preset: Vercel auto-detects **Vite** — no config needed
   (build command `vite build`, output directory `dist`).
4. Click **Deploy**. You'll get a `*.vercel.app` preview URL.

Alternatively, from the CLI:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Connecting the GoDaddy domain

1. In the Vercel project, go to **Settings → Domains** and add your domain
   (e.g. `organicorigin.com` and `www.organicorigin.com`).
2. Vercel will show the DNS records it needs. Typically:
   - Apex domain (`organicorigin.com`): an **A** record pointing to
     `76.76.21.21`.
   - `www` subdomain: a **CNAME** record pointing to `cname.vercel-dns.com`.
3. In GoDaddy: **My Products → DNS → Manage** for the domain, and add/edit
   those records to match exactly what Vercel displays (Vercel's values are
   authoritative — use whatever it shows at the time, in case they change).
4. DNS propagation can take a few minutes up to ~48 hours. Vercel's Domains
   page shows a ✅ once it verifies the records and issues the SSL
   certificate automatically.
5. Set the `www` → apex redirect (or vice versa) in Vercel's domain settings
   depending on which one you want as the canonical URL.
