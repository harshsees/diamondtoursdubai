"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal]:not([data-revealed]),[data-image-reveal]:not([data-revealed])";

/**
 * One IntersectionObserver for the whole document.
 *
 * Server components opt in by adding `data-reveal` / `data-image-reveal`, so no
 * section needs its own client boundary. Mounted once in the root layout.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Signals to CSS that JS is running, so the no-JS fallback stops applying.
    document.documentElement.classList.remove("no-js");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document
        .querySelectorAll(SELECTOR)
        .forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeAll = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));

    observeAll();

    // Catch anything mounted after hydration (filters, accordions, route content).
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
