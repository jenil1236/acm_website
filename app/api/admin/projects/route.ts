export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/guards";
import { createProjectSchema } from "@/lib/validators/project";
import * as projectService from "@/services/project.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok, created } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    await requireSession();
    const data = await projectService.listProjects(request.nextUrl.searchParams);
    return ok(data);
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSession();
    const input = createProjectSchema.parse(await request.json());
    return created(await projectService.createProject(input), "Project created.");
  } catch (err) {
    return handleRouteError(err);
  }
}
