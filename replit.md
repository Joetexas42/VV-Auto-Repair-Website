# VV Auto Repair

Bilingual (English / Vietnamese) website design mockup for VV Auto Repair — a two-location Dallas-area auto repair brand with shops in Dallas and Garland, TX.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Cloudflare Pages deployment

The static website (`artifacts/vv-auto-website`) is configured for Cloudflare Pages via `wrangler.toml` at the repo root.

On the Cloudflare Pages **"Set up your application"** screen:
- **Build command**: *(leave blank)*
- **Deploy command**: `npx wrangler pages deploy artifacts/vv-auto-website --project-name=vv-auto-repair-website`

Once the GitHub integration is enabled in the Cloudflare dashboard, every push to `main` triggers a new deploy automatically.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
