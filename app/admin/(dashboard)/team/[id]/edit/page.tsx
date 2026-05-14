"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/shared/page-header";
import { TeamForm } from "@/components/admin/forms/team-form";
import { apiClient } from "@/lib/api/client";
import { TeamMember } from "@/types/team";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditTeamMemberPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [data, setData] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await apiClient.get(`/team/${id}`);
        setData(res.data.data);
      } catch (err) {
        toast.error("Failed to load team member");
        router.push("/admin/team");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMember();
  }, [id, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Edit Team Member"
        description={`Editing "${data?.name}"`}
      />
      {data && <TeamForm initialData={data} isEdit />}
    </div>
  );
}
