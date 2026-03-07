import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { ValidationError } from "../errors";

type ValidatorTarget = "json" | "param" | "query" | "form" | "header";

export const zValidatorWrapper = <T extends z.ZodTypeAny>(schema: T, target: ValidatorTarget = "json") =>
  zValidator(target, schema, (result) => {
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }
  });
