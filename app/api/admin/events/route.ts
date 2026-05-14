export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/guards";
import { createEventSchema } from "@/lib/validators/event";
import * as eventService from "@/services/event.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok, created } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    await requireSession();
    const data = await eventService.listEvents(request.nextUrl.searchParams);
    return ok(data);
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSession();
    const body = await request.json();
    const input = createEventSchema.parse(body);
    const data = await eventService.createEvent(input);
    return created(data, "Event created.");
  } catch (err) {
    return handleRouteError(err);
  }
}
