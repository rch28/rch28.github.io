import React, { useState } from "react";

interface Skill {
  name: string;
  level: number;
  cat: "frontend" | "backend" | "devops" | "tools";
  color: string;
}

const skills: Skill[] = [
  { name: "React", level: 95, cat: "frontend", color: "#61DAFB" },
  { name: "Next.js", level: 92, cat: "frontend", color: "#FFFFFF" },
  { name: "TypeScript", level: 90, cat: "frontend", color: "#3178C6" },
  { name: "Tailwind", level: 95, cat: "frontend", color: "#06B6D4" },
  // { name: 'Vue.js', level: 75, cat: 'frontend', color: '#42B883' },
  { name: "Three.js", level: 70, cat: "frontend", color: "#A855F7" },

  { name: "Node.js", level: 92, cat: "backend", color: "#8CC84B" },
  { name: "Django", level: 85, cat: "backend", color: "#0C4B33" },
  { name: "Python", level: 88, cat: "backend", color: "#3776AB" },
  { name: "PostgreSQL", level: 85, cat: "backend", color: "#336791" },
  { name: "MongoDB", level: 80, cat: "backend", color: "#47A248" },
  // { name: "GraphQL", level: 78, cat: "backend", color: "#E10098" },

  { name: "Docker", level: 92, cat: "devops", color: "#2496ED" },
  { name: "Kubernetes", level: 85, cat: "devops", color: "#326CE5" },
  // { name: "AWS", level: 88, cat: "devops", color: "#FF9900" },
  { name: "GitHub Actions", level: 90, cat: "devops", color: "#2088FF" },
  // { name: "Nginx", level: 85, cat: "devops", color: "#009639" },
  // { name: "Terraform", level: 75, cat: "devops", color: "#7B42BC" },

  { name: "Git", level: 95, cat: "tools", color: "#F05032" },
  { name: "Linux", level: 90, cat: "tools", color: "#FCC624" },
  // { name: "Vim", level: 80, cat: "tools", color: "#019733" },
  // { name: "Figma", level: 75, cat: "tools", color: "#F24E1E" },
];

const categories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "tools", label: "Tools" },
] as const;

const Skills: React.FC = () => {
  const [active, setActive] = useState<string>("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered =
    active === "all" ? skills : skills.filter((s) => s.cat === active);

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs text-cyan-300 font-medium mb-4">
            TECH STACK
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills &{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A constellation of technologies I use daily to ship reliable,
            scalable products.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                active === c.id
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-400 border-transparent text-white shadow-lg shadow-indigo-500/30"
                  : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Constellation grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
          {filtered.map((s, i) => (
            <button
              key={s.name}
              onMouseEnter={() => setHovered(s.name)}
              onMouseLeave={() => setHovered(null)}
              className="group relative aspect-square rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center p-3 hover:-translate-y-2"
              style={{
                animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, ${s.color}30 0%, transparent 70%)`,
                }}
              />
              {/* Orb */}
              <div
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${s.color}, ${s.color}50)`,
                  boxShadow: `0 0 30px ${s.color}40, inset -4px -4px 12px ${s.color}80`,
                }}
              >
                <span className="text-white font-bold text-sm md:text-base">
                  {s.name.charAt(0)}
                </span>
              </div>

              <div className="text-xs font-semibold text-white truncate w-full text-center">
                {s.name}
              </div>

              {/* Progress ring */}
              <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden mt-2">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: hovered === s.name ? `${s.level}%` : "0%",
                    background: `linear-gradient(90deg, ${s.color}, ${s.color}80)`,
                  }}
                />
              </div>

              {/* Tooltip */}
              {hovered === s.name && (
                <div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap z-10"
                  style={{ background: s.color, color: "#000" }}
                >
                  {s.level}% proficiency
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Skill bars summary */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {[
            {
              label: "Frontend Development",
              value: 92,
              color: "from-indigo-500 to-purple-500",
            },
            {
              label: "Backend Engineering",
              value: 88,
              color: "from-emerald-500 to-cyan-500",
            },
            {
              label: "DevOps & Cloud",
              value: 90,
              color: "from-orange-500 to-pink-500",
            },
            {
              label: "System Design",
              value: 85,
              color: "from-cyan-400 to-blue-500",
            },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-300 font-medium">
                  {b.label}
                </span>
                <span className="text-sm text-white font-bold">{b.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                  style={{ width: `${b.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
