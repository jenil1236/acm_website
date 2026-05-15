import { z } from "zod";

const socialLinksSchema = z
  .object({
    linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    gmail: z.string().email("Invalid Gmail address").optional().or(z.literal("")),
  })
  .default({});

export const createTeamMemberSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  year: z.number().int().min(2000).max(2100),
  photoUrl: z.string().url("Invalid photo URL"),
  order: z.number().int().min(0).default(0),
  socialLinks: socialLinksSchema,
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;
