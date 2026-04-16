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

## Backend runtime

Backend project ini sekarang berjalan langsung di Next.js App Router dengan storage file lokal.

- `POST /api/contact` menerima payload briefing dari form kontak dan menyimpannya ke `backend/data/contact-leads.json`.
- `GET /api/projects` mengembalikan project publik. Tambahkan `?status=all` atau `?status=draft` untuk akses admin.
- `POST /api/projects` membuat project baru.
- `GET /api/projects/:slug` mengambil detail satu project.
- `PATCH /api/projects/:slug` memperbarui project.
- `DELETE /api/projects/:slug` menghapus project.
- `GET /api/archives` mengembalikan archive publik. Tambahkan `?status=all` atau `?status=draft` untuk akses admin.
- `POST /api/archives` membuat entry archive baru.
- `GET /api/archives/:id` mengambil detail satu archive.
- `PATCH /api/archives/:id` memperbarui archive.
- `DELETE /api/archives/:id` menghapus archive.
- `GET /api/leads` mengembalikan lead terbaru untuk admin.
- `GET /api/health` mengecek apakah storage backend bisa diakses.

Untuk local development:

1. Duplikasi `.env.example` menjadi `.env.local`.
2. Isi `ADMIN_API_TOKEN` dengan token admin milikmu.
3. Jalankan `npm run dev`.

Untuk semua operasi admin (`POST`, `PATCH`, `DELETE`, atau `GET` admin-only), kirim header:

```txt
x-admin-token: <ADMIN_API_TOKEN>
```

Catatan penting: storage backend saat ini masih berbasis file lokal. Ini cocok untuk development atau deploy ke server dengan filesystem persisten, tapi belum cocok untuk platform serverless yang filesystem-nya sementara atau read-only. Halaman `beranda`, `portfolio`, dan `archive` sekarang membaca data runtime ini langsung, jadi perubahan CRUD akan ikut tampil di situs tanpa perlu ubah array statis lagi.
