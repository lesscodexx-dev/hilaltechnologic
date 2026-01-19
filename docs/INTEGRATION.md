# Integration Guide

## Environment Variables

### Backend (`/api`)
- `APP_URL` – Base URL for the API.
- `DB_*` – MySQL connection values.
- `REDIS_*` – Redis connection values.
- `SESSION_DRIVER=database` – Required for Sanctum SPA cookies.
- `SANCTUM_STATEFUL_DOMAINS` – Comma-separated frontend domains (e.g. `localhost:3000`).
- `MIDTRANS_SERVER_KEY` – Midtrans server key for webhook signature validation.
- `MIDTRANS_SNAP_URL` – Base Snap URL used for redirects.
- `MIDTRANS_MANUAL_BANK` – Manual transfer bank label.
- `MIDTRANS_MANUAL_ACCOUNT` – Manual transfer account number.
- `MIDTRANS_MANUAL_NAME` – Manual transfer account name.

### Frontend (`/frontend`)
- `NEXT_PUBLIC_API_BASE_URL` – Backend URL (e.g. `http://localhost:8000`).

## Auth Notes (Sanctum SPA)
1. Call `GET /sanctum/csrf-cookie` before the first auth request.
2. Use `credentials: "include"` on all fetches.
3. Register/login via `/api/v1/auth/*` endpoints.

## API Endpoints (v1)

### Public
- `GET  /api/v1/products`
- `GET  /api/v1/products/{slug}`
- `GET  /api/v1/posts`
- `GET  /api/v1/posts/{slug}`
- `GET  /api/v1/portfolios`
- `GET  /api/v1/portfolios/{slug}`

### Auth (Sanctum SPA)
- `GET  /sanctum/csrf-cookie`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET  /api/v1/auth/me`

### Orders
- `POST /api/v1/orders`
- `GET  /api/v1/orders`
- `GET  /api/v1/orders/{orderNumber}`

### Payments
- `POST /api/v1/orders/{orderNumber}/pay`
  - Body: `{ "method": "midtrans" | "manual" }`
  - Midtrans response: `{ "payment": {...}, "redirect_url": "https://app.midtrans.com/snap/v2/..." }`
  - Manual response: `{ "payment": {...}, "instructions": {...} }`

### Manual Proof
- `POST /api/v1/orders/{orderNumber}/manual-proof` (multipart/form-data)

### Delivery / Download
- `GET  /api/v1/deliveries/{token}`
- `GET  /api/v1/download/{token}`

### Webhook
- `POST /api/v1/midtrans/webhook`
