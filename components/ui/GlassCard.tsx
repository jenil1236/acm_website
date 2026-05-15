import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({ children, className, glow = false, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-6",
        "bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-xl",
        "border-white/[0.08] dark:border-white/[0.08]",
        glow && "shadow-[0_0_30px_rgba(124,58,237,0.15)]",
        hover &&
          "transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
