import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Layers, ArrowRight, Code } from "lucide-react";
import { getProjects } from "@/lib/api/public";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore open-source projects and research built by ACM SVNIT Surat members.",
};

export default async function ProjectsPage() {
  const projects = await getProjects(100).catch(() => []);

  return (
    <div className="min-h-screen bg-[#05010f] pt-28 pb-24">
      <div className="container-acm mb-16">
        <FadeReveal>
          <span className="text-xs font-heading tracking-widest uppercase text-lime-400 mb-4 block">What We Ship</span>
        </FadeReveal>
        <FadeReveal delay={0.1}>
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-white leading-tight mb-4">
            Our <GradientText variant="lime">Projects.</GradientText>
          </h1>
        </FadeReveal>
        <FadeReveal delay={0.2}>
          <p className="text-slate-400 font-body max-w-lg">
            Real products, tools, and research from the ACM SVNIT community.
          </p>
        </FadeReveal>
      </div>

      <div className="container-acm">
        {projects.length === 0 ? (
          <div className="text-center py-32">
            <Layers size={48} className="mx-auto text-slate-700 mb-4" />
            <p className="text-slate-500 font-body">No projects yet. Coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <FadeReveal key={project.id} delay={(i % 6) * 0.07}>
                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-lime-500/20 hover:shadow-[0_0_30px_rgba(163,230,53,0.06)] transition-all duration-300">
                  <div className="relative h-44 bg-[#0b0520] overflow-hidden">
                    {project.bannerImageUrl ? (
                      <Image
                        src={project.bannerImageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-900/20 to-emerald-900/20 flex items-center justify-center">
                        <Layers size={36} className="text-lime-400/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading font-semibold text-white mb-2 group-hover:text-lime-200 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-xs text-slate-500 font-body line-clamp-2 mb-5">{project.summary}</p>
                    <div className="flex items-center gap-4">
                      <Link href={`/projects/${project.slug}`}
                        className="text-xs font-heading text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1">
                        Details <ArrowRight size={11} />
                      </Link>
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1">
                          <Code size={11} /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
