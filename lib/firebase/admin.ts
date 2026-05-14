import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin SDK environment variables. " +
        "Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and " +
        "FIREBASE_PRIVATE_KEY are set in .env.local.",
    );
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      // .env files encode newlines as literal \n — restore them here.
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
}

let _db: Firestore | undefined;

/**
 * Returns the Firestore singleton lazily — Firebase is initialised only on
 * the first actual request, NOT at module import time. This prevents build
 * failures when env vars contain placeholder values.
 */
export function getDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getAdminApp());
  }
  return _db;
}
