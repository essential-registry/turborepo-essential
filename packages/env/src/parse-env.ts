import { z } from "zod";

/**
 * Validate environment variables against a zod shape.
 * With SKIP_ENV_VALIDATION=true (CI, Docker builds) the schema defaults are used instead.
 */
export function parseEnv<T extends z.ZodRawShape>(
  shape: T,
  source: Record<string, string | undefined>
): z.infer<z.ZodObject<T>> {
  const schema = z.object(shape);
  const skip = source.SKIP_ENV_VALIDATION === "true";
  return schema.parse(skip ? {} : source);
}
