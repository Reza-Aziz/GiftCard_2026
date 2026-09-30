# Jalankan lokal

```bash
npm install
npm run dev
```
Buka http://localhost:3000 — resize ke 360px untuk cek tampilan HP.

# Deploy ke Vercel (mandiri)

1. Push folder ini ke GitHub.
2. vercel.com → Add New Project → import repo → Deploy (tanpa setting tambahan).
3. Ganti `SITE_URL` di `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` dengan domain Vercel kamu, push ulang.
4. Agar cepat ke-index Google dengan nama "Rizki Oky Triyani": buka Google Search Console → tambah properti → submit sitemap `domainkamu/sitemap.xml`. Index biasanya 1–14 hari.
