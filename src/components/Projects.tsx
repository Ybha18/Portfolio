import React from 'react';
import {
  Github,
  ArrowRight,
  Layers,
  ArrowUpFromLine,
  SlidersHorizontal,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';
import { Reveal } from './Reveal';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="relative scroll-mt-20 border-b border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal">
              // Selected Engineering Projects
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Flagship technical builds
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Core systems engineered from physical signal acquisition and embedded firmware
              to distributed processing and interactive user interfaces.
            </p>
          </div>
        </Reveal>

        {/* Project Cards Grid (2 Engineering Flagships) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {PROJECTS.map((project, idx) => (
            <Reveal key={project.name} delay={idx * 140} className="flex">
              <article className="group relative flex flex-col w-full rounded-xl border border-border bg-card p-6 md:p-8 transition-all hover:border-signal/50 hover:panel-glow">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs tracking-[0.25em] text-signal font-semibold">
                      PROJECT_{project.index} // ENGINEERING
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground group-hover:text-signal transition-colors">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="shrink-0 rounded border border-signal/40 bg-signal/10 px-2.5 py-1 font-mono text-[10px] tracking-widest text-signal font-bold shadow-[0_0_10px_oklch(75%_0.22_225/25%)]">
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* System Architecture Box */}
                <div className="mt-6 rounded-lg border border-border/70 bg-background/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      <Layers className="h-3 w-3 text-signal" />
                      System Architecture
                    </p>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-signal hover:underline transition-all"
                      title="Open interactive inspector"
                    >
                      <SlidersHorizontal className="h-2.5 w-2.5" />
                      Interactive Telemetry &amp; Specs →
                    </button>
                  </div>

                  <ol className="mt-3 space-y-2.5">
                    {project.architecture.map((step, sIdx) => (
                      <li key={step.label} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-signal/30 bg-signal/10 font-mono text-[10px] font-semibold text-signal">
                          {sIdx + 1}
                        </span>
                        <div>
                          <span className="font-mono text-xs font-semibold tracking-wide text-signal">
                            {step.label.toUpperCase()}
                          </span>
                          <span className="text-muted-foreground"> — {step.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Stack Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-border bg-secondary px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-signal hover:border-signal/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Spacer */}
                <div className="mt-6 flex-1" />

                {/* Bottom Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all group-hover:border-signal/60 group-hover:text-signal hover:bg-card"
                  >
                    <Github className="h-4 w-4" />
                    View Repository
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-signal/30 bg-signal/10 px-3.5 py-2 text-xs font-mono font-medium text-signal hover:bg-signal/20 transition-all shadow-[0_0_12px_oklch(75%_0.22_225/15%)]"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Run Simulation</span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* More on GitHub */}
        <Reveal>
          <a
            href="https://github.com/Ybha18"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-signal transition-opacity hover:opacity-80"
          >
            <ArrowUpFromLine className="h-4 w-4" />
            More on github.com/Ybha18
          </a>
        </Reveal>
      </div>
    </section>
  );
};
