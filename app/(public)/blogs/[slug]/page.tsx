import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Tag } from "lucide-react";
import { getBlogBySlug, getBlogs } from "@/lib/api/public";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { format } from "date-fns";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug).catch(() => null);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: { images: blog.coverImageUrl ? [blog.coverImageUrl] : [] },
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogs(100).catch(() => []);
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug).catch(() => null);
  if (!blog) notFound();

  return (
    <div className="min-h-screen bg-[#05010f] pt-24 pb-24">
      {/* Back button */}
      <div className="container-acm mb-8">
        <Link href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors font-body">
          <ArrowLeft size={15} /> Back to Blogs
        </Link>
      </div>

      <article className="container-acm max-w-3xl">
        {/* Header */}
        <FadeReveal>
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 font-heading">
                  <Tag size={12} />{tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
            {blog.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 font-body leading-relaxed mb-8">
            {blog.excerpt}
          </p>
          <div className="flex items-center gap-4 py-4 border-y border-white/[0.06] mb-10">
            <div className="w-10 h-10 rounded-full bg-violet-900/40 flex items-center justify-center border border-violet-500/30">
              <BookOpen size={18} className="text-violet-400" />
            </div>
            <div>
              <p className="font-heading font-medium text-white text-sm">{blog.authorName}</p>
              <p className="text-xs text-slate-500 font-body">
                {blog.publishedAt ? format(new Date(blog.publishedAt), "MMMM d, yyyy") : "Draft"}
              </p>
            </div>
          </div>
        </FadeReveal>

        {/* Cover Image */}
        {blog.coverImageUrl && (
          <FadeReveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/[0.06] mb-14">
              <Image
                src={blog.coverImageUrl}
                alt={blog.coverImageAlt || blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
              />
            </div>
          </FadeReveal>
        )}

        {/* Content */}
        <FadeReveal delay={0.2}>
          <div
            className="prose-acm max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </FadeReveal>
      </article>
    </div>
  );
}
