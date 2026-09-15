"use client";

import { useState } from "react";

import { newsletter } from "@/content/site";

/** Compact rounded input + GO button, exactly the reference's footprint. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
        event.currentTarget.reset();
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        {newsletter.placeholder}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder={newsletter.placeholder}
        autoComplete="email"
      />
      <button type="submit">{newsletter.submit}</button>
      <p className="sr-only" role="status" aria-live="polite">
        {done ? newsletter.success : ""}
      </p>
    </form>
  );
}
