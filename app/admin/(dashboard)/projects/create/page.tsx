import { PageHeader } from "@/components/admin/shared/page-header";
import { ProjectForm } from "@/components/admin/forms/project-form";

export default function CreateProjectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Create New Project"
        description="Add a new project to the portfolio."
      />
      <ProjectForm />
    </div>
  );
}
