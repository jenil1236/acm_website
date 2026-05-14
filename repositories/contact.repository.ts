import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/constants/collections";
import { CONTACT_STATUSES } from "@/lib/constants/statuses";
import { toISOString } from "@/lib/utils/dates";
import { AppError } from "@/lib/utils/errors";
import type { ContactMessage } from "@/types/contact";
import type {
  CreateContactInput,
  UpdateContactStatusInput,
} from "@/lib/validators/contact";

const col = () => getDb().collection(COLLECTIONS.CONTACT_MESSAGES);

function docToContact(
  id: string,
  data: FirebaseFirestore.DocumentData,
): ContactMessage {
  return {
    id,
    admissionNumber: data.admissionNumber,
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    status: data.status ?? CONTACT_STATUSES.UNREAD,
    createdAt: toISOString(data.createdAt as Timestamp) ?? "",
    updatedAt: toISOString(data.updatedAt as Timestamp) ?? "",
  };
}

export async function findAllContacts(
  limit: number,
  offset: number,
  status?: string,
): Promise<{ items: ContactMessage[]; total: number }> {
  let query = col().orderBy("createdAt", "desc") as FirebaseFirestore.Query;
  if (status) query = query.where("status", "==", status);

  const [snap, countSnap] = await Promise.all([
    query.limit(limit).offset(offset).get(),
    (status
      ? col().where("status", "==", status)
      : col()
    )
      .count()
      .get(),
  ]);

  return {
    items: snap.docs.map((d) => docToContact(d.id, d.data())),
    total: countSnap.data().count,
  };
}

export async function findContactById(id: string): Promise<ContactMessage> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Contact message not found.", 404);
  return docToContact(doc.id, doc.data()!);
}

export async function createContact(
  input: CreateContactInput,
): Promise<ContactMessage> {
  const now = FieldValue.serverTimestamp();
  const ref = await col().add({
    ...input,
    status: CONTACT_STATUSES.UNREAD,
    createdAt: now,
    updatedAt: now,
  });
  const created = await ref.get();
  return docToContact(created.id, created.data()!);
}

export async function updateContactStatus(
  id: string,
  input: UpdateContactStatusInput,
): Promise<ContactMessage> {
  const ref = col().doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new AppError("Contact message not found.", 404);

  await ref.update({ status: input.status, updatedAt: FieldValue.serverTimestamp() });
  const updated = await ref.get();
  return docToContact(updated.id, updated.data()!);
}

export async function deleteContact(id: string): Promise<void> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Contact message not found.", 404);
  await col().doc(id).delete();
}
