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

import { createEventSchema, updateEventSchema, type CreateEventInput } from "@/lib/validators/event";
import { Event } from "@/types/event";
import { apiClient, getErrorMessage } from "@/lib/api/client";

interface EventFormProps {
  initialData?: Event;
  isEdit?: boolean;
}

export function EventForm({ initialData, isEdit }: EventFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(isEdit ? updateEventSchema : createEventSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      bannerImageUrl: initialData?.bannerImageUrl || "",
      gallery: initialData?.gallery || [],
      date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    },
  });

  const bannerImageUrl = watch("bannerImageUrl");
  const gallery = watch("gallery");

  const onSubmit = async (data: CreateEventInput) => {
    try {
      setIsLoading(true);
      const payload = { ...data };

      if (isEdit && initialData) {
        await apiClient.patch(`/events/${initialData.id}`, payload);
        toast.success("Event updated successfully");
      } else {
        await apiClient.post("/events", payload);
        toast.success("Event created successfully");
      }
      
      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save event"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" disabled={isLoading} {...register("title")} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Event Date</Label>
            <Input id="date" type="date" disabled={isLoading} {...register("date")} />
            {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
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
            <Label>Gallery Images</Label>
            <ImageUpload
              value={gallery}
              onChange={(val) => setValue("gallery", val as string[], { shouldValidate: true })}
              disabled={isLoading}
              multiple={true}
            />
            {errors.gallery && <p className="text-sm text-destructive">{errors.gallery.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea 
              id="excerpt" 
              className="min-h-[100px]" 
              disabled={isLoading} 
              {...register("excerpt")} 
            />
            {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown supported)</Label>
            <Textarea 
              id="content" 
              className="min-h-[200px]" 
              disabled={isLoading} 
              {...register("content")} 
            />
            {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
          </div>

          <div className="flex justify-end gap-4 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/events")} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
