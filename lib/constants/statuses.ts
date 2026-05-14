export const CONTACT_STATUSES = {
  UNREAD: "unread",
  READ: "read",
  REPLIED: "replied",
} as const;

export type ContactStatus =
  (typeof CONTACT_STATUSES)[keyof typeof CONTACT_STATUSES];
