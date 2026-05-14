import { z } from "zod";
import { CONTACT_STATUSES } from "@/lib/constants/statuses";

export const createContactSchema = z.object({
  admissionNumber: z.string().min(1, "Admission number is required"),
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Invalid phone number").max(20),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(2000),
});

export const updateContactStatusSchema = z.object({
  status: z.enum([
    CONTACT_STATUSES.UNREAD,
    CONTACT_STATUSES.READ,
    CONTACT_STATUSES.REPLIED,
  ]),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactStatusInput = z.infer<typeof updateContactStatusSchema>;
