import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-[10px] " +
  "px-5 py-[0.6875rem] text-[0.8125rem] font-medium leading-none tracking-[-0.005em] " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-250 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-[#080808] shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset] " +
    "hover:bg-white hover:-translate-y-px hover:shadow-[0_8px_24px_-12px_rgba(255,255,255,0.35)]",
  secondary:
    "border border-line-2 bg-white/[0.02] text-ink backdrop-blur-sm " +
    "hover:border-line-3 hover:bg-white/[0.055] hover:-translate-y-px",
  ghost:
    "text-ink-2 hover:text-ink",
};

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  children,
  className = "",
  href,
  ...rest
}: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

/** The small arrow that nudges on hover — used on cards and text links. */
export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-[0.875rem] w-[0.875rem] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5" />
      <path d="M5.75 4.5h5.75v5.75" />
    </svg>
  );
}
