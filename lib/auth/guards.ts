import { getSession } from "./session";
import { AppError } from "@/lib/utils/errors";

/**
 * Call this at the top of any protected route handler.
 * Throws a 401 AppError if no valid session exists.
 *
 * @returns The session data for the authenticated admin.
 */
export async function requireSession() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    throw new AppError("Unauthorized — please log in.", 401);
  }

  return session;
}
