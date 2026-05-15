"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

interface ShowcasePinWrapperProps {
  children: React.ReactNode;
}

export function ShowcasePinWrapper({ children }: ShowcasePinWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  // We expect exactly 3 children
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    if (!containerRef.current || !panel2Ref.current || !panel3Ref.current) return;

    // Use matchMedia to only run this animation on desktop
    // On mobile, they will just stack normally.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Setup initial states for sliding panels
      gsap.set(panel2Ref.current, { xPercent: 100 });
      gsap.set(panel3Ref.current, { xPercent: -100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Pin when it hits the top
          end: "+=200%", // Scroll distance (2 panels worth)
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      // Panel 2 slides in from the right
      tl.to(panel2Ref.current, {
        xPercent: 0,
        ease: "none"
      });

      // Panel 3 slides in from the left
      tl.to(panel3Ref.current, {
        xPercent: 0,
        ease: "none"
      });

      return () => {
        // Cleanup GSAP sets on revert
        gsap.set([panel2Ref.current, panel3Ref.current], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full lg:h-screen lg:overflow-hidden">
      {/* Panel 1: What We Do (Events) */}
      <div 
        ref={panel1Ref} 
        className="w-full lg:absolute lg:inset-0 z-10"
      >
        {childrenArray[0]}
      </div>

      {/* Panel 2: What We Ship (Projects) - slides from right */}
      <div 
        ref={panel2Ref} 
        className="w-full lg:absolute lg:inset-0 z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] lg:will-change-transform"
      >
        {childrenArray[1]}
      </div>

      {/* Panel 3: Insights (Blogs) - slides from left */}
      <div 
        ref={panel3Ref} 
        className="w-full lg:absolute lg:inset-0 z-30 shadow-[20px_0_50px_rgba(0,0,0,0.5)] lg:will-change-transform"
      >
        {childrenArray[2]}
      </div>
    </div>
  );
}
