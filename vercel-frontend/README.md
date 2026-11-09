# Hermes Luxury Store — standalone Vercel frontend

A standalone Vite + React build of the Hermes luxury storefront, so it can
deploy on Vercel. The original is a Hatch space client (it needs the Hatch
runtime and its `@hatch/space-sdk`); this copy runs entirely in the browser.

## What is in here

- `src/App.tsx` — the storefront (home, categories, product pages, cart,
  checkout, account, admin), ported from the Hatch client.
- `src/data.ts` — the product catalog as static data: **414 products** with
  the verified per-product data (prices, ref codes, colours, gallery views,
  sizes, detail lines), generated 2026-11-09 from the live store.
- `src/api.ts` — a client-side stand-in for the server actions. Reads come
  from the static catalog; accounts, orders, wishlist, newsletter and admin
  edits are kept in the visitor's own browser (localStorage). Nothing is sent
  to a server and no order is a real purchase — checkout creates a local demo
  order number only.
- `src/placeholders.ts`, `src/productImages.ts`, `src/galleryImages.ts` —
  clearly-marked placeholder imagery (see below).

## Photos — placeholders for now

The 209 product photos are **not** in this repo (they are binary files and
the GitHub push tools accept text only), so every product/hero/gallery image
is a placeholder SVG: a warm studio tone with the product name and
"PHOTO COMING SOON". No fake product photo is shown and no Hermes photo was
copied or hotlinked.

To add the real photos later:

1. Upload the photo files to the repo (GitHub web upload, or `git` on a
   computer that has them) under `vercel-frontend/src/assets/` with the same
   layout as the Hatch client (`products/`, `gallery/`, plus the hero,
   editorial, logo PNG and loading GIF files at `src/assets/`).
2. In `src/App.tsx`, swap the `from "./placeholders"` import back to the
   real asset imports, and restore the original `src/productImages.ts` /
   `src/galleryImages.ts` (which import the photo files).
3. Push and let Vercel redeploy.

## Vercel settings

- **Root Directory:** `vercel-frontend`
- **Framework Preset:** Other
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## Demo admin password (this build only)

The admin panel here is client-side only. Its demo password is:

- `admin123`

This is **not** the live store's server password. Admin edits in this build
only change this browser's local copy.

## Wiring the real backend later

When a real backend exposes `POST {action, args}` at `/actions`, set the
`VITE_API_URL` env var in Vercel (e.g. the Render backend URL). `getStorefront`
and `searchProducts` will then try the remote first and fall back to the
bundled catalog if the remote is unreachable. Writes stay local until the
backend API exists.
