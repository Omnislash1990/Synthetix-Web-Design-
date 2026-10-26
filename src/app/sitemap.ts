import type { MetadataRoute } from "next";

const BASE_URL = "https://www.synthetixstudio.co.uk";

const routes = ["", "/privacy", "/terms", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-26T00:00:00.000Z");

  return routes.map((route) => ({
    url: `${BASE_URL}${route || "/"}`,
    lastModified,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.4,
  }));
}
