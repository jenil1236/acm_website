import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, Layers } from "lucide-react";
import type { Project } from "@/types/project";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const preview = projects.slice(0, 4);

  return (
    <section className="relative py-20 lg:py-0 lg:h-screen flex flex-col justify-center bg-[#05010f] overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-lime-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-acm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <FadeReveal>
              <span className="inline-block text-xs font-heading font-medium tracking-widest uppercase text-lime-400 mb-4">
                What We Ship
              </span>
            </FadeReveal>
            <FadeReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
                Our <GradientText variant="lime">Projects.</GradientText>
              </h2>
            </FadeReveal>
          </div>
          <FadeReveal delay={0.2}>
            <Link href="/projects"
              className="group flex items-center gap-2 text-sm font-heading font-medium text-lime-400 hover:text-lime-300 transition-colors">
              View all projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeReveal>
        </div>

        {preview.length === 0 ? (
          <FadeReveal>
            <p className="text-slate-500 font-body text-center py-16">No projects yet. Coming soon!</p>
          </FadeReveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {preview.map((project, i) => (
              <FadeReveal key={project.id} delay={i * 0.1}>
                <div className="group relative rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.02] hover:border-lime-500/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(163,230,53,0.08)]">
                  {/* Spotlight effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(163,230,53,0.05) 0%, transparent 60%)" }} />

                  {/* Banner */}
                  <div className="relative h-48 bg-[#0b0520] overflow-hidden">
                    {project.bannerImageUrl ? (
                      <Image
                        src={project.bannerImageUrl}
                        alt={project.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-900/20 to-emerald-900/20 flex items-center justify-center">
                        <Layers size={36} className="text-lime-400/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-white text-lg mb-2 group-hover:text-lime-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-body leading-relaxed mb-5 line-clamp-2">
                      {project.summary}
                    </p>
                    <div className="flex items-center gap-3">
                      <Link href={`/projects/${project.slug}`}
                        className="text-xs font-heading font-medium text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1">
                        Learn more <ArrowRight size={12} />
                      </Link>
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1">
                          <Code size={12} /> GitHub
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
    </section>
  );
}
