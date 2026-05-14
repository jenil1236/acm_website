export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/guards";
import { createBlogSchema, updateBlogSchema } from "@/lib/validators/blog";
import * as blogService from "@/services/blog.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok, created } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    await requireSession();
    const data = await blogService.listBlogs(request.nextUrl.searchParams);
    return ok(data);
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSession();
    const body = await request.json();
    const input = createBlogSchema.parse(body);
    const data = await blogService.createBlog(input);
    return created(data, "Blog created.");
  } catch (err) {
    return handleRouteError(err);
  }
}
