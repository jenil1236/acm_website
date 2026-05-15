import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code, Layers } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/api/public";
import { FadeReveal } from "@/components/animations/FadeReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: project.bannerImageUrl ? [project.bannerImageUrl] : [] },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects(100).catch(() => []);
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#05010f] pt-24 pb-24">
      <div className="container-acm mb-8">
        <Link href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors font-body">
          <ArrowLeft size={15} /> Back to Projects
        </Link>
      </div>

      {project.bannerImageUrl && (
        <div className="container-acm mb-12">
          <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 border border-white/[0.06]">
            <Image
              src={project.bannerImageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-transparent to-transparent" />
          </div>
        </div>
      )}

      <div className="container-acm max-w-3xl">
        <FadeReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center">
              <Layers size={18} className="text-lime-400" />
            </div>
            <span className="text-xs text-lime-400 font-heading font-medium tracking-widest uppercase">Project</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-slate-400 font-body leading-relaxed mb-8 border-l-2 border-lime-500 pl-4">
            {project.summary}
          </p>
        </FadeReveal>

        {project.githubUrl && (
          <FadeReveal delay={0.1}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-xl border border-white/10 hover:border-lime-500/30 text-sm text-white font-heading transition-all hover:bg-lime-500/5"
            >
              <Code size={16} /> View on GitHub
            </a>
          </FadeReveal>
        )}

        {project.description && (
          <FadeReveal delay={0.15}>
            <div className="prose-acm" dangerouslySetInnerHTML={{ __html: project.description }} />
          </FadeReveal>
        )}
      </div>
    </div>
  );
}
