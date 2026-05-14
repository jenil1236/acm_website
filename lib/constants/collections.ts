/**
 * Firestore collection names.
 * Import from here everywhere — never hardcode strings in repositories.
 */
export const COLLECTIONS = {
  BLOGS: "blogs",
  EVENTS: "events",
  PROJECTS: "projects",
  TEAM_MEMBERS: "teamMembers",
  CONTACT_MESSAGES: "contactMessages",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
