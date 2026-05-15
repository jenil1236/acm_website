import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, Mail, User, Globe } from "lucide-react";
import type { TeamMember } from "@/types/team";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

interface TeamPreviewProps {
  members: TeamMember[];
}

export function TeamPreview({ members }: TeamPreviewProps) {
  const preview = members.slice(0, 8);

  return (
    <section className="relative py-32 bg-[#0b0520] overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-acm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <FadeReveal>
              <span className="inline-block text-xs font-heading font-medium tracking-widest uppercase text-cyan-400 mb-4">
                The People
              </span>
            </FadeReveal>
            <FadeReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
                Meet the <GradientText variant="aurora">team.</GradientText>
              </h2>
            </FadeReveal>
          </div>
          <FadeReveal delay={0.2}>
            <Link href="/team"
              className="group flex items-center gap-2 text-sm font-heading font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
              View full team
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeReveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {preview.map((member, i) => (
            <FadeReveal key={member.id} delay={i * 0.06}>
              <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-cyan-500/20 transition-all duration-300 p-4 text-center">
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Photo */}
                <div className="relative w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white/10 group-hover:border-cyan-500/30 transition-colors">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full bg-violet-900/40 flex items-center justify-center">
                      <User size={24} className="text-violet-400" />
                    </div>
                  )}
                </div>

                <h3 className="font-heading font-semibold text-white text-sm mb-0.5 line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 font-body mb-3 line-clamp-1">{member.role}</p>

                {/* Social links */}
                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                      <Globe size={13} />
                    </a>
                  )}
                  {member.socialLinks?.github && (
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                      <Code size={13} />
                    </a>
                  )}
                  {member.socialLinks?.gmail && (
                    <a href={`mailto:${member.socialLinks.gmail}`}
                      className="text-slate-400 hover:text-violet-400 transition-colors" aria-label="Email">
                      <Mail size={13} />
                    </a>
                  )}
                </div>
              </div>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
