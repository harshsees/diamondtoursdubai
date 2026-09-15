/**
 * All iconography is inline SVG so nothing 404s and nothing is fetched.
 *
 * Two families:
 *  - `ServiceIcon` — the 65 x 65 two-tone line marks used beside the
 *    differentiators and service rows. Teal line work, amber accents, the
 *    same visual weight as the reference's icon set.
 *  - the small solid glyphs used in the footer, header and controls.
 */

const line = {
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const P = "#0f3d3e";
const S = "#e8a33d";

const serviceIcons: Record<string, React.ReactNode> = {
  /* One named contact accountable for the file. */
  coordinator: (
    <>
      <circle cx="26" cy="21" r="9" stroke={P} {...line} />
      <path d="M10 52c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke={P} {...line} />
      <path d="M44 26v-2a9 9 0 0 1 9-9M53 15a9 9 0 0 1 0 18h-2" stroke={S} {...line} />
      <circle cx="53" cy="42" r="3" stroke={S} {...line} />
    </>
  ),
  /* An itemised, costed quotation rather than an estimate. */
  quote: (
    <>
      <path d="M14 8h27l9 9v39a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z" stroke={P} {...line} />
      <path d="M41 8v9h9" stroke={P} {...line} />
      <path d="M20 28h14M20 36h20M20 44h12" stroke={P} {...line} />
      <path d="M44 34v14M40 37.5c0-1.9 1.8-3.5 4-3.5s4 1.6 4 3.5-1.8 3.5-4 3.5-4 1.6-4 3.5 1.8 3.5 4 3.5 4-1.6 4-3.5" stroke={S} {...line} />
    </>
  ),
  /* Identity and ownership verified on both sides. */
  verify: (
    <>
      <path d="M32 6 54 14v16c0 13.4-8.9 24.4-22 28C18.9 54.4 10 43.4 10 30V14Z" stroke={P} {...line} />
      <path d="m22 31 7 7 14-14" stroke={S} {...line} />
    </>
  ),
  /* Independent inspection before funds move. */
  inspect: (
    <>
      <path d="M8 20 32 9l24 11-24 11Z" stroke={P} {...line} />
      <path d="M8 20v24l24 11 24-11V20" stroke={P} {...line} />
      <path d="M32 31v24" stroke={P} {...line} />
      <circle cx="42" cy="36" r="8" stroke={S} {...line} />
      <path d="m48 42 6 6" stroke={S} {...line} />
    </>
  ),
  /* HS classification reviewed before booking. */
  classify: (
    <>
      <path d="M33 7H12a5 5 0 0 0-5 5v21a5 5 0 0 0 1.5 3.5l21 21a4 4 0 0 0 5.6 0l19.4-19.4a4 4 0 0 0 0-5.6l-21-21A5 5 0 0 0 33 7Z" stroke={P} {...line} />
      <circle cx="20" cy="20" r="4" stroke={S} {...line} />
      <path d="M30 38h14M30 46h9" stroke={S} {...line} />
    </>
  ),
  /* Marine and inland transit cover arranged. */
  insure: (
    <>
      <path d="M32 8c13.3 0 24 10.7 24 24H8C8 18.7 18.7 8 32 8Z" stroke={P} {...line} />
      <path d="M32 8v24M20 32c0 6.6-1.8 12-4 12M44 32c0 6.6 1.8 12 4 12" stroke={P} {...line} />
      <path d="M32 32v18a6 6 0 0 1-12 0" stroke={S} {...line} />
    </>
  ),
  /* Container, RoRo, flat-rack and breakbulk. */
  modes: (
    <>
      <path d="M6 44h52l-6 12H12Z" stroke={P} {...line} />
      <path d="M12 44V28h34v16" stroke={P} {...line} />
      <path d="M22 28V16h14v12" stroke={S} {...line} />
      <path d="M20 34v10M29 34v10M38 34v10" stroke={P} {...line} />
      <path d="M46 20h10v10" stroke={S} {...line} />
    </>
  ),
  /* Letter of credit and escrow structures. */
  escrow: (
    <>
      <path d="M6 26 32 12l26 14" stroke={P} {...line} />
      <path d="M12 26v20M24 26v20M40 26v20M52 26v20" stroke={P} {...line} />
      <path d="M6 52h52" stroke={P} {...line} />
      <rect x="26" y="34" width="16" height="12" rx="2" stroke={S} {...line} />
      <path d="M30 34v-3a4 4 0 0 1 8 0v3" stroke={S} {...line} />
    </>
  ),
  /* Full document pack retained and handed over. */
  documents: (
    <>
      <path d="M18 6h20l10 10v34a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4Z" stroke={P} {...line} />
      <path d="M38 6v10h10" stroke={P} {...line} />
      <path d="M6 16v38a4 4 0 0 0 4 4h28" stroke={S} {...line} />
      <path d="M23 27h14M23 35h16M23 43h10" stroke={S} {...line} />
    </>
  ),
};

export function ServiceIcon({ name, className = "" }: { name: string; className?: string }) {
  const glyph = serviceIcons[name] ?? serviceIcons.modes;
  return (
    <svg viewBox="0 0 64 64" className={`service-img ${className}`} aria-hidden="true" focusable="false">
      {glyph}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* small solid glyphs                                                         */
/* -------------------------------------------------------------------------- */

const glyphs: Record<string, string> = {
  instagram:
    "M8 0C5.8 0 5.5 0 4.6.1 3.8.1 3.2.2 2.7.4c-.5.2-1 .5-1.4.9-.4.4-.7.9-.9 1.4-.2.5-.3 1.1-.4 2C0 5.5 0 5.8 0 8s0 2.5.1 3.4c0 .9.2 1.5.4 2 .2.5.5 1 .9 1.4.4.4.9.7 1.4.9.5.2 1.1.3 2 .4.9 0 1.2.1 3.3.1s2.5 0 3.4-.1c.9 0 1.5-.2 2-.4.5-.2 1-.5 1.4-.9.4-.4.7-.9.9-1.4.2-.5.3-1.1.4-2 0-.9.1-1.2.1-3.4s0-2.5-.1-3.4c0-.9-.2-1.5-.4-2a3.9 3.9 0 0 0-.9-1.4c-.4-.4-.9-.7-1.4-.9-.5-.2-1.1-.3-2-.4C10.5 0 10.2 0 8 0Zm0 1.4c2.1 0 2.4 0 3.3.1.8 0 1.2.2 1.5.3.4.1.6.3.9.6.3.3.4.5.6.9.1.3.3.7.3 1.5 0 .9.1 1.1.1 3.2s0 2.4-.1 3.3c0 .8-.2 1.2-.3 1.5-.1.4-.3.6-.6.9-.3.3-.5.4-.9.6-.3.1-.7.3-1.5.3-.9 0-1.1.1-3.3.1s-2.4 0-3.3-.1c-.8 0-1.2-.2-1.5-.3a2.5 2.5 0 0 1-.9-.6c-.3-.3-.4-.5-.6-.9-.1-.3-.3-.7-.3-1.5 0-.9-.1-1.1-.1-3.3s0-2.4.1-3.3c0-.8.2-1.2.3-1.5.1-.4.3-.6.6-.9.3-.3.5-.4.9-.6.3-.1.7-.3 1.5-.3.9 0 1.1-.1 3.3-.1Zm0 2.5a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.2-7a1 1 0 1 1-1.9 0 1 1 0 0 1 1.9 0Z",
  facebook:
    "M10.3 16V9.8h2.1l.3-2.4h-2.4V5.8c0-.7.2-1.2 1.2-1.2h1.3V2.4c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.8H5.6v2.4h2.1V16h2.6Z",
  twitter:
    "M16 3c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8A3.3 3.3 0 0 0 7.8 5.7 9.3 9.3 0 0 1 1.1 2.3a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4a3.3 3.3 0 0 0 2.6 3.2c-.5.2-1 .2-1.5.1a3.3 3.3 0 0 0 3 2.3A6.6 6.6 0 0 1 0 13.3a9.3 9.3 0 0 0 5 1.5c6 0 9.4-5.1 9.2-9.6.6-.5 1.2-1.1 1.6-1.9Z",
  linkedin:
    "M3.6 16H.3V5.3h3.3V16ZM1.9 3.9A1.9 1.9 0 1 1 1.9.1a1.9 1.9 0 0 1 0 3.8ZM16 16h-3.3v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.4-2 2.7V16H5.7V5.3H8.9v1.5h.1a3.5 3.5 0 0 1 3.1-1.7c3.3 0 4 2.2 4 5.1V16Z",
  map: "M6 1 1 3v12l5-2 4 2 5-2V1l-5 2-4-2Zm0 1.7 4 2v9.6l-4-2V2.7Z",
  phone:
    "M3.7 1H2C1.4 1 1 1.4 1 2c0 7.2 5.8 13 13 13 .6 0 1-.4 1-1v-1.7c0-.4-.3-.8-.7-1l-2.7-.7c-.4-.1-.8 0-1 .3l-1 1a10.6 10.6 0 0 1-4.5-4.5l1-1c.3-.2.4-.6.3-1L4.7 1.7C4.5 1.3 4.1 1 3.7 1Z",
  envelope:
    "M1 3.5C1 2.7 1.7 2 2.5 2h11c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5h-11C1.7 14 1 13.3 1 12.5v-9Zm1.7.5L8 8.3 13.3 4H2.7Zm10.8 1.1L8.5 9.9a.8.8 0 0 1-1 0L2.5 5.1v7.4h11V5.1Z",
  globe:
    "M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm4.9 4.7h-2A11 11 0 0 0 9.5 2.8a5.6 5.6 0 0 1 3.4 2.9ZM8 2.5c.6.8 1.1 2 1.4 3.2H6.6c.3-1.2.8-2.4 1.4-3.2ZM2.5 8a5.5 5.5 0 0 1 .2-1.3h2.4a11.6 11.6 0 0 0 0 2.6H2.7A5.5 5.5 0 0 1 2.5 8Zm.6 2.3h2A11 11 0 0 0 6.5 13.2a5.6 5.6 0 0 1-3.4-2.9Zm2-4.6h-2a5.6 5.6 0 0 1 3.4-2.9 11 11 0 0 0-1.4 2.9ZM8 13.5c-.6-.8-1.1-2-1.4-3.2h2.8c-.3 1.2-.8 2.4-1.4 3.2Zm1.7-4.6H6.3a10.4 10.4 0 0 1 0-2.6h3.4a10.4 10.4 0 0 1 0 2.6Zm-.2 4.3a11 11 0 0 0 1.4-2.9h2a5.6 5.6 0 0 1-3.4 2.9Zm1.8-4.3a11.6 11.6 0 0 0 0-2.6h2.4a5.5 5.5 0 0 1 0 2.6h-2.4Z",
  check: "M6.2 12.4 1.6 7.8l1.4-1.4 3.2 3.2 7-7 1.4 1.4-8.4 8.4Z",
  bars: "M1 3h14v2H1V3Zm0 4h14v2H1V7Zm0 4h14v2H1v-2Z",
  chevronUp: "m8 4.5 6 6-1.4 1.4L8 7.3l-4.6 4.6L2 10.5l6-6Z",
  chevronLeft: "m10.5 2 1.4 1.4L7.3 8l4.6 4.6-1.4 1.4-6-6 6-6Z",
  chevronRight: "M5.5 2 4.1 3.4 8.7 8l-4.6 4.6L5.5 14l6-6-6-6Z",
};

export function Icon({
  name,
  className = "",
  size = 16,
}: {
  name: keyof typeof glyphs | string;
  className?: string;
  size?: number;
}) {
  const d = glyphs[name];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
