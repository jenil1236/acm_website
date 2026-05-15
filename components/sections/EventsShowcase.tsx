import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import type { Event } from "@/types/event";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";
import { formatDistanceToNow } from "date-fns";

interface EventsShowcaseProps {
  events: Event[];
}

export function EventsShowcase({ events }: EventsShowcaseProps) {
  const preview = events.slice(0, 6);

  return (
    <section className="relative py-20 lg:py-0 lg:h-screen flex flex-col justify-center bg-[#0b0520] overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-600/6 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-acm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <FadeReveal>
              <span className="inline-block text-xs font-heading font-medium tracking-widest uppercase text-fuchsia-400 mb-4">
                What We Do
              </span>
            </FadeReveal>
            <FadeReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">
                Our <GradientText variant="aurora">Events.</GradientText>
              </h2>
            </FadeReveal>
          </div>
          <FadeReveal delay={0.2}>
            <Link href="/events"
              className="group flex items-center gap-2 text-sm font-heading font-medium text-violet-400 hover:text-violet-300 transition-colors">
              View all events
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeReveal>
        </div>

        {preview.length === 0 ? (
          <FadeReveal>
            <p className="text-slate-500 font-body text-center py-16">No events yet. Check back soon!</p>
          </FadeReveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {preview.map((event, i) => (
              <FadeReveal key={event.id} delay={i * 0.08}>
                <Link
                  href={`/events/${event.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
                >
                  {/* Banner */}
                  <div className="relative h-44 bg-[#0b0520] overflow-hidden">
                    {event.bannerImageUrl ? (
                      <Image
                        src={event.bannerImageUrl}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 flex items-center justify-center">
                        <Calendar size={32} className="text-violet-400/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0520] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-white mb-2 line-clamp-2 group-hover:text-violet-200 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-body line-clamp-2 mb-3">
                      {event.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-body">
                      <Calendar size={12} />
                      {formatDistanceToNow(new Date(event.date || event.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </Link>
              </FadeReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
