export type ErrorCode =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "FORBIDDEN"
  | "UNAUTHORIZED"
  | "INTERNAL";

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AppError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
