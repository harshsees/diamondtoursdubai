# Travel & tourism website

A production-ready marketing site for a destination management company, built to
the layout, spacing, typography and interaction language of the supplied
reference site — with its own identity, content and assets.

**Start here:** [`BRANDING.md`](./BRANDING.md) lists every placeholder to replace.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npx tsc --noEmit # typecheck
npx eslint .     # lint
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react

No animation library, no UI kit, no state manager. Motion is CSS; reveals use a
single `IntersectionObserver`.

## Structure

```
src/
  app/
    layout.tsx           Root layout: fonts, metadata, header, footer
    template.tsx         Per-route fade-in
    page.tsx             Home
    about|services|visa|tours|contact/
    tours/[slug]/        Data-driven tour detail template
    privacy|terms/       Legal drafts
    api/enquiry/         Form endpoint (validation done, delivery not wired)
    sitemap.ts robots.ts not-found.tsx
  components/
    layout/              Header (+ mobile menu), Footer, Logo
    sections/            Page sections: Hero, Intro, FeatureGrid, AboutSection,
                         AttractionList, ThingsToDo, DestinationList, Callback,
                         Credentials, Newsletter, CtaBand, PageHero, TourBrowser
    ui/                  Button, SectionHeading, Field, Accordion, Cards,
                         ScrollReveal, SocialIcons
    forms/EnquiryForm    Shared enquiry form (callback + full variants)
  config/site.ts         Every business fact
  data/                  Services, tours, places, visa, credentials, experiences
  lib/                   Validation, reveal helper
public/images/           38 photographs
```

## Design system

Tokens live in the `@theme` block of `src/app/globals.css` — colour, type,
container width, easing. Utilities defined there:

- `container-site` — 1280px max width with responsive side padding
- `section-y` / `section-y-sm` — vertical section rhythm
- `eyebrow` — the small uppercase label above section headings

Palette is deliberately narrow: white, warm greys, near-black ink, and one
accent (`--color-accent`). Photography carries the visual weight.

## Scroll reveal

Any server component can opt in without a client boundary:

```tsx
import { revealDelay } from "@/lib/reveal";

<div data-reveal style={revealDelay(2)}>…</div>   // fade + 18px rise
<Image data-image-reveal … />                      // clip-path wipe + settle
```

`ScrollReveal` (mounted once in the root layout) runs one observer for the whole
document and re-scans after navigation. `prefers-reduced-motion: reduce` shows
everything immediately, and content stays visible with JavaScript disabled.

## Forms

`EnquiryForm` powers the callback block, the contact page, the visa page and every
tour detail page. Validation rules live in `src/lib/validation.ts` and run on both
the client and the API route, so a request that bypasses the browser is checked
the same way. Errors are inline, announced via `role="alert"`, and focus moves to
the first invalid field.

**The endpoint does not deliver mail yet** — see `BRANDING.md` §7.

## Accessibility

Semantic landmarks and heading order; skip link; visible focus rings; labelled
form controls with `aria-invalid` / `aria-describedby`; `aria-expanded` +
`aria-controls` on the mobile menu and accordion; Escape closes the menu and
returns focus to the toggle; body scroll is locked while it is open; live region
on the tour filter; `prefers-reduced-motion` respected throughout.

## Performance & SEO

Local images served through `next/image` (AVIF/WebP, responsive `sizes`, lazy
below the fold, `priority` on heroes). Per-page titles, descriptions and
canonicals; Open Graph and Twitter cards; `TouristTrip` structured data on tour
pages; generated `sitemap.xml` and `robots.txt`.

Tour pages are statically generated from `src/data/tours.ts` via
`generateStaticParams`.

## Verified

Checked with Playwright at 390px and 1440px across all pages: no horizontal
scroll, no broken images, no console errors, no failed requests. Mobile menu,
form validation and submission, tour filtering, accordion and keyboard
navigation all exercised.

## Image credits

Photography from [Unsplash](https://unsplash.com) under the Unsplash licence
(free for commercial use, no attribution required). Intended as a stand-in for
the business's own photography.
