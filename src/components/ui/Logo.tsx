import { brand } from "@/content/site";

/**
 * A 200 x 60 wordmark drawn inline, matching the footprint the reference
 * reserves for its logo: a wide word with a mark set into it and a tracked-out
 * second line beneath.
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
        fill="#da251d"
      >
        MERI
      </text>
      {/* The mark stands in for the D — a compass rose read as a meridian. */}
      <g transform="translate(66 8)">
        <circle cx="12" cy="12" r="12" fill="#28166f" />
        <path d="M12 3.5 14.6 10 12 20.5 9.4 10Z" fill="#fff" />
        <path d="M3.5 12h17" stroke="#fff" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="5" ry="9" fill="none" stroke="#fff" strokeWidth="1.2" />
      </g>
      <text
        x="93"
        y="30"
        fontFamily="var(--font-sans)"
        fontSize="27"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#da251d"
      >
        IAN
      </text>
      <text
        x="1"
        y="50"
        fontFamily="var(--font-sans)"
        fontSize="15"
        fontWeight="700"
        letterSpacing="7.6"
        fill="#28166f"
      >
        {brand.nameSub}
      </text>
    </svg>
  );
}
