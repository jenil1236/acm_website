export const dynamic = "force-dynamic";

import { requireSession } from "@/lib/auth/guards";
import { updateBlogSchema } from "@/lib/validators/blog";
import * as blogService from "@/services/blog.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    const data = await blogService.getBlogById(id);
    return ok(data);
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    const body = await request.json();
    const input = updateBlogSchema.parse(body);
    const data = await blogService.updateBlog(id, input);
    return ok(data, "Blog updated.");
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireSession();
    const { id } = await params;
    await blogService.deleteBlog(id);
    return ok(null, "Blog deleted.");
  } catch (err) {
    return handleRouteError(err);
  }
}
