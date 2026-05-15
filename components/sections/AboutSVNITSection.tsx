"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "1961", label: "Founded" },
  { value: "7000+", label: "Students" },
  { value: "18+", label: "Departments" },
  { value: "200+", label: "Faculty" },
];

export function AboutSVNITSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: -30, scale: 1.1 },
        {
          y: 30,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32 bg-[#05010f] overflow-hidden" ref={containerRef}>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-acm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: SVNIT Image with Parallax */}
          <FadeReveal className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_40px_rgba(124,58,237,0.15)] group">
              <Image
                ref={imageRef}
                src="/svnit.png"
                alt="SVNIT Campus"
                fill
                className="object-cover transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#05010f]/80 via-transparent to-violet-900/20" />
              
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 group-hover:bg-violet-900/40 group-hover:border-violet-500/30 transition-all duration-300">
                <span className="text-sm text-white font-heading font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  NIT Surat
                </span>
              </div>
            </div>
          </FadeReveal>

          {/* Right: content */}
          <div>
            <FadeReveal>
              <span className="inline-block text-xs font-heading font-medium tracking-widest uppercase text-cyan-400 mb-4">
                Our Institution
              </span>
            </FadeReveal>
            <FadeReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-6 text-white">
                Rooted in{" "}
                <GradientText variant="lime">excellence.</GradientText>
              </h2>
            </FadeReveal>
            <FadeReveal delay={0.2}>
              <p className="text-slate-400 font-body leading-relaxed mb-8">
                Sardar Vallabhbhai National Institute of Technology (SVNIT) Surat is one of India&apos;s premier engineering institutions. Established in 1961, it stands as a hub of research, innovation, and technical education — the perfect backdrop for a thriving ACM chapter.
              </p>
            </FadeReveal>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }, i) => (
                <FadeReveal key={label} delay={0.2 + i * 0.08}>
                  <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/20 transition-colors">
                    <div className="text-3xl font-display font-bold text-gradient-lime mb-1">{value}</div>
                    <div className="text-sm text-slate-500 font-body">{label}</div>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
