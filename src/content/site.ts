/**
 * Every piece of copy, contact detail and list on the site lives here.
 * Components only ever map over this file — nothing is hard-coded in JSX.
 *
 * Swapping in the real business identity means editing this one file. Items
 * marked PLACEHOLDER are deliberately neutral and are meant to be replaced
 * with real business information before launch.
 */

export const brand = {
  /** Wordmark shown in the navigation and footer. */
  name: "MERIDIAN",
  /** Second line of the logo lockup. */
  nameSub: "EXPORT CO.",
  /** Legal / full name used in metadata and the copyright line. */
  legalName: "Meridian Export Co.",
  /** One line, used in structured data. */
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
  website: "www.meridianexport.com",
  officeLabel: "Toronto Office",
  address: {
    company: "Meridian Export Co.",
    line1: "Cross-Border Trade & Freight Forwarding",
    line2: "Unit 400, 120 Harbour Way",
    line3: "Toronto, ON, Canada",
  },
  hours: "Mon – Fri · 08:00 – 18:00 EST",
} as const;

export const social = [
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/" },
  { label: "Twitter", icon: "twitter", href: "https://twitter.com/" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/" },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Compliance", href: "/compliance" },
  { label: "Cargo", href: "/cargo" },
  { label: "Contact us", href: "/contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* announcement ticker                                                        */
/* -------------------------------------------------------------------------- */

/** PLACEHOLDER — short operational notices, rotated one at a time. */
export const announcements = [
  "Q3 sailing schedules for the North Atlantic lanes are now published.",
  "Our desk is open Mon – Fri, 08:00 – 18:00 EST for booking and clearance queries.",
] as const;

/* -------------------------------------------------------------------------- */
/* hero slider                                                                */
/* -------------------------------------------------------------------------- */

export const heroSlides = [
  {
    src: "/media/slides/slide-01.jpg",
    alt: "A container ship alongside a terminal, worked by ship-to-shore gantry cranes",
  },
  { src: "/media/slides/slide-02.jpg", alt: "Quayside cranes silhouetted against a dusk sky" },
  {
    src: "/media/slides/slide-03.jpg",
    alt: "A roll-on roll-off vessel with its stern ramp lowered onto the quay",
  },
  { src: "/media/slides/slide-04.jpg", alt: "Aerial view of a container terminal and its berths" },
  {
    src: "/media/slides/slide-05.jpg",
    alt: "A container freight train curving away from a terminal",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* intro band                                                                 */
/* -------------------------------------------------------------------------- */

export const intro = {
  /** Rendered in the script face, exactly as the reference treats its city name. */
  highlight: "Toronto",
  body: "based, working every leg of the route — sourcing, ocean and inland freight, customs clearance and final handover for cargo that does not fit a standard pallet.",
  sub: "See the full range of what we move.",
  primary: { label: "Request A Quote!", href: "/contact" },
  secondary: { label: "learn more.", href: "/about" },
} as const;

/* -------------------------------------------------------------------------- */
/* know the difference                                                        */
/* -------------------------------------------------------------------------- */

export type Difference = { icon: string; title: string };

export const differenceHeading = { lead: "Know The", strong: "Difference" } as const;

export const differences: Difference[] = [
  { icon: "coordinator", title: "Named Coordinator On Every Consignment" },
  { icon: "quote", title: "Landed Cost Quoted, Not Estimated" },
  { icon: "verify", title: "AML & KYC On Both Sides" },
  { icon: "inspect", title: "Pre-Shipment Inspection Before Funds Move" },
  { icon: "classify", title: "HS Classification Before Booking" },
  { icon: "insure", title: "Marine & Inland Transit Cover" },
  { icon: "modes", title: "Container, RoRo, Flat-Rack And Breakbulk" },
  { icon: "escrow", title: "Letter Of Credit And Escrow Structures" },
  { icon: "documents", title: "Full Document Pack Handed Over" },
];

/* -------------------------------------------------------------------------- */
/* who we are                                                                 */
/* -------------------------------------------------------------------------- */

export const whoWeAre = {
  lead: "Who",
  strong: "We Are?",
  paragraphs: [
    "Welcome to Meridian Export Co., a cross-border trade company based in Canada and headquartered in Toronto. We handle the sourcing, movement and clearance of premium assets and commodities for corporate buyers and private clients, with a variety of routings built around what is actually being shipped. We specialise in high-value cargo — motor vehicles, heavy machinery, marine craft and industrial commodities. Every consignment is planned to suit the requirements of our customers.",
    "We treat every file the same way: one plan, one named contact, and a landed cost you can hold us to from quotation through to handover.",
  ],
  cta: { label: "LEARN MORE", href: "/about" },
  images: [
    { src: "/media/about/about-01.jpg", alt: "Aerial view of a container terminal and its berths" },
    { src: "/media/about/about-02.jpg", alt: "Gantry cranes working a container ship alongside" },
    { src: "/media/about/about-03.jpg", alt: "A container truck at a terminal inspection point" },
    { src: "/media/about/about-04.jpg", alt: "Containers loaded on a freight train" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* numbered pill lists                                                        */
/* -------------------------------------------------------------------------- */

export const cargoHeading = { lead: "Cargo We", strong: "Move" } as const;

export const cargoTypes = [
  "Passenger Vehicles",
  "Commercial Trucks",
  "Excavators",
  "Wheel Loaders",
  "Crawler Cranes",
  "Bulldozers",
  "Motor Graders",
  "Forklifts",
  "Agricultural Tractors",
  "Combine Harvesters",
  "Balers & Implements",
  "Generator Sets",
  "Marine Craft",
  "Outboard Engines",
  "Aviation Parts",
  "Steel Coil",
  "Structural Steel",
  "Aluminium Ingot",
  "Copper Cathode",
  "Polymer Resin",
  "Industrial Fasteners",
  "Bearings & Drivetrain",
  "Spare Parts Kits",
  "Project Cargo",
] as const;

export const servicesHeading = { lead: "What We Handle In", strong: "Cross-Border Trade" } as const;

export const serviceItems = [
  "Ocean Freight",
  "RoRo Shipping",
  "Flat-Rack & Breakbulk",
  "Container Consolidation",
  "Inland Trucking",
  "Rail Drayage",
  "Port Handling",
  "Bonded Warehousing",
  "Marine Cargo Insurance",
  "Supplier Sourcing",
  "Pre-Shipment Inspection",
  "Price Negotiation",
  "HS Classification",
  "Customs Valuation",
  "Certificates Of Origin",
  "Export Licensing",
  "Sanctions Screening",
  "AML & KYC Checks",
  "Letter Of Credit Support",
  "Final-Mile Delivery",
] as const;

export const lanesHeading = { lead: "Trade Lanes We", strong: "Serve" } as const;

/** Only the regions the business actually runs. Add to this list as lanes open. */
export const lanes = [
  "North America",
  "South America",
  "Western Europe",
  "The Gulf States",
  "East Asia",
] as const;

/* -------------------------------------------------------------------------- */
/* callback form                                                              */
/* -------------------------------------------------------------------------- */

export const callback = {
  heading: "Request a call back",
  fields: [
    { name: "name", type: "text", label: "Your Name", placeholder: "Your Name", required: true },
    {
      name: "company",
      type: "text",
      label: "Organization Name",
      placeholder: "Organization Name",
      required: true,
    },
    { name: "phone", type: "tel", label: "Phone Number", placeholder: "Phone Number", required: true },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "Email Address",
      required: true,
    },
  ],
  submit: "Call Me",
  success: "Thank you — we have your details and will call you back.",
  error: "We couldn't send that. Please email us directly instead.",
} as const;

/* -------------------------------------------------------------------------- */
/* footer                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * The reference lists awards here. This business has none on record, so the
 * column carries verifiable working commitments instead — same structure, no
 * invented credentials. Replace with real awards if and when there are any.
 */
export const credentialsHeading = "Our Commitments";

export const credentials = [
  { title: "One named coordinator", note: "every file" },
  { title: "Itemised landed cost", note: "no surprises" },
  { title: "AML & KYC verified", note: "both sides" },
  { title: "Independent inspection", note: "before funds move" },
  { title: "Milestone updates", note: "every leg" },
  { title: "Full document pack", note: "handed over" },
] as const;

export const newsletter = {
  heading: "Newsletter",
  body: "Stay up to date with our lane openings & rate notices.",
  placeholder: "Email Address",
  submit: "GO!",
  success: "You've been added to our email list.",
} as const;

export const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

/* -------------------------------------------------------------------------- */
/* inner pages                                                                */
/* -------------------------------------------------------------------------- */

export const pageBanners = {
  about: { title: "About us", image: "/media/banners/about.jpg" },
  services: { title: "Our Services", image: "/media/banners/services.jpg" },
  compliance: { title: "Compliance", image: "/media/banners/compliance.jpg" },
  cargo: { title: "Cargo", image: "/media/banners/cargo.jpg" },
  contact: { title: "Contact us", image: "/media/banners/contact.jpg" },
  legal: { title: "Legal", image: "/media/banners/about.jpg" },
} as const;

export const aboutPage = {
  lede1: { lead: "Moving Cargo Across", highlight: "Borders" },
  lede: "Meridian Export Co. is a cross-border trade company operating out of Toronto, Ontario. We source, ship and clear high-value cargo for corporate buyers and private clients, working every leg of the route as a single counterparty.",
  cta: { label: "Make Enquiry!", href: "/contact" },
  sections: [
    {
      lead: "Who",
      strong: "We Are!",
      paragraphs: [
        "Meridian Export Co. handles the sourcing, movement and clearance of premium assets and commodities. Working out of Toronto with vetted suppliers, brokers and carriers across North America, South America, Western Europe, the Gulf and East Asia — one counterparty, every leg of the route.",
        "Two decades moving motor vehicles, construction and agricultural machinery, watercraft and consumable goods — cargo where paperwork, valuation and handling all have to be right first time.",
      ],
    },
    {
      lead: "How",
      strong: "We Work!",
      paragraphs: [
        "Every consignment is tracked against a single plan: sourcing, inspection, freight, customs and final handover, with one named contact accountable for it end to end.",
        "We prioritise transparency and security on every transaction. Terms go in writing before anything moves, and depending on the deal we work against a letter of credit, escrow or staged payment so both parties are protected until their obligations are met.",
      ],
    },
  ],
} as const;

export type ServiceDetail = {
  id: string;
  icon: string;
  title: string;
  summary: string;
  points: string[];
};

export const servicesPage = {
  lede: "From sourcing the asset to lodging the customs entry, we cover the whole route. Freight, procurement and compliance are run by the same desk, so nothing falls between two suppliers.",
  headingLead: "Our ultimate objective is",
  headingStrong: "A Landed Cost You Can Hold Us To.",
  cta: { label: "Make Enquiry!", href: "/contact" },
  items: [
    {
      id: "freight",
      icon: "modes",
      title: "Freight & Logistics",
      summary:
        "Ocean, road and breakbulk movement for cargo that does not fit a standard pallet — planned, insured and tracked to the door.",
      points: [
        "Container, RoRo, flat-rack and breakbulk options priced together",
        "Marine and inland transit cover arranged on your behalf",
        "Port handling, storage and last-mile delivery coordinated as one job",
        "Milestone tracking with a named coordinator on every consignment",
      ],
    },
    {
      id: "sourcing",
      icon: "inspect",
      title: "Sourcing & Procurement",
      summary:
        "Finding, inspecting and negotiating the asset itself — from a single specialist vehicle to a full fleet or production run.",
      points: [
        "Written requirement and budget agreed before we approach the market",
        "Supplier vetting, references and independent pre-shipment inspection",
        "Price and terms negotiated on your behalf, with the workings shown",
        "Specialist and low-volume orders welcomed, not deprioritised",
      ],
    },
    {
      id: "compliance",
      icon: "documents",
      title: "Customs & Compliance",
      summary:
        "Classification, documentation and clearance — the part that quietly decides whether a shipment arrives on time or sits on a quay.",
      points: [
        "HS classification and customs valuation reviewed before booking",
        "Certificates of origin, licences and permits obtained and lodged",
        "Sanctions, dual-use and end-user screening on every counterparty",
        "Full document pack retained and handed over at completion",
      ],
    },
  ] as ServiceDetail[],
} as const;

export const compliancePage = {
  lede: "Documentation prepared properly, the first time. Classification, valuation, screening and clearance are handled in-house rather than passed to a third party after the cargo has already moved.",
  cta: { label: "Make Enquiry!", href: "/contact" },
  steps: [
    {
      index: "01",
      title: "Counterparty Screening",
      body: "Anti-money-laundering and know-your-customer checks on both sides. Company documents exchanged, beneficial ownership confirmed and identities verified so the transaction stands up to scrutiny later.",
    },
    {
      index: "02",
      title: "Classification & Valuation",
      body: "HS classification and customs valuation reviewed before booking, so the duty line in your quotation is the duty line on the entry.",
    },
    {
      index: "03",
      title: "Licences & Certificates",
      body: "Certificates of origin, export licences and permits obtained and lodged. Sanctions, dual-use and end-user screening run on every counterparty.",
    },
    {
      index: "04",
      title: "Entry & Clearance",
      body: "We prepare and lodge the entry at destination. Most holds come down to classification, valuation or a missing certificate, and we resolve those directly with the broker and the authority.",
    },
    {
      index: "05",
      title: "Records & Handover",
      body: "The full document pack is retained and handed over at completion, so a future audit is a filing exercise rather than an investigation.",
    },
  ],
} as const;

export const cargoPage = {
  lede: "Motor vehicles, construction and agricultural machinery, watercraft, aviation parts and industrial commodities — cargo where paperwork, valuation and handling all have to be right first time.",
  cta: { label: "Make Enquiry!", href: "/contact" },
  groups: [
    {
      title: "Vehicles & Plant",
      items: [
        "Passenger vehicles and light commercials",
        "Commercial trucks and trailers",
        "Excavators, loaders and dozers",
        "Crawler and mobile cranes",
        "Forklifts and material handlers",
      ],
    },
    {
      title: "Agricultural & Marine",
      items: [
        "Tractors and combine harvesters",
        "Balers, ploughs and implements",
        "Powerboats and small craft",
        "Outboard and inboard engines",
        "Trailers and launching gear",
      ],
    },
    {
      title: "Industrial Commodities",
      items: [
        "Steel coil and structural sections",
        "Aluminium ingot and billet",
        "Copper cathode and wire rod",
        "Polymer resin in bulk and bags",
        "Fasteners, bearings and spares",
      ],
    },
  ],
} as const;

export const contactPage = {
  lede: "Feel free to ask for details — don't save any questions.",
  serviceOptions: [
    "Freight & logistics",
    "Sourcing & procurement",
    "Customs & compliance",
    "Something else",
  ],
} as const;
