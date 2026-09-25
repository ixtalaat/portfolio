import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ixtalaat.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/ar`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${base}/ar/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
