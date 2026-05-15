import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

const STATS = [
  { value: "1961", label: "Founded" },
  { value: "7000+", label: "Students" },
  { value: "18+", label: "Departments" },
  { value: "200+", label: "Faculty" },
];

export function AboutSVNITSection() {
  return (
    <section className="relative py-32 bg-[#05010f] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-acm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: wireframe illustration */}
          <FadeReveal className="relative flex items-center justify-center">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Animated building wireframe */}
              <svg viewBox="0 0 320 280" fill="none" className="w-full opacity-80">
                {/* Ground */}
                <line x1="20" y1="260" x2="300" y2="260" stroke="#4f46e5" strokeWidth="1" />
                {/* Main building */}
                <rect x="60" y="80" width="200" height="180" stroke="#7c3aed" strokeWidth="1" fill="rgba(124,58,237,0.03)" strokeDasharray="6 3" />
                {/* Windows */}
                {[0,1,2].map(row => [0,1,2,3].map(col => (
                  <rect key={`${row}-${col}`} x={75 + col * 46} y={100 + row * 50} width="30" height="25"
                    stroke="#a78bfa" strokeWidth="0.7" fill="rgba(167,139,250,0.05)" />
                )))}
                {/* Entrance */}
                <rect x="135" y="200" width="50" height="60" stroke="#e879f9" strokeWidth="0.8" fill="rgba(232,121,249,0.05)" />
                {/* Roof detail */}
                <line x1="60" y1="80" x2="160" y2="30" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="260" y1="80" x2="160" y2="30" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="4 4" />
                {/* Grid overlay */}
                {[0,1,2].map(i => (
                  <line key={i} x1="60" y1={80 + i * 60} x2="260" y2={80 + i * 60} stroke="#4f46e5" strokeWidth="0.3" strokeDasharray="3 3" />
                ))}
                {/* Decorative circles */}
                <circle cx="160" cy="30" r="8" stroke="#e879f9" strokeWidth="0.8" fill="none" />
                <circle cx="160" cy="30" r="3" fill="#e879f9" opacity="0.6" />
                {/* Corner accents */}
                <path d="M60 80 L60 95 M60 80 L75 80" stroke="#a3e635" strokeWidth="1.5" />
                <path d="M260 80 L260 95 M260 80 L245 80" stroke="#a3e635" strokeWidth="1.5" />
              </svg>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30 backdrop-blur-sm">
                <span className="text-xs text-violet-300 font-heading font-medium">NIT Surat</span>
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
