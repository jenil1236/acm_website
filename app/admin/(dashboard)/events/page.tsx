"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

import { PageHeader } from "@/components/admin/shared/page-header";
import { DataTable } from "@/components/admin/shared/data-table";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
import { Event } from "@/types/event";
import { toast } from "sonner";

export default function EventsPage() {
  const router = useRouter();
  const [data, setData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get("/events");
      setData(res.data.data.items || []);
    } catch (err) {
      toast.error("Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/events/${id}`);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      toast.error("Failed to delete event");
    }
  };

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "excerpt",
      header: "Excerpt",
      cell: ({ row }) => {
        const val = row.getValue("excerpt") as string;
        return <div className="max-w-[300px] truncate">{val}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const val = row.getValue("createdAt") as string;
        return format(new Date(val), "MMM dd, yyyy");
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/events/${event.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            <ConfirmDialog
              title="Delete Event"
              description={`Are you sure you want to delete "${event.title}"?`}
              onConfirm={() => handleDelete(event.id)}
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
        title="Events"
        description="Manage your upcoming and past events."
        actionLabel="Create Event"
        actionHref="/admin/events/create"
      />
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
