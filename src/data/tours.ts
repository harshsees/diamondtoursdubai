export type TourCategory =
  | "City & sightseeing"
  | "Desert"
  | "Cruises & water"
  | "Attractions"
  | "Culture & heritage";

export type Tour = {
  slug: string;
  title: string;
  category: TourCategory;
  location: string;
  duration: string;
  /** Omit when pricing is on request. */
  priceFrom?: number;
  summary: string;
  overview: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: { time: string; title: string; detail: string }[];
  notes: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const tourCategories: TourCategory[] = [
  "City & sightseeing",
  "Desert",
  "Cruises & water",
  "Attractions",
  "Culture & heritage",
];

export const currency = "AED";

const standardIncluded = [
  "Air-conditioned vehicle with licensed driver",
  "Hotel pick-up and drop-off",
  "Bottled water on board",
];

const standardExcluded = [
  "Meals unless stated",
  "Personal expenses and gratuities",
  "Travel insurance",
];

export const tours: Tour[] = [
  {
    slug: "dubai-city-tour",
    title: "Dubai city tour",
    category: "City & sightseeing",
    location: "Dubai",
    duration: "4 hours",
    priceFrom: 180,
    summary:
      "The essential half-day orientation: old Dubai, the creek, Jumeirah and the Downtown skyline.",
    overview: [
      "The best first morning in Dubai. You start in the old town on the creek, cross by abra, and finish among the towers of Downtown, which is the fastest way to understand how quickly this city changed.",
      "The tour runs privately with your own guide and vehicle, so the pace is yours.",
    ],
    highlights: [
      "Al Fahidi historic district on foot",
      "Abra crossing of Dubai Creek",
      "Jumeirah Mosque and the beach road",
      "Photo stop at Burj Al Arab",
      "Downtown Dubai and the Burj Khalifa plaza",
    ],
    included: [...standardIncluded, "Licensed English-speaking guide", "Abra fare"],
    excluded: [...standardExcluded, "Burj Khalifa observation deck ticket"],
    itinerary: [
      {
        time: "09:00",
        title: "Hotel pick-up",
        detail: "Collection from your hotel lobby in an air-conditioned vehicle.",
      },
      {
        time: "09:45",
        title: "Al Fahidi district",
        detail: "A walk through the restored wind-tower quarter and the textile souk.",
      },
      {
        time: "10:30",
        title: "Creek crossing",
        detail: "Abra across the creek to the gold and spice souks in Deira.",
      },
      {
        time: "11:30",
        title: "Jumeirah",
        detail: "Jumeirah Mosque, the beach road and a photo stop at Burj Al Arab.",
      },
      {
        time: "12:30",
        title: "Downtown",
        detail: "Burj Khalifa plaza and the fountain lake before returning to your hotel.",
      },
    ],
    notes: [
      "Modest dress is required at Jumeirah Mosque: shoulders and knees covered.",
      "The tour operates daily except Friday mornings.",
    ],
    image: "/images/tour-dubai-city.jpg",
    imageAlt: "Dubai skyline with the Burj Khalifa rising above Sheikh Zayed Road",
    featured: true,
  },
  {
    slug: "desert-safari",
    title: "Evening desert safari",
    category: "Desert",
    location: "Dubai Desert Conservation Reserve",
    duration: "6 hours",
    priceFrom: 250,
    summary:
      "Dune drive, sunset in the red sands and dinner under the stars at a private camp.",
    overview: [
      "An afternoon in the dunes: a 4x4 dune drive, time on the crest for sunset, then a camp for dinner, camel rides and live entertainment.",
      "We use a permitted camp inside the conservation reserve rather than the crowded roadside sites.",
    ],
    highlights: [
      "Dune drive in a 4x4 Land Cruiser",
      "Sunset photo stop on the high dunes",
      "Camel ride and sandboarding",
      "Henna, falconry and live entertainment",
      "Barbecue dinner at the camp",
    ],
    included: [
      "4x4 with experienced desert driver",
      "Hotel pick-up and drop-off",
      "Camp entry, dinner and soft drinks",
      "Camel ride and sandboarding",
    ],
    excluded: [...standardExcluded, "Alcoholic drinks", "Quad bike hire"],
    itinerary: [
      {
        time: "15:00",
        title: "Pick-up",
        detail: "Collection from your hotel and the drive to the desert edge.",
      },
      {
        time: "16:00",
        title: "Dune drive",
        detail: "Tyre pressures dropped, then roughly 30 minutes on the dunes.",
      },
      {
        time: "17:15",
        title: "Sunset stop",
        detail: "Time on the crest of the dunes for photographs.",
      },
      {
        time: "18:00",
        title: "The camp",
        detail: "Camel rides, sandboarding, henna and a falcon display.",
      },
      {
        time: "19:30",
        title: "Dinner",
        detail: "Barbecue buffet followed by live entertainment.",
      },
      { time: "21:00", title: "Return", detail: "Drop-off back at your hotel." },
    ],
    notes: [
      "Not recommended for guests who are pregnant, or who have back, neck or heart conditions.",
      "A no-dune-drive option is available on request at the same price.",
    ],
    image: "/images/tour-desert-safari.jpg",
    imageAlt: "Two 4x4 vehicles crossing red sand dunes at golden hour",
    featured: true,
  },
  {
    slug: "dhow-dinner-cruise",
    title: "Dhow dinner cruise",
    category: "Cruises & water",
    location: "Dubai Creek",
    duration: "2.5 hours",
    priceFrom: 160,
    summary:
      "Dinner aboard a traditional wooden dhow, past the old trading wharves and the creek skyline.",
    overview: [
      "A slow evening on the water. The dhow leaves the creek at dusk and turns back as the lights come on along both banks.",
      "Dinner is an international buffet served on the lower deck; the upper deck stays open for the view.",
    ],
    highlights: [
      "Two-hour cruise on a traditional dhow",
      "International buffet dinner",
      "Open upper deck for photography",
      "Live tanoura performance",
    ],
    included: [
      "Hotel transfers",
      "Cruise and buffet dinner",
      "Soft drinks and water",
      "Onboard entertainment",
    ],
    excluded: [...standardExcluded, "Alcoholic drinks"],
    itinerary: [
      {
        time: "19:00",
        title: "Pick-up",
        detail: "Collection from your hotel and transfer to the jetty.",
      },
      {
        time: "20:00",
        title: "Boarding",
        detail: "Welcome drinks as the dhow leaves the wharf.",
      },
      {
        time: "20:30",
        title: "Dinner",
        detail: "Buffet service opens while the boat turns toward Deira.",
      },
      {
        time: "21:30",
        title: "Entertainment",
        detail: "Live tanoura performance on the lower deck.",
      },
      {
        time: "22:00",
        title: "Return",
        detail: "Disembark and transfer back to your hotel.",
      },
    ],
    notes: ["A Dubai Marina departure is available as an alternative to the creek."],
    image: "/images/tour-dhow-cruise.jpg",
    imageAlt: "A traditional dhow carrying passengers along Dubai Creek",
    featured: true,
  },
  {
    slug: "burj-khalifa-at-the-top",
    title: "Burj Khalifa observation deck",
    category: "Attractions",
    location: "Downtown Dubai",
    duration: "2 hours",
    priceFrom: 220,
    summary:
      "Timed-entry access to levels 124 and 125 of the world's tallest building.",
    overview: [
      "Prebooked entry to the observation decks, with the transfer built in so you are not fighting for a taxi afterwards.",
      "We book sunset slots wherever availability allows. They sell out weeks ahead, which is exactly why you want them held for you.",
    ],
    highlights: [
      "Timed entry to levels 124 and 125",
      "Outdoor terrace at 452 metres",
      "Views over Downtown, the coast and the desert",
      "Fountain show after descent",
    ],
    included: [
      "Prebooked timed entry ticket",
      "Hotel transfers",
      "Assistance at the entrance",
    ],
    excluded: [
      ...standardExcluded,
      "Level 148 upgrade",
      "Food and beverage inside the tower",
    ],
    itinerary: [
      {
        time: "Flexible",
        title: "Pick-up",
        detail: "Timed to your entry slot, usually 90 minutes before.",
      },
      {
        time: "+45 min",
        title: "Entry",
        detail: "Assisted check-in and the lift to level 124.",
      },
      {
        time: "+60 min",
        title: "Observation decks",
        detail: "Levels 124 and 125, including the outdoor terrace.",
      },
      {
        time: "+105 min",
        title: "Fountain",
        detail: "Time at the fountain lake before the return transfer.",
      },
    ],
    notes: [
      "Sunset slots carry a premium and must be booked well in advance.",
      "Entry times are fixed by the venue and cannot be changed on the day.",
    ],
    image: "/images/tour-burj-khalifa.jpg",
    imageAlt: "The Burj Khalifa illuminated against a night sky",
  },
  {
    slug: "abu-dhabi-city-tour",
    title: "Abu Dhabi city tour",
    category: "City & sightseeing",
    location: "Abu Dhabi",
    duration: "Full day",
    priceFrom: 320,
    summary:
      "The Grand Mosque, the corniche and the Saadiyat cultural district, from Dubai and back.",
    overview: [
      "A full day in the capital, starting at the Sheikh Zayed Grand Mosque before the heat and the crowds arrive.",
      "The afternoon covers the corniche, the Emirates Palace approach and Saadiyat Island, with time at Louvre Abu Dhabi if you want it.",
    ],
    highlights: [
      "Sheikh Zayed Grand Mosque",
      "Abu Dhabi corniche and skyline",
      "Emirates Palace photo stop",
      "Saadiyat cultural district",
      "Optional Louvre Abu Dhabi entry",
    ],
    included: [...standardIncluded, "Licensed guide", "Inter-emirate transfer"],
    excluded: [...standardExcluded, "Louvre Abu Dhabi entry", "Theme park tickets"],
    itinerary: [
      {
        time: "08:00",
        title: "Departure",
        detail: "Pick-up in Dubai and the drive down the coast.",
      },
      {
        time: "10:00",
        title: "Grand Mosque",
        detail: "Guided visit to the Sheikh Zayed Grand Mosque.",
      },
      { time: "12:30", title: "Lunch", detail: "Break on the corniche (own account)." },
      {
        time: "14:00",
        title: "Saadiyat",
        detail: "The cultural district and optional Louvre Abu Dhabi.",
      },
      {
        time: "16:30",
        title: "Return",
        detail: "Drive back to Dubai, arriving early evening.",
      },
    ],
    notes: [
      "Modest dress is mandatory at the Grand Mosque; abayas are available on loan at the entrance.",
      "The mosque closes to visitors on Friday mornings.",
    ],
    image: "/images/tour-abu-dhabi.jpg",
    imageAlt: "Sheikh Zayed Grand Mosque reflected in still water at dusk",
    featured: true,
  },
  {
    slug: "marina-yacht-cruise",
    title: "Private yacht cruise",
    category: "Cruises & water",
    location: "Dubai Marina",
    duration: "3 hours",
    summary:
      "A private charter along the Marina, JBR and the Palm. Your boat, your route.",
    overview: [
      "A private yacht with skipper and crew, leaving from Dubai Marina and running along the coast past JBR, Bluewaters and the Palm.",
      "Boats range from 45 to 90 feet. Catering and drinks are arranged to your brief.",
    ],
    highlights: [
      "Private charter with skipper and crew",
      "Marina, JBR, Bluewaters and Palm coastline",
      "Swim stop where conditions allow",
      "Catering arranged to your requirements",
    ],
    included: [
      "Private yacht with skipper and crew",
      "Fuel and marina fees",
      "Soft drinks, water and ice",
    ],
    excluded: [...standardExcluded, "Catering and alcohol", "Water sports equipment"],
    itinerary: [
      {
        time: "Flexible",
        title: "Boarding",
        detail: "Meet the crew at your allocated Marina berth.",
      },
      {
        time: "+15 min",
        title: "Departure",
        detail: "Out through the Marina and along the JBR coast.",
      },
      {
        time: "+75 min",
        title: "Swim stop",
        detail: "Anchor off the Palm where sea conditions allow.",
      },
      {
        time: "+150 min",
        title: "Return",
        detail: "Back into the Marina at your chosen time.",
      },
    ],
    notes: [
      "Pricing depends on vessel size and season, and is quoted on enquiry.",
      "Charters are weather-dependent and may be rescheduled by the coastguard.",
    ],
    image: "/images/tour-marina-yacht.jpg",
    imageAlt: "A yacht cruising past the Dubai skyline",
  },
  {
    slug: "old-dubai-heritage-walk",
    title: "Old Dubai heritage walk",
    category: "Culture & heritage",
    location: "Al Fahidi & Al Seef",
    duration: "3 hours",
    priceFrom: 150,
    summary:
      "A walking tour of the wind-tower quarter, the souks and the creek, with an Emirati breakfast.",
    overview: [
      "The slowest and probably the best tour we run. On foot through the coral-and-gypsum lanes of Al Fahidi, into the souks, and across the water by abra.",
      "It includes a sit-down Emirati breakfast, which is the part most guests remember.",
    ],
    highlights: [
      "Al Fahidi wind-tower district on foot",
      "Traditional Emirati breakfast",
      "Textile, spice and gold souks",
      "Abra crossing of the creek",
      "Al Seef waterfront",
    ],
    included: ["Licensed guide", "Emirati breakfast", "Abra fare", "Hotel transfers"],
    excluded: [...standardExcluded, "Purchases in the souks"],
    itinerary: [
      {
        time: "08:30",
        title: "Pick-up",
        detail: "Collection from your hotel to Al Fahidi.",
      },
      {
        time: "09:15",
        title: "Breakfast",
        detail: "Traditional Emirati breakfast in a restored courtyard house.",
      },
      {
        time: "10:15",
        title: "The quarter",
        detail: "A guided walk through the lanes and wind-tower houses.",
      },
      {
        time: "11:00",
        title: "Souks",
        detail: "Abra crossing to the spice and gold souks.",
      },
      {
        time: "11:45",
        title: "Return",
        detail: "Al Seef waterfront and transfer back to your hotel.",
      },
    ],
    notes: ["The tour is entirely on foot. Comfortable shoes and a hat are recommended."],
    image: "/images/tour-old-dubai.jpg",
    imageAlt: "A shaded alleyway between traditional buildings in old Dubai",
  },
  {
    slug: "hot-air-balloon",
    title: "Desert hot air balloon",
    category: "Desert",
    location: "Dubai Desert Conservation Reserve",
    duration: "5 hours",
    priceFrom: 1150,
    summary:
      "Dawn flight over the conservation reserve, followed by breakfast in the dunes.",
    overview: [
      "A pre-dawn drive into the reserve, an hour in the air as the sun comes up over the dunes, and breakfast on landing.",
      "It is the earliest start of any tour we sell, and the one guests are most consistently glad they booked.",
    ],
    highlights: [
      "One hour of flight time at sunrise",
      "Views over the conservation reserve",
      "Wildlife spotting: oryx and gazelle",
      "Breakfast on landing",
      "Flight certificate",
    ],
    included: [
      "Hotel transfers",
      "One-hour balloon flight",
      "Breakfast",
      "Flight certificate",
    ],
    excluded: [
      ...standardExcluded,
      "Falconry add-on",
      "Vintage Land Rover transfer upgrade",
    ],
    itinerary: [
      { time: "04:30", title: "Pick-up", detail: "Early collection from your hotel." },
      {
        time: "05:45",
        title: "Launch site",
        detail: "Safety briefing while the envelope is inflated.",
      },
      {
        time: "06:15",
        title: "Flight",
        detail: "Roughly one hour over the dunes at sunrise.",
      },
      {
        time: "07:30",
        title: "Breakfast",
        detail: "Served after landing, with certificates presented.",
      },
      { time: "09:30", title: "Return", detail: "Drop-off back at your hotel." },
    ],
    notes: [
      "Flights operate October to May and are cancelled in unsuitable wind conditions.",
      "Minimum age 5. Guests must be able to stand unaided for the duration of the flight.",
    ],
    image: "/images/tour-hot-air-balloon.jpg",
    imageAlt: "A hot air balloon drifting above open desert at sunrise",
  },
  {
    slug: "camel-trek",
    title: "Camel trek & bedouin camp",
    category: "Desert",
    location: "Al Marmoom",
    duration: "4 hours",
    priceFrom: 210,
    summary:
      "A quiet alternative to the safari: camel trekking and a traditional camp, with no dune drive.",
    overview: [
      "For guests who want the desert without the 4x4. A guided camel trek across the sands, then tea and dinner at a traditional camp.",
      "It suits older travellers, young children, and anyone who would rather watch the light change than be thrown around a dune.",
    ],
    highlights: [
      "Guided camel trek",
      "No dune driving",
      "Bedouin-style camp with Arabic coffee",
      "Stargazing after dinner",
    ],
    included: [
      "Hotel transfers",
      "Camel trek with handler",
      "Camp entry and dinner",
      "Soft drinks",
    ],
    excluded: [...standardExcluded, "Alcoholic drinks"],
    itinerary: [
      {
        time: "15:30",
        title: "Pick-up",
        detail: "Collection from your hotel to Al Marmoom.",
      },
      {
        time: "16:30",
        title: "Camel trek",
        detail: "A guided trek across the sands at the cooler end of the day.",
      },
      {
        time: "17:45",
        title: "The camp",
        detail: "Arabic coffee, dates and time to watch the sunset.",
      },
      {
        time: "18:45",
        title: "Dinner",
        detail: "Traditional dinner followed by stargazing.",
      },
      { time: "20:00", title: "Return", detail: "Drop-off back at your hotel." },
    ],
    notes: [
      "Suitable for most ages and mobility levels. Please tell us about any concerns when booking.",
    ],
    image: "/images/tour-camel-trek.jpg",
    imageAlt: "Camels walking across desert sand in warm afternoon light",
  },
  {
    slug: "water-park-day",
    title: "Water park day pass",
    category: "Attractions",
    location: "Dubai",
    duration: "Full day",
    priceFrom: 340,
    summary:
      "Day passes to the major water parks, with return transfers and locker included.",
    overview: [
      "A straightforward family day: prebooked entry, transfers both ways and a locker, so nobody is queuing at the gate.",
      "We book whichever park suits the group. Tell us the ages and we will recommend.",
    ],
    highlights: [
      "Prebooked full-day entry",
      "Return hotel transfers",
      "Locker and towel included",
      "Choice of park by group age",
    ],
    included: ["Full-day park entry", "Return transfers", "Locker hire", "Towel"],
    excluded: [
      ...standardExcluded,
      "Food and beverage inside the park",
      "Cabana hire",
    ],
    itinerary: [
      { time: "09:30", title: "Pick-up", detail: "Collection from your hotel." },
      {
        time: "10:00",
        title: "Park entry",
        detail: "Assisted entry with tickets already issued.",
      },
      {
        time: "17:00",
        title: "Return",
        detail: "Departure from the main gate back to your hotel.",
      },
    ],
    notes: [
      "Height restrictions apply on some rides. Check the park guidance before travelling.",
    ],
    image: "/images/tour-water-park.jpg",
    imageAlt: "Water park slides surrounded by palm trees",
  },
  {
    slug: "east-coast-fujairah",
    title: "East coast & Fujairah",
    category: "City & sightseeing",
    location: "Fujairah & the Hajar mountains",
    duration: "Full day",
    priceFrom: 300,
    summary:
      "Across the Hajar mountains to the Gulf of Oman, the oldest mosque in the country and the coast.",
    overview: [
      "A long, quiet day out of the city: the mountain road across the Hajar range, Al Bidyah mosque, Fujairah fort and the east coast beaches.",
      "It is the best way to see that the UAE is not only cities.",
    ],
    highlights: [
      "Hajar mountain crossing",
      "Al Bidyah, the oldest mosque in the country",
      "Fujairah fort and museum",
      "Gulf of Oman coastline",
      "Friday market stop",
    ],
    included: [...standardIncluded, "Licensed guide", "Museum entry"],
    excluded: [...standardExcluded, "Lunch", "Snorkelling equipment"],
    itinerary: [
      {
        time: "08:00",
        title: "Departure",
        detail: "Pick-up in Dubai and the drive east.",
      },
      {
        time: "09:30",
        title: "Friday market",
        detail: "A stop at the roadside market for produce and carpets.",
      },
      {
        time: "11:00",
        title: "Al Bidyah",
        detail: "Visit to the oldest mosque in the country.",
      },
      {
        time: "12:30",
        title: "Fujairah",
        detail: "Fort, museum and lunch on the corniche (own account).",
      },
      {
        time: "15:00",
        title: "Return",
        detail: "The coast road and mountain crossing back to Dubai.",
      },
    ],
    notes: ["A long day with significant driving. Not ideal for very young children."],
    image: "/images/tour-east-coast.jpg",
    imageAlt: "Sunset over the ridges of the Hajar mountains",
  },
  {
    slug: "madinat-jumeirah-walk",
    title: "Madinat Jumeirah & souk",
    category: "Culture & heritage",
    location: "Jumeirah",
    duration: "3 hours",
    priceFrom: 140,
    summary:
      "Waterways, souk and wind towers, with an abra ride and the best public view of Burj Al Arab.",
    overview: [
      "A gentle late-afternoon tour through the canals and souk of Madinat Jumeirah, timed so you reach the waterfront as the light drops behind Burj Al Arab.",
      "Good for guests with limited time or limited mobility. Most of it is flat, shaded and paved.",
    ],
    highlights: [
      "Abra ride through the waterways",
      "Souk Madinat with time to browse",
      "Best public view of Burj Al Arab",
      "Sunset on the waterfront",
    ],
    included: ["Hotel transfers", "Abra ride", "Licensed guide"],
    excluded: [...standardExcluded, "Purchases in the souk"],
    itinerary: [
      { time: "16:00", title: "Pick-up", detail: "Collection from your hotel." },
      {
        time: "16:45",
        title: "The waterways",
        detail: "Abra ride through the canals of the resort.",
      },
      {
        time: "17:30",
        title: "Souk Madinat",
        detail: "Time in the covered souk with your guide.",
      },
      {
        time: "18:15",
        title: "Sunset",
        detail: "Waterfront viewpoint facing Burj Al Arab.",
      },
      { time: "19:00", title: "Return", detail: "Drop-off back at your hotel." },
    ],
    notes: [
      "Flat, shaded and largely step-free, so suitable for guests with reduced mobility.",
    ],
    image: "/images/attraction-madinat-jumeirah.jpg",
    imageAlt:
      "Wind-tower architecture and waterways at Madinat Jumeirah with Burj Al Arab behind",
  },
];

export const featuredTours = tours.filter((tour) => tour.featured);

export const getTour = (slug: string) => tours.find((tour) => tour.slug === slug);
