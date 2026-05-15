import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

const TIMELINE = [
  { year: "2018", title: "Chapter Founded", desc: "ACM SVNIT established as an official student chapter at NIT Surat." },
  { year: "2019", title: "First Hackathon", desc: "Hosted our inaugural 24-hour hackathon with 200+ participants." },
  { year: "2021", title: "SIG Expansion", desc: "Launched 7 Special Interest Groups covering AI, Web, Cyber, and more." },
  { year: "2023", title: "National Recognition", desc: "Ranked among top ACM student chapters in India for community impact." },
  { year: "2024", title: "Research Push", desc: "Members published research and contributed to open-source globally." },
];

export function AboutACMSection() {
  return (
    <section id="about" className="relative py-32 bg-[#0b0520] overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-acm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
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
                  <div className="text-center p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="text-lg font-display font-bold text-gradient-violet mb-1">{label}</div>
                    <div className="text-xs text-slate-500 font-body">{desc}</div>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent" />

            {TIMELINE.map(({ year, title, desc }, i) => (
              <FadeReveal key={year} delay={i * 0.1}>
                <div className="relative mb-8 last:mb-0">
                  {/* Dot */}
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#0b0520] shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
                  <div className="text-xs text-violet-400 font-heading font-medium mb-1 tracking-wide">{year}</div>
                  <h3 className="text-white font-heading font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-slate-500 font-body leading-relaxed">{desc}</p>
                </div>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
