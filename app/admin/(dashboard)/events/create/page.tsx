import { PageHeader } from "@/components/admin/shared/page-header";
import { EventForm } from "@/components/admin/forms/event-form";

export default function CreateEventPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Create New Event"
        description="Add a new event to the website."
      />
      <EventForm />
    </div>
  );
}
