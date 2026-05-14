"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/shared/image-upload";

import { createProjectSchema, updateProjectSchema, type CreateProjectInput } from "@/lib/validators/project";
import { Project } from "@/types/project";
import { apiClient, getErrorMessage } from "@/lib/api/client";

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(isEdit ? updateProjectSchema : createProjectSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      summary: initialData?.summary || "",
      description: initialData?.description || "",
      bannerImageUrl: initialData?.bannerImageUrl || "",
      githubUrl: initialData?.githubUrl || "",
    },
  });

  const bannerImageUrl = watch("bannerImageUrl");

  const onSubmit = async (data: CreateProjectInput) => {
    try {
      setIsLoading(true);
      const payload = { ...data };

      if (isEdit && initialData) {
        await apiClient.patch(`/projects/${initialData.id}`, payload);
        toast.success("Project updated successfully");
      } else {
        await apiClient.post("/projects", payload);
        toast.success("Project created successfully");
      }
      
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save project"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" disabled={isLoading} {...register("title")} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input id="githubUrl" disabled={isLoading} {...register("githubUrl")} />
              {errors.githubUrl && <p className="text-sm text-destructive">{errors.githubUrl.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Banner Image</Label>
            <ImageUpload
              value={bannerImageUrl}
              onChange={(val) => setValue("bannerImageUrl", val as string, { shouldValidate: true })}
              disabled={isLoading}
            />
            {errors.bannerImageUrl && <p className="text-sm text-destructive">{errors.bannerImageUrl.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea 
              id="summary" 
              className="min-h-[80px]" 
              disabled={isLoading} 
              {...register("summary")} 
            />
            {errors.summary && <p className="text-sm text-destructive">{errors.summary.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Markdown supported)</Label>
            <Textarea 
              id="description" 
              className="min-h-[200px]" 
              disabled={isLoading} 
              {...register("description")} 
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end gap-4 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
