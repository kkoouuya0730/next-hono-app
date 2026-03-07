import z from "zod";
import { BadRequestError } from "./http-error";

export class ValidationError extends BadRequestError {
  public issues: z.core.$ZodIssue[];
  constructor(issues: z.core.$ZodIssue[], message = "Validation Error") {
    super(message, { issues });
    this.issues = issues;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
