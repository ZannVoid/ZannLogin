# ZannLogin - by Bendzanu Kamagifi (ZannVoid)

ZannLogin adalah project login system modern berbasis Next.js yang dibuat oleh Bendzanu Kamagifi, dikenal sebagai ZannVoid.

## About the Creator

Bendzanu Kamagifi (ZannVoid) adalah Web Developer Indonesia yang fokus pada:

- Next.js
- UI/UX Design
- Automation System

Website: https://zannvoid.my.id  
GitHub: https://github.com/ZannVoid  
Instagram: https://instagram.com/zannvoid

## Run locally

```bash
npm install
npm run dev
```

## Content model

Konten website dipusatkan di `lib/site-data.ts`, termasuk metadata brand, navigation, social links, hero copy, portfolio, archive, dan field untuk contact form.

## Backend runtime

Backend project ini berjalan langsung di Next.js App Router dan siap memakai Supabase untuk storage utama.

- `POST /api/contact` menerima payload briefing dari form kontak dan menyimpannya ke tabel `contact_leads`.
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
- Dashboard admin tersedia di `/admin`.

Untuk local development:

1. Duplikasi `.env.example` menjadi `.env.local`.
2. Isi `ADMIN_API_TOKEN` dengan token admin milikmu.
3. Jalankan SQL di `supabase/schema.sql` pada project Supabase.
4. Jalankan `npm run dev`.

Untuk semua operasi admin (`POST`, `PATCH`, `DELETE`, atau `GET` admin-only), kirim header:

```txt
x-admin-token: <ADMIN_API_TOKEN>
```

## Repo notes

- Untuk production, isi environment deploy minimal `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, dan `ADMIN_API_TOKEN`.
- Opsi yang lebih aman adalah menambahkan `SUPABASE_SERVICE_ROLE_KEY` hanya di server runtime. Kalau key ini tidak diisi, backend akan fallback memakai publishable key.
- Jika tabel Supabase belum dibuat, halaman publik masih bisa fallback ke seed data read-only, tetapi operasi CRUD admin akan mengembalikan `503` sampai schema dijalankan.
