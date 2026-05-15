export const dynamic = "force-dynamic";

import * as eventService from "@/services/event.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const event = await eventService.getEventBySlug(slug);
    if (!event) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return ok(event);
  } catch (err) {
    return handleRouteError(err);
  }
}
