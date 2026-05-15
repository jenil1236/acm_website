import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Users, User, Globe, Code } from "lucide-react";
import { getTeamMembers } from "@/lib/api/public";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";
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
  // Sort members by order within each year
  const sorted = [...members].sort((a, b) => a.order - b.order);
  const grouped = groupByYear(sorted);
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a); // most recent first

  return (
    <div className="min-h-screen bg-[#05010f] pt-28 pb-24">
      <div className="container-acm mb-16">
        <FadeReveal>
          <span className="text-xs font-heading tracking-widest uppercase text-cyan-400 mb-4 block">The People</span>
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

      {members.length === 0 ? (
        <div className="container-acm text-center py-32">
          <Users size={48} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-500 font-body">Team info coming soon!</p>
        </div>
      ) : (
        <div className="container-acm space-y-20">
          {years.map((year) => (
            <div key={year}>
              {/* Year label */}
              <FadeReveal>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent" />
                  <span className="text-sm font-heading font-medium text-violet-400 tracking-widest px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5">
                    {year} – {year + 1}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-violet-500/30 to-transparent" />
                </div>
              </FadeReveal>

              {/* Members grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {grouped[year].map((member, i) => (
                  <FadeReveal key={member.id} delay={(i % 5) * 0.06}>
                    <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300 p-4 text-center">
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                      {/* Photo */}
                      <div className="relative w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white/[0.08] group-hover:border-cyan-500/30 transition-colors duration-300">
                        {member.photoUrl ? (
                          <Image
                            src={member.photoUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full bg-violet-900/40 flex items-center justify-center">
                            <User size={28} className="text-violet-400" />
                          </div>
                        )}
                      </div>

                      <h3 className="font-heading font-semibold text-white text-sm mb-0.5 line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-body mb-3 line-clamp-1">{member.role}</p>

                      {/* Social links — only non-empty fields */}
                      {(member.socialLinks?.linkedin || member.socialLinks?.github || member.socialLinks?.gmail) && (
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {member.socialLinks.linkedin && (
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on LinkedIn`}
                              className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-colors"
                            >
                              <Globe size={12} />
                            </a>
                          )}
                          {member.socialLinks.github && (
                            <a
                              href={member.socialLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on GitHub`}
                              className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors"
                            >
                              <Code size={12} />
                            </a>
                          )}
                          {member.socialLinks.gmail && (
                            <a
                              href={`mailto:${member.socialLinks.gmail}`}
                              aria-label={`Email ${member.name}`}
                              className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-colors"
                            >
                              <Mail size={12} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </FadeReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
