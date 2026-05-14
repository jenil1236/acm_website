import * as repo from "@/repositories/team.repository";
import { parsePaginationParams, paginate } from "@/lib/utils/pagination";
import type {
  CreateTeamMemberInput,
  UpdateTeamMemberInput,
} from "@/lib/validators/team";

export async function listTeamMembers(searchParams: URLSearchParams) {
  const { page, limit } = parsePaginationParams(searchParams);
  const offset = (page - 1) * limit;
  const { items, total } = await repo.findAllTeamMembers(limit, offset);
  return paginate(items, total, { page, limit });
}

export async function getTeamMemberById(id: string) {
  return repo.findTeamMemberById(id);
}

export async function createTeamMember(input: CreateTeamMemberInput) {
  return repo.createTeamMember(input);
}

export async function updateTeamMember(
  id: string,
  input: UpdateTeamMemberInput,
) {
  return repo.updateTeamMember(id, input);
}

export async function deleteTeamMember(id: string) {
  return repo.deleteTeamMember(id);
}
