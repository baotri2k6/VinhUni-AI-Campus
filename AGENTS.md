# VinhUni AI Campus engineering instructions

- Treat the project as an independent student research prototype. Use synthetic fixtures and a clearly labeled logo placeholder until an official asset is verified and authorized.
- Keep each change within its roadmap phase. Respect module boundaries and place shared UI primitives in `packages/glass-ui`.
- Keep Vietnamese and English copy in sync. Check keyboard navigation, focus, contrast, responsive layout and reduced motion. Keep blur away from dense records.
- Keep secrets in the environment and templates free of real credentials. Do not connect to university services without explicit authorization.
- Validate account identity, role and record ownership on the API. Future agent actions must use typed, allowlisted tools, server-side authorization, audit records and human confirmation for consequential changes. Never expose arbitrary SQL or grade, credential, role or permission changes as agent tools.
- Use reviewed Alembic migrations once domain tables are introduced. Keep database changes deployable and use parameterized queries.
- Run web lint, type checks, Vitest, build and Playwright, API Ruff and Pytest, and Compose checks as applicable. Report skipped and failed checks. Use focused development branches and summarize behavior and verification in the PR.
