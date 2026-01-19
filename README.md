# Hilal Technologic

**Hilal Technologic** adalah platform digital untuk agensi software modern yang menyatukan website agensi, blog teknologi, dan toko produk digital dalam satu sistem yang skalabel.

Dibangun dengan **UI dark-only terinspirasi Linear**, **kontrak API yang ketat**, dan **arsitektur full-stack yang rapi**, project ini mencerminkan standar kualitas engineering dan desain kami.

---

## 🌌 Live Environment

- **Frontend**: https://hilaltechnologic.com

---

## 🎯 Product Scope

- **Website Agency / Software House**
- **Tech Blog** (Markdown, code highlighting, SEO-ready)
- **Digital Product Store**
  - Themes
  - Templates
  - Source code
- **Secure Digital Delivery**
- **Midtrans & Manual Payment Support**

> Ini adalah **MVP** yang dibangun dengan **standar produksi** dan fokus skalabilitas.

---

## 🧱 Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- Dark-only design system (tanpa light mode)

### Backend
- **Laravel 11**
- **MySQL**
- **Redis** (cache & queue)
- **Laravel Sanctum** (SPA cookie auth)
- **Filament** (Admin Panel)

### Infrastruktur
- VPS
- Nginx
- Redis
- MySQL

---

## 🎨 Design System Philosophy

Terinspirasi dari **Linear.app**:

- Dark-only UI
- Neutral dark backgrounds
- Subtle 1px borders
- Low-contrast surfaces
- One accent color (purple/indigo)
- 12–16px rounded corners
- Strict 8pt spacing grid
- Minimal micro-interactions
- Calm, precise, premium feel

**No light mode. No flashy animations. No visual noise.**

---

## 🔌 API Contract (v1)

Semua endpoint versi ada di `/api/v1`.
Kontrak ini adalah **single source of truth**.

### Public
| Method | Endpoint |
|------|---------|
| GET | /products |
| GET | /products/{slug} |
| GET | /posts |
| GET | /posts/{slug} |
| GET | /portfolios |
| GET | /portfolios/{slug} |

### Auth (Sanctum SPA)
| Method | Endpoint |
|------|---------|
| GET | /sanctum/csrf-cookie |
| POST | /auth/register |
| POST | /auth/login |
| POST | /auth/logout |
| GET | /auth/me |

### Orders & Payments
| Method | Endpoint |
|------|---------|
| POST | /orders |
| GET | /orders |
| GET | /orders/{orderNumber} |
| POST | /orders/{orderNumber}/pay |
| POST | /orders/{orderNumber}/manual-proof |

### Delivery
| Method | Endpoint |
|------|---------|
| GET | /deliveries/{token} |
| GET | /download/{token} |

### Webhook (Backend only)
| Method | Endpoint |
|------|---------|
| POST | /midtrans/webhook |

**Rules**
- Midtrans menggunakan `redirect_url` saja
- Tidak ada endpoint tambahan tanpa kontrak
- Frontend wajib mengikuti API

---

## 🗄️ Backend Architecture

### Core Features
- Sanctum SPA authentication
- Policy-based authorization
- Idempotent Midtrans webhook handling
- Secure digital delivery (token, expiry, limit)
- Admin management via Filament

### Database Tables (High-Level)
- users
- products
- posts
- portfolios
- orders
- order_items
- payments
- manual_payment_proofs
- deliveries
- download_logs

### Quality Standards
- Form Requests
- API Resources
- Services layer
- Feature tests:
  - Midtrans signature validation
  - Delivery token expiry & limits

---

## 🧭 Frontend Architecture

### Routes
```
/
├─ services
│  └─ [slug]
├─ portfolio
│  └─ [slug]
├─ blog
│  └─ [slug]
├─ products
│  └─ [slug]
├─ cart
├─ checkout
├─ account
│  └─ orders
│     └─ [orderNumber]
└─ contact
```

### Key Features
- Typed API client
- Cookie-based auth (Sanctum)
- Cart dengan localStorage
- Midtrans redirect flow
- Manual payment upload
- Secure download access untuk paid orders
- SEO: metadata, sitemap, JSON-LD

---

## 🔐 Secure Digital Delivery

- Delivery token dibuat ketika order = **PAID**
- Token expiry: **24 hours**
- Download limit: **5**
- IP & User-Agent logging
- File **tidak public**

---

## 🚀 Setup Lokal (Ringkas)

### Prasyarat
- Node.js 18+ (frontend)
- PHP 8.2+ & Composer (backend)
- MySQL & Redis

### Frontend
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

### Backend
```bash
cd api
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

---

## 🔐 Environment Variables

Frontend dan backend menyertakan `.env.example` masing-masing.
Pastikan mengisi kredensial database, Redis, dan Midtrans sesuai environment lokal.

---

## 📦 Struktur Repo

```
.
├─ api        # Laravel 11 backend
├─ frontend   # Next.js app
├─ docs       # Dokumentasi tambahan
└─ README.md  # Ikhtisar project
```

---

## 🤝 Kontribusi

Silakan buat issue atau PR untuk perbaikan. Pastikan perubahan mengikuti design system dan kontrak API.

---

## 📝 Lisensi

Hak cipta © Hilal Technologic. Semua hak dilindungi.
