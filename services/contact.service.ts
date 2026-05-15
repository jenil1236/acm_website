import * as repo from "@/repositories/contact.repository";
import { parsePaginationParams, paginate } from "@/lib/utils/pagination";
import type { UpdateContactStatusInput } from "@/lib/validators/contact";

export async function listContactMessages(searchParams: URLSearchParams) {
  const { page, limit } = parsePaginationParams(searchParams);
  const offset = (page - 1) * limit;
  const status = searchParams.get("status") ?? undefined;
  const { items, total } = await repo.findAllContacts(limit, offset, status);
  return paginate(items, total, { page, limit });
}

export async function getContactMessageById(id: string) {
  return repo.findContactById(id);
}

export async function createContactMessage(input: import("@/lib/validators/contact").CreateContactInput) {
  return repo.createContact(input);
}

export async function updateContactStatus(
  id: string,
  input: UpdateContactStatusInput,
) {
  return repo.updateContactStatus(id, input);
}

export async function deleteContactMessage(id: string) {
  return repo.deleteContact(id);
}
