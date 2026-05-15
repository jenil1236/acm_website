export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import * as eventService from "@/services/event.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    const data = await eventService.listEvents(request.nextUrl.searchParams);
    return ok(data);
  } catch (err) {
    return handleRouteError(err);
  }
}
