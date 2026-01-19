# Hilal Technologic API

Backend ini adalah **Laravel 11** API untuk platform Hilal Technologic. Fokus pada kontrak API yang ketat, keamanan delivery file digital, dan integrasi pembayaran.

## ✨ Fitur Utama

- Sanctum SPA authentication
- Produk, blog, dan portfolio API
- Order & payment flow (Midtrans + manual)
- Secure digital delivery (token, expiry, limit)
- Admin panel dengan Filament

## 📦 Tech Stack

- Laravel 11
- MySQL
- Redis (cache/queue)
- Sanctum
- Filament

## 🚀 Menjalankan Lokal

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

API akan berjalan di `http://localhost:8000` (default).

## 🔧 Environment Variables

- `APP_URL` → base URL backend
- `DB_*` → konfigurasi database
- `REDIS_*` → konfigurasi Redis
- `MIDTRANS_SERVER_KEY` & `MIDTRANS_CLIENT_KEY`

Cek `.env.example` untuk daftar lengkapnya.

## 🔌 API Contract (v1)

Semua endpoint versi ada di `/api/v1`.

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

## 🧪 Testing

```bash
php artisan test
```

## 📄 Lisensi

Hak cipta © Hilal Technologic. Semua hak dilindungi.
