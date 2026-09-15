"use client";

import { useState } from "react";

import { contactPage } from "@/content/site";

type State = "idle" | "sending" | "sent" | "error";

/** The full enquiry form. Plain labelled inputs, one solid submit. */
export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [note, setNote] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(data.get("firstName") ?? ""),
          lastName: String(data.get("lastName") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          company: String(data.get("company") ?? ""),
          service: String(data.get("service") ?? ""),
          message: String(data.get("message") ?? ""),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setNote(body.error ?? "We couldn't send that. Please email us directly instead.");
        setState("error");
        return;
      }
      setNote("Thank you — your enquiry is with the desk and we'll reply shortly.");
      setState("sent");
      form.reset();
    } catch {
      setNote("We couldn't send that. Please email us directly instead.");
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-col form-col-6">
          <label htmlFor="firstName">First name</label>
          <input
            className="form-control"
            id="firstName"
            name="firstName"
            type="text"
            required
            maxLength={80}
            autoComplete="given-name"
          />
        </div>
        <div className="form-col form-col-6">
          <label htmlFor="lastName">Last name</label>
          <input
            className="form-control"
            id="lastName"
            name="lastName"
            type="text"
            required
            maxLength={80}
            autoComplete="family-name"
          />
        </div>
        <div className="form-col form-col-6">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
          />
        </div>
        <div className="form-col form-col-6">
          <label htmlFor="phone">Phone number</label>
          <input
            className="form-control"
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            autoComplete="tel"
          />
        </div>
        <div className="form-col form-col-6">
          <label htmlFor="company">Organization name</label>
          <input
            className="form-control"
            id="company"
            name="company"
            type="text"
            maxLength={120}
            autoComplete="organization"
          />
        </div>
        <div className="form-col form-col-6">
          <label htmlFor="service">What do you need?</label>
          <select className="form-control" id="service" name="service" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {contactPage.serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-col">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            required
            minLength={12}
            maxLength={4000}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-px-4 btn-py-2" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send Enquiry"}
      </button>

      <p
        className={`form-note${state === "error" ? " is-error" : ""}${state === "sent" ? " is-success" : ""}`}
        style={{ textAlign: "left" }}
        role="status"
        aria-live="polite"
      >
        {note}
      </p>
    </form>
  );
}
