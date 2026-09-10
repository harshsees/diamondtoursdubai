import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border " +
  "text-[0.8125rem] font-bold uppercase tracking-[0.12em] leading-none " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-out " +
  "hover:-translate-y-px active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent border-accent text-white hover:bg-accent-hover hover:border-accent-hover",
  secondary:
    "bg-transparent border-line-strong text-ink hover:border-ink",
  ghost: "bg-white border-white text-ink hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6",
  lg: "h-[3.25rem] px-8",
};

type Shared = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type NativeProps = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

export function Button(props: LinkProps | NativeProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  if (typeof props.href === "string") {
    const { href, ...rest } = stripShared(props) as LinkProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(stripShared(props) as NativeProps)}>
      {children}
    </button>
  );
}

/** Remove presentational props so they are not forwarded to the DOM. */
function stripShared<T extends Shared>(props: T) {
  const clone = { ...props } as Partial<T>;
  delete clone.variant;
  delete clone.size;
  delete clone.className;
  delete clone.children;
  return clone;
}
