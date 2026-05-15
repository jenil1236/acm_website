import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "violet" | "lime" | "aurora";
}

export function GradientText({ children, className, variant = "violet" }: GradientTextProps) {
  const variants = {
    violet: "text-gradient-violet",
    lime: "text-gradient-lime",
    aurora: "text-gradient-aurora",
  };
  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  );
}
