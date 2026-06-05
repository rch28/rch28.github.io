import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Github, Linkedin } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    // { label: 'DevOps', href: '#devops' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => handleClick('#hero')}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-50 group-hover:opacity-80 transition" />
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            khim<span className="text-cyan-400">.</span>chhetri
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={() => handleClick('#contact')}
            className="px-5 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            Hire Me
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mt-3 mx-4 rounded-2xl bg-[#0B0F19]/95 backdrop-blur-xl border border-white/10 p-4 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="px-4 py-3 text-left text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleClick('#contact')}
            className="mt-2 px-5 py-3 font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white"
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
