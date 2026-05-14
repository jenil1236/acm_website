"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/shared/page-header";
import { ProjectForm } from "@/components/admin/forms/project-form";
import { apiClient } from "@/lib/api/client";
import { Project } from "@/types/project";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [data, setData] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await apiClient.get(`/projects/${id}`);
        setData(res.data.data);
      } catch (err) {
        toast.error("Failed to load project");
        router.push("/admin/projects");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [id, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Edit Project"
        description={`Editing "${data?.title}"`}
      />
      {data && <ProjectForm initialData={data} isEdit />}
    </div>
  );
}
