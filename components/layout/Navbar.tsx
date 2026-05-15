"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/home#about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/blogs", label: "Blogs" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href.startsWith("/home#")) return pathname === "/home";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 backdrop-blur-2xl bg-[#05010f]/80 border-b border-violet-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent",
        )}
      >
        <div className="container-acm flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
            {/* ACM ring logo mark */}
            <div className="relative w-9 h-9 flex-shrink-0">
              <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                <circle cx="18" cy="18" r="16" stroke="url(#ng)" strokeWidth="2" />
                <text x="18" y="23" textAnchor="middle" fontSize="13" fontWeight="800"
                  fontFamily="'Space Grotesk', sans-serif" fill="url(#ng)">
                  A
                </text>
                <defs>
                  <linearGradient id="ng" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-800 text-white text-sm tracking-tight">ACM</span>
              <span className="text-[10px] text-violet-400 font-heading tracking-widest uppercase">SVNIT</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-heading font-medium transition-colors duration-200 rounded-lg",
                  isActive(link.href)
                    ? "text-violet-300"
                    : "text-slate-400 hover:text-white",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px bg-violet-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-heading font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
            >
              Join ACM
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="absolute inset-0 bg-[#05010f]/95 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        <nav className="relative flex flex-col items-center justify-center h-full gap-6 px-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-2xl font-display font-700 transition-all duration-300",
                "transform",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                isActive(link.href) ? "text-gradient-violet" : "text-white/80 hover:text-white",
              )}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-xl bg-violet-600 text-white font-heading font-medium text-lg hover:bg-violet-500 transition-colors"
          >
            Join ACM
          </Link>
        </nav>
      </div>
    </>
  );
}
