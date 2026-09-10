import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { tours } from "@/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = ([

    { url: site.url, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/about`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${site.url}/services`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${site.url}/visa`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${site.url}/tours`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${site.url}/contact`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${site.url}/privacy`, priority: 0.2, changeFrequency: "yearly" },
    { url: `${site.url}/terms`, priority: 0.2, changeFrequency: "yearly" },
  ] satisfies Omit<MetadataRoute.Sitemap[number], "lastModified">[]).map((page) => ({
    ...page,
    lastModified: now,
  }));

  const tourPages: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${site.url}/tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...tourPages];
}
