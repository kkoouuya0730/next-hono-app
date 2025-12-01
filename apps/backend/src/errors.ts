export type ErrorDetails = Record<string, unknown> | undefined;

export class HttpError extends Error {
  public status: number;
  public details: ErrorDetails;
  constructor(status: number, message?: string, details?: ErrorDetails) {
    super(message ?? "Error");
    this.status = status;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 400 Error
export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", details?: ErrorDetails) {
    super(400, message, details);
  }
}

// バリデーションエラー
export class ValidationError extends BadRequestError {
  public issues: unknown[];
  constructor(issues: unknown[], message = "Validation Error") {
    super(message, { issues });
    this.issues = issues;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 認証エラー
export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(401, message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 認可エラー
export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(403, message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 404エラー
export class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(404, message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
