import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  content: z.string().min(1, "Content is required"),
  coverImageUrl: z.string().url("Invalid cover image URL"),
  coverImageAlt: z.string().min(1, "Cover image alt text is required").max(200),
  tags: z.preprocess(
    (val) => {
      if (typeof val === "string") return val.split(",").map((s) => s.trim()).filter(Boolean);
      if (Array.isArray(val)) return val;
      return [];
    },
    z.array(z.string().min(1))
  ).default([]),
  authorName: z.string().min(1, "Author name is required").max(100),
  publishedAt: z.string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
    .nullable().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
