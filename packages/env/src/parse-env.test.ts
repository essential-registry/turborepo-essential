import { describe, expect, it } from "vitest";
import { z } from "zod";

import { parseEnv } from "./parse-env";

const shape = {
  SITE_NAME: z.string().default("Essential"),
  PORT: z.coerce.number(),
};

describe("parseEnv", () => {
  it("parses and coerces values", () => {
    expect(parseEnv(shape, { PORT: "3000" })).toEqual({
      SITE_NAME: "Essential",
      PORT: 3000,
    });
  });

  it("throws on invalid values", () => {
    expect(() => parseEnv(shape, { PORT: "abc" })).toThrow();
  });

  it("uses defaults when validation is skipped", () => {
    const result = parseEnv(
      { SITE_NAME: z.string().default("x") },
      {
        SKIP_ENV_VALIDATION: "true",
      }
    );
    expect(result.SITE_NAME).toBe("x");
  });
});
