import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: siteConfig.siteUrl,
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
