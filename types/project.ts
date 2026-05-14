export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  githubUrl: string;
  bannerImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateProjectInput = Omit<Project, "id" | "slug" | "createdAt" | "updatedAt">;
export type UpdateProjectInput = Partial<CreateProjectInput>;
