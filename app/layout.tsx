import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], weight: ["600", "900"], style: ["normal", "italic"], variable: "--font-display" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand" });

// honey: ganti dengan domain Vercel kamu setelah deploy
const SITE_URL = "https://rizkioky21.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rizki Oky Triyani — 21st Birthday",
  description:
    "Landing page ulang tahun ke-21 untuk Rizki Oky Triyani: surat, galeri foto, dan harapan terbaik.",
  keywords: ["Rizki Oky Triyani", "ulang tahun 21", "happy birthday"],
  authors: [{ name: "Untuk Rizki Oky Triyani" }],
  openGraph: {
    title: "Rizki Oky Triyani — 21st Birthday",
    description: "Scroll pelan-pelan ya, ada sesuatu buat kamu di bawah.",
    type: "website",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image", title: "Rizki Oky Triyani — 21st Birthday" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F6C9D4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} ${hand.variable} h-full`}>
      <body className="min-h-full font-body bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
