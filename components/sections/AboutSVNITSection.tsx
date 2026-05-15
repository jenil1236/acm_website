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
  const contentRef = useRef<HTMLDivElement>(null);
  const mottoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image moves slowly down (parallax background)
      gsap.fromTo(
        imageRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text content moves faster up
      gsap.fromTo(
        contentRef.current,
        { y: 80 },
        {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Motto moves at a different speed for multi-layer parallax
      gsap.fromTo(
        mottoRef.current,
        { y: 120, opacity: 0 },
        {
          y: -40,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] flex items-center bg-[#05010f] overflow-hidden py-32 lg:py-0"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full lg:w-[65%] h-[130%] -translate-y-[15%]">
          <Image
            ref={imageRef}
            src="/svnit.png"
            alt="SVNIT Campus"
            fill
            className="object-cover opacity-40 lg:opacity-70 mix-blend-lighten"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
          {/* Gradients to fade out the image into the background color */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#05010f]/70 to-[#05010f]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-transparent to-[#05010f]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05010f] via-transparent to-[#05010f]" />
        </div>
      </div>

      <div className="container-acm relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Parallax Motto */}
          <div className="hidden lg:flex flex-col justify-center h-full pl-8" ref={mottoRef}>
            <h3 className="text-6xl xl:text-7xl font-display font-bold leading-[1.1] tracking-tight drop-shadow-2xl">
              <span className="text-white block">Innovating</span>
              <span className="text-cyan-400 block">Tomorrow.</span>
            </h3>
            <div className="mt-8 flex items-center gap-4 opacity-80">
              <div className="w-12 h-[2px] bg-cyan-400/50" />
              <span className="text-sm font-heading tracking-widest text-white/70 uppercase">SVNIT Surat</span>
            </div>
          </div>

          {/* Right Side: Main Content */}
          <div ref={contentRef} className="lg:pl-8">
            <FadeReveal>
              <span className="inline-block text-xs font-heading font-medium tracking-widest uppercase text-cyan-400 mb-4 drop-shadow-md">
                Our Institution
              </span>
            </FadeReveal>
            <FadeReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-6 text-white drop-shadow-lg">
                Rooted in{" "}
                <GradientText variant="lime">excellence.</GradientText>
              </h2>
            </FadeReveal>
            <FadeReveal delay={0.2}>
              <p className="text-slate-300 font-body leading-relaxed mb-10 text-lg drop-shadow-md">
                Sardar Vallabhbhai National Institute of Technology (SVNIT) Surat is one of India&apos;s premier engineering institutions. Established in 1961, it stands as a hub of research, innovation, and technical education — the perfect backdrop for a thriving ACM chapter.
              </p>
            </FadeReveal>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }, i) => (
                <FadeReveal key={label} delay={0.2 + i * 0.08}>
                  <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#05010f]/60 backdrop-blur-md hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 shadow-xl">
                    <div className="text-3xl font-display font-bold text-gradient-lime mb-2 drop-shadow-md">{value}</div>
                    <div className="text-sm text-slate-400 font-body tracking-wide">{label}</div>
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
