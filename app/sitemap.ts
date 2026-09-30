import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rizkioky21.vercel.app"; // honey: ganti domain Vercel kamu
  return [{ url: base, lastModified: new Date(), changeFrequency: "yearly", priority: 1 }];
}
