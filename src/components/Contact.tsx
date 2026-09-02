"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { contact, contactIntro, serviceOptions } from "@/content/site";
import { ChevronRight } from "./ui/Icons";
import { EASE_OUT, Reveal } from "./ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<Field, string>>;
type Field = "firstName" | "lastName" | "email" | "phone" | "company" | "service" | "message";

const REQUIRED: Field[] = ["firstName", "lastName", "email", "message"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {};
  for (const field of REQUIRED) {
    if (!data[field].trim()) errors[field] = "This field is required.";
  }
  if (data.email.trim() && !EMAIL.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (data.message.trim() && data.message.trim().length < 12) {
    errors.message = "Tell us a little more — a sentence is plenty.";
  }
  return errors;
}

export function Contact() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<Field, string>;
    const data: Record<Field, string> = {
      firstName: raw.firstName ?? "",
      lastName: raw.lastName ?? "",
      email: raw.email ?? "",
      phone: raw.phone ?? "",
      company: raw.company ?? "",
      service: raw.service ?? "",
      message: raw.message ?? "",
    };

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = REQUIRED.find((f) => found[f]) ?? "firstName";
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setFailure("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Request failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setFailure(
        err instanceof Error && err.message !== "Request failed"
          ? err.message
          : "We couldn't send that. Please try again, or email us directly.",
      );
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="grain relative isolate scroll-mt-24 overflow-clip py-(--spacing-section) lg:py-(--spacing-section-lg)"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/media/contact-bg.jpg"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-bg)_0%,rgba(4,4,4,0.68)_26%,rgba(4,4,4,0.72)_74%,var(--color-bg)_100%)]"
      />
      <div className="grain-layer -z-10 opacity-25" aria-hidden="true" />

      <div className="container-page">
        <div className="flex flex-col items-center text-center">
          <Reveal as="h2" kind="up" id="contact-heading" className="display-2 text-ink">
            {contactIntro.heading}
          </Reveal>
          <Reveal as="p" kind="up" delay={0.09} className="lede mt-4 max-w-[32rem] text-balance">
            {contactIntro.body}{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {contact.email}
            </a>
          </Reveal>
        </div>

        <Reveal kind="up" delay={0.14} className="mx-auto mt-14 w-full max-w-[34rem] lg:mt-16">
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="rounded-2xl border border-line-2 bg-surface-2/80 p-10 text-center backdrop-blur-md"
                  role="status"
                >
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-accent-dim text-accent"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <h3 className="mt-5 text-[1.25rem] tracking-[-0.028em] text-ink">
                    Thanks — that's with us.
                  </h3>
                  <p className="mx-auto mt-3 max-w-[26rem] text-[0.875rem] leading-[1.7] text-ink-2">
                    A coordinator will reply within one working day. If it is urgent, call{" "}
                    <a href={contact.phoneHref} className="text-ink underline underline-offset-4">
                      {contact.phone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-7 text-[0.8125rem] text-ink-2 underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={false}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      uid={uid}
                      name="firstName"
                      label="first name"
                      placeholder="Jane"
                      autoComplete="given-name"
                      required
                      error={errors.firstName}
                    />
                    <TextField
                      uid={uid}
                      name="lastName"
                      label="last name"
                      placeholder="Smith"
                      autoComplete="family-name"
                      required
                      error={errors.lastName}
                    />
                  </div>

                  <TextField
                    uid={uid}
                    name="email"
                    type="email"
                    label="email"
                    placeholder="jane@company.com"
                    autoComplete="email"
                    required
                    error={errors.email}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      uid={uid}
                      name="phone"
                      type="tel"
                      label="phone"
                      placeholder="+1 (123) 456-7890"
                      autoComplete="tel"
                      error={errors.phone}
                    />
                    <TextField
                      uid={uid}
                      name="company"
                      label="company"
                      placeholder="Optional"
                      autoComplete="organization"
                      error={errors.company}
                    />
                  </div>

                  <SelectField uid={uid} name="service" label="service" />

                  <TextField
                    uid={uid}
                    name="message"
                    label="message"
                    placeholder="What are you moving, from where, and by when?"
                    required
                    multiline
                    error={errors.message}
                  />

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative mt-2 inline-flex h-[3.125rem] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-ink text-[0.875rem] font-medium leading-none text-[#080808] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-black/25 border-t-black/80"
                        />
                        sending
                      </>
                    ) : (
                      <>
                        send message
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p aria-live="polite" className="min-h-[1.25rem] text-center text-[0.8125rem] text-ink-3">
                    {status === "error" ? (
                      <span className="text-[#ff8f80]">{failure}</span>
                    ) : (
                      <>We reply within one working day.</>
                    )}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const fieldShell =
  "w-full rounded-xl border bg-white/[0.022] px-4 text-[0.875rem] text-ink placeholder:text-ink-3/80 " +
  "transition-[border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "focus:bg-white/[0.045] focus:outline-none";

function TextField({
  uid,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  required,
  multiline,
  error,
}: {
  uid: string;
  name: Field;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
  error?: string;
}) {
  const id = `${uid}-${name}`;
  const errorId = `${id}-error`;

  const tone = error
    ? "border-[#ff8f80]/55 focus:border-[#ff8f80] focus:shadow-[0_0_0_3px_rgba(255,143,128,0.12)]"
    : "border-line focus:border-line-3 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow tracking-[0.16em]">
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldShell} ${tone} resize-y py-3 leading-[1.6]`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldShell} ${tone} h-[3rem]`}
        />
      )}

      {error ? (
        <p id={errorId} className="text-[0.75rem] leading-tight text-[#ff8f80]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({ uid, name, label }: { uid: string; name: Field; label: string }) {
  const id = `${uid}-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow tracking-[0.16em]">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          className={`${fieldShell} border-line focus:border-line-3 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)] h-[3rem] appearance-none pr-11 [&>option]:bg-[#101011] [&>option]:text-ink`}
        >
          <option value="">Not sure yet</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-3"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor"
            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m4 6.5 4 4 4-4" />
          </svg>
        </span>
      </div>
    </div>
  );
}
