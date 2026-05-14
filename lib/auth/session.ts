import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

/** Data stored inside the encrypted session cookie. */
export interface SessionData {
  isLoggedIn: boolean;
  username: string;
  loggedInAt: number; // Unix ms
}

const SESSION_COOKIE_NAME = "acm_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function getSessionOptions(): SessionOptions {
  const password = process.env.ADMIN_SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set and at least 32 characters long.",
    );
  }
  return {
    password,
    cookieName: SESSION_COOKIE_NAME,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    },
  };
}

/**
 * Returns the iron-session instance for use inside Route Handlers and
 * Server Components. Reads/writes via `next/headers` cookies().
 */
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, getSessionOptions());
}
