import React, { useState } from 'react';
import { Github, ExternalLink, X, Server, Cloud, Database } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  desc: string;
  longDesc: string;
  tech: string[];
  category: 'web' | 'devops' | 'fullstack';
  image: string;
  github: string;
  demo: string;
  metrics: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CloudCommerce',
    desc: 'Multi-tenant e-commerce platform with real-time inventory.',
    longDesc:
      'A SaaS e-commerce platform serving 200+ merchants. Built with Next.js, Node.js, and PostgreSQL. Deployed on AWS ECS with auto-scaling, Redis caching, and Stripe payments. Includes admin dashboard, analytics, and multi-region CDN.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    category: 'fullstack',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610582300_1304ed8a.png',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Users', value: '50K+' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'p95 Latency', value: '120ms' },
    ],
  },
  {
    id: 2,
    title: 'K8s Deploy Engine',
    desc: 'GitOps-driven Kubernetes deployment automation.',
    longDesc:
      'Internal tool that automates blue-green deployments to Kubernetes clusters using ArgoCD and GitHub Actions. Reduced deploy time from 45 minutes to 4 minutes across 12 microservices.',
    tech: ['Kubernetes', 'ArgoCD', 'Go', 'Helm', 'Terraform'],
    category: 'devops',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610623649_35176c4d.png',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Deploy time', value: '-91%' },
      { label: 'Services', value: '12' },
      { label: 'Rollbacks', value: 'Zero' },
    ],
  },
  {
    id: 3,
    title: 'Analytics Hub',
    desc: 'Real-time data dashboard with WebSocket streams.',
    longDesc:
      'Real-time analytics platform processing 100K+ events/sec. Built with React, Django, ClickHouse, and Kafka. Features customizable dashboards, alerting, and SQL playground.',
    tech: ['React', 'Django', 'ClickHouse', 'Kafka', 'Docker'],
    category: 'fullstack',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610587348_fefc1e88.png',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Events/sec', value: '100K' },
      { label: 'Dashboards', value: '500+' },
      { label: 'Cost saved', value: '40%' },
    ],
  },
  {
    id: 4,
    title: 'CI/CD Pipeline Suite',
    desc: 'Reusable GitHub Actions workflows for any stack.',
    longDesc:
      'Open-source collection of composable CI/CD workflows. Supports Node, Python, Go, and Rust with built-in security scanning, container builds, and multi-cloud deployment.',
    tech: ['GitHub Actions', 'Bash', 'Docker', 'Trivy', 'Cosign'],
    category: 'devops',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610616446_20757485.jpg',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Stars', value: '2.1K' },
      { label: 'Forks', value: '340' },
      { label: 'Adopters', value: '85+' },
    ],
  },
  {
    id: 5,
    title: 'DevPortal',
    desc: 'Developer documentation portal with MDX.',
    longDesc:
      'A modern docs platform with versioned content, full-text search, and interactive code playgrounds. Built with Next.js App Router, MDX, and Algolia.',
    tech: ['Next.js', 'MDX', 'Algolia', 'Tailwind', 'Vercel'],
    category: 'web',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610582828_3ab5a348.jpg',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Lighthouse', value: '99' },
      { label: 'Pages', value: '300+' },
      { label: 'Search', value: '<50ms' },
    ],
  },
  {
    id: 6,
    title: 'Observability Stack',
    desc: 'Self-hosted Prometheus + Grafana + Loki setup.',
    longDesc:
      'Production-grade observability stack with metrics, logs, and traces. Includes pre-built dashboards, alerting rules, and IaC for repeatable deployments.',
    tech: ['Prometheus', 'Grafana', 'Loki', 'Tempo', 'Helm'],
    category: 'devops',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610617336_3ac73fec.jpg',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Metrics', value: '5M/min' },
      { label: 'Retention', value: '90d' },
      { label: 'Cost', value: '$0' },
    ],
  },
  {
    id: 7,
    title: 'TaskFlow',
    desc: 'Collaborative project management with realtime sync.',
    longDesc:
      'Notion-inspired task tracker with rich text editing, kanban boards, and live cursors. Built with React, tRPC, Prisma, and PartyKit.',
    tech: ['React', 'tRPC', 'Prisma', 'PartyKit', 'Postgres'],
    category: 'fullstack',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610586227_1258fba3.png',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Teams', value: '300+' },
      { label: 'Sync', value: '<100ms' },
      { label: 'NPS', value: '72' },
    ],
  },
  {
    id: 8,
    title: 'AI Chat Gateway',
    desc: 'OpenAI-compatible proxy with rate limiting & analytics.',
    longDesc:
      'Reverse proxy in front of multiple LLM providers (OpenAI, Anthropic, Mistral). Adds rate limiting, request logging, fallbacks, and per-user quotas.',
    tech: ['Go', 'Redis', 'PostgreSQL', 'Docker', 'Nginx'],
    category: 'devops',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610596961_a8d4ae9c.png',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Throughput', value: '10K rps' },
      { label: 'Providers', value: '6' },
      { label: 'Saved', value: '$12K/mo' },
    ],
  },
  {
    id: 9,
    title: 'Portfolio 3D',
    desc: 'This very portfolio site with WebGL hero.',
    longDesc:
      'Personal portfolio built with Vite, React, TypeScript, and Tailwind. Features 3D parallax effects, smooth animations, and a perfect Lighthouse score.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind', 'CSS 3D'],
    category: 'web',
    image: 'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777610558764_afaeb6e3.png',
    github: 'https://github.com',
    demo: 'https://example.com',
    metrics: [
      { label: 'Lighthouse', value: '98' },
      { label: 'Bundle', value: '120KB' },
      { label: 'CLS', value: '0.01' },
    ],
  },
];

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'devops', label: 'DevOps' },
  { id: 'web', label: 'Web' },
] as const;

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [tilt, setTilt] = useState<{ id: number | null; x: number; y: number }>({
    id: null,
    x: 0,
    y: 0,
  });

  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const onMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setTilt({ id, x, y });
  };

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs text-purple-300 font-medium mb-4">
            FEATURED WORK
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects &{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of products, platforms and tools I've built and deployed.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === f.id
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 border-transparent text-white'
                  : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => {
            const isHovered = tilt.id === p.id;
            return (
              <div
                key={p.id}
                onMouseMove={(e) => onMove(e, p.id)}
                onMouseLeave={() => setTilt({ id: null, x: 0, y: 0 })}
                onClick={() => setSelected(p)}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-indigo-500/20"
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateY(${tilt.x * 6}deg) rotateX(${tilt.y * -6}deg) translateZ(10px)`
                    : 'perspective(1000px) rotateY(0) rotateX(0)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {p.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-gray-500">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex gap-2">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <span className="text-xs text-cyan-400 font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Read case study →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full my-8 rounded-2xl bg-[#0B0F19] border border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  {selected.category}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">{selected.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{selected.longDesc}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {selected.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      {m.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Architecture
                </h3>
                <div className="flex items-center justify-between gap-2 text-xs">
                  {[
                    { icon: Server, label: 'Frontend', color: 'text-indigo-400' },
                    { icon: Database, label: 'API + DB', color: 'text-emerald-400' },
                    { icon: Cloud, label: 'Cloud', color: 'text-cyan-400' },
                  ].map((s, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${s.color}`}
                        >
                          <s.icon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-400">{s.label}</span>
                      </div>
                      {i < 2 && (
                        <div className="flex-1 h-px bg-gradient-to-r from-indigo-500 to-cyan-400" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold text-center hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                >
                  Live Demo
                </a>
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-white font-semibold flex items-center gap-2 hover:bg-white/10"
                >
                  <Github className="w-4 h-4" />
                  Source
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
