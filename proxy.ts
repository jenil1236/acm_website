import { NextResponse, type NextRequest } from "next/server";
import { unsealData } from "iron-session";
import { getSessionOptions, type SessionData } from "@/lib/auth/session";

const SESSION_COOKIE_NAME = "acm_admin_session";

/**
 * Public paths that bypass authentication checks.
 * All other /admin/* and /api/admin/* paths are protected.
 */
const PUBLIC_PATHS = new Set([
  "/admin/login",
  "/api/admin/auth/login",
  "/api/admin/auth/logout",
  "/api/admin/auth/me",
]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApi) {
    return NextResponse.next();
  }

  // Let public paths through
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // Verify session by decrypting the cookie value (no DB round-trip)
  let isLoggedIn = false;
  try {
    const cookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (cookieValue) {
      const session = await unsealData<SessionData>(cookieValue, {
        password: getSessionOptions().password as string,
      });
      isLoggedIn = session.isLoggedIn === true;
    }
  } catch {
    // Tampered or expired cookie — treat as unauthenticated
    isLoggedIn = false;
  }

  if (!isLoggedIn) {
    // API routes → 401 JSON
    if (isAdminApi) {
      return Response.json(
        { success: false, message: "Unauthorized — please log in." },
        { status: 401 },
      );
    }
    // Admin pages → redirect to login
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
