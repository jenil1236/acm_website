export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageAlt: string;
  tags: string[];
  authorName: string;
  publishedAt: string | null; // ISO string
  createdAt: string;
  updatedAt: string;
}

export type CreateBlogInput = Omit<Blog, "id" | "slug" | "createdAt" | "updatedAt">;
export type UpdateBlogInput = Partial<CreateBlogInput>;
