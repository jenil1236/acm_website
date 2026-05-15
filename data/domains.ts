export interface Domain {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // lucide icon name
  color: string; // tailwind gradient classes
  accentColor: string;
}

export const DOMAINS: Domain[] = [
  {
    id: "ai-ml",
    name: "Artificial Intelligence & ML",
    shortName: "AI / ML",
    description:
      "Exploring machine learning, deep learning, computer vision, and NLP. We build models that think.",
    icon: "Brain",
    color: "from-violet-500 to-purple-700",
    accentColor: "#a78bfa",
  },
  {
    id: "web",
    name: "Web Development",
    shortName: "Web Dev",
    description:
      "Full-stack engineering from pixel-perfect UIs to scalable backend systems and APIs.",
    icon: "Globe",
    color: "from-cyan-400 to-blue-600",
    accentColor: "#22d3ee",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    shortName: "Cyber",
    description:
      "CTFs, pen testing, secure coding, and defense. Hack the planet — responsibly.",
    icon: "Shield",
    color: "from-red-500 to-rose-700",
    accentColor: "#f87171",
  },
  {
    id: "cp",
    name: "Competitive Programming",
    shortName: "CompProg",
    description:
      "Algorithms, data structures, problem solving. We train for ICPC, Codeforces, and beyond.",
    icon: "Code2",
    color: "from-amber-400 to-orange-600",
    accentColor: "#fbbf24",
  },
  {
    id: "app-dev",
    name: "App Development",
    shortName: "App Dev",
    description:
      "Cross-platform mobile apps with React Native, Flutter. From idea to Play Store.",
    icon: "Smartphone",
    color: "from-emerald-400 to-teal-600",
    accentColor: "#34d399",
  },
  {
    id: "open-source",
    name: "Open Source",
    shortName: "OSS",
    description:
      "Contributing to global projects, maintaining our own repos, and building in public.",
    icon: "GitBranch",
    color: "from-lime-400 to-green-600",
    accentColor: "#a3e635",
  },
  {
    id: "design",
    name: "Design & UI/UX",
    shortName: "Design",
    description:
      "Crafting beautiful interfaces, design systems, and user experiences that feel effortless.",
    icon: "Palette",
    color: "from-pink-400 to-fuchsia-600",
    accentColor: "#e879f9",
  },
];
