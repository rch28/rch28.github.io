import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Loader2, Check } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.length < 10) e.message = 'At least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      await fetch('https://famous.ai/api/crm/69f42ec4345e093cafb5d5ce/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          source: 'contact-form',
          tags: ['portfolio', 'contact'],
          notes: form.message,
        }),
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com', color: 'hover:text-white' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-cyan-400' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@example.com', color: 'hover:text-pink-400' },
  ];

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs text-cyan-300 font-medium mb-4">
            GET IN TOUCH
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's build{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              something great
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind, looking for a senior engineer, or just want to say hi?
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Info card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-cyan-900/30 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Email</div>
                  <div className="text-white font-semibold">hello@devstack.io</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Location</div>
                  <div className="text-white font-semibold">Remote / Worldwide</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">
                Connect
              </div>
              <div className="grid grid-cols-2 gap-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] text-gray-400 transition-all hover:border-white/30 ${s.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </div>
                <span className="text-sm text-emerald-300 font-medium">Available now</span>
              </div>
              <p className="text-xs text-gray-500">
                Currently accepting new contracts and full-time roles. Typical reply within 24h.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                    errors.name ? 'border-red-500/50' : 'border-white/10'
                  } text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                    errors.email ? 'border-red-500/50' : 'border-white/10'
                  } text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all`}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                placeholder="Tell me about your project, timeline, and budget..."
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                  errors.message ? 'border-red-500/50' : 'border-white/10'
                } text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all resize-none`}
              />
              {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-xs text-gray-500">
                Your details are kept private. I'll get back within 24 hours.
              </p>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 transition-all"
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'success' && <Check className="w-4 h-4" />}
                {(status === 'idle' || status === 'error') && <Send className="w-4 h-4" />}
                {status === 'loading'
                  ? 'Sending...'
                  : status === 'success'
                  ? 'Message Sent!'
                  : status === 'error'
                  ? 'Try again'
                  : 'Send Message'}
              </button>
            </div>

            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-300">
                Thanks for reaching out! I'll be in touch shortly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
