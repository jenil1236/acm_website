import { ZodError } from "zod";
import { badRequest, serverError } from "./response";

/**
 * Lightweight application error class.
 * Throw this from services/repos to signal known error conditions.
 */
export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Converts any thrown value into a typed HTTP Response.
 * Call this in the catch block of every route handler.
 */
export function handleRouteError(err: unknown): Response {
  if (err instanceof AppError) {
    const body = { success: false, message: err.message };
    return Response.json(body, { status: err.statusCode });
  }

  if (err instanceof ZodError) {
    const message = err.issues.map((e: { message: string }) => e.message).join("; ");
    return badRequest(message, "Validation failed");
  }

  console.error("[Unhandled route error]", err);
  return serverError();
}
