"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface FadeRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export function FadeReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 30,
  once = true,
}: FadeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0px)";
          if (once) observer.disconnect();
        } else if (!once) {
          el.style.opacity = "0";
          el.style.transform = `translateY(${y}px)`;
        }
      },
      { threshold: 0.15 },
    );

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, duration, y, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
