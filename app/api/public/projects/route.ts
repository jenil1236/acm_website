export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import * as projectService from "@/services/project.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    const data = await projectService.listProjects(request.nextUrl.searchParams);
    return ok(data);
  } catch (err) {
    return handleRouteError(err);
  }
}
