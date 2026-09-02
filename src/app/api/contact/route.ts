import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Validation and rate limiting happen here regardless of destination. Delivery
 * is intentionally pluggable: set CONTACT_WEBHOOK_URL (Zapier, Make, a Slack
 * incoming webhook, your CRM) and submissions are forwarded there. With no
 * webhook configured the submission is logged server-side and still accepted,
 * so the form is never a dead control in development.
 */

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 80, email: 160, phone: 40, company: 120, service: 80, message: 4000 };

type Payload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
};

/** Small in-memory throttle. Good enough for a single instance; swap for a
 *  shared store if you deploy to more than one region. */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function throttled(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (throttled(ip)) {
    return NextResponse.json(
      { error: "Too many messages from this address. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const payload: Payload = {
    firstName: clean(raw.firstName, MAX.name),
    lastName: clean(raw.lastName, MAX.name),
    email: clean(raw.email, MAX.email),
    phone: clean(raw.phone, MAX.phone),
    company: clean(raw.company, MAX.company),
    service: clean(raw.service, MAX.service),
    message: clean(raw.message, MAX.message),
  };

  const missing: string[] = [];
  if (!payload.firstName) missing.push("firstName");
  if (!payload.lastName) missing.push("lastName");
  if (!EMAIL.test(payload.email)) missing.push("email");
  if (payload.message.length < 12) missing.push("message");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Some details are missing or invalid.", fields: missing },
      { status: 422 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString(), source: "website" }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (error) {
      console.error("[contact] webhook delivery failed:", error);
      return NextResponse.json(
        { error: "We couldn't deliver that message. Please email us directly." },
        { status: 502 },
      );
    }
  } else {
    console.info(
      "[contact] no CONTACT_WEBHOOK_URL set — logging submission instead:",
      JSON.stringify({ ...payload, message: `${payload.message.slice(0, 120)}…` }),
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
