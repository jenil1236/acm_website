"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { GlowingGrid } from "@/components/ui/GlowingGrid";
import { GradientText } from "@/components/ui/GradientText";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 20;
      const orbs = hero.querySelectorAll<HTMLElement>("[data-parallax]");
      orbs.forEach((el) => {
        const depth = parseFloat(el.dataset.parallax || "1");
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        el.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05010f]"
      id="hero"
    >
      {/* Canvas grid background */}
      <GlowingGrid />

      {/* Ambient orbs */}
      <div
        data-parallax="0.8"
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-violet-600/15 blur-[100px] pointer-events-none"
      />
      <div
        data-parallax="1.2"
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-fuchsia-600/10 blur-[80px] pointer-events-none"
      />
      <div
        data-parallax="0.5"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-800/10 blur-[120px] pointer-events-none"
      />

      {/* Wireframe SVG floating element */}
      <div
        data-parallax="0.4"
        className="absolute top-20 right-10 md:right-20 opacity-20 pointer-events-none"
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,55 190,145 100,190 10,145 10,55"
            stroke="#a78bfa" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <polygon points="100,30 170,67 170,133 100,170 30,133 30,67"
            stroke="#7c3aed" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="30" stroke="#e879f9" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#a78bfa" strokeWidth="0.3" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#a78bfa" strokeWidth="0.3" />
        </svg>
      </div>

      <div
        data-parallax="0.3"
        className="absolute bottom-32 left-10 md:left-20 opacity-15 pointer-events-none rotate-45"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="10" y="10" width="100" height="100" stroke="#22d3ee" strokeWidth="0.8" fill="none" strokeDasharray="6 3" />
          <rect x="25" y="25" width="70" height="70" stroke="#a78bfa" strokeWidth="0.5" fill="none" />
          <circle cx="60" cy="60" r="25" stroke="#e879f9" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 container-acm text-center flex flex-col items-center gap-8 pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-xs font-heading font-medium text-violet-300 tracking-widest uppercase">
            ACM SVNIT Surat — Student Chapter
          </span>
        </div>

        {/* Hero heading */}
        <h1 className="font-display font-bold leading-none tracking-tight animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
            Engineering
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1">
            <GradientText variant="aurora">Intelligent</GradientText>
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mt-1">
            Communities.
          </span>
        </h1>

        {/* Sub */}
        <p className="max-w-xl text-base sm:text-lg text-slate-400 font-body leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.3s" }}>
          Building the future of computing at NIT Surat. We code, research, compete, and collaborate — shaping the engineers of tomorrow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Link
            href="/events"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-heading font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            Explore Events
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 hover:border-violet-500/40 text-white font-heading font-semibold text-sm transition-all duration-300 hover:bg-white/[0.04] backdrop-blur-sm"
          >
            Join ACM SVNIT
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-4 animate-fade-in" style={{ animationDelay: "0.7s" }}>
          {[
            { value: "7+", label: "SIGs" },
            { value: "100+", label: "Members" },
            { value: "50+", label: "Events" },
            { value: "20+", label: "Projects" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-display font-bold text-gradient-violet">{value}</div>
              <div className="text-xs text-slate-500 font-body tracking-wide uppercase mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-xs text-slate-500 font-body tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-slate-500" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05010f] to-transparent pointer-events-none" />
    </section>
  );
}
