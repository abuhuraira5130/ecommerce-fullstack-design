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

Recommended backend host: Render

Required environment variables:
- `DEBUG=False`
- `SECRET_KEY=<production-secret>`
- `DATABASE_URL=<Neon postgres url>`
- `ALLOWED_HOSTS=<render-domain>,localhost,127.0.0.1`
- `CSRF_TRUSTED_ORIGINS=https://<vercel-domain>`
- `CORS_ALLOWED_ORIGINS=https://<vercel-domain>`

Start command:
- `gunicorn myproject.wsgi:application`

Railway note:
- Set the service root directory to `Backend`
- Railway can use the `Procfile` automatically for the start command
