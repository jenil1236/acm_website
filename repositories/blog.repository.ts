import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/constants/collections";
import { toISOString } from "@/lib/utils/dates";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { AppError } from "@/lib/utils/errors";
import { incrementMetric } from "./metrics.repository";
import type { Blog } from "@/types/blog";
import type { CreateBlogInput, UpdateBlogInput } from "@/lib/validators/blog";

const col = () => getDb().collection(COLLECTIONS.BLOGS);

function docToBlog(id: string, data: FirebaseFirestore.DocumentData): Blog {
  return {
    id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    coverImageUrl: data.coverImageUrl,
    coverImageAlt: data.coverImageAlt,
    tags: data.tags ?? [],
    authorName: data.authorName,
    publishedAt: toISOString(data.publishedAt as Timestamp | null),
    createdAt: toISOString(data.createdAt as Timestamp) ?? "",
    updatedAt: toISOString(data.updatedAt as Timestamp) ?? "",
  };
}

export async function findAllBlogs(
  limit: number,
  offset: number,
): Promise<{ items: Blog[]; total: number }> {
  const [snap, countSnap] = await Promise.all([
    col().orderBy("createdAt", "desc").limit(limit).offset(offset).get(),
    col().count().get(),
  ]);
  const items = snap.docs.map((d) => docToBlog(d.id, d.data()));
  const total = countSnap.data().count;
  return { items, total };
}

export async function findBlogById(id: string): Promise<Blog> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Blog not found.", 404);
  return docToBlog(doc.id, doc.data()!);
}

export async function findBlogBySlug(slug: string): Promise<Blog | null> {
  const snap = await col().where("slug", "==", slug).limit(1).get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  return docToBlog(d.id, d.data());
}

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
  const slug = await generateUniqueSlug(input.title, COLLECTIONS.BLOGS);
  const now = FieldValue.serverTimestamp();
  const payload = {
    ...input,
    slug,
    publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
    createdAt: now,
    updatedAt: now,
  };
  const ref = await col().add(payload);
  await incrementMetric("blogs", 1);
  const created = await ref.get();
  return docToBlog(created.id, created.data()!);
}

export async function updateBlog(
  id: string,
  input: UpdateBlogInput,
): Promise<Blog> {
  const ref = col().doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new AppError("Blog not found.", 404);

  const current = doc.data()!;
  const payload: Record<string, unknown> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };

  // Regenerate slug only when title changes
  if (input.title && input.title !== current.title) {
    payload.slug = await generateUniqueSlug(input.title, COLLECTIONS.BLOGS, id);
  }
  if (input.publishedAt !== undefined) {
    payload.publishedAt = input.publishedAt ? new Date(input.publishedAt) : null;
  }

  await ref.update(payload);
  const updated = await ref.get();
  return docToBlog(updated.id, updated.data()!);
}

export async function deleteBlog(id: string): Promise<void> {
  const doc = await col().doc(id).get();
  if (!doc.exists) throw new AppError("Blog not found.", 404);
  await col().doc(id).delete();
  await incrementMetric("blogs", -1);
}
