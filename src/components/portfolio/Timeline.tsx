import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Plus } from 'lucide-react';

const items = [
  {
    year: '2024 – Present',
    title: 'Senior Full Stack + DevOps Engineer',
    org: 'CloudScale Inc.',
    type: 'work' as const,
    desc: 'Leading a team of 6 engineers to architect and ship a multi-tenant SaaS platform serving 50K+ users.',
    achievements: [
      'Migrated monolith to 12 microservices on Kubernetes',
      'Reduced AWS costs by 38% via spot instances + autoscaling',
      'Implemented zero-downtime deploys with ArgoCD',
    ],
    tech: ['React', 'Node.js', 'K8s', 'AWS', 'Terraform'],
  },
  {
    year: '2022 – 2024',
    title: 'Full Stack Engineer',
    org: 'Stripe Labs (contract)',
    type: 'work' as const,
    desc: 'Built internal developer platforms and CI/CD tooling for the payments infrastructure team.',
    achievements: [
      'Designed reusable GitHub Actions workflow library',
      'Cut average deploy time from 22min to 4min',
      'Authored 14 internal RFCs adopted org-wide',
    ],
    tech: ['Go', 'TypeScript', 'Docker', 'GitHub Actions'],
  },
  {
    year: '2021',
    title: 'AWS Certified Solutions Architect',
    org: 'Amazon Web Services',
    type: 'cert' as const,
    desc: 'Achieved Professional-level certification covering distributed systems, security, and cost optimization.',
    achievements: ['Top 5% score globally'],
    tech: ['AWS', 'IAM', 'VPC', 'EKS'],
  },
  {
    year: '2020 – 2022',
    title: 'Full Stack Developer',
    org: 'Bright Studios',
    type: 'work' as const,
    desc: 'Shipped 20+ client projects from e-commerce to fintech dashboards. Owned full delivery lifecycle.',
    achievements: [
      'Built reusable component library used across 15 projects',
      'Mentored 4 junior developers',
      'Introduced CI/CD reducing bugs by 60%',
    ],
    tech: ['React', 'Next.js', 'Django', 'Postgres'],
  },
  {
    year: '2019',
    title: 'Software Engineering Internship',
    org: 'TechVerse',
    type: 'work' as const,
    desc: 'Built REST APIs and admin dashboards for an internal logistics platform.',
    achievements: ['Converted to full-time at end of internship'],
    tech: ['Node.js', 'Vue.js', 'MongoDB'],
  },
  {
    year: '2017 – 2021',
    title: 'B.Sc. Computer Science',
    org: 'University of Technology',
    type: 'edu' as const,
    desc: 'Specialized in distributed systems and software engineering. Graduated with honors.',
    achievements: ['GPA 3.85 / 4.0', "Dean's List 4 semesters"],
    tech: ['Algorithms', 'Distributed Systems', 'OS'],
  },
];

const iconMap = {
  work: Briefcase,
  edu: GraduationCap,
  cert: Award,
};

const Timeline: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs text-pink-300 font-medium mb-4">
            JOURNEY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience &{' '}
            <span className="bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Milestones
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A timeline of roles, certifications, and growth.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-400 to-pink-500 opacity-30" />

          <div className="space-y-8">
            {items.map((item, i) => {
              const Icon = iconMap[item.type];
              const isLeft = i % 2 === 0;
              const isOpen = expanded === i;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row gap-6 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-cyan-400 blur-md animate-pulse" />
                      <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 border-2 border-[#0B0F19]" />
                    </div>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className="md:w-1/2 pl-16 md:pl-8 md:pr-8">
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="w-full text-left p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-cyan-300" />
                          </div>
                          <div>
                            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                              {item.year}
                            </div>
                            <h3 className="text-lg font-bold text-white leading-tight">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <Plus
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                        />
                      </div>
                      <div className="text-sm text-indigo-300 font-medium mb-2">{item.org}</div>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                          <div>
                            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                              Highlights
                            </div>
                            <ul className="space-y-1.5">
                              {item.achievements.map((a, ai) => (
                                <li key={ai} className="flex gap-2 text-sm text-gray-300">
                                  <span className="text-cyan-400 mt-0.5">▸</span>
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
