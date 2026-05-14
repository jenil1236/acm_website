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
import { TeamMember } from "@/types/team";
import { toast } from "sonner";

export default function TeamPage() {
  const router = useRouter();
  const [data, setData] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get("/team");
      // The backend doesn't currently sort by order in the repository by default unless specified, 
      // but we can sort it here client-side for immediate effect.
      const sorted = (res.data.data.items || []).sort((a: TeamMember, b: TeamMember) => a.order - b.order);
      setData(sorted);
    } catch (err) {
      toast.error("Failed to fetch team members");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/team/${id}`);
      toast.success("Team member deleted successfully");
      fetchTeam();
    } catch (err) {
      toast.error("Failed to delete team member");
    }
  };

  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const member = row.original;
        return (
          <div className="flex items-center gap-3">
            {member.photoUrl ? (
              <img src={member.photoUrl} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {member.name.charAt(0)}
              </div>
            )}
            <span className="font-medium">{member.name}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "order",
      header: "Display Order",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const member = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/team/${member.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            <ConfirmDialog
              title="Delete Member"
              description={`Are you sure you want to remove "${member.name}"?`}
              onConfirm={() => handleDelete(member.id)}
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
        title="Team Members"
        description="Manage the members of your ACM chapter."
        actionLabel="Add Member"
        actionHref="/admin/team/create"
      />
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
