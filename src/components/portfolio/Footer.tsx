import React, { useState } from "react";
import { Code2, Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    try {
      await fetch(
        "https://famous.ai/api/crm/69f42ec4345e093cafb5d5ce/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            source: "footer-signup",
            tags: ["newsletter", "portfolio"],
          }),
        },
      );
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch {}
  };

  const cols = [
    {
      title: "Navigate",
      links: [
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "#blog" },

        { label: "Resume / CV", href: "#" },
        { label: "Speaking", href: "#" },
        { label: "Open Source", href: "#" },
      ],
    },
    // {
    //   title: "Services",
    //   links: [
    //     { label: "Web Development", href: "#" },
    //     { label: "DevOps Consulting", href: "#" },
    //     { label: "Cloud Architecture", href: "#" },
    //     { label: "Code Audits", href: "#" },
    //   ],
    // },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/10 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                khim<span className="text-cyan-400">.</span>chhetri
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Full Stack + DevOps engineer building scalable web products. From
              pixels in the browser to pods in the cluster.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-cyan-500/50"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>

            <div className="flex gap-2 pt-2">
              {[
                { Icon: Github, href: "https://github.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Mail, href: "mailto:hello@example.com" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-gray-400 hover:text-cyan-300 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1 flex lg:justify-end">
            <button
              onClick={scrollTop}
              className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} khim.chhetri — Built with React, Vite &
            ❤
          </div>
          <div className="flex gap-5 text-xs text-gray-500">
            <a href="#" className="hover:text-cyan-300">
              Privacy
            </a>
            <a href="#" className="hover:text-cyan-300">
              Terms
            </a>
            <a href="#" className="hover:text-cyan-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
