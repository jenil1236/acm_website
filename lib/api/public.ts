import { unstable_cache } from "next/cache";
import { findAllBlogs, findBlogBySlug } from "@/repositories/blog.repository";
import { findAllEvents, findEventBySlug } from "@/repositories/event.repository";
import { findAllProjects, findProjectBySlug } from "@/repositories/project.repository";
import { findAllTeamMembers } from "@/repositories/team.repository";

// ─── Blogs ──────────────────────────────────────────────────────────────────
export const getBlogs = unstable_cache(
  async (limit = 100) => {
    const { items } = await findAllBlogs(limit, 0);
    return items;
  },
  ["public-blogs"],
  { revalidate: 60 }
);

export const getBlogBySlug = unstable_cache(
  async (slug: string) => {
    const blog = await findBlogBySlug(slug);
    if (!blog) throw new Error("Blog not found");
    return blog;
  },
  ["public-blog-slug"],
  { revalidate: 60 }
);

// ─── Events ─────────────────────────────────────────────────────────────────
export const getEvents = unstable_cache(
  async (limit = 100) => {
    const { items } = await findAllEvents(limit, 0);
    return items;
  },
  ["public-events"],
  { revalidate: 60 }
);

export const getEventBySlug = unstable_cache(
  async (slug: string) => {
    const event = await findEventBySlug(slug);
    if (!event) throw new Error("Event not found");
    return event;
  },
  ["public-event-slug"],
  { revalidate: 60 }
);

// ─── Projects ───────────────────────────────────────────────────────────────
export const getProjects = unstable_cache(
  async (limit = 100) => {
    const { items } = await findAllProjects(limit, 0);
    return items;
  },
  ["public-projects"],
  { revalidate: 60 }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string) => {
    const project = await findProjectBySlug(slug);
    if (!project) throw new Error("Project not found");
    return project;
  },
  ["public-project-slug"],
  { revalidate: 60 }
);

// ─── Team ────────────────────────────────────────────────────────────────────
export const getTeamMembers = unstable_cache(
  async (limit = 200) => {
    const { items } = await findAllTeamMembers(limit, 0);
    return items;
  },
  ["public-team"],
  { revalidate: 60 }
);
