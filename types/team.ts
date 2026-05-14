export interface SocialLinks {
  linkedin?: string;
  github?: string;
  gmail?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  year: number;
  photoUrl: string;
  order: number;
  socialLinks: SocialLinks;
  createdAt: string;
  updatedAt: string;
}

export type CreateTeamMemberInput = Omit<TeamMember, "id" | "slug" | "createdAt" | "updatedAt">;
export type UpdateTeamMemberInput = Partial<CreateTeamMemberInput>;
