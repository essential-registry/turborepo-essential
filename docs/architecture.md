# Architecture

```text
apps/web, apps/docs  ->  packages/ui  ->  packages/lib
                     ->  packages/env
        all          ->  packages/typescript-config (dev only)
```

Imports point down the arrow only. Packages never import from apps.

## Packages ship source

Each package's `exports` points at `src/index.ts`. There is no per-package build: Next compiles workspace packages through `transpilePackages`, and `tsc --noEmit` and vitest read the source directly. This keeps edits instant and the task graph small.

## Shared dependency versions

`pnpm-workspace.yaml` has a `catalog:` section. Packages declare `"react": "catalog:"` and get the one version for the whole repo. Upgrade a dependency by editing the catalog once.

## Design tokens

`packages/ui/src/styles/theme.css` defines the Tailwind v4 theme (colours, radius, dark variant). Each app imports it and adds `@source "../../../../packages/ui/src"` so Tailwind scans the shared components.

## Tasks (turbo.json)

| Task        | Depends on   | Notes                      |
| ----------- | ------------ | -------------------------- |
| `build`     | `^build`     | caches `.next/**`          |
| `typecheck` | `^typecheck` | `tsc --noEmit` per package |
| `test`      | `^test`      | vitest per package         |
| `dev`       | none         | persistent, never cached   |

Lint and format run once at the repo root (oxlint, oxfmt), not per package.

## Adding things

- Package: `pnpm gen:package <name>`.
- App: copy `apps/web`, rename, change the port.
