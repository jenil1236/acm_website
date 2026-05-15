import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutACMSection } from "@/components/sections/AboutACMSection";
import { AboutSVNITSection } from "@/components/sections/AboutSVNITSection";
import { AboutACMGlobalSection } from "@/components/sections/AboutACMGlobalSection";
import { DomainsSection } from "@/components/sections/DomainsSection";
import { EventsShowcase } from "@/components/sections/EventsShowcase";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { CTASection } from "@/components/sections/CTASection";
import { getEvents, getProjects, getTeamMembers, getBlogs } from "@/lib/api/public";

export const metadata: Metadata = {
  title: "ACM SVNIT Surat — Engineering Intelligent Communities",
  description: "The official ACM student chapter at SVNIT Surat. Join us for events, projects, and research.",
};

export default async function HomePage() {
  const [events, projects, members, blogs] = await Promise.allSettled([
    getEvents(6),
    getProjects(4),
    getTeamMembers(8),
    getBlogs(3),
  ]);

  return (
    <>
      <HeroSection />
      <AboutACMSection />
      <AboutSVNITSection />
      <AboutACMGlobalSection />
      <DomainsSection />
      <EventsShowcase events={events.status === "fulfilled" ? events.value : []} />
      <ProjectsShowcase projects={projects.status === "fulfilled" ? projects.value : []} />
      <TeamPreview members={members.status === "fulfilled" ? members.value : []} />
      <BlogsSection blogs={blogs.status === "fulfilled" ? blogs.value : []} />
      <CTASection />
    </>
  );
}
