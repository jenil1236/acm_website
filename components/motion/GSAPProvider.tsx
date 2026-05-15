"use client";

import { useEffect } from "react";

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { TextPlugin } = await import("gsap/TextPlugin");
      gsap.registerPlugin(ScrollTrigger, TextPlugin);
    })();
  }, []);

  return <>{children}</>;
}
