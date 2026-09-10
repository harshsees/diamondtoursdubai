"use client";

import { useState } from "react";
import { isEmail } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!isEmail(email)) {
      setError("That does not look like a valid email address.");
      return;
    }

    setError("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "callback",
          name: "Newsletter subscriber",
          email,
          phone: "+000000000",
          subject: "Newsletter signup",
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("We could not sign you up just now. Please try again shortly.");
    }
  };

  return (
    <section className="border-y border-line bg-canvas">
      <div className="container-site section-y-sm grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Stay updated</p>
          <h2 className="mt-3 text-[1.375rem] leading-tight sm:text-[1.625rem]">
            Offers, new tours and travel notes
          </h2>
        </div>

        <div className="lg:col-span-7">
          {status === "success" ? (
            <p role="status" className="text-[0.9375rem] text-success">
              You are on the list. Thank you.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="max-w-xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    name="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className={[
                      "h-12 w-full rounded-sm border bg-canvas px-4 text-[0.9375rem]",
                      "placeholder:text-ink-3/80 transition-colors duration-200 focus:outline-none",
                      error
                        ? "border-danger focus:border-danger"
                        : "border-line-strong hover:border-ink-3 focus:border-accent",
                    ].join(" ")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-12 shrink-0 rounded-sm border border-accent bg-accent px-7 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-accent-hover hover:border-accent-hover disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Subscribe"}
                </button>
              </div>

              {error ? (
                <p id="newsletter-error" role="alert" className="mt-2 text-[0.8125rem] text-danger">
                  {error}
                </p>
              ) : (
                <p className="mt-2 text-[0.8125rem] text-ink-3">
                  Occasional emails. Unsubscribe at any time.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
