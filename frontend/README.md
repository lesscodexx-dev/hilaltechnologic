# Hilal Technologic Frontend

Frontend ini adalah aplikasi **Next.js (App Router)** untuk Hilal Technologic dengan UI dark-only terinspirasi Linear.

## ✨ Fitur Utama

- Landing page untuk layanan agensi
- Blog dengan markdown + syntax highlight
- Katalog produk digital
- Cart & checkout
- Midtrans redirect flow
- Manual payment proof upload
- SEO: metadata, sitemap, JSON-LD

## 📦 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## 🚀 Menjalankan Lokal

```bash
cp .env.example .env.local
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

## 🔧 Environment Variables

- `NEXT_PUBLIC_API_URL` → base URL backend API (contoh: `http://localhost:8000/api/v1`)
- `NEXT_PUBLIC_SITE_URL` → URL frontend (contoh: `http://localhost:3000`)

Cek `.env.example` untuk daftar lengkapnya.

## 🧭 Struktur Route Utama

```
/
├─ services/[slug]
├─ portfolio/[slug]
├─ blog/[slug]
├─ products/[slug]
├─ cart
├─ checkout
├─ account/orders/[orderNumber]
└─ contact
```

## 🧪 Testing & Linting

```bash
npm run lint
```

## 📄 Lisensi

Hak cipta © Hilal Technologic. Semua hak dilindungi.
