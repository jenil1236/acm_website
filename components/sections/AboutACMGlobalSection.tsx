import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";

const NODES = [
  { x: 160, y: 120, label: "ACM Global", color: "#a78bfa", r: 18 },
  { x: 60, y: 60, label: "Research", color: "#22d3ee", r: 10 },
  { x: 260, y: 60, label: "Education", color: "#34d399", r: 10 },
  { x: 50, y: 180, label: "Industry", color: "#e879f9", r: 10 },
  { x: 270, y: 180, label: "Community", color: "#fbbf24", r: 10 },
  { x: 160, y: 240, label: "SVNIT", color: "#a3e635", r: 14 },
];

const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [3, 5], [4, 5],
];

export function AboutACMGlobalSection() {
  return (
    <section className="relative py-32 bg-[#0b0520] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-700/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-acm">
        <div className="text-center mb-16">
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
            <p className="max-w-2xl mx-auto text-slate-400 font-body leading-relaxed">
              The Association for Computing Machinery is the world&apos;s largest and most prestigious scientific and educational computing society, with over 100,000 members in 190+ countries. We are its voice at SVNIT.
            </p>
          </FadeReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* SVG node graph */}
          <FadeReveal className="flex justify-center">
            <svg viewBox="0 0 320 300" className="w-full max-w-sm" role="img" aria-label="ACM global network diagram">
              {/* Edges */}
              {EDGES.map(([a, b], i) => (
                <line
                  key={i}
                  x1={NODES[a].x} y1={NODES[a].y}
                  x2={NODES[b].x} y2={NODES[b].y}
                  stroke="rgba(124,58,237,0.25)" strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
              {/* Nodes */}
              {NODES.map(({ x, y, label, color, r }) => (
                <g key={label}>
                  <circle cx={x} cy={y} r={r + 4} fill={color} opacity={0.08} />
                  <circle cx={x} cy={y} r={r} fill={color} opacity={0.15} stroke={color} strokeWidth="1.5" />
                  <circle cx={x} cy={y} r={3} fill={color} />
                  <text x={x} y={y + r + 12} textAnchor="middle" fontSize="8"
                    fill={color} fontFamily="'Space Grotesk', sans-serif" opacity={0.9}>
                    {label}
                  </text>
                </g>
              ))}
            </svg>
          </FadeReveal>

          {/* Facts */}
          <div className="space-y-6">
            {[
              { stat: "100,000+", label: "Members Worldwide", color: "text-violet-400" },
              { stat: "190+", label: "Countries Represented", color: "text-cyan-400" },
              { stat: "800+", label: "Student Chapters", color: "text-lime-400" },
              { stat: "50+", label: "Years of Excellence", color: "text-fuchsia-400" },
            ].map(({ stat, label, color }, i) => (
              <FadeReveal key={label} delay={i * 0.1}>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-violet-500/20 transition-colors">
                  <div className={`text-2xl font-display font-bold ${color} min-w-[100px]`}>{stat}</div>
                  <div className="text-sm text-slate-400 font-body">{label}</div>
                </div>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
