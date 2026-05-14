"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/shared/page-header";
import { EventForm } from "@/components/admin/forms/event-form";
import { apiClient } from "@/lib/api/client";
import { Event } from "@/types/event";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [data, setData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await apiClient.get(`/events/${id}`);
        setData(res.data.data);
      } catch (err) {
        toast.error("Failed to load event");
        router.push("/admin/events");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Edit Event"
        description={`Editing "${data?.title}"`}
      />
      {data && <EventForm initialData={data} isEdit />}
    </div>
  );
}
