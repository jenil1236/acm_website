import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { getEvents } from "@/lib/api/public";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";
import { formatDistanceToNow } from "date-fns";

export const metadata: Metadata = {
  title: "Events",
  description: "Explore all events hosted by ACM SVNIT Surat — hackathons, workshops, talks, and more.",
};

export default async function EventsPage() {
  let events = await getEvents(100).catch(() => []);

  return (
    <div className="min-h-screen bg-[#05010f] pt-28 pb-24">
      {/* Header */}
      <div className="container-acm mb-16">
        <FadeReveal>
          <span className="text-xs font-heading tracking-widest uppercase text-fuchsia-400 mb-4 block">What We Do</span>
        </FadeReveal>
        <FadeReveal delay={0.1}>
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-white leading-tight mb-4">
            All <GradientText variant="aurora">Events.</GradientText>
          </h1>
        </FadeReveal>
        <FadeReveal delay={0.2}>
          <p className="text-slate-400 font-body max-w-lg">
            Hackathons, workshops, talks, competitions — every event shapes better engineers.
          </p>
        </FadeReveal>
      </div>

      {/* Grid */}
      <div className="container-acm">
        {events.length === 0 ? (
          <div className="text-center py-32">
            <Calendar size={48} className="mx-auto text-slate-700 mb-4" />
            <p className="text-slate-500 font-body">No events yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <FadeReveal key={event.id} delay={(i % 6) * 0.07}>
                <Link
                  href={`/events/${event.slug}`}
                  className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-fuchsia-500/30 hover:shadow-[0_0_30px_rgba(232,121,249,0.08)] transition-all duration-300"
                >
                  <div className="relative h-48 bg-[#0b0520] overflow-hidden">
                    {event.bannerImageUrl ? (
                      <Image
                        src={event.bannerImageUrl}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/30 to-violet-900/30 flex items-center justify-center">
                        <Calendar size={40} className="text-fuchsia-500/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading font-semibold text-white mb-2 line-clamp-2 group-hover:text-fuchsia-200 transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-xs text-slate-500 font-body line-clamp-2 mb-4">{event.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-body flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDistanceToNow(new Date(event.date || event.createdAt), { addSuffix: true })}
                      </span>
                      <span className="text-xs text-fuchsia-400 font-heading flex items-center gap-1 group-hover:gap-2 transition-all">
                        View <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
