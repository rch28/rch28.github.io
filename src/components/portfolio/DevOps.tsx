import React from "react";
import {
  GitBranch,
  Container,
  TestTube,
  Rocket,
  Shield,
  BarChart3,
} from "lucide-react";

const stages = [
  {
    icon: GitBranch,
    title: "Code",
    sub: "GitHub / GitLab",
    color: "from-orange-500 to-red-500",
    desc: "Trunk-based dev, PRs, code review",
  },
  {
    icon: TestTube,
    title: "Test",
    sub: "CI Pipelines",
    color: "from-yellow-500 to-orange-500",
    desc: "Unit, integration & E2E tests",
  },
  {
    icon: Container,
    title: "Build",
    sub: "Docker / Buildx",
    color: "from-cyan-400 to-blue-500",
    desc: "Multi-arch container images",
  },
  {
    icon: Shield,
    title: "Scan",
    sub: "Trivy / Snyk",
    color: "from-emerald-500 to-teal-500",
    desc: "Vuln scanning & SBOM",
  },
  {
    icon: Rocket,
    title: "Deploy",
    sub: "K8s / ECS",
    color: "from-indigo-500 to-purple-500",
    desc: "Blue-green & canary releases",
  },
  {
    icon: BarChart3,
    title: "Monitor",
    sub: "Prometheus + Grafana",
    color: "from-pink-500 to-rose-500",
    desc: "Metrics, logs, alerts, traces",
  },
];

const tools = [
  "Docker",
  // "Kubernetes",
  "GitHub Actions",
  // "Terraform",
  // "Ansible",
  // "AWS",
  "Nginx",
  // "Prometheus",
  // "Grafana",
  // "ArgoCD",
  // "Helm",
  // "Jenkins",
];

const DevOps: React.FC = () => {
  return (
    <section id="devops" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 font-medium mb-4">
            INFRASTRUCTURE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            DevOps{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Pipeline
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From commit to production—an automated, observable, and secure
            delivery pipeline.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="relative mb-16">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-cyan-400 to-pink-500 opacity-30 hidden lg:block" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-orange-500 via-cyan-400 to-pink-500 hidden lg:block animate-pipeline"
            style={{ width: "100%" }}
          />

          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stages.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="group relative"
                  style={{
                    animation: `float ${4 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  <div className="relative p-5 rounded-2xl bg-[#0B0F19] border border-white/10 backdrop-blur-sm group-hover:border-white/30 transition-all">
                    {/* Step number */}
                    <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#0B0F19] border border-white/20 flex items-center justify-center text-xs font-bold text-cyan-300">
                      {i + 1}
                    </div>

                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {s.title}
                    </h3>
                    <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold mt-0.5">
                      {s.sub}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* Pulse dot */}
                  <div className="absolute top-1/2 -right-3 hidden lg:block">
                    {i < stages.length - 1 && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tools cloud */}
        <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Tools I work with
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Battle-tested in production
              </p>
            </div>
            {/* <div className="flex gap-6 text-sm">
              <div>
                <div className="text-2xl font-bold text-emerald-400">
                  99.99%
                </div>
                <div className="text-xs text-gray-500">Avg uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">8min</div>
                <div className="text-xs text-gray-500">Mean deploy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-400">0</div>
                <div className="text-xs text-gray-500">Prod outages</div>
              </div>
            </div> */}
          </div>

          <div className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <div
                key={t}
                className="px-4 py-2 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-sm text-gray-300 hover:border-cyan-400/50 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10 transition-all cursor-default"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevOps;
