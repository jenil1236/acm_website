import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Tag } from "lucide-react";
import type { Blog } from "@/types/blog";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";
import { formatDistanceToNow } from "date-fns";

export function BlogsSection({ blogs }: { blogs: Blog[] }) {
  const preview = blogs.slice(0, 3);
  return (
    <section className="relative py-32 bg-[#05010f] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="container-acm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <FadeReveal>
              <span className="text-xs font-heading font-medium tracking-widest uppercase text-violet-400 mb-4 block">Insights</span>
            </FadeReveal>
            <FadeReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">From the <GradientText variant="violet">community.</GradientText></h2>
            </FadeReveal>
          </div>
          <FadeReveal delay={0.2}>
            <Link href="/blogs" className="group flex items-center gap-2 text-sm font-heading text-violet-400 hover:text-violet-300 transition-colors">
              Read all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeReveal>
        </div>
        {preview.length === 0 ? (
          <p className="text-slate-500 text-center py-16">No blogs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preview.map((blog, i) => (
              <FadeReveal key={blog.id} delay={i * 0.1}>
                <Link href={`/blogs/${blog.slug}`} className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-violet-500/20 transition-all duration-300">
                  {blog.coverImageUrl && (
                    <div className="relative h-40 overflow-hidden">
                      <Image src={blog.coverImageUrl} alt={blog.coverImageAlt || blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] to-transparent" />
                    </div>
                  )}
                  <div className="p-5">
                    {blog.tags.length > 0 && (
                      <div className="flex gap-1.5 mb-3 flex-wrap">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-heading"><Tag size={8} />{tag}</span>
                        ))}
                      </div>
                    )}
                    <h3 className="font-heading font-semibold text-white mb-2 line-clamp-2 group-hover:text-violet-200 transition-colors">{blog.title}</h3>
                    <p className="text-xs text-slate-500 font-body line-clamp-2 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-600 font-body">
                      <span className="flex items-center gap-1"><BookOpen size={11} />{blog.authorName}</span>
                      <span>{blog.publishedAt ? formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true }) : "Draft"}</span>
                    </div>
                  </div>
                </Link>
              </FadeReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
