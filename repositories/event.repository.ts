import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/constants/collections";
import { toISOString } from "@/lib/utils/dates";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { AppError } from "@/lib/utils/errors";
import { incrementMetric } from "./metrics.repository";
import type { Event } from "@/types/event";
import type { CreateEventInput, UpdateEventInput } from "@/lib/validators/event";

const col = () => getDb().collection(COLLECTIONS.EVENTS);

function docToEvent(id: string, data: FirebaseFirestore.DocumentData): Event {
  return {
    id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    bannerImageUrl: data.bannerImageUrl,
    gallery: data.gallery ?? [],
    date: data.date ?? "",
    createdAt: toISOString(data.createdAt as Timestamp) ?? "",
    updatedAt: toISOString(data.updatedAt as Timestamp) ?? "",
  };
}

export async function findAllEvents(
  limit: number,
  offset: number,
): Promise<{ items: Event[]; total: number }> {
  const [snap, countSnap] = await Promise.all([
    col().orderBy("date", "desc").limit(limit).offset(offset).get(),
    col().count().get(),
  ]);
  return {
    items: snap.docs.map((d) => docToEvent(d.id, d.data())),
    total: countSnap.data().count,
  };
}

export async function findEventById(id: string): Promise<Event> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Event not found.", 404);
  return docToEvent(doc.id, doc.data()!);
}

export async function findEventBySlug(slug: string): Promise<Event | null> {
  const snap = await col().where("slug", "==", slug).limit(1).get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  return docToEvent(d.id, d.data());
}

export async function createEvent(input: CreateEventInput): Promise<Event> {
  const slug = await generateUniqueSlug(input.title, COLLECTIONS.EVENTS);
  const now = FieldValue.serverTimestamp();
  const ref = await col().add({ ...input, slug, createdAt: now, updatedAt: now });
  await incrementMetric("events", 1);
  const created = await ref.get();
  return docToEvent(created.id, created.data()!);
}

export async function updateEvent(
  id: string,
  input: UpdateEventInput,
): Promise<Event> {
  const ref = col().doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new AppError("Event not found.", 404);

  const payload: Record<string, unknown> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (input.title && input.title !== doc.data()!.title) {
    payload.slug = await generateUniqueSlug(input.title, COLLECTIONS.EVENTS, id);
  }

  await ref.update(payload);
  const updated = await ref.get();
  return docToEvent(updated.id, updated.data()!);
}

export async function deleteEvent(id: string): Promise<void> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Event not found.", 404);
  await col().doc(id).delete();
  await incrementMetric("events", -1);
}
