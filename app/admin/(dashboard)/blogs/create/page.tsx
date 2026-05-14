import { PageHeader } from "@/components/admin/shared/page-header";
import { BlogForm } from "@/components/admin/forms/blog-form";

export default function CreateBlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Create New Blog"
        description="Write a new blog post for the website."
      />
      <BlogForm />
    </div>
  );
}
