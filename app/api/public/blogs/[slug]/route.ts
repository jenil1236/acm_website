export const dynamic = "force-dynamic";

import * as blogService from "@/services/blog.service";
import { handleRouteError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const blog = await blogService.getBlogBySlug(slug);
    if (!blog) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return ok(blog);
  } catch (err) {
    return handleRouteError(err);
  }
}
