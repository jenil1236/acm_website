export const dynamic = "force-dynamic";

import { getCurrentAdmin } from "@/services/auth.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET() {
  try {
    const data = await getCurrentAdmin();
    return ok(data, "Authenticated.");
  } catch (err) {
    return handleRouteError(err);
  }
}
