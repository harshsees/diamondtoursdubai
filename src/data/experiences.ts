import type { LucideIcon } from "lucide-react";
import {
  Binoculars,
  Building2,
  Camera,
  FerrisWheel,
  Landmark,
  Mountain,
  Ship,
  Sparkles,
  UtensilsCrossed,
  Waves,
} from "lucide-react";

export type Experience = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** "Things to do" categories on the home page. Scannable, not a second tour list. */
export const experiences: Experience[] = [
  {
    title: "City tours",
    description: "Half and full-day sightseeing across every emirate.",
    icon: Building2,
  },
  {
    title: "Desert adventures",
    description: "Safaris, camel treks, overnight camps and dune drives.",
    icon: Mountain,
  },
  {
    title: "Cruises",
    description: "Dhow dinners, marina charters and private yachts.",
    icon: Ship,
  },
  {
    title: "Water activities",
    description: "Diving, snorkelling, water parks and beach clubs.",
    icon: Waves,
  },
  {
    title: "Theme parks",
    description: "Direct allocation at the region's major parks.",
    icon: FerrisWheel,
  },
  {
    title: "Cultural experiences",
    description: "Heritage walks, museums, mosques and Emirati dining.",
    icon: Landmark,
  },
  {
    title: "Adventure",
    description: "Ziplines, skydiving, mountain trails and hot air balloons.",
    icon: Binoculars,
  },
  {
    title: "Dining",
    description: "Rooftop tables, desert dinners and chef's-table bookings.",
    icon: UtensilsCrossed,
  },
  {
    title: "Photography tours",
    description: "Golden-hour routes with a guide who knows the light.",
    icon: Camera,
  },
  {
    title: "Luxury experiences",
    description: "Helicopters, private openings and access others cannot get.",
    icon: Sparkles,
  },
];
