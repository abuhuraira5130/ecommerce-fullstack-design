# Frontend (Storefront Pro)

Production-ready React + Vite storefront connected to the Django backend.

## Local setup

1. Copy `.env.example` to `.env`.
2. Set API base URL:
	 - `VITE_API_BASE_URL=http://127.0.0.1:8000`
3. Install and run:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Features

- Responsive ecommerce landing and catalog
- Product detail and cart management
- JWT auth (login/register/account)
- API-driven data from backend endpoints
- Clean design tokens and adaptive layout

## Deployment

- Recommended: Vercel / Netlify for frontend
- Set environment variable:
	- `VITE_API_BASE_URL=https://<your-backend-domain>`
