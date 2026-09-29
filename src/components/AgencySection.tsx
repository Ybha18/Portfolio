import React from 'react';
import {
  Sparkles,
  Megaphone,
  Code2,
  Workflow,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Bot,
  BarChart3,
  Globe,
} from 'lucide-react';
import { AGENCY_INTELLDEV } from '../data/portfolioData';
import { Reveal } from './Reveal';

const ICON_MAP = [Code2, Megaphone, Workflow];

export const AgencySection: React.FC = () => {
  return (
    <section id="agency" className="relative scroll-mt-20 border-b border-border/50 py-20 md:py-28 overflow-hidden">
      {/* Background electric grid & radial gradient */}
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, oklch(75% 0.22 225 / 7%), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                // Dev &amp; Marketing Agency · Founded 2026
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                IntellDev Agency
              </h2>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                {AGENCY_INTELLDEV.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={AGENCY_INTELLDEV.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-signal/40 bg-card px-4 py-2 font-mono text-xs text-signal font-semibold tracking-wide flex items-center gap-2 hover:bg-signal/15 hover:border-signal transition-all shadow-[0_0_15px_oklch(75%_0.22_225/20%)]"
              >
                <Globe className="h-3.5 w-3.5" />
                intelldev.tn
                <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
              </a>

              <span className="rounded-full border border-signal/40 bg-signal/10 px-3.5 py-1.5 font-mono text-xs text-signal font-semibold tracking-wide flex items-center gap-2">
                <span className="signal-dot h-2 w-2 rounded-full bg-signal" />
                FOUNDER &amp; LEAD
              </span>
            </div>
          </div>
        </Reveal>

        {/* Agency Pillars Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {AGENCY_INTELLDEV.services.map((service, idx) => {
            const Icon = ICON_MAP[idx] || Globe;
            return (
              <Reveal key={service.title} delay={idx * 120} className="flex">
                <div className="group relative flex flex-col w-full rounded-xl border border-border bg-card p-6 md:p-7 transition-all hover:border-signal/50 hover:panel-glow">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-signal/30 bg-signal/10 text-signal group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground tracking-widest bg-secondary px-2 py-0.5 rounded border border-border">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-foreground group-hover:text-signal transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-border/50">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-signal/80 block mb-2">
                      Core Stack &amp; Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded border border-border bg-secondary/80 px-2.5 py-1 font-mono text-[11px] text-foreground/90 group-hover:border-signal/30"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Key Agency Deliverables Banner */}
        <Reveal delay={200}>
          <div className="mt-10 rounded-xl border border-signal/30 bg-card/80 p-6 md:p-8 panel-glow">
            <div className="grid gap-6 md:grid-cols-3">
              {AGENCY_INTELLDEV.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/10 text-signal border border-signal/30">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {pt}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-signal font-semibold">
                  INTELLDEV AGENCY
                </span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs font-mono">
                  Tunisia · Remote &amp; Global Client Delivery
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={AGENCY_INTELLDEV.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-signal/40 bg-card px-4 py-2 font-mono text-xs font-semibold text-signal hover:bg-signal/15 transition-all shadow-[0_0_12px_oklch(75%_0.22_225/20%)]"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Visit intelldev.tn
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-semibold text-background hover:bg-signal-dim transition-all hover:scale-[1.02]"
                >
                  Inquire for Development &amp; Marketing
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
