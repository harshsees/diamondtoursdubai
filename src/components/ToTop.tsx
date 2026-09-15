"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/Icons";

/** The small square scroll-to-top control the reference parks bottom-right. */
export function ToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`to-top${shown ? " is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="chevronUp" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
