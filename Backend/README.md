# Backend

This folder is the live Django backend root for the ecommerce API.

Current contents:
- `manage.py`
- `myproject/`
- `core/`
- `store/`
- `tags/`
- `likes/`
- `playground/`
- `requirements.txt`
- `db.sqlite3`

Planned additions:
- environment variable config files
- backend deployment settings
- PostgreSQL configuration and migration settings
- backend tests and utility scripts

## Production deploy

Recommended backend host: Railway

Required environment variables:
- `DEBUG=False`
- `SECRET_KEY=<production-secret>`
- `DATABASE_URL=<Neon postgres url>`
- `FRONTEND_URL=https://<vercel-domain>`
- `ALLOWED_HOSTS` is auto-filled from Railway's public domain, but you can also set it manually to your Railway service host
- `CSRF_TRUSTED_ORIGINS=https://<vercel-domain>`
- `CORS_ALLOWED_ORIGINS=https://<vercel-domain>`

Start command:
- `gunicorn myproject.wsgi:application`

Railway note:
- Set the service root directory to `Backend`
- Railway can use the `Procfile` automatically for the start command
- If Railway exposes `RAILWAY_PUBLIC_DOMAIN`, the backend will accept that host automatically
