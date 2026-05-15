"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { year: "2018", title: "Chapter Founded", desc: "ACM SVNIT established as an official student chapter at NIT Surat." },
  { year: "2019", title: "First Hackathon", desc: "Hosted our inaugural 24-hour hackathon with 200+ participants." },
  { year: "2021", title: "SIG Expansion", desc: "Launched 7 Special Interest Groups covering AI, Web, Cyber, and more." },
  { year: "2023", title: "National Recognition", desc: "Ranked among top ACM student chapters in India for community impact." },
  { year: "2024", title: "Research Push", desc: "Members published research and contributed to open-source globally." },
];

export function AboutACMSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!lineRef.current || !timelineRef.current) return;

    // Use pathLength="100" to easily animate dashoffset from 100 to 0
    gsap.set(lineRef.current, {
      strokeDasharray: 100,
      strokeDashoffset: 100,
    });

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center", 
          end: "bottom center", 
          scrub: 1, 
        },
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-32 bg-[#0b0520]">
      <div className="absolute inset-0 pointer-events-none overflow-x-clip">
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="container-acm relative z-10">
        {/* Removed items-start so the left column stretches fully, allowing sticky to work */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Sticky Text */}
          <div className="relative">
            <div className="sticky top-32">
              <FadeReveal>
                <span className="inline-block text-xs font-heading font-medium tracking-widest uppercase text-violet-400 mb-4">
                  Who We Are
                </span>
              </FadeReveal>
              <FadeReveal delay={0.1}>
                <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-6 text-white">
                  More than a club —<br />
                  <GradientText variant="violet">a movement.</GradientText>
                </h2>
              </FadeReveal>
              <FadeReveal delay={0.2}>
                <p className="text-slate-400 font-body leading-relaxed mb-6">
                  ACM SVNIT is the student chapter of the Association for Computing Machinery at Sardar Vallabhbhai National Institute of Technology, Surat. We are a community of engineers, researchers, designers, and innovators united by a passion for computing.
                </p>
              </FadeReveal>
              <FadeReveal delay={0.3}>
                <p className="text-slate-400 font-body leading-relaxed">
                  We foster a culture of technical excellence, continuous learning, and collaborative problem-solving. From competitive programming nights to AI research workshops — we build skills that matter.
                </p>
              </FadeReveal>

              {/* Values */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { label: "Build", desc: "Projects that ship" },
                  { label: "Learn", desc: "From each other" },
                  { label: "Lead", desc: "The next generation" },
                ].map(({ label, desc }) => (
                  <FadeReveal key={label} delay={0.4}>
                    <div className="text-center p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <div className="text-lg font-display font-bold text-gradient-violet mb-1">{label}</div>
                      <div className="text-xs text-slate-500 font-body">{desc}</div>
                    </div>
                  </FadeReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Alternating Straight Timeline */}
          <div className="relative py-8 lg:mt-16 flex flex-col gap-10 lg:gap-16" ref={timelineRef}>
            
            {/* Straight SVG Line */}
            <svg
              className="absolute left-4 lg:left-1/2 top-0 h-full w-1 -translate-x-1/2 pointer-events-none"
              preserveAspectRatio="none"
            >
              <line
                x1="2" y1="0" x2="2" y2="100%"
                stroke="rgba(124,58,237,0.15)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                ref={lineRef}
                x1="2" y1="0" x2="2" y2="100%"
                stroke="rgba(139,92,246,1)"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]"
                pathLength="100"
              />
            </svg>

            {TIMELINE.map(({ year, title, desc }, i) => {
              const isEven = i % 2 === 0;

              return (
                <div key={year} className="relative flex w-full group">
                  
                  {/* MOBILE LAYOUT */}
                  <div className="w-full pl-12 lg:hidden">
                    <FadeReveal delay={i * 0.1}>
                      <div className="text-sm text-cyan-400 font-heading font-medium mb-2 tracking-wider uppercase">{year}</div>
                      <h3 className="text-xl text-white font-display font-semibold mb-2">{title}</h3>
                      <p className="text-base text-slate-400 font-body leading-relaxed">{desc}</p>
                    </FadeReveal>
                  </div>
                  {/* Mobile Dot */}
                  <div className="absolute left-4 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-500 border-2 border-[#0b0520] shadow-[0_0_15px_rgba(124,58,237,0.8)] group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-500 z-10 lg:hidden" />


                  {/* DESKTOP LAYOUT */}
                  <div className={cn(
                    "hidden lg:flex w-full items-center",
                    isEven ? "flex-row" : "flex-row-reverse"
                  )}>
                    {/* Content Box */}
                    <div className={cn(
                      "w-1/2",
                      isEven ? "pr-16 text-right" : "pl-16 text-left"
                    )}>
                      <FadeReveal delay={i * 0.1}>
                        <div className="text-sm text-cyan-400 font-heading font-medium mb-2 tracking-wider uppercase">{year}</div>
                        <h3 className="text-xl text-white font-display font-semibold mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
                        <p className="text-base text-slate-400 font-body leading-relaxed">{desc}</p>
                      </FadeReveal>
                    </div>

                    {/* Empty Half */}
                    <div className="w-1/2" />
                  </div>

                  {/* Desktop Centered Dot */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-500 border-2 border-[#0b0520] shadow-[0_0_15px_rgba(124,58,237,0.8)] z-10 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-500" />

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
