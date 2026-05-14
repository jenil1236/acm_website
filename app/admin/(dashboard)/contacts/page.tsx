"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, CheckCircle, XCircle } from "lucide-react";

import { PageHeader } from "@/components/admin/shared/page-header";
import { DataTable } from "@/components/admin/shared/data-table";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";
import { ContactMessage } from "@/types/contact";
import { ContactStatus } from "@/lib/constants/statuses";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ContactsPage() {
  const router = useRouter();
  const [data, setData] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get("/contacts");
      setData(res.data.data.items || []);
    } catch (err) {
      toast.error("Failed to fetch contacts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id: string, status: ContactStatus) => {
    try {
      await apiClient.patch(`/contacts/${id}`, { status });
      toast.success("Status updated");
      fetchContacts();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const columns: ColumnDef<ContactMessage>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              {
                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200": status === "unread",
                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200": status === "read",
                "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200": status === "replied",
              }
            )}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const val = row.getValue("createdAt") as string;
        return format(new Date(val), "MMM dd, yyyy");
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/contacts/${contact.id}`)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            {contact.status === "unread" && (
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                onClick={() => updateStatus(contact.id, "read")}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Mark Read
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Contact Messages"
        description="View and manage messages sent through the website contact form."
      />
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
