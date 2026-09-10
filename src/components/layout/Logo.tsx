import Link from "next/link";
import { site } from "@/config/site";

/**
 * Placeholder wordmark.
 *
 * To use real artwork, drop an SVG into /public and swap the <svg> below for
 * next/image. Keep the overall height (28px desktop) so header spacing holds.
 */
export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const ink = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/60" : "text-ink-3";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${site.name} — home`}
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 shrink-0 text-accent transition-transform duration-300 ease-out group-hover:rotate-45"
        fill="none"
      >
        <rect
          x="16"
          y="1.5"
          width="20.5"
          height="20.5"
          rx="2"
          transform="rotate(45 16 1.5)"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="16" cy="16" r="3.25" fill="currentColor" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.0625rem] font-bold uppercase tracking-[0.16em] ${ink}`}
        >
          {site.shortName}
        </span>
        <span
          className={`mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.24em] ${sub}`}
        >
          Travel &amp; Tourism
        </span>
      </span>
    </Link>
  );
}
