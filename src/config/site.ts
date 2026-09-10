/**
 * Every business fact on the site lives here.
 * Editing this file re-labels the entire website — no component changes needed.
 */

export const site = {
  name: "Meridian Travel",
  legalName: "Meridian Destination Management LLC",
  shortName: "Meridian",
  tagline: "Destination management, done properly.",
  description:
    "A destination management company creating tailor-made travel programmes, guided tours and visa support across the UAE.",
  url: "https://www.example.com",
  locale: "en_AE",

  contact: {
    phone: "+971 4 000 0000",
    phoneHref: "+97140000000",
    whatsapp: "+971 50 000 0000",
    whatsappHref: "971500000000",
    email: "hello@example.com",
    salesEmail: "reservations@example.com",
    address: {
      line1: "Office 000, Business Tower",
      line2: "Sheikh Zayed Road",
      city: "Dubai",
      country: "United Arab Emirates",
      poBox: "P.O. Box 00000",
    },
    hours: [
      { days: "Monday – Friday", time: "09:00 – 18:00" },
      { days: "Saturday", time: "10:00 – 15:00" },
      { days: "Sunday", time: "Closed" },
    ],
    mapQuery: "Sheikh Zayed Road, Dubai, United Arab Emirates",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],

  /** Short notices shown in the slim utility bar above the header. */
  announcements: [
    "Now taking bookings for the 2026 – 2027 season.",
    "Airport meet & greet available on every transfer.",
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Visa", href: "/visa" },
  { label: "Tours", href: "/tours" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof nav)[number];
