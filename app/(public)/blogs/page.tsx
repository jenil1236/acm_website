import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Tag, ArrowRight } from "lucide-react";
import { getBlogs } from "@/lib/api/public";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";
import { formatDistanceToNow } from "date-fns";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Insights, tutorials, and stories from the ACM SVNIT Surat community.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs(100).catch(() => []);
  const published = blogs.filter((b) => b.publishedAt);

  return (
    <div className="min-h-screen bg-[#05010f] pt-28 pb-24">
      <div className="container-acm mb-16">
        <FadeReveal>
          <span className="text-xs font-heading tracking-widest uppercase text-violet-400 mb-4 block">Community Insights</span>
        </FadeReveal>
        <FadeReveal delay={0.1}>
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-white leading-tight mb-4">
            The <GradientText variant="violet">Blog.</GradientText>
          </h1>
        </FadeReveal>
        <FadeReveal delay={0.2}>
          <p className="text-slate-400 font-body max-w-lg">
            Tutorials, deep dives, project stories, and technical insights from our community.
          </p>
        </FadeReveal>
      </div>

      <div className="container-acm">
        {published.length === 0 ? (
          <div className="text-center py-32">
            <BookOpen size={48} className="mx-auto text-slate-700 mb-4" />
            <p className="text-slate-500 font-body">No blogs published yet.</p>
          </div>
        ) : (
          <>
            {/* Featured first blog */}
            <FadeReveal>
              <Link href={`/blogs/${published[0].slug}`}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.08)] transition-all duration-300 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-56 md:h-auto bg-[#0b0520] overflow-hidden min-h-[200px]">
                    {published[0].coverImageUrl ? (
                      <Image src={published[0].coverImageUrl} alt={published[0].title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" priority />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-indigo-900/30 flex items-center justify-center">
                        <BookOpen size={48} className="text-violet-400/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#05010f] hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] to-transparent md:hidden" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {published[0].tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-heading">
                          <Tag size={8} />{tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-violet-200 transition-colors line-clamp-3">
                      {published[0].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-body mb-6 line-clamp-3">{published[0].excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-600 font-body">
                      <span className="flex items-center gap-1"><BookOpen size={11} />{published[0].authorName}</span>
                      <span className="flex items-center gap-1 text-violet-400">Read more <ArrowRight size={11} /></span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeReveal>

            {/* Remaining blogs grid */}
            {published.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {published.slice(1).map((blog, i) => (
                  <FadeReveal key={blog.id} delay={(i % 3) * 0.08}>
                    <Link href={`/blogs/${blog.slug}`}
                      className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-violet-500/20 transition-all duration-300">
                      {blog.coverImageUrl && (
                        <div className="relative h-40 overflow-hidden">
                          <Image src={blog.coverImageUrl} alt={blog.title} fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] to-transparent" />
                        </div>
                      )}
                      <div className="p-5">
                        {blog.tags.length > 0 && (
                          <div className="flex gap-1.5 mb-3 flex-wrap">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-heading">
                                <Tag size={8} />{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h3 className="font-heading font-semibold text-white mb-2 line-clamp-2 group-hover:text-violet-200 transition-colors">{blog.title}</h3>
                        <p className="text-xs text-slate-500 font-body line-clamp-2 mb-4">{blog.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-slate-600 font-body">
                          <span>{blog.authorName}</span>
                          <span>{formatDistanceToNow(new Date(blog.publishedAt!), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </Link>
                  </FadeReveal>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
