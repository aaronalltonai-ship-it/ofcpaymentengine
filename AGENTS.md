# Repository Guidelines

## Project Structure & Module Organization
- `apps/admin-web` and `apps/host-web` are the Next 14 front ends; rely on their `package.json` scripts (`dev`, `build`, `start`) for UI work.
- `services/api` is the FastAPI payout API; `src/routers` define endpoints, `src/settings.py` holds env schema, and `src/db` contains PostgreSQL repositories.
- `packages/engine` contains the deterministic payout computation, `packages/db` the schema, and `packages/vision` the Groq extraction helpers. `docs/` and `scripts/` document spreadsheets, deployment, and helper SQL/PowerShell.

## Build, Test, and Development Commands
- Install the JS workspace with `pnpm install` (per `pnpm-workspace.yaml`) and start each app via `pnpm --filter admin-web dev` or `pnpm --filter host-web dev`.
- Feed the API with `python -m pip install -r services/api/requirements.txt` and run `cd services/api && python -m uvicorn src.main:app --host 127.0.0.1 --port 8000`.
- Rebuild the schema by setting `DATABASE_URL` (e.g., `postgres://postgres:postgres@127.0.0.1:5432/payout`) and running `scripts/setup_db.ps1` or `psql` against `packages/db/schema.sql`.
- Exercise the payout logic with `python -m pytest packages/engine/tests/test_engine.py`.

## Coding Style & Naming Conventions
- Python follows PEP 8 with `ruff` line length 100, dataclasses for DTOs (`packages/engine/src/types.py`), and explicit `Decimal` math; use snake_case for DB columns and config keys, and Pascal/CamelCase for router classes and DTO names.
- The Next.js apps are TypeScript-first; prefer `.tsx` components, camelCase props, PascalCase components, and respect each `tsconfig.json` (ES2020 target, JSX preserve, isolated modules).

## Testing Guidelines
- Engine tests live in `packages/engine/tests` and are named `test_*.py`; run `pytest packages/engine/tests/test_engine.py` from the repo root and extend those fixtures for new payout cases. UI coverage is manual for now, so smoke the matching Next app when touching front-end logic.

## Commit & Pull Request Guidelines
- This checkout lacks a `.git` directory, so rely on concise conventional-style commits (e.g., `feat(engine): add rounding guard`), mention the relevant goal/issue, and note the commands you used to verify the change.
- PRs should highlight deployment impact, reference `docs/payout_rules.md` or `docs/db_setup.md` when pertinent, and document any manual steps (schema reset, storage cleanup, etc.).

## Security & Configuration Tips
- Keep secrets outside the repo (mirror `.env.example`). `services/api/src/settings.py` reads `DATABASE_URL`, Groq keys (`GROQ_*`), and S3 settings (`S3_*`), so provide them before running the API.
- Ensure `services/api/data/uploads` exists for local uploads and rerun `scripts/setup_db.ps1` after editing `packages/db/schema.sql`.
