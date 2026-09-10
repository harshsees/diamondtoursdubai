"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { nav, site } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change, adjusted during render rather than in an effect.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock scroll, trap focus loosely, and close on Escape while the panel is open.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden border-b border-white/10 bg-footer text-white lg:block">
        <div className="container-site flex h-10 items-center justify-between gap-8 text-[0.75rem]">
          <p className="truncate text-white/60">{site.announcements[0]}</p>

          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="inline-flex items-center gap-2 text-white/75 transition-colors duration-200 hover:text-white"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5" />
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 text-white/75 transition-colors duration-200 hover:text-white"
            >
              <Mail aria-hidden="true" className="h-3.5 w-3.5" />
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={[
          "border-b bg-canvas transition-[height,box-shadow,border-color] duration-300 ease-out",
          scrolled
            ? "border-line shadow-[0_1px_14px_rgba(23,24,26,0.06)]"
            : "border-transparent",
        ].join(" ")}
      >
        <div
          className={[
            "container-site flex items-center justify-between transition-[height] duration-300 ease-out",
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-[5.5rem]",
          ].join(" ")}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={[
                      "relative py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.11em] transition-colors duration-200",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0",
                      "after:bg-accent after:transition-transform after:duration-250 after:ease-out hover:after:scale-x-100",
                      isActive(item.href)
                        ? "text-accent after:scale-x-100"
                        : "text-ink-2 hover:text-ink",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapper rather than `hidden` on the button: both are display
                utilities, and `inline-flex` would win on specificity order. */}
            <div className="hidden lg:block">
              <Button href="/contact">Make an enquiry</Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-ink transition-colors duration-200 hover:border-ink-3 lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto border-t border-line bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-8">
          <ul className="flex flex-col">
            {nav.map((item, index) => (
              <li
                key={item.href}
                className="border-b border-line last:border-0"
                style={{
                  animation: open
                    ? `menu-in 320ms cubic-bezier(0.16,1,0.3,1) ${index * 45}ms both`
                    : undefined,
                }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={[
                    "block py-4 text-[1.25rem] transition-colors duration-200",
                    isActive(item.href) ? "text-accent" : "text-ink",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4">
            <Button href="/contact" size="lg" className="w-full">
              Make an enquiry
            </Button>

            <div className="flex flex-col gap-2 pt-2 text-sm text-ink-2">
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="inline-flex items-center gap-2.5"
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-accent" />
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2.5"
              >
                <Mail aria-hidden="true" className="h-4 w-4 text-accent" />
                {site.contact.email}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
