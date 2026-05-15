import Link from "next/link";
import { Globe, Code, Link2, Mail, MapPin } from "lucide-react";

const SOCIAL_LINKS = [
  { href: "https://github.com/acmsvnit", icon: Code, label: "GitHub" },
  { href: "https://linkedin.com/company/acmsvnit", icon: Globe, label: "LinkedIn" },
  { href: "https://instagram.com/acmsvnit", icon: Link2, label: "Instagram" },
];

const FOOTER_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#05010f] border-t border-violet-500/10">
      {/* Ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-600/10 blur-[80px] pointer-events-none" />

      <div className="container-acm py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9">
                <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                  <circle cx="18" cy="18" r="16" stroke="url(#fg)" strokeWidth="2" />
                  <text x="18" y="23" textAnchor="middle" fontSize="13" fontWeight="800"
                    fontFamily="'Space Grotesk', sans-serif" fill="url(#fg)">A</text>
                  <defs>
                    <linearGradient id="fg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#e879f9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">ACM SVNIT Surat</p>
                <p className="text-xs text-violet-400 font-heading tracking-widest uppercase">Student Chapter</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 font-body leading-relaxed max-w-xs">
              Building the future of computing at Sardar Vallabhbhai National Institute of Technology, Surat.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm mb-5 tracking-wide uppercase">
              Navigate
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-violet-300 transition-colors font-body"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm mb-5 tracking-wide uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400 font-body">
                <Mail size={15} className="mt-0.5 text-violet-400 flex-shrink-0" />
                <span>acm@svnit.ac.in</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400 font-body">
                <MapPin size={15} className="mt-0.5 text-violet-400 flex-shrink-0" />
                <span>SVNIT, Ichchanath, Surat — 395007, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-body">
            © {new Date().getFullYear()} ACM SVNIT Surat. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 font-body">
            A chapter of the{" "}
            <a href="https://www.acm.org" target="_blank" rel="noopener noreferrer"
              className="text-violet-500 hover:text-violet-300 transition-colors">
              Association for Computing Machinery
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
