export const dynamic = "force-dynamic";

import { requireSession } from "@/lib/auth/guards";
import { updateTeamMemberSchema } from "@/lib/validators/team";
import * as teamService from "@/services/team.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    return ok(await teamService.getTeamMemberById(id));
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
    const input = updateTeamMemberSchema.parse(await request.json());
    return ok(await teamService.updateTeamMember(id, input), "Team member updated.");
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
    await teamService.deleteTeamMember(id);
    return ok(null, "Team member deleted.");
  } catch (err) {
    return handleRouteError(err);
  }
}
