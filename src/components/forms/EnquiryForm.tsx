"use client";

import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { hasErrors, validateEnquiry, type EnquiryFields } from "@/lib/validation";
import { services } from "@/data/services";

type Status = "idle" | "submitting" | "success" | "error";

const empty: EnquiryFields = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  subject: "",
  message: "",
};

type Props = {
  /** "callback" is the compact home-page variant; "full" is the contact page. */
  variant?: "callback" | "full";
  /** Preselects the subject, e.g. from a tour detail page. */
  defaultSubject?: string;
  submitLabel?: string;
  className?: string;
};

export function EnquiryForm({
  variant = "full",
  defaultSubject = "",
  submitLabel,
  className = "",
}: Props) {
  const formId = useId();
  const [values, setValues] = useState<EnquiryFields>({
    ...empty,
    subject: defaultSubject,
  });
  const [errors, setErrors] = useState<ReturnType<typeof validateEnquiry>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const isCallback = variant === "callback";
  const requireMessage = !isCallback;

  const update = (field: keyof EnquiryFields, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear the error as soon as the field is touched again.
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validateEnquiry(values, { requireMessage });
    setErrors(found);
    if (hasErrors(found)) {
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: variant }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        if (payload?.errors) {
          setErrors(payload.errors);
          setStatus("idle");
          return;
        }
        throw new Error("Request failed");
      }

      setStatus("success");
      setValues({ ...empty, subject: defaultSubject });
    } catch {
      setStatus("error");
      setServerError(
        "We could not send that just now. Please try again, or email us directly.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className={`border border-line bg-canvas p-8 text-center sm:p-10 ${className}`}
        role="status"
      >
        <CheckCircle2
          aria-hidden="true"
          strokeWidth={1.3}
          className="mx-auto h-10 w-10 text-success"
        />
        <h3 className="mt-5 text-[1.25rem]">Thank you — we have your enquiry</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
          A member of the team will be in touch within one working day. If it is
          urgent, please call us instead.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-accent underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
          required
        />

        <TextField
          label={isCallback ? "Organisation" : "Company or organisation"}
          name="organisation"
          autoComplete="organization"
          optional
          value={values.organisation}
          onChange={(event) => update("organisation", event.target.value)}
        />

        <TextField
          label="Email address"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          error={errors.email}
          required
        />

        <TextField
          label="Phone number"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+971 50 000 0000"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          error={errors.phone}
          required
        />

        {!isCallback ? (
          <div className="sm:col-span-2">
            <SelectField
              label="What is this about?"
              name="subject"
              optional
              value={values.subject}
              onChange={(event) => update("subject", event.target.value)}
            >
              <option value="">Please choose</option>
              {services.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </SelectField>
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <TextArea
            label={isCallback ? "What should we call about?" : "Your requirement"}
            name="message"
            rows={isCallback ? 3 : 6}
            optional={isCallback}
            placeholder={
              isCallback
                ? "Travel dates, group size, anything useful."
                : "Dates, number of travellers, hotels, tours, visas — whatever you already know."
            }
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            error={errors.message}
          />
        </div>
      </div>

      {serverError ? (
        <p
          role="alert"
          className="mt-5 border border-danger/30 bg-danger/5 px-4 py-3 text-[0.875rem] text-danger"
        >
          {serverError}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting"
            ? "Sending…"
            : (submitLabel ?? (isCallback ? "Call me back" : "Send enquiry"))}
        </Button>

        <p className="text-[0.8125rem] leading-relaxed text-ink-3" id={`${formId}-note`}>
          We reply within one working day. Your details are never shared.
        </p>
      </div>
    </form>
  );
}
