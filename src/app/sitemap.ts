import type { MetadataRoute } from "next";

import { brand } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: brand.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${brand.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${brand.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
