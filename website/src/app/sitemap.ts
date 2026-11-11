import type { MetadataRoute } from "next";
import { getDocs } from "@/lib/docs";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    ...getDocs().map((d) => ({
      url: `${SITE.url}${d.href}`,
      changeFrequency: "monthly" as const,
      priority: d.lang ? 0.5 : 0.8,
    })),
  ];
}
