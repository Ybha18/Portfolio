import React, { useState } from 'react';
import {
  Download,
  Github,
  Mail,
  Phone,
  MapPin,
  Cpu,
  Check,
  Copy,
  Zap,
  ArrowUpRight,
  Briefcase,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { Reveal } from './Reveal';

interface HeroProps {
  onOpenCvPreview: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvPreview }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  return (
    <header className="relative overflow-hidden border-b border-border/50">
      {/* Electric Grid Background */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      
      {/* Electric Blue Degradation Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 75% 30%, oklch(75% 0.22 225 / 16%), oklch(60% 0.24 240 / 8%), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          {/* Left Column: Info & CTAs */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-signal flex items-center">
                  <span>// Electrical &amp; Automation Engineering</span>
                  <span className="caret-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-signal" />
                </span>
                <span className="font-mono text-xs font-bold text-signal bg-signal/15 px-2 py-0.5 rounded border border-signal/30 shadow-[0_0_12px_oklch(75%_0.22_225/30%)]">
                  YBHA.ino
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                {PROFILE.name.toUpperCase()}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl leading-snug">
                Engineering student at{' '}
                <span className="text-foreground font-semibold">
                  {PROFILE.school}
                </span>
                , class of {PROFILE.graduation} ·{' '}
                <span className="text-signal font-semibold">
                  Founder of IntellDev
                </span>{' '}
                (Dev &amp; Marketing Agency).
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {PROFILE.tagline}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-6 flex flex-wrap gap-2">
                {PROFILE.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-card/70 px-3.5 py-1 font-mono text-xs text-muted-foreground transition-all hover:border-signal/50 hover:text-signal hover:shadow-[0_0_12px_oklch(75%_0.22_225/20%)]"
                  >
                    {item}
                  </span>
                ))}
                <span className="rounded-full border border-signal/40 bg-signal/10 px-3.5 py-1 font-mono text-xs text-signal font-medium">
                  Agency: IntellDev
                </span>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-xs font-medium tracking-wide text-signal shadow-[0_0_15px_oklch(75%_0.22_225/20%)]">
                  <span className="signal-dot h-2 w-2 rounded-full bg-signal" />
                  AVAILABLE FOR ENGINEERING INTERNSHIPS
                </span>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={PROFILE.cvUrl}
                  download="Yassine_Bel_Hadj_Ali_CV.pdf"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_oklch(75%_0.22_225/60%)] hover:scale-[1.02]"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-signal/60 hover:text-signal hover:shadow-[0_0_15px_oklch(75%_0.22_225/20%)]"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </a>

                <div className="relative group">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-signal/60 hover:text-signal"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                  <button
                    onClick={(e) => copyToClipboard(PROFILE.email, 'email', e)}
                    title="Copy email address"
                    className="absolute -top-2 -right-2 p-1 bg-secondary rounded-full border border-border text-muted-foreground hover:text-signal transition-colors shadow-sm"
                  >
                    {copiedKey === 'email' ? (
                      <Check className="h-3 w-3 text-signal" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>

                <div className="relative group">
                  <a
                    href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-signal/60 hover:text-signal"
                  >
                    <Phone className="h-4 w-4" />
                    {PROFILE.phone}
                  </a>
                  <button
                    onClick={(e) => copyToClipboard(PROFILE.phone, 'phone', e)}
                    title="Copy phone number"
                    className="absolute -top-2 -right-2 p-1 bg-secondary rounded-full border border-border text-muted-foreground hover:text-signal transition-colors shadow-sm"
                  >
                    {copiedKey === 'phone' ? (
                      <Check className="h-3 w-3 text-signal" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              {copiedKey && (
                <p className="mt-2 font-mono text-xs text-signal flex items-center gap-1.5 animate-in fade-in duration-200">
                  <Check className="h-3.5 w-3.5" />
                  Copied {copiedKey === 'email' ? 'email' : 'phone number'} to clipboard!
                </p>
              )}
            </Reveal>

            <Reveal delay={440}>
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-signal" />
                {PROFILE.location} · Open to relocation for engineering internships
              </p>
            </Reveal>
          </div>

          {/* Right Column: Profile Picture with Electric Blue Degradation Halo */}
          <Reveal delay={200} className="justify-self-center">
            <div className="relative">
              {/* Outer soft electric blue degradation glow */}
              <div
                className="absolute -inset-7 rounded-full pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(circle, oklch(75% 0.22 225 / 25%), oklch(55% 0.24 240 / 10%), transparent 70%)',
                }}
              />

              {/* Glowing electric blue degradation gradient rim */}
              <div
                className="relative rounded-full p-1.5 panel-glow transition-transform hover:scale-[1.02] duration-300"
                style={{
                  background:
                    'linear-gradient(135deg, oklch(80% 0.22 220 / 95%), oklch(60% 0.24 240 / 70%), oklch(50% 0.2 260 / 40%))',
                  boxShadow: '0 0 35px -5px oklch(75% 0.22 225 / 50%)',
                }}
              >
                <img
                  src={PROFILE.photoUrl}
                  alt={PROFILE.name}
                  className="h-64 w-64 rounded-full border-4 border-background object-cover md:h-80 md:w-80 shadow-2xl"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%230b1322'/%3E%3Ccircle cx='100' cy='75' r='38' fill='%2338bdf8' fill-opacity='0.25' stroke='%2338bdf8' stroke-width='3'/%3E%3Cpath d='M40 175 c0-35 25-55 60-55 s60 20 60 55' fill='%2338bdf8' fill-opacity='0.15' stroke='%2338bdf8' stroke-width='2'/%3E%3Ctext x='100' y='82' font-family='monospace' font-size='22' font-weight='bold' fill='%2338bdf8' text-anchor='middle'%3EYBHA%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Floating Bottom Badge in Electric Blue */}
              <div className="absolute -bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-signal/40 bg-card px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-signal whitespace-nowrap shadow-[0_0_20px_oklch(75%_0.22_225/30%)] panel-glow">
                <Cpu className="h-3.5 w-3.5" />
                <span>YBHA.ino // ENIG '29</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
};
