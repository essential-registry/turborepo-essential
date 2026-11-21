# Turborepo Essential: guide for AI agents

pnpm + Turborepo monorepo: two Next.js apps (`web`, `docs`) and shared packages (`ui` on Base UI, `lib`, `env`, `typescript-config`). Packages ship TypeScript source. oxlint, oxfmt, vitest, changesets.

## Commands

```bash
pnpm install
pnpm dev                 # all apps (web :3000, docs :3001); filter: pnpm dev --filter=web
pnpm typecheck           # turbo: tsc in every package
pnpm lint                # oxlint (type-aware, warnings denied), whole repo
pnpm format:check        # oxfmt --check
pnpm test                # turbo: vitest in every package
pnpm build               # turbo build
pnpm gen:package <name>  # scaffold packages/<name> (@repo/<name>)
pnpm changeset           # record a release note
pnpm build:prepare       # fix, format, typecheck, test, build
```

The gate is `pnpm run ci (non-mutating) / pnpm run build:prepare (fixes first)`. CI runs the same thing, so a change that passes locally passes in CI.

## Layout

```text
apps/
  web/ docs/      Next.js apps; src/{app,lib,styles}. Thin: compose packages
packages/
  ui/             Base UI primitives + theme.css (shared design tokens)
  lib/            cn() and other pure helpers
  env/            parseEnv() (zod) used by apps
  typescript-config/  base.json, react-library.json, next.json
scripts/gen-package.mjs
turbo.json  pnpm-workspace.yaml (catalog = shared dependency versions)
.oxlintrc.json .oxfmtrc.json (one config for the whole repo)
```

## Conventions

- Layers point down only: `apps/*` -> `packages/ui` -> `packages/lib`/`env`. Packages never import from apps. No cycles (`import/no-cycle` is an error).
- Packages ship TypeScript source (`exports` points at `src/index.ts`); apps compile them via `transpilePackages`. No build step per package.
- Shared dependency versions live in the `catalog:` section of `pnpm-workspace.yaml`. Reference them as `"catalog:"`, never pin a different version in one package.
- A package's public API is its `src/index.ts`. Do not deep-import from another package.
- Tailwind: tokens live in `packages/ui/src/styles/theme.css`; apps `@import` it and add an `@source` line for the ui package.
- Env goes through `@repo/env` `parseEnv` in each app's `src/lib/env.ts`; document variables in the app's `.env.example`.
- Tests sit next to code (`*.test.ts(x)`).

## Rules (all Essential templates)

- **Git:** commits and pushes use the user's own git identity. Never set a Claude identity and never add `Co-Authored-By` or "Generated with" lines. Do not commit unless asked.
- Never read or print `.env` files or secrets. Every setting has an entry in `.env.example`.
- Conventional commits (`feat(scope): ...`). Feature branch, then pull request.
- Business numbers (limits, durations, thresholds) are configuration, never constants in code.
- If a rule is missing, stop and ask. Do not invent one.
- Run the gate before saying "done".

## Never

- Edit `pnpm-lock.yaml` by hand.
- Add a dependency with its own version when the catalog has it.
- Import from `apps/*` inside a package.
- Disable lint rules to make the gate pass.

## Read next

- `docs/architecture.md`, `docs/tooling.md`
