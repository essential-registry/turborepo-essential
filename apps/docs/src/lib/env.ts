import { parseEnv } from "@repo/env";
import { z } from "zod";

export const env = parseEnv(
  { NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3001") },
  {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION,
  }
);
