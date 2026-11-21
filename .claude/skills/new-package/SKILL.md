---
name: new-package
description: Create a shared workspace package.
---

Run `pnpm gen:package <name>`, implement it in `packages/<name>/src`, add tests, add `"@repo/<name>": "workspace:*"` to the apps that use it, add it to `transpilePackages` in those apps' `next.config.ts`, then `pnpm install` and `pnpm run build:prepare`.
