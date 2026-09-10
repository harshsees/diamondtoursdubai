export type Attraction = {
  number: string;
  name: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Numbered list on the home page. Six reads best; the layout handles more. */
export const attractions: Attraction[] = [
  {
    number: "01",
    name: "Burj Khalifa",
    location: "Downtown Dubai",
    description:
      "The tallest building in the world, with observation decks on levels 124, 125 and 148.",
    image: "/images/attraction-burj-khalifa.jpg",
    imageAlt: "The Burj Khalifa above the lit highways of Downtown Dubai at night",
  },
  {
    number: "02",
    name: "Dubai Marina",
    location: "Dubai Marina",
    description:
      "A two-mile canal city of towers, yachts and waterfront restaurants.",
    image: "/images/attraction-dubai-marina.jpg",
    imageAlt: "Yachts moored in front of the towers of Dubai Marina",
  },
  {
    number: "03",
    name: "The Dubai Fountain",
    location: "Downtown Dubai",
    description:
      "Choreographed water shows on the lake at the foot of the Burj Khalifa, every half hour after dusk.",
    image: "/images/attraction-dubai-fountain.jpg",
    imageAlt: "The Dubai Fountain in mid-show beside the UAE flag",
  },
  {
    number: "04",
    name: "Madinat Jumeirah",
    location: "Jumeirah",
    description:
      "Wind towers, canals and a covered souk, with the best public view of Burj Al Arab.",
    image: "/images/attraction-madinat-jumeirah.jpg",
    imageAlt: "Waterways and wind-tower buildings at Madinat Jumeirah",
  },
  {
    number: "05",
    name: "The Dubai Frame",
    location: "Zabeel Park",
    description:
      "A 150-metre picture frame set between the old city and the new, with a glass-floored bridge.",
    image: "/images/attraction-dubai-frame.jpg",
    imageAlt: "The Dubai Frame standing in parkland with the skyline behind",
  },
  {
    number: "06",
    name: "Sheikh Zayed Grand Mosque",
    location: "Abu Dhabi",
    description:
      "Eighty-two domes, a courtyard of inlaid marble, and the largest hand-knotted carpet in the world.",
    image: "/images/attraction-grand-mosque.jpg",
    imageAlt: "Sheikh Zayed Grand Mosque lit at dusk",
  },
];

export type Destination = {
  number: string;
  name: string;
  blurb: string;
  image?: string;
  imageAlt?: string;
};

/** The emirates we operate in. */
export const destinations: Destination[] = [
  {
    number: "01",
    name: "Dubai",
    blurb: "Skyline, souks, desert and coast within an hour of each other.",
    image: "/images/tour-dubai-city.jpg",
    imageAlt: "The Dubai skyline at dusk",
  },
  {
    number: "02",
    name: "Abu Dhabi",
    blurb: "The capital: the Grand Mosque, Saadiyat's museums and the corniche.",
    image: "/images/dest-abu-dhabi.jpg",
    imageAlt: "The Abu Dhabi skyline across the water",
  },
  {
    number: "03",
    name: "Sharjah",
    blurb: "The cultural capital of the Emirates, and its best museums.",
    image: "/images/dest-sharjah.jpg",
    imageAlt: "A traditional building with a clock tower in Sharjah",
  },
  {
    number: "04",
    name: "Ras Al Khaimah",
    blurb: "Jebel Jais, the Hajar mountains and the longest zipline in the world.",
    image: "/images/dest-ras-al-khaimah.jpg",
    imageAlt: "Bare mountain ridges in Ras Al Khaimah",
  },
  {
    number: "05",
    name: "Fujairah",
    blurb: "The east coast, the Gulf of Oman and the oldest mosque in the country.",
    image: "/images/tour-east-coast.jpg",
    imageAlt: "Sunset over the Hajar mountains near Fujairah",
  },
  {
    number: "06",
    name: "Ajman",
    blurb: "A quiet corniche, a working dhow yard and an excellent fort museum.",
  },
  {
    number: "07",
    name: "Umm Al Quwain",
    blurb: "Mangroves, lagoons and the least developed coastline in the country.",
  },
  {
    number: "08",
    name: "Al Ain",
    blurb: "The garden city: oases, forts and the Jebel Hafeet mountain road.",
    image: "/images/dest-al-ain.jpg",
    imageAlt: "Camels resting on the sand near Al Ain",
  },
];
