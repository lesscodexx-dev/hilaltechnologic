# Hilal Technologic

**Hilal Technologic** is a production-ready digital platform for a modern software agency — combining an agency website, tech blog, and digital product store into a single, scalable system.

Built with a **dark-only, Linear-inspired UI**, a **strict API contract**, and a **clean full-stack architecture**, this project represents our engineering and design quality bar.

---

## 🌌 Live Environment

- **Frontend**: https://hilaltechnologic.com   

---

## 🎯 Product Scope

- **Agency / Software House Website**
- **Tech Blog** (Markdown, code highlighting, SEO-ready)
- **Digital Product Store**
  - Themes
  - Templates
  - Source code
- **Secure Digital Delivery**
- **Midtrans & Manual Payment Support**

This is an **MVP**, but built with **production-grade standards** and scalability in mind.

---

## 🧱 Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- Dark-only design system (no light mode, no toggle)

### Backend
- **Laravel 11**
- **MySQL**
- **Redis** (cache & queue)
- **Laravel Sanctum** (SPA cookie auth)
- **Filament** (Admin Panel)

### Infrastructure
- VPS
- Nginx
- Redis
- MySQL

---

## 🎨 Design System Philosophy

Inspired by **Linear.app**:

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

All endpoints are versioned under `/api/v1`.  
This contract is the **single source of truth**.

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

⚠️ **Rules**
- Midtrans uses `redirect_url` only
- No invented endpoints
- Frontend follows API strictly

---

## 🗄️ Backend Architecture

### Core Features
- Sanctum SPA authentication
- Policy-based authorization
- Idempotent Midtrans webhook handling
- Secure digital delivery (token, expiry, limit)
- Admin management via Filament

### Database Tables
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
- Cart with localStorage
- Midtrans redirect flow
- Manual payment upload
- Secure download access for paid orders
- SEO: metadata, sitemap, JSON-LD

---

## 🔐 Secure Digital Delivery

- Delivery token generated when order = **PAID**
- Token expiry: **24 hours**
- Download limit: **5**
- IP & User-Agent logging
- Files are **not public**

---

## 🚀 Environment Variables

Both frontend and backend include `.env.example`.

Key notes:
- `NEXT_PUBLIC_API_BASE_URL`
- Sanctum cookie auth enabled
- CORS restricted to `hilaltechnologic.com`

---

## 📦 Deployment Assumptions

- Nginx reverse proxy
- Redis running
- Queue workers active
- Scheduler enabled
- HTTPS enforced

---

## 🧠 Engineering Principles

- Explicit API contracts
- Predictable state transitions
- Secure by default
- No over-engineering
- Calm UI over visual noise

---

## 🏁 Status

✅ Production-ready MVP  
🧩 Designed for iteration & scale  

---

**Hilal Technologic**  
Building calm, precise, and reliable digital products.
```
