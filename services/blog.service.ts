import * as repo from "@/repositories/blog.repository";
import { parsePaginationParams, paginate } from "@/lib/utils/pagination";
import type { CreateBlogInput, UpdateBlogInput } from "@/lib/validators/blog";

export async function listBlogs(searchParams: URLSearchParams) {
  const { page, limit } = parsePaginationParams(searchParams);
  const offset = (page - 1) * limit;
  const { items, total } = await repo.findAllBlogs(limit, offset);
  return paginate(items, total, { page, limit });
}

export async function getBlogById(id: string) {
  return repo.findBlogById(id);
}

export async function getBlogBySlug(slug: string) {
  return repo.findBlogBySlug(slug);
}

export async function createBlog(input: CreateBlogInput) {
  return repo.createBlog(input);
}

export async function updateBlog(id: string, input: UpdateBlogInput) {
  return repo.updateBlog(id, input);
}

export async function deleteBlog(id: string) {
  return repo.deleteBlog(id);
}
