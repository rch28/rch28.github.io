import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Terminal, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl animate-pulse"
          style={{
            transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"
          style={{
            transform: `translate(${mouse.x * -30}px, ${mouse.y * -30}px)`,
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left text */}
        <div className="space-y-7 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-xs text-cyan-300 font-medium">Available for new projects</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            Building{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              scalable
            </span>{' '}
            digital{' '}
            <span className="relative inline-block">
              <span className="relative z-10">products</span>
              <span className="absolute inset-x-0 bottom-2 h-3 bg-cyan-400/30 -z-0 blur-sm" />
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-gray-400 font-light">
            Full Stack <span className="text-indigo-400">+</span> DevOps Engineer crafting
            production-grade systems from <span className="text-cyan-400">pixel</span> to{' '}
            <span className="text-cyan-400">pipeline</span>.
          </h2>

          <p className="text-gray-500 max-w-xl leading-relaxed">
            I design, build, and ship modern web applications with bullet-proof CI/CD,
            container orchestration, and cloud-native infrastructure. 5+ years turning ideas
            into resilient products.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => scrollTo('#projects')}
              className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-indigo-500/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm text-white font-semibold hover:bg-white/10 hover:border-white/30 transition-all"
            >
              Contact Me
            </button>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="px-7 py-3.5 rounded-xl text-gray-300 font-semibold hover:text-white flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>

          <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5">
            {[
              { num: '50+', label: 'Projects Shipped' },
              { num: '5+', label: 'Years Exp.' },
              { num: '99.9%', label: 'Uptime' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {s.num}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3D scene */}
        <div className="relative h-[500px] lg:h-[600px] perspective-1000">
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `rotateY(${mouse.x * 8}deg) rotateX(${mouse.y * -8}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Main holographic terminal */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[60%] rounded-2xl bg-gradient-to-br from-indigo-900/50 to-cyan-900/30 backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/20 overflow-hidden"
              style={{ transform: 'translateZ(60px) translate(-50%, -50%)' }}
            >
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-black/30">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-3 flex items-center gap-2 text-xs text-gray-400">
                  <Terminal className="w-3 h-3" />
                  ~/portfolio
                </div>
              </div>
              <div className="p-5 font-mono text-xs space-y-2">
                <div className="text-gray-500">
                  <span className="text-cyan-400">$</span> whoami
                </div>
                <div className="text-indigo-300">→ fullstack-devops-engineer</div>
                <div className="text-gray-500">
                  <span className="text-cyan-400">$</span> cat skills.json
                </div>
                <div className="pl-3 space-y-0.5">
                  <div>
                    <span className="text-purple-400">"frontend"</span>:{' '}
                    <span className="text-emerald-300">"React, Next.js, TS"</span>,
                  </div>
                  <div>
                    <span className="text-purple-400">"backend"</span>:{' '}
                    <span className="text-emerald-300">"Node, Django, Go"</span>,
                  </div>
                  <div>
                    <span className="text-purple-400">"devops"</span>:{' '}
                    <span className="text-emerald-300">"Docker, K8s, AWS"</span>,
                  </div>
                  <div>
                    <span className="text-purple-400">"ci_cd"</span>:{' '}
                    <span className="text-emerald-300">"GH Actions, Jenkins"</span>
                  </div>
                </div>
                <div className="text-gray-500">
                  <span className="text-cyan-400">$</span> deploy --prod{' '}
                  <span className="inline-block w-2 h-3 bg-cyan-400 animate-pulse ml-1" />
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div
              className="absolute top-8 right-4 w-44 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-cyan-400/30 shadow-xl shadow-cyan-500/20 animate-float"
              style={{ transform: 'translateZ(120px)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Build Status</div>
                  <div className="text-xs font-bold text-cyan-300">PASSING</div>
                </div>
              </div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
              </div>
            </div>

            <div
              className="absolute bottom-8 left-2 w-48 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-indigo-400/30 shadow-xl shadow-indigo-500/20 animate-float-delay"
              style={{ transform: 'translateZ(100px)' }}
            >
              <div className="text-[10px] text-gray-400 mb-1">Deploys / Week</div>
              <div className="text-2xl font-bold text-white">142</div>
              <div className="flex gap-0.5 mt-2 items-end h-6">
                {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-sm"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Glowing orbs */}
            <div
              className="absolute top-12 left-12 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-xl opacity-60 animate-float"
              style={{ transform: 'translateZ(40px)' }}
            />
            <div
              className="absolute bottom-20 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-2xl opacity-50 animate-float-delay"
              style={{ transform: 'translateZ(80px)' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="text-xs text-gray-500 uppercase tracking-widest">Scroll</div>
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-cyan-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
