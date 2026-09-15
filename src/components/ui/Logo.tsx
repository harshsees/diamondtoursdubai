import { brand } from "@/content/site";

/**
 * A 200 x 60 wordmark drawn inline, matching the footprint the reference
 * reserves for its logo: a wide word with a mark set into it and a tracked-out
 * second line beneath.
 *
 * Fills read from the palette tokens rather than hard-coded hex, so a change
 * to the brand colours in globals.css carries through to the logo.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      width="200"
      height="60"
      className={className}
      role="img"
      aria-label={`${brand.legalName} — home`}
    >
      <text
        x="0"
        y="30"
        fontFamily="var(--font-sans)"
        fontSize="27"
        fontWeight="800"
        letterSpacing="0.5"
        fill="var(--color-primary)"
      >
        KEY
      </text>

      {/* The mark: a rising chevron — the "rise" in Keyrise. */}
      <g transform="translate(58 8)">
        <circle cx="12" cy="12" r="12" fill="var(--color-primary)" />
        <path
          d="M6 15.5 12 8.5l6 7"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7.5 18.5h9" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      </g>

      <text
        x="87"
        y="30"
        fontFamily="var(--font-sans)"
        fontSize="27"
        fontWeight="800"
        letterSpacing="0.5"
        fill="var(--color-primary)"
      >
        RISE
      </text>

      <text
        x="1"
        y="50"
        fontFamily="var(--font-sans)"
        fontSize="15"
        fontWeight="700"
        letterSpacing="7.6"
        fill="var(--color-primary)"
      >
        {brand.nameSub}
      </text>
    </svg>
  );
}
