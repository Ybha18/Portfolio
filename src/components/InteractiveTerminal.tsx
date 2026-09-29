import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { PROFILE, PROJECTS, SKILL_GROUPS, TIMELINE, AGENCY_INTELLDEV } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCv: () => void;
}

interface CommandHistory {
  cmd: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenCv,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      cmd: 'init',
      output: (
        <div className="text-muted-foreground space-y-1">
          <p className="text-signal font-semibold">
            YBHA.ino // CYBER-CRAFT EMBEDDED SYSTEM SHELL [v2.5.0]
          </p>
          <p>Logged in as guest@YBHA.ino. Architecture: ESP32 / FreeRTOS / Linux bus.</p>
          <p>
            Type <span className="text-signal font-bold">help</span> to list available
            commands or click chips below.
          </p>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMatrixActive]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-signal font-semibold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              <div>
                <span className="text-signal font-bold">whoami / about</span> - Bio, ENIG '29 &amp; agency
              </div>
              <div>
                <span className="text-signal font-bold">projects</span> - View engineering builds
              </div>
              <div>
                <span className="text-signal font-bold">project [1|2]</span> - EnerGuard or FloodGuard AI
              </div>
              <div>
                <span className="text-signal font-bold">agency / intelldev</span> - IntellDev Agency overview
              </div>
              <div>
                <span className="text-signal font-bold">skills</span> - Domain matrix readout
              </div>
              <div>
                <span className="text-signal font-bold">experience</span> - Timeline &amp; internships
              </div>
              <div>
                <span className="text-signal font-bold">telemetry</span> - Live ESP32 MQTT simulation
              </div>
              <div>
                <span className="text-signal font-bold">contact</span> - Email, phone, github, linkedin
              </div>
              <div>
                <span className="text-signal font-bold">cv / resume</span> - Launch CV viewer
              </div>
              <div>
                <span className="text-signal font-bold">clear</span> - Clear terminal buffer
              </div>
            </div>
          </div>
        );
        break;

      case 'whoami':
      case 'about':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-signal font-bold text-sm">{PROFILE.name} ({PROFILE.callsign})</p>
            <p className="text-foreground">{PROFILE.role}</p>
            <p className="text-muted-foreground">{PROFILE.school} (Class of {PROFILE.graduation})</p>
            <p className="text-signal-dim font-medium">Founder of {AGENCY_INTELLDEV.name} ({AGENCY_INTELLDEV.type})</p>
            <p className="pt-1">{PROFILE.tagline}</p>
            <p className="text-signal font-mono text-[11px]">Location: {PROFILE.location} // Status: Available for Engineering Internships</p>
          </div>
        );
        break;

      case 'agency':
      case 'intelldev':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-signal font-bold text-sm">
              {AGENCY_INTELLDEV.name} — {AGENCY_INTELLDEV.type}
            </p>
            <p className="text-zinc-300">{AGENCY_INTELLDEV.description}</p>
            <p className="text-signal text-[11px] font-mono">
              Website: <a href={AGENCY_INTELLDEV.website} target="_blank" rel="noreferrer" className="underline font-bold text-signal">{AGENCY_INTELLDEV.website}</a>
            </p>
            <div className="space-y-1.5 pt-1">
              {AGENCY_INTELLDEV.services.map((s, i) => (
                <div key={s.title} className="bg-secondary/40 p-2 rounded border border-border/50">
                  <p className="text-signal font-semibold">0{i + 1}. {s.title}</p>
                  <p className="text-muted-foreground text-[11px]">{s.description}</p>
                  <p className="text-zinc-500 font-mono text-[10px] mt-0.5">Stack: {s.tools.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-signal font-semibold">Selected Engineering Projects:</p>
            {PROJECTS.map((p) => (
              <div key={p.name} className="border-l-2 border-signal/60 pl-2">
                <p className="font-bold text-foreground">
                  [{p.index}] {p.name} - <span className="text-signal font-normal">{p.subtitle}</span>
                </p>
                <p className="text-muted-foreground text-[11px]">{p.description}</p>
                <p className="text-zinc-500 font-mono text-[10px]">Stack: {p.stack.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'project': {
        const num = arg || '1';
        const found = PROJECTS.find((p) => p.index === num || p.index === `0${num}` || p.name.toLowerCase().includes(num));
        if (found) {
          output = (
            <div className="space-y-1.5 text-xs">
              <p className="text-signal font-bold text-sm">
                PROJECT_{found.index}: {found.name} ({found.subtitle})
              </p>
              <p className="text-zinc-300">{found.description}</p>
              <div className="mt-2 space-y-1 bg-black/40 p-2.5 rounded border border-signal/20">
                <p className="text-signal text-[11px] font-semibold">// System Architecture Pipeline:</p>
                {found.architecture.map((a, i) => (
                  <p key={a.label} className="text-[11px]">
                    <span className="text-signal">{i + 1}. {a.label}:</span>{' '}
                    <span className="text-muted-foreground">{a.detail}</span>
                  </p>
                ))}
              </div>
              <p className="text-[11px] text-zinc-400">
                GitHub: <a href={found.repo} target="_blank" rel="noreferrer" className="text-signal underline">{found.repo}</a>
              </p>
            </div>
          );
        } else {
          output = <p className="text-amber-400 text-xs">Project not found. Usage: project 1 (EnerGuard) or project 2 (FloodGuard AI).</p>;
        }
        break;
      }

      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-signal font-semibold">Technical Skills Matrix:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SKILL_GROUPS.map((g) => (
                <div key={g.code} className="bg-secondary/40 p-2 rounded border border-border/40">
                  <p className="font-bold text-foreground">
                    {g.code} // {g.title}
                  </p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">
                    {g.skills.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-signal font-semibold">Track Record Highlights:</p>
            {TIMELINE.slice(0, 5).map((t, idx) => (
              <div key={idx} className="border-l border-signal/40 pl-2">
                <span className="text-signal font-mono text-[10px]">{t.period}</span>
                <p className="font-semibold text-foreground">{t.title} - <span className="text-signal-dim font-normal">{t.org}</span></p>
                <p className="text-muted-foreground text-[11px]">{t.points[0]}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'telemetry':
        output = (
          <div className="bg-black/60 p-3 rounded font-mono text-xs text-signal border border-signal/30 space-y-1">
            <p className="text-zinc-400">// Ingesting ESP32 Telemetry via MQTT Mosquitto Bus [230.2V RMS, 50Hz, 14.85A]</p>
            <p className="text-zinc-300">
              {JSON.stringify(
                {
                  device: 'ESP32_ENERG_09',
                  protocol: 'MQTT_MOSQUITTO_QOS1',
                  metrics: {
                    v_rms: 230.2,
                    i_rms: 14.85,
                    power_factor: 0.94,
                    active_power_w: 3213.9,
                    frequency_hz: 50.01,
                    status: 'ALL_SYSTEMS_NOMINAL',
                  },
                },
                null,
                2
              )}
            </p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-signal font-semibold">Direct Communication Channels:</p>
            <p>• Email: <a href={`mailto:${PROFILE.email}`} className="text-signal underline">{PROFILE.email}</a></p>
            <p>• Phone: <span className="text-foreground">{PROFILE.phone}</span></p>
            <p>• GitHub: <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-signal underline">{PROFILE.github}</a></p>
            <p>• LinkedIn: <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-signal underline">{PROFILE.linkedin}</a></p>
          </div>
        );
        break;

      case 'cv':
      case 'resume':
        onOpenCv();
        output = (
          <p className="text-signal text-xs">
            Opening CV viewer modal. You can also download it from the top button.
          </p>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-red-400 text-xs">
            Command not recognized: "{mainCmd}". Type <span className="underline font-bold">help</span> to view available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx = historyIndex + 1 < commandList.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputVal(commandList[commandList.length - 1 - nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-[70vh] flex flex-col rounded-xl border border-signal/40 bg-[#0d1624]/95 shadow-2xl overflow-hidden panel-glow">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-border/80">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-cyan-400/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-signal font-semibold flex items-center gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5" />
              ybha@YBHA.ino: ~ (firmware-cli)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-signal">
                <span className="text-muted-foreground">ybha@YBHA.ino:~$</span>
                <span className="font-semibold text-foreground">{item.cmd}</span>
              </div>
              <div className="pl-4 text-zinc-300">{item.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-1.5 bg-black/40 border-t border-border/40 flex flex-wrap gap-1.5">
          {['help', 'whoami', 'projects', 'agency', 'skills', 'telemetry', 'contact', 'cv', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-secondary/60 hover:bg-signal/20 text-[10px] font-mono text-signal transition-colors border border-border/50"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Command Input Field */}
        <div className="p-3 bg-black/70 border-t border-border/70 flex items-center gap-2 font-mono text-xs">
          <span className="text-signal font-bold">ybha@YBHA.ino:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command (e.g. 'agency', 'projects', 'whoami', 'help')..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1 text-signal hover:text-foreground transition-colors"
            title="Execute command"
          >
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
