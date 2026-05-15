"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Globe, Shield, Code2, Smartphone, GitBranch, Palette } from "lucide-react";
import { DOMAINS } from "@/data/domains";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Brain, Globe, Shield, Code2, Smartphone, GitBranch, Palette } as const;

export function DomainsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Pin when section reaches top of viewport
          end: "+=150%", // Keep pinned for 150% of viewport height
          pin: true,
          scrub: 1, // Smooth scrub
        }
      });

      // Animate the text to fade out slightly or stay? Let's just animate the grid
      tl.fromTo(
        gridRef.current,
        { 
          scale: 3.5, 
          opacity: 0,
          y: 200,
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col justify-center py-20 lg:py-32 bg-[#05010f] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-acm relative z-10 w-full">
        <div className="text-center mb-16" ref={titleRef}>
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

        {/* The Grid we will zoom out */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 will-change-transform"
        >
          {DOMAINS.map((domain) => {
            const Icon = ICON_MAP[domain.icon as keyof typeof ICON_MAP];
            const isHovered = hoveredId === domain.id;

            return (
              <div
                key={domain.id}
                className="relative group rounded-2xl border p-6 transition-all duration-300 overflow-hidden"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
