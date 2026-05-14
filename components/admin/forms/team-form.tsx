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
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/shared/image-upload";

import { createTeamMemberSchema, updateTeamMemberSchema, type CreateTeamMemberInput } from "@/lib/validators/team";
import { TeamMember } from "@/types/team";
import { apiClient, getErrorMessage } from "@/lib/api/client";

interface TeamFormProps {
  initialData?: TeamMember;
  isEdit?: boolean;
}

export function TeamForm({ initialData, isEdit }: TeamFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTeamMemberInput>({
    resolver: zodResolver(isEdit ? updateTeamMemberSchema : createTeamMemberSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      year: initialData?.year || 1,
      photoUrl: initialData?.photoUrl || "",
      order: initialData?.order ?? 0,
      socialLinks: {
        linkedin: initialData?.socialLinks?.linkedin || "",
        github: initialData?.socialLinks?.github || "",
        gmail: initialData?.socialLinks?.gmail || "",
      }
    },
  });

  const photoUrl = watch("photoUrl");

  const onSubmit = async (data: CreateTeamMemberInput) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
        year: Number(data.year),
        order: Number(data.order),
      };

      if (isEdit && initialData) {
        await apiClient.patch(`/team/${initialData.id}`, payload);
        toast.success("Team member updated successfully");
      } else {
        await apiClient.post("/team", payload);
        toast.success("Team member added successfully");
      }
      
      router.push("/admin/team");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save team member"));
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" disabled={isLoading} {...register("name")} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" disabled={isLoading} {...register("role")} />
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Photo URL</Label>
              <ImageUpload
                value={photoUrl}
                onChange={(val) => setValue("photoUrl", val as string, { shouldValidate: true })}
                disabled={isLoading}
              />
              {errors.photoUrl && <p className="text-sm text-destructive">{errors.photoUrl.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year (1-6)</Label>
                <Input type="number" id="year" disabled={isLoading} {...register("year", { valueAsNumber: true })} />
                {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input type="number" id="order" disabled={isLoading} {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-sm text-destructive">{errors.order.message}</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" disabled={isLoading} {...register("socialLinks.linkedin")} />
              {errors.socialLinks?.linkedin && <p className="text-sm text-destructive">{errors.socialLinks.linkedin.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" disabled={isLoading} {...register("socialLinks.github")} />
              {errors.socialLinks?.github && <p className="text-sm text-destructive">{errors.socialLinks.github.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gmail">Gmail Address</Label>
              <Input id="gmail" disabled={isLoading} {...register("socialLinks.gmail")} />
              {errors.socialLinks?.gmail && <p className="text-sm text-destructive">{errors.socialLinks.gmail.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/team")} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update Member" : "Add Member"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
