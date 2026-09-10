export type VisaType = {
  name: string;
  validity: string;
  stay: string;
  entries: string;
  description: string;
};

/**
 * Visa rules change. Verify every line against the current government guidance
 * before publishing, and review it on a schedule.
 */
export const visaTypes: VisaType[] = [
  {
    name: "48-hour transit visa",
    validity: "Issued for the date of transit",
    stay: "48 hours",
    entries: "Single",
    description:
      "For passengers connecting through a UAE airport who want to leave the terminal.",
  },
  {
    name: "96-hour transit visa",
    validity: "Issued for the date of transit",
    stay: "96 hours",
    entries: "Single",
    description: "A longer stopover, long enough for a city tour and one night.",
  },
  {
    name: "14-day tourist visa",
    validity: "60 days from issue",
    stay: "14 days",
    entries: "Single",
    description: "A short-break visa for city visits and stopovers.",
  },
  {
    name: "30-day tourist visa",
    validity: "60 days from issue",
    stay: "30 days",
    entries: "Single or multiple",
    description: "The standard leisure visa, and the one most guests need.",
  },
  {
    name: "60-day tourist visa",
    validity: "60 days from issue",
    stay: "60 days",
    entries: "Single or multiple",
    description: "For extended stays, long family visits and slow travel.",
  },
  {
    name: "90-day multiple entry",
    validity: "One year from issue",
    stay: "90 days per year",
    entries: "Multiple",
    description: "For frequent business travellers moving in and out of the country.",
  },
];

export const visaRequirements = [
  "Passport valid for at least six months from the date of arrival",
  "A clear colour scan of the passport bio-data page",
  "A recent passport-size photograph on a white background",
  "Confirmed return or onward flight ticket",
  "Proof of accommodation for the duration of the stay",
  "Any previous UAE visa or entry stamp, if held",
];

export const visaProcess = [
  {
    step: "01",
    title: "Send your documents",
    detail:
      "Email us the scans, or upload them through the enquiry form. We confirm receipt the same working day.",
  },
  {
    step: "02",
    title: "We check them",
    detail:
      "Our desk reviews every document before submission and comes back to you if anything is likely to cause a rejection.",
  },
  {
    step: "03",
    title: "Application filed",
    detail:
      "We file directly with immigration and give you a reference you can track.",
  },
  {
    step: "04",
    title: "Visa issued",
    detail:
      "The approved visa is emailed to you as a PDF. Print it or keep it on your phone for the airline check-in desk.",
  },
];

export type Faq = { question: string; answer: string };

export const visaFaqs: Faq[] = [
  {
    question: "How long does a UAE tourist visa take?",
    answer:
      "Most applications are approved in three to five working days. Applications filed on a Thursday afternoon or during a public holiday take longer, so allow a week where you can.",
  },
  {
    question: "Do I need a visa at all?",
    answer:
      "Passport holders from a long list of countries receive a visa on arrival, free of charge. Send us your nationality and we will tell you honestly whether you need to apply, rather than sell you a visa you do not need.",
  },
  {
    question: "Can the visa be extended once I am in the country?",
    answer:
      "Most tourist visas can be extended once, in-country, without leaving. The extension has to be applied for before the current visa expires. We handle this for guests already travelling with us.",
  },
  {
    question: "What happens if my application is rejected?",
    answer:
      "Immigration does not always publish a reason. We will tell you what we think went wrong and what, if anything, is worth changing before reapplying. Government fees on a rejected application are not refundable.",
  },
  {
    question: "Can you sponsor a visa for a group?",
    answer:
      "Yes. Group applications are filed together against a single reference, which keeps the tracking simple. Send us the passport scans as one batch.",
  },
  {
    question: "Is travel insurance mandatory?",
    answer:
      "It is not required for the application itself, but you should not travel without it. We can recommend a provider if you do not already have cover.",
  },
];
