export interface Event {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  bannerImageUrl: string;
  gallery: string[]; // array of image URLs
  date: string; // The explicit date of the event
  createdAt: string;
  updatedAt: string;
}

export type CreateEventInput = Omit<Event, "id" | "slug" | "createdAt" | "updatedAt">;
export type UpdateEventInput = Partial<CreateEventInput>;
