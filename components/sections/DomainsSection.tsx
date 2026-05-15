"use client";

import { useState } from "react";
import { Brain, Globe, Shield, Code2, Smartphone, GitBranch, Palette } from "lucide-react";
import { DOMAINS } from "@/data/domains";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

const ICON_MAP = { Brain, Globe, Shield, Code2, Smartphone, GitBranch, Palette } as const;

export function DomainsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-32 bg-[#05010f] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-acm">
        <div className="text-center mb-16">
          <FadeReveal>
            <span className="inline-block text-xs font-heading font-medium tracking-widest uppercase text-lime-400 mb-4">
              Special Interest Groups
            </span>
          </FadeReveal>
          <FadeReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
              Find your <GradientText variant="lime">domain.</GradientText>
            </h2>
          </FadeReveal>
          <FadeReveal delay={0.2}>
            <p className="mt-4 max-w-lg mx-auto text-slate-400 font-body">
              Seven focused SIGs. One community. Pick your passion and go deep.
            </p>
          </FadeReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DOMAINS.map((domain, i) => {
            const Icon = ICON_MAP[domain.icon as keyof typeof ICON_MAP];
            const isHovered = hoveredId === domain.id;

            return (
              <FadeReveal key={domain.id} delay={i * 0.06}>
                <div
                  className="relative group rounded-2xl border p-6 cursor-default transition-all duration-300 overflow-hidden"
                  style={{
                    background: isHovered
                      ? `rgba(${domain.accentColor === "#a78bfa" ? "124,58,237" : "255,255,255"},0.05)`
                      : "rgba(255,255,255,0.02)",
                    borderColor: isHovered ? `${domain.accentColor}30` : "rgba(255,255,255,0.06)",
                    boxShadow: isHovered ? `0 0 40px ${domain.accentColor}15` : "none",
                  }}
                  onMouseEnter={() => setHoveredId(domain.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Background gradient on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top left, ${domain.accentColor}08, transparent 60%)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${domain.accentColor}15`, border: `1px solid ${domain.accentColor}25` }}
                  >
                    {Icon && <Icon size={20} style={{ color: domain.accentColor }} />}
                  </div>

                  <h3 className="font-heading font-semibold text-white text-sm mb-2">
                    {domain.shortName}
                  </h3>
                  <p className="text-xs text-slate-500 font-body leading-relaxed">
                    {domain.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${domain.accentColor}50, transparent)` }}
                  />
                </div>
              </FadeReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
