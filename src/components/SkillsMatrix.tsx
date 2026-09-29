import React from 'react';
import {
  Cpu,
  Factory,
  Terminal,
  BrainCircuit,
  BadgeCheck,
  Globe2,
  ExternalLink,
  Wrench,
  Compass,
} from 'lucide-react';
import {
  SKILL_GROUPS,
  LANGUAGES,
  CERTIFICATIONS,
  INTERESTS,
  SkillGroup,
} from '../data/portfolioData';
import { Reveal } from './Reveal';

const ICON_MAP = {
  cpu: Cpu,
  factory: Factory,
  terminal: Terminal,
  brain: BrainCircuit,
  wrench: Wrench,
};

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="relative scroll-mt-20 border-b border-border/50">
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal">
              // Technical Skills Matrix
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Capability by domain
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl">
              Verified proficiencies from academic engineering at ENIG, embedded systems
              development, and IntellDev agency client deliveries.
            </p>
          </div>
        </Reveal>

        {/* Skill Groups Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group: SkillGroup, idx: number) => {
            const Icon = ICON_MAP[group.icon] ?? Cpu;
            return (
              <Reveal key={group.code} delay={idx * 80}>
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-all hover:border-signal/50 hover:panel-glow">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-signal/30 bg-signal/10 text-signal shadow-[0_0_12px_oklch(75%_0.22_225/20%)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-bold tracking-tight text-foreground">
                        {group.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-signal/80 bg-secondary px-2 py-0.5 rounded border border-border/60">
                      {group.code}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-foreground/90 transition-all hover:border-signal/50 hover:text-signal"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Engineering Interests Bar */}
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-border bg-card/60 px-6 py-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              <Compass className="h-3.5 w-3.5 text-signal" />
              ENGINEERING INTERESTS
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {INTERESTS.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-border/80 bg-secondary/50 px-3 py-0.5 font-mono text-xs text-foreground/90"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Languages Banner */}
        <Reveal>
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-border bg-card/60 px-6 py-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              <Globe2 className="h-3.5 w-3.5 text-signal" />
              LANGUAGES
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {LANGUAGES.map((lang) => (
                <span key={lang.name} className="text-sm text-foreground/90 font-medium">
                  {lang.name}{' '}
                  <span className="font-mono text-xs text-signal ml-1 bg-signal/10 px-1.5 py-0.5 rounded border border-signal/25">
                    {lang.level}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Certifications Banner */}
        <Reveal delay={80}>
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-border bg-card/60 px-6 py-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              <BadgeCheck className="h-3.5 w-3.5 text-signal" />
              CERTIFICATIONS
            </span>
            <div className="flex flex-wrap items-center gap-4">
              {CERTIFICATIONS.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-signal"
                >
                  <BadgeCheck className="h-4 w-4 text-signal group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{cert.name}</span>
                  <span className="font-mono text-xs text-signal bg-signal/10 px-1.5 py-0.5 rounded">
                    {cert.issuer} · {cert.date}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-signal opacity-70" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
