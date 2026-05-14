import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  content: z.string().min(1, "Content is required"),
  bannerImageUrl: z.string().url("Invalid banner image URL"),
  gallery: z.preprocess(
    (val) => {
      if (typeof val === "string") return val.split(",").map((s) => s.trim()).filter(Boolean);
      if (Array.isArray(val)) return val;
      return [];
    },
    z.array(z.string().url("Invalid gallery image URL"))
  ).default([]),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
