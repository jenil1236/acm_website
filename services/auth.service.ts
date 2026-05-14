import { getSession } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";
import { AppError } from "@/lib/utils/errors";
import type { LoginInput } from "@/lib/validators/auth";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

export async function loginAdmin(input: LoginInput) {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
    throw new AppError("Admin credentials are not configured.", 500);
  }

  const usernameMatch = input.username === ADMIN_USERNAME;
  const passwordMatch = await verifyPassword(input.password, ADMIN_PASSWORD_HASH);

  // Constant-time-ish: always run bcrypt even on wrong username to avoid timing attacks
  if (!usernameMatch || !passwordMatch) {
    throw new AppError("Invalid username or password.", 401);
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.username = ADMIN_USERNAME;
  session.loggedInAt = Date.now();
  await session.save();

  return { username: ADMIN_USERNAME };
}

export async function logoutAdmin() {
  const session = await getSession();
  session.destroy();
}

export async function getCurrentAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new AppError("Not authenticated.", 401);
  }
  return { username: session.username, loggedInAt: session.loggedInAt };
}
