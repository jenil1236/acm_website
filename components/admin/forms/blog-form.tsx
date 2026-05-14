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

import { createBlogSchema, updateBlogSchema, type CreateBlogInput } from "@/lib/validators/blog";
import { Blog } from "@/types/blog";
import { apiClient, getErrorMessage } from "@/lib/api/client";

interface BlogFormProps {
  initialData?: Blog;
  isEdit?: boolean;
}

export function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateBlogInput>({
    resolver: zodResolver(isEdit ? updateBlogSchema : createBlogSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      coverImageUrl: initialData?.coverImageUrl || "",
      coverImageAlt: initialData?.coverImageAlt || "",
      authorName: initialData?.authorName || "",
      tags: initialData?.tags || [],
      publishedAt: initialData?.publishedAt 
        ? new Date(initialData.publishedAt).toISOString().split('T')[0]
        : "",
    },
  });

  const coverImageUrl = watch("coverImageUrl");

  const onSubmit = async (data: CreateBlogInput) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
        tags: typeof data.tags === 'string' ? (data.tags as string).split(',').map(t => t.trim()).filter(Boolean) : data.tags,
        publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
      };

      if (isEdit && initialData) {
        await apiClient.patch(`/blogs/${initialData.id}`, payload);
        toast.success("Blog updated successfully");
      } else {
        await apiClient.post("/blogs", payload);
        toast.success("Blog created successfully");
      }
      
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save blog"));
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
              <Label htmlFor="title">Title</Label>
              <Input id="title" disabled={isLoading} {...register("title")} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="authorName">Author Name</Label>
              <Input id="authorName" disabled={isLoading} {...register("authorName")} />
              {errors.authorName && <p className="text-sm text-destructive">{errors.authorName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" className="min-h-[80px]" disabled={isLoading} {...register("excerpt")} />
            {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUpload
                value={coverImageUrl}
                onChange={(val) => setValue("coverImageUrl", val as string, { shouldValidate: true })}
                disabled={isLoading}
              />
              {errors.coverImageUrl && <p className="text-sm text-destructive">{errors.coverImageUrl.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImageAlt">Cover Image Alt Text</Label>
              <Input id="coverImageAlt" disabled={isLoading} {...register("coverImageAlt")} />
              {errors.coverImageAlt && <p className="text-sm text-destructive">{errors.coverImageAlt.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" placeholder="react, tailwind, nextjs" disabled={isLoading} {...register("tags")} />
              {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishedAt">Publish Date (Leave empty for Draft)</Label>
              <Input type="date" id="publishedAt" disabled={isLoading} {...register("publishedAt")} />
              {errors.publishedAt && <p className="text-sm text-destructive">{errors.publishedAt.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown supported)</Label>
            <Textarea 
              id="content" 
              className="min-h-[300px] font-mono text-sm" 
              disabled={isLoading} 
              {...register("content")} 
            />
            {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
          </div>

          <div className="flex justify-end gap-4 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update Blog" : "Create Blog"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
