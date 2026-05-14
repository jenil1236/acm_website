"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Code } from "lucide-react";

import { PageHeader } from "@/components/admin/shared/page-header";
import { DataTable } from "@/components/admin/shared/data-table";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
import { Project } from "@/types/project";
import { toast } from "sonner";

export default function ProjectsPage() {
  const router = useRouter();
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get("/projects");
      setData(res.data.data.items || []);
    } catch (err) {
      toast.error("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/projects/${id}`);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "title",
      header: "Project Title",
    },
    {
      accessorKey: "githubUrl",
      header: "GitHub",
      cell: ({ row }) => {
        const url = row.getValue("githubUrl") as string;
        if (!url) return <span className="text-muted-foreground">-</span>;
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground inline-flex items-center">
            <Code className="h-4 w-4 mr-1" />
            Link
          </a>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            <ConfirmDialog
              title="Delete Project"
              description={`Are you sure you want to delete "${project.title}"?`}
              onConfirm={() => handleDelete(project.id)}
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
        title="Projects"
        description="Manage portfolio and club projects."
        actionLabel="Create Project"
        actionHref="/admin/projects/create"
      />
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
