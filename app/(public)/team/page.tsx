import type { Metadata } from "next";
import { Users } from "lucide-react";
import { getTeamMembers } from "@/lib/api/public";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";
import { TeamYearTabs } from "@/components/sections/TeamYearTabs";
import type { TeamMember } from "@/types/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the people behind ACM SVNIT Surat — our core team, leads, and contributors.",
};

function groupByYear(members: TeamMember[]): Record<number, TeamMember[]> {
  return members.reduce<Record<number, TeamMember[]>>((acc, m) => {
    if (!acc[m.year]) acc[m.year] = [];
    acc[m.year].push(m);
    return acc;
  }, {});
}

export default async function TeamPage() {
  const members = await getTeamMembers(200).catch(() => []);
  const sorted = [...members].sort((a, b) => a.order - b.order);
  const grouped = groupByYear(sorted);
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a); // most recent first

  return (
    <div className="min-h-screen bg-[#05010f] pt-28 pb-24">
      {/* Header */}
      <div className="container-acm mb-16">
        <FadeReveal>
          <span className="text-xs font-heading tracking-widest uppercase text-cyan-400 mb-4 block">
            The People
          </span>
        </FadeReveal>
        <FadeReveal delay={0.1}>
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-white leading-tight mb-4">
            Our <GradientText variant="aurora">Team.</GradientText>
          </h1>
        </FadeReveal>
        <FadeReveal delay={0.2}>
          <p className="text-slate-400 font-body max-w-lg">
            The engineers, researchers, and creators who keep ACM SVNIT running.
          </p>
        </FadeReveal>
      </div>

      {/* Content */}
      {members.length === 0 ? (
        <div className="container-acm text-center py-32">
          <Users size={48} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-500 font-body">Team info coming soon!</p>
        </div>
      ) : (
        <TeamYearTabs grouped={grouped} years={years} />
      )}
    </div>
  );
}
