"use client";

import { useEffect, useRef } from "react";

export function GlowingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const SPACING = 60;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * SPACING;
          const y = r * SPACING;

          const wave = Math.sin(t * 0.8 + c * 0.4 + r * 0.3) * 0.5 + 0.5;
          const alpha = 0.06 + wave * 0.12;
          const size = 1 + wave * 1.5;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(124, 58, 237, ${alpha})`;
          ctx.fill();
        }
      }

      // Subtle grid lines
      ctx.strokeStyle = "rgba(124, 58, 237, 0.04)";
      ctx.lineWidth = 1;
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * SPACING, 0);
        ctx.lineTo(c * SPACING, canvas.height);
        ctx.stroke();
      }
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * SPACING);
        ctx.lineTo(canvas.width, r * SPACING);
        ctx.stroke();
      }

      t += 0.015;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      aria-hidden="true"
    />
  );
}
