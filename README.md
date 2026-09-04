# Coolify Demo Feedback

Kleine Feedback-App für einen Vortrag: Titel des Vortrags wird angezeigt, Zuhörer:innen
können ohne Login eine Sternebewertung (1–5) mit Name, E-Mail und Kommentar abgeben. Die
Liste der Bewertungen aktualisiert sich automatisch (Polling alle 4 Sekunden).

Gebaut als Live-Deployment-Demo für den Vortrag "Vibe Coding ist nur die halbe Miete:
Build, Deploy & Betrieb auf eigenem Server" (Synaxon, 11.09.2026) – zeigt den kompletten
Weg von Claude Code über Coolify bis zur laufenden App mit Datenbank.

## Stack

Next.js (App Router) + TypeScript, Tailwind CSS, Prisma 7 (mit `@prisma/adapter-pg`),
PostgreSQL, Dockerfile.

## Konfigurationsvariablen

Siehe `.env.example`:

| Variable | Zweck |
|---|---|
| `DATABASE_URL` | PostgreSQL-Connection-String |
| `TALK_TITLE` | Angezeigter Vortragstitel (optional, hat einen Default im Code) |
| `TALK_SPEAKER` | Angezeigter Name/Firma unter dem Titel (optional) |

**Wichtig:** `TALK_TITLE`/`TALK_SPEAKER` werden zur Build-Zeit eingebacken (die Startseite
wird statisch vorgerendert) – in Coolify also *vor* dem Deploy als Env-Var setzen, nicht
erst danach nachtragen.

## Lokales Setup

```bash
npm install
cp .env.example .env
# DATABASE_URL auf eine lokale Postgres zeigen lassen, z.B.:
# docker run -d --name feedback-db -e POSTGRES_USER=feedback -e POSTGRES_PASSWORD=feedback \
#   -e POSTGRES_DB=feedback -p 5432:5432 postgres:16-alpine

npx prisma migrate dev
npm run dev
```

Danach unter http://localhost:3000.

## Deployment (Coolify)

Bewusst **minimal** gehalten – das ist eine Wegwerf-Demo für einen einzelnen Vortrag,
kein Produktionsprojekt: nur ein `production`-Environment, kein `staging`, keine
Backup-Automatik, kein Admin-User-Seed (es gibt ohnehin kein Login).

1. Neues Coolify-Projekt → Resource → Application → GitHub App, Branch `master`
2. Neue Postgres-Ressource im selben Projekt, `DATABASE_URL` in die App übernehmen
3. Env-Vars setzen (siehe oben), **vor** dem ersten Build
4. Build Pack: Dockerfile, Port: `3000`
5. Deploy – `docker-entrypoint.sh` führt `prisma migrate deploy` automatisch aus, bevor
   der Server startet

Nach dem Vortrag: Server/Ressourcen in Coolify wieder abbauen, die App wird nicht dauerhaft
gebraucht.
