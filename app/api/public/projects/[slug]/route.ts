export const dynamic = "force-dynamic";

import * as projectService from "@/services/project.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const project = await projectService.getProjectBySlug(slug);
    if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return ok(project);
  } catch (err) {
    return handleRouteError(err);
  }
}
