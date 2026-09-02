/**
 * Every piece of copy, contact detail and list on the site lives here.
 * Components only ever map over this file — nothing is hard-coded in JSX.
 *
 * Swapping in the real business identity means editing this one file.
 */

export const brand = {
  /** Wordmark shown in the navigation and footer. */
  name: "MERIDIAN",
  /** Legal / full name used in metadata and the copyright line. */
  legalName: "Meridian Export Co.",
  /** One line, used under the footer mark and in structured data. */
  descriptor:
    "Cross-border trade specialists moving high-value cargo — vehicles, heavy machinery and industrial commodities.",
  /** Change this to your deployed origin before going live. */
  url: "https://meridianexport.com",
  founded: 2014,
} as const;

export const contact = {
  email: "deals@meridianexport.com",
  phone: "+1 (647) 555-0180",
  phoneHref: "tel:+16475550180",
  address: {
    line: "Unit 400, 120 Harbour Way",
    city: "Toronto, ON",
    country: "Canada",
  },
  hours: "Mon – Fri · 08:00 – 18:00 EST",
} as const;

export const social = [
  { label: "Instagram", handle: "@meridian.export", href: "https://www.instagram.com/" },
  { label: "LinkedIn", handle: "Meridian Export Co.", href: "https://www.linkedin.com/" },
] as const;

