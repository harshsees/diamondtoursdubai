"use client";

import { useId } from "react";

import { brand } from "@/content/site";

/**
 * The mark is a folded chevron — a container corner read as a north-pointing
 * arrow. It is the only place the accent colour appears at full strength.
 *
 * Gradient ids are per-instance: several marks render at once and the first
 * one is display:none at some breakpoints, which would otherwise leave every
 * reference to a shared id painting nothing.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const light = `${uid}-light`;
  const plate = `${uid}-plate`;

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={light} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#2f8f74" />
          <stop offset="55%" stopColor="#4fd1a5" />
          <stop offset="100%" stopColor="#8bf3ce" />
        </linearGradient>
        <linearGradient id={plate} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#24312e" />
          <stop offset="100%" stopColor="#0e1614" />
        </linearGradient>
      </defs>

      <path d="M16 2.2 29.4 9.6v12.8L16 29.8 2.6 22.4V9.6z" fill={`url(#${plate})`} />
      <path d="M16 2.2 29.4 9.6l-6.4 3.5L16 9.3z" fill={`url(#${light})`} opacity="0.55" />
      <path d="M9.3 22.6 16 10.2l6.7 12.4h-3.6L16 16.7l-3.1 5.9z" fill={`url(#${light})`} />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-[0.9375rem] font-semibold leading-none tracking-[0.20em] text-ink ${className}`}
    >
      {brand.name}
    </span>
  );
}

export function Logo({
  className = "",
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-[1.375rem] w-[1.375rem] shrink-0" />
      {showWord ? <Wordmark /> : null}
      <span className="sr-only">{brand.legalName} — home</span>
    </span>
  );
}
