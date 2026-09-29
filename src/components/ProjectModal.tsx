import React, { useState } from 'react';
import {
  X,
  Github,
  Activity,
  Layers,
  CheckCircle2,
  Cpu,
  Radio,
  Sliders,
  ExternalLink,
  Code,
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // State for interactive simulator in EnerGuard
  const [loadCurrent, setLoadCurrent] = useState(14.8);
  const [gridVoltage, setGridVoltage] = useState(230);
  const [powerFactor, setPowerFactor] = useState(0.93);

  // Computed power metrics
  const activePower = (gridVoltage * loadCurrent * powerFactor).toFixed(1);
  const apparentPower = (gridVoltage * loadCurrent).toFixed(1);
  const reactivePower = Math.sqrt(
    Math.max(0, Math.pow(Number(apparentPower), 2) - Math.pow(Number(activePower), 2))
  ).toFixed(1);

  // State for FloodGuard simulation
  const [floodRainfall, setFloodRainfall] = useState<'moderate' | 'heavy' | 'torrential'>('heavy');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-xl border border-border bg-card p-6 md:p-8 shadow-2xl panel-glow my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pr-8">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] text-signal">
              PROJECT_{project.index} // ARCHITECTURE DEEP DIVE
            </span>
            <h2 className="mt-1 font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {project.name}
            </h2>
            <p className="text-sm text-signal-dim">{project.subtitle}</p>
          </div>
          <span className="rounded border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[11px] tracking-widest text-signal">
            {project.status}
          </span>
        </div>

        {/* Overview */}
        <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>{project.details?.overview || project.description}</p>
        </div>

        {/* Interactive Architecture Sandbox */}
        <div className="mt-6 rounded-lg border border-border/80 bg-background/80 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-signal uppercase">
              <Activity className="h-4 w-4" />
              Interactive Simulation / Live Spec
            </span>
            <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
              v1.0.4-dev
            </span>
          </div>

          {project.index === '01' ? (
            /* EnerGuard Telemetry Simulator */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-md border border-border bg-card p-3">
                  <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                    Line Voltage (V)
                  </label>
                  <input
                    type="range"
                    min="210"
                    max="250"
                    step="1"
                    value={gridVoltage}
                    onChange={(e) => setGridVoltage(Number(e.target.value))}
                    className="w-full accent-signal cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-xs mt-1">
                    <span>{gridVoltage} V</span>
                    <span className="text-signal">RMS</span>
                  </div>
                </div>

                <div className="rounded-md border border-border bg-card p-3">
                  <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                    Load Current (A)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="32"
                    step="0.1"
                    value={loadCurrent}
                    onChange={(e) => setLoadCurrent(Number(e.target.value))}
                    className="w-full accent-signal cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-xs mt-1">
                    <span>{loadCurrent.toFixed(1)} A</span>
                    <span className="text-signal">CT Sensor</span>
                  </div>
                </div>

                <div className="rounded-md border border-border bg-card p-3">
                  <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                    Power Factor (cos φ)
                  </label>
                  <input
                    type="range"
                    min="0.6"
                    max="1.0"
                    step="0.01"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(Number(e.target.value))}
                    className="w-full accent-signal cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-xs mt-1">
                    <span>{powerFactor.toFixed(2)}</span>
                    <span className={powerFactor < 0.85 ? 'text-amber-400' : 'text-signal'}>
                      {powerFactor < 0.85 ? 'Penalty' : 'Optimal'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Calculated Readouts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="rounded bg-secondary/60 p-2.5 text-center">
                  <span className="text-[10px] font-mono text-muted-foreground block">ACTIVE POWER</span>
                  <span className="font-mono text-sm font-bold text-signal">{activePower} W</span>
                </div>
                <div className="rounded bg-secondary/60 p-2.5 text-center">
                  <span className="text-[10px] font-mono text-muted-foreground block">APPARENT POWER</span>
                  <span className="font-mono text-sm font-bold text-foreground">{apparentPower} VA</span>
                </div>
                <div className="rounded bg-secondary/60 p-2.5 text-center">
                  <span className="text-[10px] font-mono text-muted-foreground block">REACTIVE POWER</span>
                  <span className="font-mono text-sm font-bold text-foreground">{reactivePower} VAR</span>
                </div>
                <div className="rounded bg-secondary/60 p-2.5 text-center">
                  <span className="text-[10px] font-mono text-muted-foreground block">MQTT BUS</span>
                  <span className="font-mono text-xs font-bold text-signal flex items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal animate-ping" />
                    STREAMING
                  </span>
                </div>
              </div>

              {/* Telemetry Payload Code View */}
              <div className="rounded bg-black/50 p-3 font-mono text-[11px] text-zinc-300 overflow-x-auto border border-border/50">
                <span className="text-zinc-500">// MQTT Topic: industrial/factory_line_01/telemetry</span>
                <pre>{JSON.stringify(
                  {
                    device_id: 'ESP32_ENERG_09',
                    timestamp_ms: Date.now(),
                    metrics: {
                      voltage_rms: gridVoltage,
                      current_rms: loadCurrent,
                      power_factor: powerFactor,
                      active_power_watts: Number(activePower),
                      status: powerFactor < 0.85 ? 'WARNING_LOW_PF' : 'NOMINAL',
                    },
                  },
                  null,
                  2
                )}</pre>
              </div>
            </div>
          ) : project.index === '02' ? (
            /* FloodGuard AI Simulation Sandbox */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">Rainfall Scenario:</span>
                {(['moderate', 'heavy', 'torrential'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setFloodRainfall(level)}
                    className={`px-3 py-1 rounded font-mono text-xs capitalize transition-colors ${
                      floodRainfall === level
                        ? 'bg-signal text-background font-semibold'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-black/40 p-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-border/50 text-[11px] text-muted-foreground">
                  <span>A* Dynamic Routing Dispatch</span>
                  <span className="text-signal">Cost Matrix Updated</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Route Alpha (Highway 14):</span>
                    <span className={floodRainfall === 'torrential' ? 'text-red-400' : 'text-signal'}>
                      {floodRainfall === 'torrential' ? 'SUBMERGED (Weight: ∞)' : 'PASSABLE (ETA 12m)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Route Beta (Ridge Way):</span>
                    <span className="text-signal">SAFE ELEVATION (ETA 18m)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Target Shelter Capacity:</span>
                    <span className="text-foreground">86% Available (Gabès North Zone)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* IntellDev Workflow Architecture */
            <div className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="rounded border border-border bg-card p-3">
                  <span className="text-signal block font-semibold mb-1">01. Ingestion</span>
                  <p className="text-muted-foreground text-[11px]">
                    Webhooks &amp; form triggers captured via Zapier / Power Automate.
                  </p>
                </div>
                <div className="rounded border border-border bg-card p-3">
                  <span className="text-signal block font-semibold mb-1">02. AI Processing</span>
                  <p className="text-muted-foreground text-[11px]">
                    Structured extraction &amp; document summarization with Claude Code &amp; GenAI.
                  </p>
                </div>
                <div className="rounded border border-border bg-card p-3">
                  <span className="text-signal block font-semibold mb-1">03. Client Delivery</span>
                  <p className="text-muted-foreground text-[11px]">
                    Automated updates sent to CRM, dashboards and direct customer notification feeds.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* System Architecture List */}
        <div className="mt-6">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            <Layers className="h-4 w-4 text-signal" />
            Full System Architecture Pipeline
          </p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {project.architecture.map((step, idx) => (
              <div
                key={step.label}
                className="flex items-start gap-2.5 rounded-lg border border-border/70 bg-card/60 p-3 text-xs"
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-signal/30 bg-signal/10 font-mono text-[10px] font-bold text-signal">
                  {idx + 1}
                </span>
                <div>
                  <span className="font-mono font-semibold text-signal uppercase tracking-wide">
                    {step.label}
                  </span>
                  <p className="text-muted-foreground mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware & Tech Highlights */}
        {project.details?.hardwareOrTech && (
          <div className="mt-6">
            <p className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
              Key Components &amp; Libraries
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.details.hardwareOrTech.map((item) => (
                <span
                  key={item}
                  className="rounded border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-foreground/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:shadow-[0_0_20px_oklch(0.85_0.2_150/40%)] transition-all"
          >
            <Github className="h-4 w-4" />
            Open Repository on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={onClose}
            className="rounded-md border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
