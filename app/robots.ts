import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://rizkioky21.vercel.app"; // honey: ganti domain Vercel kamu
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml` };
}
