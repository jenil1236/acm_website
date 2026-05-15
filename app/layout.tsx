import type { Metadata } from "next";
import { Sora, Space_Grotesk, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ACM SVNIT Surat — Engineering Intelligent Communities",
    template: "%s | ACM SVNIT Surat",
  },
  description:
    "ACM SVNIT Surat is the official student chapter of the Association for Computing Machinery at Sardar Vallabhbhai National Institute of Technology, Surat. Building the future of computing.",
  keywords: ["ACM", "SVNIT", "Surat", "NIT Surat", "computer science", "tech community", "AI/ML", "hackathon"],
  openGraph: {
    title: "ACM SVNIT Surat",
    description: "Engineering intelligent communities at NIT Surat.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
