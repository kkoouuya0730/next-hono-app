import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { ValidationError } from "./errors";
export const zValidatorWrapper = (schema: z.ZodTypeAny) =>
  zValidator("json", schema, (result, c) => {
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }
  });
