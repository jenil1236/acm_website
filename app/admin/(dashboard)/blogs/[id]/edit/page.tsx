"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/shared/page-header";
import { BlogForm } from "@/components/admin/forms/blog-form";
import { apiClient } from "@/lib/api/client";
import { Blog } from "@/types/blog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [data, setData] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await apiClient.get(`/blogs/${id}`);
        setData(res.data.data);
      } catch (err) {
        toast.error("Failed to load blog");
        router.push("/admin/blogs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Edit Blog"
        description={`Editing "${data?.title}"`}
      />
      {data && <BlogForm initialData={data} isEdit />}
    </div>
  );
}
