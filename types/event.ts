export interface Event {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  bannerImageUrl: string;
  gallery: string[]; // array of image URLs
  createdAt: string;
  updatedAt: string;
}

export type CreateEventInput = Omit<Event, "id" | "slug" | "createdAt" | "updatedAt">;
export type UpdateEventInput = Partial<CreateEventInput>;
