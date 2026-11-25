# VinhUni AI Campus

An independent student research prototype for academic planning at Vinh University. This project has no official university affiliation. The dashboard uses synthetic data and a labeled logo placeholder.

## v0.1.0 foundation

The bilingual VinhUni Glass UI displays a sample timetable, GPA, credits, graduation progress and an academic notice. Theme and language preferences are stored locally. VinhUni Copilot provides scripted replies for three sample topics in the browser. Chat messages are held in memory for the current page.

The FastAPI service exposes health endpoints. PostgreSQL with pgvector and Redis are available through Docker Compose. See the [architecture](docs/architecture.md) and [database design](docs/database.md).

## Start with Docker

Install Docker with Compose v2. From the repository root, run

```sh
cp .env.example .env
docker compose up --build --wait
```

| Service | Address |
| --- | --- |
| Dashboard | http://127.0.0.1:3000 |
| API docs | http://127.0.0.1:8000/docs |
| API liveness | http://127.0.0.1:8000/health/live |
| API readiness | http://127.0.0.1:8000/health/ready |

PostgreSQL and Redis stay on the Compose network. Use the supplied credentials for local development only. Use URL-safe values in these variables because Compose interpolates them into the database URL. Stop services with `docker compose down`. The PostgreSQL volume persists across normal restarts.

## Run locally

Use Node.js 24, npm and Python 3.12.

```sh
npm ci
npm run dev
```

In a separate terminal, run the API.

```sh
cd apps/api
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
uvicorn campus_api.main:app --reload
```

A standalone API starts without dependencies and its readiness endpoint returns 503. Set `DATABASE_URL` and `REDIS_URL` using [the API template](apps/api/.env.example) as a reference, or use Compose for a ready stack.

## Verify

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
(cd apps/api && .venv/bin/ruff check . && .venv/bin/python -m pytest)
docker compose config --quiet
```

Stop any dev server using port 3000 before Playwright starts the production server. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` only when using an existing compatible browser binary.

## Roadmap

| Phase | Scope |
| --- | --- |
| 1–2 | Monorepo and services, followed by the design system and student dashboard. v0.1.0 includes the initial UI. |
| 3–4 | Database migrations, JWT and roles, then academic and administrative modules. |
| 5–7 | Document retrieval, validated tool calling and LangGraph agent coordination. |
| 8–9 | OR-Tools scheduling, then personal memory and proactive reminders. |
| 10 | Evaluation, security validation and deployment. |
