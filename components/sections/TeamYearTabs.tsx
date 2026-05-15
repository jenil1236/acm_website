"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, User, Globe, Code, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types/team";

interface Props {
  grouped: Record<number, TeamMember[]>;
  years: number[];
}

export function TeamYearTabs({ grouped, years }: Props) {
  const [activeYear, setActiveYear] = useState<number>(years[0]);
  const [visible, setVisible] = useState(true);

  // When year changes, fade out → swap → fade in
  const switchYear = (year: number) => {
    if (year === activeYear) return;
    setVisible(false);
    setTimeout(() => {
      setActiveYear(year);
      setVisible(true);
    }, 220);
  };

  const currentIndex = years.indexOf(activeYear);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < years.length - 1;

  const members = grouped[activeYear] ?? [];

  return (
    <div className="container-acm space-y-10">
      {/* ── Year selector ── */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* Prev arrow */}
          <button
            onClick={() => canPrev && switchYear(years[currentIndex - 1])}
            disabled={!canPrev}
            aria-label="Previous year"
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200",
              canPrev
                ? "border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400/50"
                : "border-white/5 text-white/20 cursor-not-allowed",
            )}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Year pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => switchYear(year)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-heading font-medium border transition-all duration-200",
                  activeYear === year
                    ? "bg-violet-600 border-violet-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.35)]"
                    : "border-white/10 text-slate-400 hover:border-violet-500/40 hover:text-white bg-white/[0.02] hover:bg-violet-500/5",
                )}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => canNext && switchYear(years[currentIndex + 1])}
            disabled={!canNext}
            aria-label="Next year"
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200",
              canNext
                ? "border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400/50"
                : "border-white/5 text-white/20 cursor-not-allowed",
            )}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Decorative divider with active year label */}
        <div className="flex items-center gap-4 w-full max-w-xl">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-500/30" />
          <span className="text-xs font-heading tracking-widest text-violet-400 uppercase">
            Team of {activeYear}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-500/30" />
        </div>
      </div>

      {/* ── Members grid ── */}
      <div
        className={cn(
          "transition-all duration-200",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        )}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-body">
            No members found for {activeYear}.
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Single member card (extracted for clarity) ── */
function MemberCard({ member }: { member: TeamMember }) {
  return (
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

      {/* Social links */}
      {(member.socialLinks?.linkedin ||
        member.socialLinks?.github ||
        member.socialLinks?.gmail) && (
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
  );
}
