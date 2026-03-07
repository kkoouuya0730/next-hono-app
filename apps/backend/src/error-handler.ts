import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ErrorResponse, HttpError } from "./lib/errors";

export const errorHandler = (err: unknown, c: Context) => {
  if (err instanceof HttpError) {
    const payload: ErrorResponse = {
      success: false,
      message: err.message,
      details: err.details ?? null,
    };
    return c.json({ ...payload }, err.status as ContentfulStatusCode);
  }

  console.error(err);

  return c.json({ success: false, message: "Internal Server Error" }, 500);
};
