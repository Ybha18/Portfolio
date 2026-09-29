import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Music2,
  Calendar,
  Building,
  Sparkles,
  Award,
  Compass,
} from 'lucide-react';
import { TIMELINE, TimelineItem } from '../data/portfolioData';
import { Reveal } from './Reveal';

const CATEGORY_CONFIG = {
  internship: {
    icon: Award,
    label: 'ENGINEERING INTERNSHIP',
    color: 'text-signal border-signal/50 bg-signal/15 shadow-[0_0_15px_oklch(75%_0.22_225/25%)]',
  },
  experience: {
    icon: Briefcase,
    label: 'PROFESSIONAL EXPERIENCE',
    color: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_10px_rgba(34,211,238,0.15)]',
  },
  education: {
    icon: GraduationCap,
    label: 'EDUCATION',
    color: 'text-sky-300 border-sky-300/40 bg-sky-300/10 shadow-[0_0_10px_rgba(125,211,252,0.15)]',
  },
  leadership: {
    icon: Sparkles,
    label: 'LEADERSHIP & ACTIVITIES',
    color: 'text-indigo-300 border-indigo-300/40 bg-indigo-300/10 shadow-[0_0_10px_rgba(165,180,252,0.15)]',
  },
};

export const TrackRecord: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'internship' | 'experience' | 'education' | 'leadership'>('all');

  const filteredItems = activeFilter === 'all'
    ? TIMELINE
    : TIMELINE.filter((item) => item.category === activeFilter);

  return (
    <section id="experience" className="relative scroll-mt-20 border-b border-border/50">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal">
                // Internships · Experience · Education · Leadership
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                The track record
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-card rounded-lg border border-border">
              {[
                { id: 'all', label: 'All' },
                { id: 'internship', label: 'Internships (2026)' },
                { id: 'experience', label: 'Work Experience' },
                { id: 'education', label: 'Education' },
                { id: 'leadership', label: 'Leadership' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id as any)}
                  className={`px-3 py-1 font-mono text-xs rounded transition-all ${
                    activeFilter === id
                      ? 'bg-signal text-background font-semibold shadow-[0_0_12px_oklch(75%_0.22_225/30%)]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Timeline Stream */}
        <Reveal delay={100}>
          <div className="relative mt-12">
            {/* Vertical spine line */}
            <span
              className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:left-[19px]"
              aria-hidden="true"
            />

            <div className="space-y-6">
              {filteredItems.map((item: TimelineItem, idx: number) => {
                const config = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.experience;
                const CategoryIcon = config.icon;

                return (
                  <div
                    key={`${item.title}-${item.org}-${idx}`}
                    className="relative pl-10 md:pl-14 group"
                  >
                    {/* Node Dot on the timeline spine with electric pulse */}
                    <span className="absolute left-[7px] top-2 inline-flex h-4 w-4 items-center justify-center rounded-full border border-signal/50 bg-background md:left-[11px] group-hover:border-signal group-hover:scale-110 transition-all">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal group-hover:scale-125 transition-transform" />
                    </span>

                    {/* Timeline Item Card */}
                    <div className="rounded-xl border border-border bg-card p-5 transition-all hover:border-signal/50 hover:panel-glow md:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[10px] tracking-widest ${config.color}`}
                        >
                          <CategoryIcon className="h-3 w-3" />
                          {config.label}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-signal" />
                          {item.period}
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-semibold text-foreground text-base md:text-lg group-hover:text-signal transition-colors flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="rounded bg-signal/10 border border-signal/30 px-2 py-0.5 font-mono text-[9px] text-signal font-bold">
                            {item.badge}
                          </span>
                        )}
                      </h3>

                      <p className="mt-0.5 text-sm text-signal-dim font-medium flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 opacity-70" />
                        {item.org}
                      </p>

                      <ul className="mt-3.5 space-y-2">
                        {item.points.map((pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground leading-normal"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal/80" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
