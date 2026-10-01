import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://rizkiokytriyani.vercel.app"; // honey: ganti domain Vercel kamu
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml` };
}
