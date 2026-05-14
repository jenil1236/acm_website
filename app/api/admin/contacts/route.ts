export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/guards";
import * as contactService from "@/services/contact.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    await requireSession();
    const data = await contactService.listContactMessages(
      request.nextUrl.searchParams,
    );
    return ok(data);
  } catch (err) {
    return handleRouteError(err);
  }
}
