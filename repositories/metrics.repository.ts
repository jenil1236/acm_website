import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase/admin";

export async function getDashboardMetrics() {
  const doc = await getDb().collection("system").doc("metrics").get();
  if (!doc.exists) {
    return { blogs: 0, events: 0, projects: 0, team: 0, contacts: 0 };
  }
  return doc.data() as {
    blogs: number;
    events: number;
    projects: number;
    team: number;
    contacts: number;
  };
}

export async function incrementMetric(
  field: "blogs" | "events" | "projects" | "team" | "contacts",
  amount: number = 1
) {
  const ref = getDb().collection("system").doc("metrics");
  await ref.set(
    {
      [field]: FieldValue.increment(amount),
    },
    { merge: true }
  );
}
