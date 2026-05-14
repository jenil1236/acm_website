export const dynamic = "force-dynamic";

import { requireSession } from "@/lib/auth/guards";
import { updateProjectSchema } from "@/lib/validators/project";
import * as projectService from "@/services/project.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    return ok(await projectService.getProjectById(id));
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
    const input = updateProjectSchema.parse(await request.json());
    return ok(await projectService.updateProject(id, input), "Project updated.");
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
    await projectService.deleteProject(id);
    return ok(null, "Project deleted.");
  } catch (err) {
    return handleRouteError(err);
  }
}
