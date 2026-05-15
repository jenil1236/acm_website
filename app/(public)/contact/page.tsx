"use client";

import { useState } from "react";
import { Send, MapPin, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { GradientText } from "@/components/ui/GradientText";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/client"; // reusing error parser
import axios from "axios";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      admissionNumber: formData.get("admissionNumber"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      await axios.post("/api/public/contact", payload);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent successfully!");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to send message"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#05010f] pt-28 pb-24">
      <div className="container-acm max-w-5xl">
        <div className="text-center mb-16">
          <FadeReveal>
            <span className="text-xs font-heading tracking-widest uppercase text-violet-400 mb-4 block">Get In Touch</span>
          </FadeReveal>
          <FadeReveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-white leading-tight mb-4">
              Contact <GradientText variant="violet">Us.</GradientText>
            </h1>
          </FadeReveal>
          <FadeReveal delay={0.2}>
            <p className="text-slate-400 font-body max-w-lg mx-auto">
              Have a question, want to collaborate, or interested in joining? Reach out to us.
            </p>
          </FadeReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="lg:col-span-1 space-y-8">
            <FadeReveal delay={0.3}>
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <h3 className="font-heading font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-body mb-1">Email</p>
                      <a href="mailto:acm@svnit.ac.in" className="text-sm font-medium text-white hover:text-violet-400 transition-colors">
                        acm@svnit.ac.in
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-body mb-1">Location</p>
                      <p className="text-sm text-white font-body leading-relaxed">
                        SVNIT Campus, Ichchhanath,<br />
                        Surat — 395007,<br />
                        Gujarat, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <FadeReveal delay={0.4}>
              <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-[#0b0520]">
                {success ? (
                  <div className="flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-lime-500/10 flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-lime-400" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400 font-body">We&apos;ve received your message and will get back to you shortly.</p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-8 text-sm font-heading text-violet-400 hover:text-violet-300"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-300">Full Name</label>
                        <input required type="text" id="name" name="name"
                          className="w-full bg-[#05010f] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                          placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="admissionNumber" className="text-sm font-medium text-slate-300">Admission No. (if SVNIT)</label>
                        <input required type="text" id="admissionNumber" name="admissionNumber"
                          className="w-full bg-[#05010f] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                          placeholder="U20CS001 or NA" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                        <input required type="email" id="email" name="email"
                          className="w-full bg-[#05010f] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                          placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-slate-300">Phone Number</label>
                        <input required type="tel" id="phone" name="phone"
                          className="w-full bg-[#05010f] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                          placeholder="+91 9876543210" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                      <input required type="text" id="subject" name="subject"
                        className="w-full bg-[#05010f] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                        placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                      <textarea required id="message" name="message" rows={5}
                        className="w-full bg-[#05010f] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"
                        placeholder="Your message..." />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-heading font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                    >
                      {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </FadeReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
