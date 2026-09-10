# Making this site yours

Everything below is placeholder content standing in for your business. Nothing on
the site is copied from the reference site — the reference informed layout,
spacing, typography and interaction only.

Work through this list and the site becomes yours end to end.

---

## 1. Business identity — `src/config/site.ts`

One file drives the header, footer, contact page, metadata, sitemap and every
`mailto:`/`tel:` link on the site.

| Field | Currently | Replace with |
| --- | --- | --- |
| `name`, `legalName`, `shortName` | "Meridian" / "Meridian Destination Management LLC" | Your trading and legal names |
| `tagline`, `description` | Generic DMC copy | Your positioning (the description is used as the default meta description) |
| `url` | `https://www.example.com` | Your live domain — **required** for correct canonicals, Open Graph and `sitemap.xml` |
| `contact.*` | Placeholder numbers, emails, address | Real details. `phoneHref`/`whatsappHref` are the dial-safe versions (digits only) |
| `contact.hours` | Sun–Sat placeholder | Your real opening hours |
| `contact.mapQuery` | Sheikh Zayed Road | The address string the contact-page map should centre on |
| `social` | Empty profile links | Your real profiles. Delete any platform you are not on — the icons follow the array |
| `announcements` | Two sample notices | Your utility-bar message, or delete the entry to hide it |
| `nav` | Home / About / Services / Visa / Tours / Contact | Rename or remove items; the header, mobile menu and footer all read from here |

## 2. Logo — `src/components/layout/Logo.tsx`

A placeholder wordmark (geometric mark + `shortName`). To use real artwork, put
an SVG in `/public` and swap the inline `<svg>` for `next/image`. Keep the mark
around 28px tall so header spacing is unaffected. It has a light and a dark
variant (`tone="light"` is used in the footer).

## 3. Colour and type — `src/app/globals.css`

All design tokens live in the `@theme` block at the top:

- `--color-accent` is the single brand colour. Change it and buttons, links,
  eyebrows, icons and focus rings follow. `--color-accent-hover` should be a
  darker shade of it; `--color-accent-soft` a very light tint.
- Neutrals (`--color-ink*`, `--color-line*`, `--color-surface*`) are warm greys.
  They rarely need changing.
- The typeface is **Lato**, loaded in `src/app/layout.tsx`. To change it, swap the
  `next/font/google` import — the token `--font-lato` is the only reference.

## 4. Content — `src/data/`

| File | Holds |
| --- | --- |
| `services.ts` | The nine services, their copy, bullet points and images |
| `tours.ts` | Tour catalogue, including full detail pages (itinerary, inclusions, notes) |
| `places.ts` | Home-page attractions and the destinations list |
| `experiences.ts` | The "things to do" category grid |
| `differentiators.ts` | The eight "know the difference" points |
| `visa.ts` | Visa categories, requirements, process steps and FAQs |
| `credentials.ts` | Awards, memberships, testimonials — **all empty on purpose** |

Adding a tour to `tours.ts` creates its detail page, its sitemap entry and its
card automatically. Set `featured: true` to surface it on the home page.

## 5. Claims you must verify before launch

These are invented placeholders. Replace or delete them:

- **`src/components/sections/AboutSection.tsx`** — the stats block ("14 years",
  "40k+ guests", "60 vehicles"). Marked with a `PLACEHOLDER` comment.
- **`src/app/about/page.tsx`** — the hero headline says "Fourteen years", and the
  body describes an ownership model (own fleet, in-house visa desk). True for you?
- **`src/data/differentiators.ts`** — every one of the eight points is a factual
  claim about licensing, fleet, languages and ticketing authorisation.
- **`src/data/visa.ts`** — visa validity, permitted stay and processing times.
  Government rules change; check these against current official guidance and put
  a review reminder in the diary.
- **`src/data/tours.ts`** — prices, durations and inclusions.
- **`src/app/privacy/page.tsx`** and **`src/app/terms/page.tsx`** — drafts giving
  the right structure, not legal advice. Have them reviewed, and replace the
  `[date]` placeholders.

Awards, memberships and testimonials are deliberately empty in
`src/data/credentials.ts`. Fill them with real entries and the relevant sections
appear on the home, about and tours pages. Leave them empty and those sections
are skipped cleanly. **Do not invent them.**

## 6. Photography — `/public/images`

38 images, all sourced from Unsplash under its free licence and downsized to
2000px. They are stand-ins for your own photography, which will always sell the
business better. To swap one, drop a replacement at the same path and filename.

Filenames are grouped by purpose: `hero-*`, `banner-*` (page headers),
`service-*`, `tour-*`, `attraction-*`, `dest-*`, `about-*`.

Update the `imageAlt` alongside any image you replace — alt text is real content,
not filler.

## 7. Wiring up the enquiry form

`src/app/api/enquiry/route.ts` validates submissions and returns the right
status codes, but **does not yet send anything anywhere** — it logs to the
server console. Implement `deliver()` with your transport of choice (SMTP via
Nodemailer, Resend, a CRM webhook) and put the credentials in `.env.local`.

Until that is done the form will look successful to visitors while the enquiry
goes nowhere. Wire it up before you launch.

## 8. Before go-live

- [ ] Set the real domain in `site.url`
- [ ] Wire up `deliver()` in the enquiry route and send a test enquiry
- [ ] Replace or verify every claim in section 5
- [ ] Replace the logo
- [ ] Add a real favicon (`src/app/favicon.ico`)
- [ ] Add an Open Graph image if you want something other than the hero photo
- [ ] Have the privacy policy and terms reviewed
- [ ] Point the social links at real profiles, or remove them
