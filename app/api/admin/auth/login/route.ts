export const dynamic = "force-dynamic";

import { loginSchema } from "@/lib/validators/auth";
import { loginAdmin } from "@/services/auth.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = loginSchema.parse(body);
    const data = await loginAdmin(input);
    return ok(data, "Login successful.");
  } catch (err) {
    return handleRouteError(err);
  }
}
