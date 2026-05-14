export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/guards";
import { createTeamMemberSchema } from "@/lib/validators/team";
import * as teamService from "@/services/team.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok, created } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    await requireSession();
    return ok(await teamService.listTeamMembers(request.nextUrl.searchParams));
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSession();
    const input = createTeamMemberSchema.parse(await request.json());
    return created(await teamService.createTeamMember(input), "Team member created.");
  } catch (err) {
    return handleRouteError(err);
  }
}
