"use client";

import { useEffect, useRef } from "react";
import React from "react";

interface StaggerTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
}

export function StaggerText({
  text,
  className,
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
}: StaggerTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".stagger-word");
    words.forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = "translateY(24px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          words.forEach((w, i) => {
            const t = delay + i * stagger;
            w.style.transition = `opacity 0.6s ease ${t}s, transform 0.6s ease ${t}s`;
            w.style.opacity = "1";
            w.style.transform = "translateY(0px)";
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className={`stagger-word inline-block ${wordClassName}`}
          style={{ overflow: "hidden", display: "inline-block" }}
        >
          {word}&nbsp;
        </span>
      ))}
    </Tag>
  );
}
