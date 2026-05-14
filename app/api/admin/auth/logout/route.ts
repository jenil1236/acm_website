export const dynamic = "force-dynamic";

import { logoutAdmin } from "@/services/auth.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function POST() {
  try {
    await logoutAdmin();
    return ok(null, "Logged out successfully.");
  } catch (err) {
    return handleRouteError(err);
  }
}
