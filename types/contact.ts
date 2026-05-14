import type { ContactStatus } from "@/lib/constants/statuses";

export interface ContactMessage {
  id: string;
  admissionNumber: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

export type UpdateContactInput = { status: ContactStatus };
