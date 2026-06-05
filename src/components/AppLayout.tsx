import React, { useEffect, useState } from 'react';
import Navbar from './portfolio/Navbar';
import Hero from './portfolio/Hero';
import About from './portfolio/About';
import Skills from './portfolio/Skills';
import Projects from './portfolio/Projects';
import DevOps from './portfolio/DevOps';
import Timeline from './portfolio/Timeline';
import Blog from './portfolio/Blog';
import Contact from './portfolio/Contact';
import Footer from './portfolio/Footer';


const AppLayout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY, visible: true });
    const leave = () => setCursor((c) => ({ ...c, visible: false }));
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0B0F19] flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-indigo-500 blur-3xl opacity-50 animate-pulse" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-indigo-500/50">
            <svg className="w-10 h-10 text-white animate-spin" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs text-gray-500 uppercase tracking-[0.3em] whitespace-nowrap">
            Loading workspace
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white antialiased overflow-x-hidden">
      {/* Custom cursor glow */}
      <div
        className="pointer-events-none fixed w-72 h-72 rounded-full opacity-20 blur-3xl z-0 transition-opacity duration-300"
        style={{
          left: cursor.x - 144,
          top: cursor.y - 144,
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
          opacity: cursor.visible ? 0.15 : 0,
        }}
      />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <DevOps />
        <Timeline />
        <Blog />
        <Contact />

      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
