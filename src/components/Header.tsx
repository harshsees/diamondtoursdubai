"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { announcements, nav, social } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";

/** The reference locks its header once the page has scrolled past 120px. */
const STICKY_AT = 120;
/** One notice every seven seconds, as the reference's ticker runs. */
const TICKER_MS = 7000;

function AnnouncementTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (announcements.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % announcements.length),
      TICKER_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="ticker" aria-label="Company updates">
      <div className="ticker-title">
        <span>Updates</span>
      </div>
      <div className="ticker-items">
        {announcements.map((text, i) => (
          <p
            key={text}
            className={`ticker-item${i === index ? " is-current" : ""}`}
            aria-hidden={i !== index}
          >
            <span>{text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [spacer, setSpacer] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > STICKY_AT;
      setSticky((prev) => {
        // Capture the un-stuck height before the bar leaves the flow, so the
        // page does not jump by the height of the announcement strip.
        if (next && !prev && bodyRef.current) setSpacer(bodyRef.current.offsetHeight);
        return next;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change should never leave the mobile drawer hanging open.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className="header" id="header">
        <div ref={bodyRef} className={`header-body${sticky ? " is-sticky" : ""}`}>
          <div className="header-top">
            <div className="container-fluid">
              <AnnouncementTicker />
            </div>
          </div>

          <div className="container header-container">
            <Link href="/" className="header-logo">
              <Logo />
            </Link>

            <div className="header-nav">
              <nav className={`main-nav${menuOpen ? " is-open" : ""}`} id="main-nav">
                <ul>
                  {nav.map((item) => {
                    const current =
                      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link href={item.href} aria-current={current ? "page" : undefined}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <ul className="social-icons header-social-icons">
                {social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer noopener" title={s.label}>
                      <Icon name={s.icon} />
                      <span className="sr-only">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="nav-toggle"
                aria-expanded={menuOpen}
                aria-controls="main-nav"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <Icon name="bars" />
                <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {sticky ? <div className="header-spacer" style={{ height: spacer }} aria-hidden /> : null}
    </>
  );
}
