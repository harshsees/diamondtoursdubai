"use client";

import { useState } from "react";

import { callback } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";

type State = "idle" | "sending" | "sent" | "error";

/**
 * The single-row callback request. Conventional inputs, visible placeholders
 * paired with off-screen labels, one solid submit — no floating labels.
 */
export function CallbackForm() {
  const [state, setState] = useState<State>("idle");

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
          firstName: String(data.get("name") ?? ""),
          lastName: "—",
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          company: String(data.get("company") ?? ""),
          service: "Call back request",
          message: `Call back requested by ${data.get("name")} at ${data.get("company")}. Phone: ${data.get("phone")}.`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <SectionHeading level={3} strong={callback.heading} />
      <div className="row">
        <div className="col">
          <form className="callback-form" onSubmit={onSubmit} noValidate={false}>
            {callback.fields.map((field) => (
              <div className="form-group" key={field.name}>
                <label className="sr-only" htmlFor={`cb-${field.name}`}>
                  {field.label}
                </label>
                <input
                  className="form-control"
                  id={`cb-${field.name}`}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={
                    field.name === "email"
                      ? "email"
                      : field.name === "phone"
                        ? "tel"
                        : field.name === "company"
                          ? "organization"
                          : "name"
                  }
                />
              </div>
            ))}

            <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : callback.submit}
            </button>

            <p
              className={`form-note${state === "error" ? " is-error" : ""}${state === "sent" ? " is-success" : ""}`}
              role="status"
              aria-live="polite"
            >
              {state === "sent" ? callback.success : state === "error" ? callback.error : ""}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
