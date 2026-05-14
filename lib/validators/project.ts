import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  summary: z.string().min(1, "Summary is required").max(500),
  description: z.string().min(1, "Description is required"),
  githubUrl: z.string().url("Invalid GitHub URL"),
  bannerImageUrl: z.string().url("Invalid banner image URL"),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
