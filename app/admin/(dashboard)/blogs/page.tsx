"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/admin/shared/page-header";
import { DataTable } from "@/components/admin/shared/data-table";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
import { Blog } from "@/types/blog";
import { toast } from "sonner";

export default function BlogsPage() {
  const router = useRouter();
  const [data, setData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get("/blogs");
      setData(res.data.data.items || []);
    } catch (err) {
      toast.error("Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/blogs/${id}`);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "publishedAt",
      header: "Status",
      cell: ({ row }) => {
        const publishedAt = row.getValue("publishedAt") as string | null;
        const isPublished = publishedAt != null;
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {isPublished ? "Published" : "Draft"}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            <ConfirmDialog
              title="Delete Blog"
              description={`Are you sure you want to delete "${blog.title}"? This cannot be undone.`}
              onConfirm={() => handleDelete(blog.id)}
              trigger={
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Blogs"
        description="Manage your website's blog posts."
        actionLabel="Create Blog"
        actionHref="/admin/blogs/create"
      />
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
