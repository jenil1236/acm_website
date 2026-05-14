import type { Timestamp } from "firebase-admin/firestore";

/**
 * Converts a Firestore Timestamp (or null/undefined) to an ISO 8601 string.
 * Always use this before returning data from API routes.
 */
export function toISOString(ts: Timestamp | null | undefined): string | null {
  if (!ts) return null;
  return ts.toDate().toISOString();
}

/** Returns the current server time as a Firestore-compatible JS Date. */
export function now(): Date {
  return new Date();
}
