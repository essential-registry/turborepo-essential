import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Workspace packages ship TypeScript source, so Next compiles them.
  transpilePackages: ["@repo/ui", "@repo/lib", "@repo/env"],
};

export default nextConfig;
