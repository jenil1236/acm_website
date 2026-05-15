import Image from "next/image";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

export function AboutACMGlobalSection() {
  return (
    <section className="relative py-32 bg-[#0b0520] overflow-hidden min-h-[70vh] flex flex-col justify-center">
      {/* Background Image Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/graph.png" 
          alt="Network Graph Background" 
          fill 
          className="object-cover opacity-60 grayscale brightness-[4]"
        />
      </div>

      <div className="container-acm relative z-10 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeReveal>
            <span className="inline-block text-xs font-heading font-medium tracking-widest uppercase text-fuchsia-400 mb-4">
              Global Network
            </span>
          </FadeReveal>
          <FadeReveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight mb-6">
              Part of something <GradientText variant="aurora">bigger.</GradientText>
            </h2>
          </FadeReveal>
          <FadeReveal delay={0.2}>
            <p className="text-slate-300 font-body leading-relaxed text-lg">
              The Association for Computing Machinery is the world&apos;s largest and most prestigious scientific and educational computing society, with over 100,000 members in 190+ countries. We are its voice at SVNIT.
            </p>
          </FadeReveal>
        </div>

        {/* Stats Grid Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { stat: "100,000+", label: "Members Worldwide", color: "text-violet-400" },
            { stat: "190+", label: "Countries Represented", color: "text-cyan-400" },
            { stat: "800+", label: "Student Chapters", color: "text-lime-400" },
            { stat: "50+", label: "Years of Excellence", color: "text-fuchsia-400" },
          ].map(({ stat, label, color }, i) => (
            <FadeReveal key={label} delay={i * 0.1}>
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/[0.1] bg-black/40 backdrop-blur-xl hover:border-white/30 transition-all group">
                <div className={`text-3xl font-display font-bold ${color} mb-2 group-hover:scale-110 transition-transform`}>{stat}</div>
                <div className="text-[10px] text-slate-400 font-heading uppercase tracking-[0.2em] font-semibold">{label}</div>
              </div>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
