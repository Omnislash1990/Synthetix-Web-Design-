import type { MetadataRoute } from "next";

const BASE_URL = "https://www.synthetixstudio.co.uk";

const pages: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date("2026-10-29T00:00:00.000Z"),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/privacy`,
    lastModified: new Date("2026-10-29T00:00:00.000Z"),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: `${BASE_URL}/terms`,
    lastModified: new Date("2026-10-29T00:00:00.000Z"),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: `${BASE_URL}/cookies`,
    lastModified: new Date("2026-10-26T00:00:00.000Z"),
    changeFrequency: "yearly",
    priority: 0.4,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages;
}
