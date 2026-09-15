import type { MetadataRoute } from "next";

import { brand, nav } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = nav.map((item) => ({
    url: item.href === "/" ? brand.url : `${brand.url}${item.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.7,
  }));

  return [
    ...pages,
    { url: `${brand.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${brand.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
