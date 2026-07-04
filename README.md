<div align="center">

# 🛍️ Storefront Pro

### A modern full-stack ecommerce storefront built with React, Django REST Framework, JWT authentication, and production deployment.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Storefront%20Pro-00b894?style=for-the-badge)](https://shopverseio.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=111111)](#-tech-stack)
[![Backend](https://img.shields.io/badge/Backend-Django%20REST-092E20?style=for-the-badge&logo=django&logoColor=white)](#-tech-stack)
[![Deploy](https://img.shields.io/badge/Production-Deployed-success?style=for-the-badge)](https://shopverseio.vercel.app/)

🚀 **Live Project:** [https://shopverseio.vercel.app/](https://shopverseio.vercel.app/)

</div>

---

## ✨ Overview

**Storefront Pro** is a responsive ecommerce web application with a polished customer experience, product browsing, product details, cart management, authentication, and order creation. The project is split into a **React/Vite frontend** and a **Django REST API backend**, making it clean, scalable, and ready for production deployment.

---

## 🌟 Key Features

| Area | Features |
| --- | --- |
| 🏬 Storefront | Responsive home page, product catalog, product detail pages |
| 🛒 Cart | Create cart, add items, update quantities, remove items |
| 🔐 Auth | Register, login, account page, JWT-based authentication |
| 📦 Orders | Create orders from cart for authenticated users |
| 🔎 Catalog API | Products, collections, pagination, and search support |
| 🧑‍💼 Admin | Django admin portal for managing products, collections, customers, and orders |
| 🚀 Production | Frontend deployed on Vercel and backend prepared for Railway/PostgreSQL |

---

## 🧰 Tech Stack

<div align="center">

| Frontend | Backend | Database / Deploy |
| --- | --- | --- |
| React 18 | Django 5 | PostgreSQL |
| Vite | Django REST Framework | Railway |
| React Router | Djoser + Simple JWT | Vercel |
| CSS Design Tokens | CORS + WhiteNoise | Gunicorn |

</div>

---

## 📁 Project Structure

```text
myproject2/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vercel.json
│
├── Backend/
│   ├── core/
│   ├── store/
│   ├── tags/
│   ├── likes/
│   ├── myproject/
│   ├── manage.py
│   ├── Procfile
│   └── requirements.txt
│
└── render.yaml
```

---

## 🚀 Live Deployment

| Service | URL / Purpose |
| --- | --- |
| 🌐 Frontend | [Storefront Pro Live](https://shopverseio.vercel.app/) |
| ⚙️ Backend API | Django REST API connected through `VITE_API_BASE_URL` |
| 🛠️ Admin Panel | `/admin/` on the deployed backend |

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

### 2. Backend setup

```bash
cd Backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Create a `.env` file inside `Backend` for production-like configuration:

```env
DEBUG=False
SECRET_KEY=your-production-secret
DATABASE_URL=your-postgres-url
FRONTEND_URL=https://shopverseio.vercel.app
CSRF_TRUSTED_ORIGINS=https://shopverseio.vercel.app
CORS_ALLOWED_ORIGINS=https://shopverseio.vercel.app
```

### 3. Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

Create a `.env` file inside `Frontend`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

For production:

```env
VITE_API_BASE_URL=https://your-backend-production-url
```

---

## 🧪 Build Commands

| App | Command |
| --- | --- |
| Frontend dev | `npm run dev` |
| Frontend build | `npm run build` |
| Frontend preview | `npm run preview` |
| Backend dev | `python manage.py runserver` |
| Backend migrations | `python manage.py migrate` |
| Backend production | `gunicorn myproject.wsgi:application` |

---

## 🔌 Main API Routes

| Route | Purpose |
| --- | --- |
| `/store/products/` | Product listing |
| `/store/products/:id/` | Product detail |
| `/store/collections/` | Product collections |
| `/store/carts/` | Cart creation |
| `/store/carts/:id/` | Cart detail |
| `/store/carts/:id/items/` | Cart items |
| `/store/orders/` | Order creation |
| `/auth/users/` | User registration |
| `/auth/jwt/create/` | Login / token creation |
| `/auth/users/me/` | Current user profile |

---

## ✅ Production Checklist

- ✅ Responsive frontend deployed on Vercel
- ✅ Django backend configured for production hosting
- ✅ JWT authentication enabled
- ✅ CORS and CSRF origins supported through environment variables
- ✅ PostgreSQL-ready database configuration
- ✅ Static files configured with WhiteNoise
- ✅ Gunicorn start command available

---

## 👨‍💻 Author

<div align="center">

Built with ❤️ as a production-ready full-stack ecommerce project.

**Storefront Pro** is live here: [shopverseio.vercel.app](https://shopverseio.vercel.app/)

</div>
