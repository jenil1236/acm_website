import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Images } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/api/public";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { formatDistanceToNow } from "date-fns";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.excerpt,
    openGraph: { images: event.bannerImageUrl ? [event.bannerImageUrl] : [] },
  };
}

export async function generateStaticParams() {
  const events = await getEvents(100).catch(() => []);
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);
  if (!event) notFound();

  return (
    <div className="min-h-screen bg-[#05010f] pt-24 pb-24">
      {/* Back */}
      <div className="container-acm mb-8">
        <Link href="/events"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors font-body">
          <ArrowLeft size={15} /> Back to Events
        </Link>
      </div>

      {/* Banner */}
      {event.bannerImageUrl && (
        <div className="container-acm mb-12">
          <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 border border-white/[0.06]">
            <Image
              src={event.bannerImageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-transparent to-transparent" />
          </div>
        </div>
      )}

      <div className="container-acm max-w-3xl">
        <FadeReveal>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-body mb-4">
            <Calendar size={12} />
            {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight mb-6">
            {event.title}
          </h1>
          <p className="text-lg text-slate-400 font-body leading-relaxed mb-10 border-l-2 border-violet-500 pl-4">
            {event.excerpt}
          </p>
        </FadeReveal>

        {/* Content */}
        {event.content && (
          <FadeReveal delay={0.1}>
            <div
              className="prose-acm mb-14"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          </FadeReveal>
        )}

        {/* Gallery */}
        {event.gallery && event.gallery.length > 0 && (
          <FadeReveal delay={0.2}>
            <div className="mt-10">
              <h2 className="flex items-center gap-2 text-white font-heading font-semibold text-xl mb-6">
                <Images size={20} className="text-violet-400" /> Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {event.gallery.map((url, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-video border border-white/[0.06]">
                    <Image
                      src={url}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeReveal>
        )}
      </div>
    </div>
  );
}
