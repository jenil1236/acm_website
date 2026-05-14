import slugify from "slugify";
import { getDb } from "@/lib/firebase/admin";

/**
 * Generates a URL-safe slug from a title, then ensures it is unique
 * within the given Firestore collection. Appends -2, -3, … if needed.
 *
 * @param title       The source title string.
 * @param collection  The Firestore collection to check uniqueness against.
 * @param excludeId   Pass the existing document ID when updating (so it
 *                    doesn't conflict with itself).
 */
export async function generateUniqueSlug(
  title: string,
  collection: string,
  excludeId?: string,
): Promise<string> {
  const base = slugify(title, { lower: true, strict: true, trim: true });

  let candidate = base;
  let suffix = 2;

  while (true) {
    const snap = await getDb()
      .collection(collection)
      .where("slug", "==", candidate)
      .limit(1)
      .get();

    if (snap.empty) break;

    // If the only match is the document being updated, we're fine
    if (snap.docs.length === 1 && snap.docs[0].id === excludeId) break;

    candidate = `${base}-${suffix}`;
    suffix++;
  }

  return candidate;
}
