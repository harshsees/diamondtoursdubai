import { NextResponse } from "next/server";
import { hasErrors, validateEnquiry, type EnquiryFields } from "@/lib/validation";

/**
 * Enquiry endpoint.
 *
 * Validation and the client contract are complete. Delivery is not wired up:
 * drop your transport of choice into `deliver()` below (SMTP via Nodemailer,
 * Resend, a CRM webhook) and add the credentials to .env.local.
 */
export async function POST(request: Request) {
  let body: Partial<EnquiryFields> & { source?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const requireMessage = body.source !== "callback";
  const errors = validateEnquiry(body, { requireMessage });

  if (hasErrors(errors)) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    await deliver(body as EnquiryFields & { source?: string });
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json(
      { error: "We could not send that just now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function deliver(enquiry: EnquiryFields & { source?: string }) {
  // TODO: replace with real delivery before go-live.
  console.info("[enquiry] received", {
    source: enquiry.source ?? "unknown",
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    organisation: enquiry.organisation || undefined,
    subject: enquiry.subject || undefined,
    receivedAt: new Date().toISOString(),
  });
}
