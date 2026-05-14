import * as repo from "@/repositories/project.repository";
import { parsePaginationParams, paginate } from "@/lib/utils/pagination";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/lib/validators/project";

export async function listProjects(searchParams: URLSearchParams) {
  const { page, limit } = parsePaginationParams(searchParams);
  const offset = (page - 1) * limit;
  const { items, total } = await repo.findAllProjects(limit, offset);
  return paginate(items, total, { page, limit });
}

export async function getProjectById(id: string) {
  return repo.findProjectById(id);
}

export async function createProject(input: CreateProjectInput) {
  return repo.createProject(input);
}

export async function updateProject(id: string, input: UpdateProjectInput) {
  return repo.updateProject(id, input);
}

export async function deleteProject(id: string) {
  return repo.deleteProject(id);
}
