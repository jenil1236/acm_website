import * as repo from "@/repositories/event.repository";
import { parsePaginationParams, paginate } from "@/lib/utils/pagination";
import type { CreateEventInput, UpdateEventInput } from "@/lib/validators/event";

export async function listEvents(searchParams: URLSearchParams) {
  const { page, limit } = parsePaginationParams(searchParams);
  const offset = (page - 1) * limit;
  const { items, total } = await repo.findAllEvents(limit, offset);
  return paginate(items, total, { page, limit });
}

export async function getEventById(id: string) {
  return repo.findEventById(id);
}

export async function createEvent(input: CreateEventInput) {
  return repo.createEvent(input);
}

export async function updateEvent(id: string, input: UpdateEventInput) {
  return repo.updateEvent(id, input);
}

export async function deleteEvent(id: string) {
  return repo.deleteEvent(id);
}
