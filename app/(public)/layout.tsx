import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { GSAPProvider } from "@/components/motion/GSAPProvider";

export const metadata: Metadata = {
  title: {
    default: "ACM SVNIT Surat — Engineering Intelligent Communities",
    template: "%s | ACM SVNIT Surat",
  },
  description:
    "ACM SVNIT Surat is the official student chapter of the Association for Computing Machinery at SVNIT. We build, learn, and innovate together.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <GSAPProvider>
      <SmoothScrollProvider>
        <div className="dark min-h-screen bg-[#05010f] text-white flex flex-col">
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </GSAPProvider>
  );
}
