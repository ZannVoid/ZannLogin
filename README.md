# ANIZONE-X

Premium portfolio site for Bendzanu Kamagifi, built with Next.js App Router and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Content intake checklist

Before shipping this as a production portfolio, replace the temporary values in [lib/site-data.ts](/Users/Hype/Downloads/ZannStore/lib/site-data.ts) and `public/` assets with the final materials:

- WhatsApp production number
- Official GitHub profile URL
- Final Instagram URL
- Final CV file in `public/files`
- Final hero image and portfolio images in `public/images`
- Real portfolio and archive metadata

## Content model

The site content is centralized in [lib/site-data.ts](/Users/Hype/Downloads/ZannStore/lib/site-data.ts), including:

- brand metadata
- navigation
- social links
- hero copy
- stats
- skill cards
- portfolio items
- archive entries
- contact form labels and validation copy

## Notes

- The current CV download is a placeholder text file so the route is already wired.
- The contact page now uses a small Next.js backend layer that stores incoming leads before continuing the WhatsApp flow.

## Contact backend

- `POST /api/contact` menerima payload briefing dari form kontak dan menyimpannya ke `backend/data/contact-leads.json`.
- `GET /api/health` mengecek apakah storage backend bisa diakses.
- `GET /api/leads` mengembalikan lead terbaru jika header `x-leads-admin-token` cocok dengan `LEADS_ADMIN_TOKEN`.

Untuk local development:

1. Duplikasi `.env.example` menjadi `.env.local`.
2. Isi `LEADS_ADMIN_TOKEN` dengan token admin milikmu.
3. Jalankan `npm run dev`.

Catatan penting: storage backend saat ini masih berbasis file lokal. Ini cocok untuk development atau deploy ke server dengan filesystem persisten, tapi belum cocok untuk platform serverless yang filesystem-nya sementara atau read-only.
