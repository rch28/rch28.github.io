import React from "react";
import { Code, Server, Cloud, Workflow } from "lucide-react";

const About: React.FC = () => {
  const pillars = [
    {
      icon: Code,
      title: "Frontend",
      desc: "Pixel-perfect interfaces with React, Next.js & TypeScript",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Server,
      title: "Backend",
      desc: "Robust APIs with Node.js, Django & PostgreSQL",
      color: "from-emerald-500 to-cyan-500",
    },
    {
      icon: Cloud,
      title: "Cloud",
      desc: "AWS, GCP & Azure deployments at scale",
      color: "from-orange-500 to-pink-500",
    },
    {
      icon: Workflow,
      title: "DevOps",
      desc: "CI/CD pipelines, Docker & Kubernetes orchestration",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "Cloud Deployments" },
    { value: "5+", label: "Years of Experience" },
    { value: "20+", label: "Happy Clients" },
  ];

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-medium mb-4">
            ABOUT ME
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Crafting code from{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              concept to cloud
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I bridge the gap between elegant user experiences and rock-solid
            infrastructure— shipping features fast without compromising
            reliability.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Story card */}
          <div className="lg:col-span-3 p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm a Full Stack Developer passionate about building modern web
                applications that combine great user experiences with robust
                backend systems. I work primarily with React, Next.js, Django,
                Node.js, and PostgreSQL, creating end-to-end solutions that are
                scalable, maintainable, and user-focused.
              </p>
              <p>
                I enjoy turning ideas into real products, continuously learning
                new technologies, and exploring how AI can enhance the software
                development process.
              </p>
            </div>
            {/* <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I started my journey writing simple HTML pages and never looked back. Today I
                architect{' '}
                <span className="text-indigo-300">distributed systems</span>, design
                <span className="text-cyan-300"> production pipelines</span>, and build
                <span className="text-purple-300"> SaaS products</span> that serve thousands
                of users daily.
              </p>
              <p>
                What sets me apart is my{' '}
                <span className="text-white font-semibold">end-to-end mindset</span>—I don't
                just write features, I own them from the IDE to the cluster, monitoring
                latency, optimizing costs, and iterating with users in mind.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open source, writing
                technical articles, or experimenting with the latest in WebAssembly and edge
                computing.
              </p>
            </div> */}

            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Avatar / accent */}
          <div className="lg:col-span-2 relative rounded-2xl bg-gradient-to-br from-indigo-900/40 to-cyan-900/30 border border-white/10 backdrop-blur-sm overflow-hidden p-8 min-h-[300px]">
            {/* <img
              src="https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610640916_7a331bde.jpg"
              alt="Portrait"
              className="absolute right-0 bottom-0 w-3/4 object-cover opacity-90"
              loading="lazy"
            /> */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-widest text-cyan-300 mb-2">
                Currently
              </div>
              <div className="text-2xl font-bold text-white leading-tight">
                Building cloud-native SaaS platforms
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-white font-medium">
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
