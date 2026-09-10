export type Service = {
  slug: string;
  title: string;
  summary: string;
  /** Longer copy used on the Services page detail rows. */
  body: string[];
  points: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "accommodation",
    title: "Hotel reservations",
    summary:
      "Contracted rates across city, beach and desert properties, from four-star to ultra-luxury.",
    body: [
      "We hold direct contracts with hotels across the UAE, which means we can hold allocation during peak season and confirm rooms other agents cannot.",
      "Every booking is checked against your group profile — room configuration, board basis, connecting rooms, early check-in — before it is confirmed.",
    ],
    points: [
      "Contracted rates in every emirate",
      "Group allocation and rooming lists",
      "Beach, city, desert and serviced apartments",
      "Board basis and upgrades negotiated for you",
    ],
    image: "/images/service-accommodation.jpg",
    imageAlt: "Hotel reception desk with warm timber panelling and lounge seating",
  },
  {
    slug: "visa-services",
    title: "Visa services",
    summary:
      "Tourist, transit and multiple-entry visas prepared, filed and tracked by our in-house desk.",
    body: [
      "Our visa desk handles applications end to end: document checks, submission, tracking and delivery of the approved visa to your inbox.",
      "Because we file directly, we can flag problems with a document before it costs you a rejection — and we tell you honestly when an application is unlikely to succeed.",
    ],
    points: [
      "14, 30, 60 and 90-day tourist visas",
      "48 and 96-hour transit visas",
      "Multiple-entry and extension support",
      "Document review before submission",
    ],
    image: "/images/service-visa.jpg",
    imageAlt: "Two passports being handed across a desk",
  },
  {
    slug: "transport",
    title: "Transport & chauffeur",
    summary:
      "Our own fleet of sedans, SUVs, minivans and coaches with vetted, licensed drivers.",
    body: [
      "We operate our vehicles rather than subcontracting them, so we control the condition of the car, the punctuality of the driver and the price you pay.",
      "Vehicles are matched to the group: a sedan for an executive transfer, a 50-seat coach for a conference movement, and everything between.",
    ],
    points: [
      "Sedans, SUVs, minivans, midi and full coaches",
      "Licensed, uniformed, English-speaking drivers",
      "Inter-emirate and long-distance transfers",
      "Live movement tracking for group programmes",
    ],
    image: "/images/service-transport.jpg",
    imageAlt: "A white passenger van on a quiet street in old Dubai",
  },
  {
    slug: "airport-assistance",
    title: "Airport assistance",
    summary:
      "Meet and greet, fast-track immigration, porter service and seamless onward transfer.",
    body: [
      "A representative meets your guests airside or in arrivals, walks them through immigration and baggage, and hands them to their driver.",
      "For groups we run a dedicated desk in arrivals so no one is left waiting for a straggler.",
    ],
    points: [
      "Meet and greet at every UAE airport",
      "Fast-track immigration where permitted",
      "Porter and buggy assistance",
      "Dedicated group arrivals desk",
    ],
    image: "/images/service-airport.jpg",
    imageAlt: "Two travellers walking through a bright airport terminal",
  },
  {
    slug: "tailor-made-holidays",
    title: "Tailor-made holidays",
    summary:
      "Itineraries built around your dates, budget and interests — not a packaged departure.",
    body: [
      "You tell us who is travelling, when, and what matters to them. We come back with a costed day-by-day itinerary you can actually read.",
      "Nothing is fixed until you are happy with it, and we will tell you when something on your wish list is not worth the money.",
    ],
    points: [
      "Honeymoon, family and multi-generation travel",
      "Private guiding and bespoke experiences",
      "Multi-emirate and multi-country routings",
      "Costed day-by-day proposals",
    ],
    image: "/images/service-tailormade.jpg",
    imageAlt: "Traditional wind-tower architecture along the Dubai waterfront",
  },
  {
    slug: "tour-guides",
    title: "Tour guides",
    summary:
      "Government-licensed guides who know the history, not just the photo stops.",
    body: [
      "Every guide we use is licensed, briefed on your group in advance, and chosen for the language and subject matter you need.",
      "For special-interest groups — architecture, heritage, food, photography — we brief a specialist rather than a generalist.",
    ],
    points: [
      "Licensed guides in five languages",
      "Special-interest and academic briefs",
      "Full-day, half-day and evening guiding",
      "Group leaders for large movements",
    ],
    image: "/images/service-guides.jpg",
    imageAlt: "A guide talking to a group of visitors on a walking tour",
  },
  {
    slug: "leisure-excursions",
    title: "Leisure & excursions",
    summary:
      "Day tours, cruises, safaris and attraction tickets, on direct allocation.",
    body: [
      "We are an authorised seller for the region's major attractions, so tickets are confirmed rather than requested — including on the dates everyone else is sold out.",
      "Excursions run privately or on a seat-in-coach basis, whichever suits the group and the budget.",
    ],
    points: [
      "Private and seat-in-coach excursions",
      "Direct attraction and theme-park allocation",
      "Dinner cruises and desert programmes",
      "Combination passes and multi-day tickets",
    ],
    image: "/images/service-leisure.jpg",
    imageAlt: "A traditional dhow on the water at dusk",
  },
  {
    slug: "mice",
    title: "MICE & corporate",
    summary:
      "Meetings, incentives, conferences and events — planned, contracted and run on the ground.",
    body: [
      "We handle venue sourcing, room blocks, delegate transfers, production suppliers and the social programme as one accountable contract.",
      "Every event gets an on-site coordinator and a written movement plan, so your delegates always know where to be.",
    ],
    points: [
      "Venue sourcing and site inspections",
      "Delegate registration and room blocks",
      "Gala dinners and incentive programmes",
      "On-site coordination throughout",
    ],
    image: "/images/service-mice.jpg",
    imageAlt: "A presentation under way in a corporate meeting room",
  },
  {
    slug: "ground-handling",
    title: "Ground handling",
    summary:
      "Full destination management for overseas operators, airlines and cruise lines.",
    body: [
      "Send us your clients and we will handle everything from the aircraft door onwards: transfers, hotels, excursions, guides and 24/7 support.",
      "You keep the client relationship. We supply the operations, the rates and the reporting.",
    ],
    points: [
      "Turnkey DMC services for tour operators",
      "Crew and layover programmes",
      "Cruise and shore-excursion handling",
      "Consolidated billing and reporting",
    ],
    image: "/images/service-ground-handling.jpg",
    imageAlt: "An aircraft parked at a passenger boarding bridge",
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);
