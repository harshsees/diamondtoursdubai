import type { LucideIcon } from "lucide-react";
import {
  Award,
  BusFront,
  FileCheck2,
  Languages,
  LifeBuoy,
  MapPinned,
  Ticket,
  Wallet,
} from "lucide-react";

export type Differentiator = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Replace each entry with a differentiator that is genuinely true of the business. */
export const differentiators: Differentiator[] = [
  {
    number: "01",
    title: "Licensed operator",
    description:
      "Fully licensed by the Department of Economy & Tourism, with all statutory permits in place.",
    icon: Award,
  },
  {
    number: "02",
    title: "In-house visa desk",
    description:
      "Applications filed, tracked and followed up by our own team — never outsourced.",
    icon: FileCheck2,
  },
  {
    number: "03",
    title: "Own vehicle fleet",
    description:
      "Sedans, SUVs, minivans and coaches operated and maintained by us, not subcontracted.",
    icon: BusFront,
  },
  {
    number: "04",
    title: "Multilingual team",
    description:
      "Guides and coordinators working in English, Arabic, Hindi, Russian and French.",
    icon: Languages,
  },
  {
    number: "05",
    title: "Authorised ticketing",
    description:
      "Direct allocations with the region's major attractions, parks and excursion operators.",
    icon: Ticket,
  },
  {
    number: "06",
    title: "Budget management",
    description:
      "Transparent costing and contracted rates that hold from proposal to final invoice.",
    icon: Wallet,
  },
  {
    number: "07",
    title: "Local knowledge",
    description:
      "Itineraries built by people who live here and know how the region actually works.",
    icon: MapPinned,
  },
  {
    number: "08",
    title: "24/7 ground support",
    description:
      "A named coordinator on call for the whole of your stay, not a shared inbox.",
    icon: LifeBuoy,
  },
];
