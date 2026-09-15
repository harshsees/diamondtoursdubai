# Meridian Export Co. — marketing site

A Next.js (App Router) marketing site for a cross-border trade business.

The frontend is a deliberate recreation of the layout, typography, spacing,
colour and interaction model of an existing production site, with Meridian's
own brand and content dropped into that structure. Values in
`src/app/globals.css` were measured off the rendered reference rather than
invented — the container is 1140px, body type is Open Sans 14/26, the brand
gradient runs `#28166f → #da251d`, and section rhythm follows the reference's
`4.615rem` band padding.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

```
src/content/site.ts    all copy, contact details, lists and page content
src/app/globals.css    design tokens + every component style
src/components/        one component per section of the page
tools/generate-media.py  regenerates every image in /public/media
```

**All business content is in `src/content/site.ts`.** Nothing is hard-coded in
JSX — components only map over that file. Swapping in real details means
editing one file.

## Images

Every image is generated procedurally by `npm run media`, so the repo is
self-contained and nothing can 404. They are flat daylight port/freight
illustrations holding the exact crop, aspect ratio and focal position the
layout expects, and are meant to be replaced 1:1 with photography:

| Path | Size | Used by |
| --- | --- | --- |
| `public/media/slides/slide-0N.jpg` | 2340 × 1300 (1170:650) | hero slider |
| `public/media/about/about-0N.jpg` | 1014 × 760 (4:3) | "Who We Are" carousel |
| `public/media/banners/*.jpg` | 1920 × 640 | inner-page banners |
| `public/media/skyline.svg` | tiled, 400px tall | footer watermark |
| `public/media/og.jpg` | 1200 × 630 | social card |

Keep the filenames and ratios and no component needs to change.

## Contact form

`POST /api/contact` validates, rate-limits and forwards submissions. Set
`CONTACT_WEBHOOK_URL` (Zapier, Make, a Slack incoming webhook, your CRM) to
receive them; with no webhook configured the submission is logged server-side
and the form still succeeds. See `.env.example`.

## QA

The site must be running for these:

```bash
npm run shots      # screenshots every section + page at desktop and mobile
npm run qa         # drives slider, carousel, mobile menu, forms, back-to-top
node tools/responsive.mjs .shots   # sweeps 320 → 1920 for overflow and errors
```

## Content still to replace

- `announcements` — placeholder operational notices.
- `contact` — the phone, email, address and social URLs are placeholders.
- The footer's "Our Commitments" column stands in for the reference's awards
  list. It states working practices rather than credentials; replace it with
  real awards only if there are any.
