import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/constants/collections";
import { toISOString } from "@/lib/utils/dates";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { AppError } from "@/lib/utils/errors";
import type { Project } from "@/types/project";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/lib/validators/project";

const col = () => getDb().collection(COLLECTIONS.PROJECTS);

function docToProject(
  id: string,
  data: FirebaseFirestore.DocumentData,
): Project {
  return {
    id,
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    description: data.description,
    githubUrl: data.githubUrl,
    bannerImageUrl: data.bannerImageUrl,
    createdAt: toISOString(data.createdAt as Timestamp) ?? "",
    updatedAt: toISOString(data.updatedAt as Timestamp) ?? "",
  };
}

export async function findAllProjects(
  limit: number,
  offset: number,
): Promise<{ items: Project[]; total: number }> {
  const [snap, countSnap] = await Promise.all([
    col().orderBy("createdAt", "desc").limit(limit).offset(offset).get(),
    col().count().get(),
  ]);
  return {
    items: snap.docs.map((d) => docToProject(d.id, d.data())),
    total: countSnap.data().count,
  };
}

export async function findProjectById(id: string): Promise<Project> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Project not found.", 404);
  return docToProject(doc.id, doc.data()!);
}

export async function createProject(
  input: CreateProjectInput,
): Promise<Project> {
  const slug = await generateUniqueSlug(input.title, COLLECTIONS.PROJECTS);
  const now = FieldValue.serverTimestamp();
  const ref = await col().add({ ...input, slug, createdAt: now, updatedAt: now });
  const created = await ref.get();
  return docToProject(created.id, created.data()!);
}

export async function updateProject(
  id: string,
  input: UpdateProjectInput,
): Promise<Project> {
  const ref = col().doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new AppError("Project not found.", 404);

  const payload: Record<string, unknown> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };
  if (input.title && input.title !== doc.data()!.title) {
    payload.slug = await generateUniqueSlug(
      input.title,
      COLLECTIONS.PROJECTS,
      id,
    );
  }

  await ref.update(payload);
  const updated = await ref.get();
  return docToProject(updated.id, updated.data()!);
}

export async function deleteProject(id: string): Promise<void> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Project not found.", 404);
  await col().doc(id).delete();
}
