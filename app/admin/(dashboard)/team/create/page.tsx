import { PageHeader } from "@/components/admin/shared/page-header";
import { TeamForm } from "@/components/admin/forms/team-form";

export default function CreateTeamMemberPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Add Team Member"
        description="Add a new member to the ACM chapter."
      />
      <TeamForm />
    </div>
  );
}
