# Turborepo Essential

A pnpm + Turborepo monorepo with two Next.js apps and shared packages, and the essentials already set up.

## What is inside

```text
apps/web, apps/docs      Next.js 16 apps (ports 3000 and 3001)
packages/ui              Base UI primitives and shared Tailwind v4 theme
packages/lib             shared helpers (cn)
packages/env             zod environment parsing
packages/typescript-config  shared tsconfig presets
```

- pnpm 12 with a dependency **catalog** (one version per dependency)
- Turborepo for build, typecheck and test caching
- oxlint (type-aware) and oxfmt at the repo root
- vitest per package, changesets, husky, GitHub Actions
- `AGENTS.md` and `.claude/` for AI agents

## Run

```bash
pnpm install
pnpm dev                    # everything
pnpm dev --filter=web       # one app
```

## Scripts

```bash
pnpm typecheck       # turbo: tsc in every package
pnpm lint            # oxlint, type-aware, warnings denied
pnpm format:check    # oxfmt check
pnpm test            # turbo: vitest in every package
pnpm build           # turbo build
pnpm gen:package x   # scaffold packages/x as @repo/x
pnpm run ci          # the gate CI runs (non-mutating)
pnpm build:prepare   # fix lint/format, then the full gate
```

See `docs/architecture.md` for how the pieces fit.

## License

MIT.
