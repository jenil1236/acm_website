import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeReveal } from "@/components/animations/FadeReveal";

export function CTASection() {
  return (
    <section className="relative py-40 bg-[#0b0520] overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-700/15 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-40 h-40 bg-fuchsia-600/10 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-40 h-40 bg-cyan-600/10 blur-[60px] rounded-full pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 container-acm text-center">
        <FadeReveal>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-heading text-violet-300 tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
            Applications Open
          </span>
        </FadeReveal>
        <FadeReveal delay={0.1}>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-none mb-6">
            Build the future.<br />
            <span className="text-gradient-aurora">Start here.</span>
          </h2>
        </FadeReveal>
        <FadeReveal delay={0.2}>
          <p className="max-w-lg mx-auto text-slate-400 font-body leading-relaxed mb-10">
            Join a community of engineers, researchers, and creators at SVNIT. Your chapter. Your story.
          </p>
        </FadeReveal>
        <FadeReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-heading font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]">
              Join ACM SVNIT <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/events"
              className="px-8 py-4 rounded-xl border border-white/10 hover:border-violet-500/30 text-white font-heading font-semibold transition-all duration-300 hover:bg-white/[0.04]">
              Explore Events
            </Link>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
