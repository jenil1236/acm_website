import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/constants/collections";
import { toISOString } from "@/lib/utils/dates";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { AppError } from "@/lib/utils/errors";
import { incrementMetric } from "./metrics.repository";
import type { TeamMember } from "@/types/team";
import type {
  CreateTeamMemberInput,
  UpdateTeamMemberInput,
} from "@/lib/validators/team";

const col = () => getDb().collection(COLLECTIONS.TEAM_MEMBERS);

function docToMember(
  id: string,
  data: FirebaseFirestore.DocumentData,
): TeamMember {
  return {
    id,
    name: data.name,
    slug: data.slug,
    role: data.role,
    year: data.year,
    photoUrl: data.photoUrl,
    order: data.order ?? 0,
    socialLinks: data.socialLinks ?? {},
    createdAt: toISOString(data.createdAt as Timestamp) ?? "",
    updatedAt: toISOString(data.updatedAt as Timestamp) ?? "",
  };
}

export async function findAllTeamMembers(
  limit: number,
  offset: number,
): Promise<{ items: TeamMember[]; total: number }> {
  const [snap, countSnap] = await Promise.all([
    col().orderBy("order", "asc").limit(limit).offset(offset).get(),
    col().count().get(),
  ]);
  return {
    items: snap.docs.map((d) => docToMember(d.id, d.data())),
    total: countSnap.data().count,
  };
}

export async function findTeamMemberById(id: string): Promise<TeamMember> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Team member not found.", 404);
  return docToMember(doc.id, doc.data()!);
}

export async function createTeamMember(
  input: CreateTeamMemberInput,
): Promise<TeamMember> {
  const slug = await generateUniqueSlug(input.name, COLLECTIONS.TEAM_MEMBERS);
  const now = FieldValue.serverTimestamp();
  const ref = await col().add({ ...input, slug, createdAt: now, updatedAt: now });
  await incrementMetric("team", 1);
  const created = await ref.get();
  return docToMember(created.id, created.data()!);
}

export async function updateTeamMember(
  id: string,
  input: UpdateTeamMemberInput,
): Promise<TeamMember> {
  const ref = col().doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new AppError("Team member not found.", 404);

  const payload: Record<string, unknown> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (input.name && input.name !== doc.data()!.name) {
    payload.slug = await generateUniqueSlug(
      input.name,
      COLLECTIONS.TEAM_MEMBERS,
      id,
    );
  }

  await ref.update(payload);
  const updated = await ref.get();
  return docToMember(updated.id, updated.data()!);
}

export async function deleteTeamMember(id: string): Promise<void> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Team member not found.", 404);
  await col().doc(id).delete();
  await incrementMetric("team", -1);
}
