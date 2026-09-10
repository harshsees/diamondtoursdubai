export type Errors<T extends string> = Partial<Record<T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Digits, spaces and the usual separators; 7–15 digits once stripped (E.164 range). */
const PHONE_ALLOWED = /^[+()\d\s.-]+$/;

export function isEmail(value: string) {
  return EMAIL.test(value.trim());
}

export function isPhone(value: string) {
  const trimmed = value.trim();
  if (!PHONE_ALLOWED.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  organisation?: string;
  subject?: string;
  message: string;
};

/**
 * Shared by the client form and the API route, so a request that bypasses the
 * browser is validated the same way.
 */
export function validateEnquiry(
  values: Partial<EnquiryFields>,
  { requireMessage = true } = {},
): Errors<keyof EnquiryFields> {
  const errors: Errors<keyof EnquiryFields> = {};

  if (!values.name?.trim()) {
    errors.name = "Please tell us your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "That name looks too short.";
  }

  if (!values.email?.trim()) {
    errors.email = "We need an email address to reply to.";
  } else if (!isEmail(values.email)) {
    errors.email = "That does not look like a valid email address.";
  }

  if (!values.phone?.trim()) {
    errors.phone = "Please add a phone number.";
  } else if (!isPhone(values.phone)) {
    errors.phone = "Please enter a valid phone number, including the country code.";
  }

  if (requireMessage) {
    if (!values.message?.trim()) {
      errors.message = "Tell us briefly what you need.";
    } else if (values.message.trim().length < 10) {
      errors.message = "A little more detail would help us reply properly.";
    }
  }

  return errors;
}

export const hasErrors = (errors: Record<string, string | undefined>) =>
  Object.values(errors).some(Boolean);
