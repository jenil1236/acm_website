export const dynamic = "force-dynamic";

import { requireSession } from "@/lib/auth/guards";
import { updateEventSchema } from "@/lib/validators/event";
import * as eventService from "@/services/event.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    return ok(await eventService.getEventById(id));
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    const input = updateEventSchema.parse(await request.json());
    return ok(await eventService.updateEvent(id, input), "Event updated.");
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    await eventService.deleteEvent(id);
    return ok(null, "Event deleted.");
  } catch (err) {
    return handleRouteError(err);
  }
}