export const nav = [
  { label: "discover", href: "#discover" },
  { label: "services", href: "#services" },
  { label: "process", href: "#process" },
  { label: "connect", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "global trade · handled end to end",
  headline: ["import & export,", "without friction"],
  body: "We are trade specialists in high-value cargo — motor vehicles, heavy machinery, marine craft and industrial commodities — moved across borders and cleared without surprises.",
  primary: { label: "learn more", href: "#discover" },
  secondary: { label: "contact us", href: "#contact" },
} as const;

/* -------------------------------------------------------------------------- */
/* positioning                                                                */
/* -------------------------------------------------------------------------- */

export const positioning = {
  heading: ["we are cross-border", "trade professionals"],
  body: "Meridian Export Co. handles the sourcing, movement and clearance of premium assets and commodities. Everything below is what that actually means in practice.",
  cta: { label: "our services", href: "#services" },
  pillars: [
    {
      title: "global network",
      body: "Working out of Toronto with vetted suppliers, brokers and carriers across North America, South America, Europe, the Gulf and East Asia. One counterparty, every leg of the route.",
    },
    {
      title: "sector expertise",
      body: "Two decades moving motor vehicles, construction and agricultural machinery, watercraft and consumable goods — cargo where paperwork, valuation and handling all have to be right first time.",
    },
    {
      title: "obsessive execution",
      body: "Every consignment is tracked against a single plan: sourcing, inspection, freight, customs and final handover, with one named contact accountable for it end to end.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* services                                                                   */
/* -------------------------------------------------------------------------- */

export type Service = {
  id: string;
  index: string;
  icon: "freight" | "sourcing" | "compliance";
  title: string;
  summary: string;
  detail: {
    lead: string;
    body: string;
    points: string[];
    closingTitle: string;
    closing: string;
  };
};

export const services: Service[] = [
  {
    id: "freight",
    index: "01",
    icon: "freight",
    title: "freight & logistics",
    summary:
      "Ocean, road and breakbulk movement for cargo that does not fit a standard pallet — planned, insured and tracked to the door.",
    detail: {
      lead: "End-to-end movement for vehicles, machinery and oversized assets.",
      body: "We plan the route before the cargo moves: mode selection, lashing and stowage, marine insurance, port handling and inland delivery. Container, RoRo and flat-rack options are priced side by side so you can see the real landed cost rather than a headline freight rate.",
      points: [
        "Container, RoRo, flat-rack and breakbulk options priced together",
        "Marine and inland transit cover arranged on your behalf",
        "Port handling, storage and last-mile delivery coordinated as one job",
        "Milestone tracking with a named coordinator on every consignment",
      ],
      closingTitle: "get started today",
      closing:
        "Send us the origin, destination and what you are moving. You will get a costed routing option — not a placeholder quote — inside two working days.",
    },
  },
  {
    id: "sourcing",
    index: "02",
    icon: "sourcing",
    title: "sourcing & procurement",
    summary:
      "Finding, inspecting and negotiating the asset itself — from a single specialist vehicle to a full fleet or production run.",
    detail: {
      lead: "Procurement handled by people who know what the asset should cost.",
      body: "We start from a written requirement, run the market, shortlist suppliers and negotiate on your behalf. Every unit is inspected and documented before funds move, and we hold the supplier to the specification you signed off rather than the one they would prefer to ship.",
      points: [
        "Written requirement and budget agreed before we approach the market",
        "Supplier vetting, references and independent pre-shipment inspection",
        "Price and terms negotiated on your behalf, with the workings shown",
        "Specialist and low-volume orders welcomed, not deprioritised",
      ],
      closingTitle: "get started today",
      closing:
        "Tell us the specification and the ceiling you are working to. We will come back with a shortlist, condition reports and a landed price per unit.",
    },
  },
  {
    id: "compliance",
    index: "03",
    icon: "compliance",
    title: "customs & compliance",
    summary:
      "Classification, documentation and clearance — the part that quietly decides whether a shipment arrives on time or sits on a quay.",
    detail: {
      lead: "Documentation prepared properly, the first time.",
      body: "HS classification, valuation, certificates of origin, export licences, sanctions and dual-use screening, plus AML and KYC checks on both sides of the deal. We prepare and lodge the entry, and we keep the file so that a future audit is a filing exercise rather than an investigation.",
      points: [
        "HS classification and customs valuation reviewed before booking",
        "Certificates of origin, licences and permits obtained and lodged",
        "Sanctions, dual-use and end-user screening on every counterparty",
        "Full document pack retained and handed over at completion",
      ],
      closingTitle: "get started today",
      closing:
        "If a shipment is already stuck, send us the paperwork you have. We will tell you what is missing and what it will take to release it.",
    },
  },
];

/* -------------------------------------------------------------------------- */
/* process                                                                    */
/* -------------------------------------------------------------------------- */

export type ProcessStep = {
  index: string;
  icon: "meeting" | "verify" | "quote" | "contract" | "freight" | "handover";
  title: string;
  body: string;
};

export const processIntro = {
  heading: "our process",
  body: "We prioritise transparency and security on every transaction by working through the same six steps, in the same order, every time.",
  cta: { label: "get in touch", href: "#contact" },
} as const;

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    icon: "meeting",
    title: "introduction call",
    body: "We start with a conversation rather than a form. A video or in-person meeting to understand the cargo, the route, the timeline and the commercial pressure you are actually under.",
  },
  {
    index: "02",
    icon: "verify",
    title: "aml & kyc verification",
    body: "Anti-money-laundering and know-your-customer checks on both sides. Company documents exchanged, beneficial ownership confirmed and identities verified so the transaction stands up to scrutiny later.",
  },
  {
    index: "03",
    icon: "quote",
    title: "sourcing & quotation",
    body: "We run the market, inspect what matters and return a landed cost — goods, freight, duty, handling and our fee, itemised. No estimate becomes a surprise at the invoice stage.",
  },
  {
    index: "04",
    icon: "contract",
    title: "contracts & payment",
    body: "Terms in writing before anything moves. Depending on the deal we work against a letter of credit, escrow or staged payment so both parties are protected until their obligations are met.",
  },
  {
    index: "05",
    icon: "freight",
    title: "freight & customs",
    body: "Booking, loading, lashing and sailing — then classification, entry and clearance at destination. You get milestone updates at each leg rather than silence between ports.",
  },
  {
    index: "06",
    icon: "handover",
    title: "delivery & handover",
    body: "Final-mile delivery, condition check on arrival and the complete document pack handed over. We stay on the file until you confirm the asset is where it should be, as specified.",
  },
];

/* -------------------------------------------------------------------------- */
/* sectors rail                                                               */
/* -------------------------------------------------------------------------- */

export const sectors = [
  { label: "motor vehicles", icon: "car" },
  { label: "heavy machinery", icon: "excavator" },
  { label: "marine craft", icon: "boat" },
  { label: "agricultural plant", icon: "tractor" },
  { label: "industrial commodities", icon: "drum" },
  { label: "aviation parts", icon: "plane" },
] as const;

/* -------------------------------------------------------------------------- */
/* faq                                                                        */
/* -------------------------------------------------------------------------- */

export const faqIntro = {
  heading: "frequently asked questions",
  body: "Curious about how we work? Start here.",
} as const;

export const faqs = [
  {
    q: "What is the easiest way to import a vehicle?",
    a: "Send us the vehicle details, the country it is coming from and where it needs to end up. We confirm whether it is admissible, classify it, price the landed cost including duty and compliance work, and then handle collection, shipping, clearance and delivery. In practice you sign off a quote and a set of documents, and we do the rest.",
  },
  {
    q: "Which countries do you operate between?",
    a: "We are based in Toronto and regularly move cargo between North America, South America, Western Europe, the Gulf states and East Asia. If a route is new to us we will say so, and we will tell you what additional lead time and licensing it is likely to carry before you commit.",
  },
  {
    q: "How long does a typical shipment take?",
    a: "Sourcing usually takes one to three weeks depending on how specialist the asset is. Ocean freight is typically two to six weeks by lane, and clearance is one to five working days when the documentation is prepared properly in advance. We give you a dated plan at quotation stage rather than a range.",
  },
  {
    q: "How is payment structured and protected?",
    a: "It depends on the size and the counterparty. For most transactions we work against a letter of credit or a staged payment tied to inspection and loading milestones. Funds are released as obligations are met, and the structure is agreed in writing before anything moves.",
  },
  {
    q: "Do you handle one-off orders as well as ongoing volume?",
    a: "Yes. A single specialist machine or one vehicle gets the same process as a recurring programme — the same compliance checks, the same itemised quote and the same named coordinator. Smaller consignments simply carry a proportionally higher fixed cost, which we show you up front.",
  },
  {
    q: "What happens if a shipment is delayed or held at customs?",
    a: "Your coordinator tells you the same day, with the reason and the options. Most holds come down to classification, valuation or a missing certificate, and we resolve those directly with the broker and the authority. You are not left to chase a reference number.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* testimonials                                                               */
/* -------------------------------------------------------------------------- */

export const reviewsIntro = {
  heading: "reviews from clients",
  body: "Here's what people who have shipped with us have to say.",
} as const;

export type Review = {
  quote: string;
  body: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    quote: "They found the machine nobody else could.",
    body: "We needed a discontinued crawler crane in working condition and had been quoted twelve weeks by two other brokers. Meridian sourced one, inspected it, and had it on a vessel inside a month.",
    name: "Daniel Okafor",
    role: "Plant Director, Verrick Civils",
    initials: "DO",
    rating: 5,
  },
  {
    quote: "The paperwork was the part I was dreading.",
    body: "Classification, origin certificates, the lot — handled without me chasing anyone. First shipment cleared in two days and every one since has been the same.",
    name: "Priya Raghunath",
    role: "Head of Supply, Northbay Marine",
    initials: "PR",
    rating: 5,
  },
  {
    quote: "One contact, the whole way through.",
    body: "Four vehicles from Germany to Ontario. Same coordinator from the first call to the handover, and the landed cost came in within two percent of the original quote.",
    name: "Marc Delacroix",
    role: "Founder, Atelier Motors",
    initials: "MD",
    rating: 5,
  },
  {
    quote: "They told us the honest answer.",
    body: "We asked about a lane they had not run before and they said so, gave us the realistic lead time, then delivered against it. That kind of straightness is rare in freight.",
    name: "Hannah Weiss",
    role: "Operations Lead, Kessler Agri",
    initials: "HW",
    rating: 5,
  },
  {
    quote: "Our containers stopped sitting on the quay.",
    body: "We moved three years of recurring volume across after one trial shipment. Demurrage has essentially gone away and I get a milestone update before I think to ask for one.",
    name: "Tomás Ferreira",
    role: "Procurement Manager, Aurelio Group",
    initials: "TF",
    rating: 5,
  },
] as const;

/* -------------------------------------------------------------------------- */
/* field grid                                                                 */
/* -------------------------------------------------------------------------- */

export const fieldIntro = {
  heading: "from the field",
  body: "Ports, yards and handovers from recent consignments.",
} as const;

export const fieldImages = [
  { src: "/media/field-01.jpg", alt: "Stacked shipping containers receding into port fog" },
  { src: "/media/field-02.jpg", alt: "Gantry cranes silhouetted against a dusk sky" },
  { src: "/media/field-03.jpg", alt: "A freight vehicle approaching on an unlit night road" },
  { src: "/media/field-04.jpg", alt: "Close detail of heavy machinery under raking light" },
  { src: "/media/field-05.jpg", alt: "Port terminal lights reflected on still water at night" },
  { src: "/media/field-06.jpg", alt: "Corrugated container steel lit from one side" },
] as const;

/* -------------------------------------------------------------------------- */
/* contact + closing                                                          */
/* -------------------------------------------------------------------------- */

export const contactIntro = {
  heading: "get in touch",
  body: "Fill in the form below, or email us directly — either reaches the same desk.",
} as const;

export const serviceOptions = [
  "Freight & logistics",
  "Sourcing & procurement",
  "Customs & compliance",
  "Something else",
] as const;

export const closing = {
  heading: ["ready to move", "your cargo?"],
  body: "We're ready to talk whenever you are.",
  cta: { label: "get started", href: "#contact" },
} as const;

export const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;
