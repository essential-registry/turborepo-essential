#!/usr/bin/env node
/**
 * Scaffold a workspace package.
 *
 *   pnpm gen:package <name>
 *
 * Creates packages/<name> ("@repo/<name>") with package.json, tsconfig.json, vitest config,
 * src/index.ts and a first test. Packages ship TypeScript source (no build step).
 * Never overwrites an existing package.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const name = process.argv[2];
if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error(
    "gen:package: pass a kebab-case name, e.g. `pnpm gen:package billing`"
  );
  process.exit(1);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "packages", name);
if (existsSync(dir)) {
  console.error(`gen:package: packages/${name} already exists`);
  process.exit(1);
}

const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const files = {
  "package.json": json({
    name: `@repo/${name}`,
    version: "0.0.0",
    private: true,
    type: "module",
    license: "MIT",
    exports: { ".": "./src/index.ts" },
    scripts: {
      typecheck: "tsc --noEmit",
      test: "vitest run",
      clean: "rm -rf coverage *.tsbuildinfo",
    },
    devDependencies: {
      "@repo/typescript-config": "workspace:*",
      "@types/node": "catalog:",
      typescript: "catalog:",
      vitest: "catalog:",
    },
  }),
  "tsconfig.json": json({
    extends: "@repo/typescript-config/base",
    compilerOptions: { types: ["node"] },
    include: ["src", "vitest.config.ts"],
  }),
  "vitest.config.ts":
    'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ test: { include: ["src/**/*.test.ts"] } });\n',
  "src/index.ts": 'export { hello } from "./hello";\n',
  "src/hello.ts": `/** Replace with your code. */\nexport const hello = (who: string): string => \`Hello, \${who}\`;\n`,
  "src/hello.test.ts":
    'import { expect, it } from "vitest";\n\nimport { hello } from "./hello";\n\nit("greets", () => {\n  expect(hello("world")).toBe("Hello, world");\n});\n',
};

for (const [file, content] of Object.entries(files)) {
  const path = join(dir, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log(`create ${path}`);
}
console.log(
  '\nNext: pnpm install, then add "@repo/' +
    name +
    '": "workspace:*" to the apps that use it.'
);
