# Turborepo Essential

[![CI](https://github.com/essential-registry/turborepo-essential/actions/workflows/ci.yml/badge.svg)](https://github.com/essential-registry/turborepo-essential/actions/workflows/ci.yml) ![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

A pnpm + Turborepo monorepo starter: two Next.js apps and shared packages with one version catalog, one lint and format config, tests per package, changesets, CI and an agent guide.

Part of [Essential](https://github.com/essential-registry): starter templates with the tooling, structure, docs and AI-agent guide already in place.

## What you get

- **Two Next.js 16 apps** (`web` on :3000, `docs` on :3001) sharing a design system
- **Shared packages:** `@repo/ui` (Base UI primitives and Tailwind v4 theme), `@repo/lib` (`cn`), `@repo/env` (zod env parsing), `@repo/typescript-config` (tsconfig presets)
- **Packages ship TypeScript source:** no per-package build step; apps compile them with `transpilePackages`
- **pnpm catalog:** one version of every shared dependency, referenced as `catalog:`
- **Turborepo** caches build, typecheck and test; **oxlint** (type-aware) and **oxfmt** run once at the root
- **vitest** per package, **changesets**, **Husky**, **GitHub Actions** CI
- **`pnpm gen:package`** scaffolds a new workspace package
- **Docs and AGENTS.md** for people and coding agents

## Requirements

- [Node.js](https://nodejs.org) 22 or newer
- [pnpm](https://pnpm.io) 12 (`corepack enable` picks the right version from `package.json`)

## Quick start

Click **Use this template** on GitHub (or run `gh repo create my-project --template essential-registry/turborepo-essential`), then:

```bash
pnpm install
pnpm dev                  # all apps
pnpm dev --filter=web    # one app
```

Open <http://localhost:3000> (web) and <http://localhost:3001> (docs).

## Commands

| Command                             | What it does                                                |
| ----------------------------------- | ----------------------------------------------------------- |
| `pnpm dev`                          | Run every app (`--filter=<app>` for one)                    |
| `pnpm build`                        | Build everything through Turborepo                          |
| `pnpm typecheck`                    | `tsc --noEmit` in every package                             |
| `pnpm lint` / `pnpm lint:fix`       | oxlint, type-aware, warnings denied / auto-fix (whole repo) |
| `pnpm format` / `pnpm format:check` | oxfmt write / check                                         |
| `pnpm test`                         | vitest in every package                                     |
| `pnpm gen:package <name>`           | Scaffold `packages/<name>` as `@repo/<name>`                |
| `pnpm changeset`                    | Record a release note                                       |
| `pnpm run ci`                       | The non-mutating gate CI runs                               |
| `pnpm build:prepare`                | Fix lint and format, then run the full gate                 |

## Project structure

```text
apps/
  web/ docs/            Next.js apps (src/app, src/lib, src/styles)
packages/
  ui/                   Base UI primitives + shared Tailwind theme
  lib/                  cn() and pure helpers
  env/                  parseEnv() (zod)
  typescript-config/    base, react-library and next tsconfig presets
scripts/gen-package.mjs
turbo.json  pnpm-workspace.yaml (catalog)
.oxlintrc.json  .oxfmtrc.json
```

## Architecture

Imports point down only: `apps/*` -> `packages/ui` -> `packages/lib` and `packages/env`; packages never import from apps. Shared dependency versions live in the `catalog:` section of `pnpm-workspace.yaml`, and design tokens in `packages/ui/src/styles/theme.css`, which each app imports.

Full details: [`docs/architecture.md`](docs/architecture.md).

## Documentation

- [`docs/architecture.md`](docs/architecture.md): layers, folders and how the pieces fit
- [`docs/tooling.md`](docs/tooling.md): every command, tool and the quality gate

## Quality gate and CI

`pnpm run ci` runs typecheck, lint, format check, tests and the build for every package (Turborepo caches unchanged work). GitHub Actions runs exactly that on every push and pull request, and the Husky pre-commit hook runs the fast checks. `pnpm build:prepare` fixes lint and formatting first.

## Working with AI agents

[`AGENTS.md`](AGENTS.md) is the guide coding agents follow: commands, layout, conventions and a "never" list (`CLAUDE.md` points to it). `.claude/` adds safe permissions, a formatter hook, a read-only reviewer agent and task skills. Commits always use your own git identity; the guide tells agents not to add attribution lines and not to commit unless asked.

## Make it yours

1. Rename the repo and the `@repo` scope if you want your own (search and replace `@repo/`).
2. Edit the two apps' pages and `.env.example` files.
3. Change colours in `packages/ui/src/styles/theme.css`.
4. Add packages with `pnpm gen:package` and apps by copying `apps/web`.

## License

MIT. See [LICENSE](LICENSE).
