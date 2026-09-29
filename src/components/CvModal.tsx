import React, { useState } from 'react';
import { X, Download, ExternalLink, FileText, Printer, Eye, LayoutTemplate } from 'lucide-react';
import { PROFILE, TIMELINE, SKILL_GROUPS, PROJECTS, CERTIFICATIONS, LANGUAGES } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'document'>('pdf');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-background/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-xl border border-border bg-card shadow-2xl overflow-hidden panel-glow">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-background/95">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-signal shrink-0" />
            <span className="font-mono text-xs font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
              Yassine_Bel_Hadj_Ali_CV.pdf
            </span>
            <span className="hidden md:inline-block rounded bg-signal/10 px-2 py-0.5 text-[10px] font-mono text-signal font-semibold">
              ENIG · 2026 CV
            </span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-secondary/80 p-0.5 rounded-lg border border-border">
            <button
              onClick={() => setViewMode('pdf')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                viewMode === 'pdf'
                  ? 'bg-signal text-background font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>PDF Embed</span>
            </button>
            <button
              onClick={() => setViewMode('document')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                viewMode === 'document'
                  ? 'bg-signal text-background font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutTemplate className="h-3.5 w-3.5" />
              <span>Document View</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print CV"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-foreground hover:border-signal/40 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href={PROFILE.cvUrl}
              download="Yassine_Bel_Hadj_Ali_CV.pdf"
              className="inline-flex items-center gap-1.5 rounded-md bg-signal text-background px-3 py-1.5 text-xs font-semibold hover:bg-signal-dim transition-all shadow-[0_0_10px_oklch(75%_0.22_225/25%)]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-foreground hover:border-signal/40 transition-colors"
              title="Open PDF in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Close CV viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full overflow-hidden relative bg-zinc-950">
          {viewMode === 'pdf' ? (
            <object
              data={PROFILE.cvUrl}
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <FileText className="h-12 w-12 text-signal mb-3" />
                <p className="text-foreground font-semibold mb-1">
                  PDF Preview in Browser
                </p>
                <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                  You can switch to the Document View tab or download the file directly.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => setViewMode('document')}
                    className="inline-flex items-center gap-2 rounded-md bg-secondary text-foreground px-4 py-2 font-mono text-xs font-semibold border border-border"
                  >
                    <LayoutTemplate className="h-4 w-4" />
                    Open Document View
                  </button>
                  <a
                    href={PROFILE.cvUrl}
                    download="Yassine_Bel_Hadj_Ali_CV.pdf"
                    className="inline-flex items-center gap-2 rounded-md bg-signal text-background px-4 py-2 font-mono text-xs font-semibold"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
              </div>
            </object>
          ) : (
            <div className="h-full overflow-y-auto p-4 sm:p-8 bg-zinc-900/60 font-sans flex justify-center">
              <div className="w-full max-w-3xl bg-white text-zinc-900 p-8 sm:p-12 shadow-2xl rounded-sm leading-relaxed text-sm">
                {/* Header */}
                <div className="text-center pb-5 border-b-2 border-zinc-900">
                  <h1 className="text-2xl font-bold tracking-tight uppercase text-zinc-950 font-display">
                    {PROFILE.name}
                  </h1>
                  <p className="text-xs text-zinc-700 mt-1 font-medium">
                    {PROFILE.role}
                  </p>
                  <p className="text-xs text-zinc-600 mt-1">
                    Tunis, Tunisia · {PROFILE.phone} ·{' '}
                    <a href={`mailto:${PROFILE.email}`} className="text-blue-700 hover:underline">
                      {PROFILE.email}
                    </a>
                  </p>
                </div>

                {/* Professional Summary */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 mb-2 font-mono">
                    Professional Summary
                  </h2>
                  <p className="text-xs text-zinc-700 leading-normal">
                    First-year Electrical and Automation Engineering student at École Nationale d’Ingénieurs de Gabès (ENIG) with hands-on experience in embedded systems, IoT architecture, automation, and applied AI. Proficient in C/C++, Python, ESP32 microcontrollers, MQTT messaging, FastAPI backend integration, and AI-assisted workflow automation. Proven track record in developing functional engineering prototypes, managing operations, and leading student initiatives.
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 mb-2 font-mono">
                    Technical Skills
                  </h2>
                  <ul className="text-xs text-zinc-700 space-y-1">
                    <li><strong className="text-zinc-900">Programming Languages:</strong> Python, C, C++</li>
                    <li><strong className="text-zinc-900">Embedded Systems &amp; IoT:</strong> ESP32, Arduino, Microcontroller Architecture, Sensors, MQTT, Mosquitto</li>
                    <li><strong className="text-zinc-900">Automation &amp; Web Backend:</strong> FastAPI, REST APIs, Web Development, Dashboards, Git, GitHub</li>
                    <li><strong className="text-zinc-900">AI &amp; Workflow Automation:</strong> Generative AI, AI-assisted Development, Power Automate, Zapier, Claude Code</li>
                    <li><strong className="text-zinc-900">Engineering &amp; Systems:</strong> Electrical Systems, Electronics, Automation &amp; Control, Industrial Systems, Robotics</li>
                    <li><strong className="text-zinc-900">Methodologies &amp; Tools:</strong> System Simulation, Hardware Prototyping, Anomaly Detection, Technical Documentation</li>
                  </ul>
                </div>

                {/* Engineering & AI Projects */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 mb-2 font-mono">
                    Engineering &amp; AI Projects
                  </h2>

                  <div className="mb-3">
                    <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                      <span>EnerGuard – Intelligent Industrial Energy Monitoring System</span>
                      <span>2026</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] italic text-zinc-600 mb-1">
                      <span>IoT, Embedded Systems, FastAPI, MQTT</span>
                      <span>ENIG</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-700 space-y-0.5 pl-1">
                      <li>Architected an ESP32-based IoT hardware solution to monitor industrial machinery electrical metrics, analyzing power, energy consumption, and power-factor efficiency.</li>
                      <li>Developed an end-to-end data pipeline routing real-time sensor data via MQTT/Mosquitto protocols to a FastAPI backend and interactive web dashboard.</li>
                      <li>Implemented machine-level energy analytics and anomaly detection mechanisms to optimize industrial energy usage.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                      <span>FloodGuard AI – Flood-Impact Simulation &amp; Evacuation Support</span>
                      <span>2026</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] italic text-zinc-600 mb-1">
                      <span>AI, Python, GIS, Route Optimization</span>
                      <span>ENIG</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-700 space-y-0.5 pl-1">
                      <li>Built a decision-support prototype combining flood scenario modeling, road network GIS data, and real-time route recalculation.</li>
                      <li>Integrated an AI copilot agent to deliver evidence-grounded emergency evacuation explanations and automated tool orchestration.</li>
                      <li>Processed real-world spatial datasets and open weather APIs while maintaining strict separation between deterministic routing and simulated hazard models.</li>
                    </ul>
                  </div>
                </div>

                {/* Work Experience */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 mb-2 font-mono">
                    Work Experience
                  </h2>

                  <div className="mb-3">
                    <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                      <span>Founder</span>
                      <span>2026 – Present</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] italic text-zinc-600 mb-1">
                      <span>IntellDev</span>
                      <span>Tunisia</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-700 space-y-0.5 pl-1">
                      <li>Founded and managed a digital solutions initiative specializing in web development, UI/UX design, and digital marketing workflows.</li>
                      <li>Oversaw technical delivery and client requirements execution across full-stack development projects.</li>
                    </ul>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                      <span>Engineering Intern</span>
                      <span>2026</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] italic text-zinc-600 mb-1">
                      <span>Sotualco</span>
                      <span>Tunisia</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-700 space-y-0.5 pl-1">
                      <li>Analyzed automated production lines, control systems, power distribution units, and heavy electrical machinery.</li>
                      <li>Investigated the practical integration between electrical, mechanical, and industrial automation components.</li>
                    </ul>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                      <span>Industrial Observer</span>
                      <span>2026</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] italic text-zinc-600 mb-1">
                      <span>Chimie Couleur</span>
                      <span>Tunisia</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-700 space-y-0.5 pl-1">
                      <li>Evaluated automated manufacturing processes, material flow, and supply chain logistics within an industrial plant.</li>
                      <li>Assessed industrial safety standards, workplace access equipment, and machinery operational procedures.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                      <span>Customer Service Advisor</span>
                      <span>Aug 2024 – Jan 2025</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] italic text-zinc-600 mb-1">
                      <span>Concentrix (Petro-Canada Account)</span>
                      <span>Tunisia</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-700 space-y-0.5 pl-1">
                      <li>Resolved complex customer requests and service queries following strict operational and quality standards.</li>
                      <li>Utilized SugarCRM, Microsoft Power BI, and Office Suite to maintain accurate data reporting and performance metrics.</li>
                    </ul>
                  </div>
                </div>

                {/* Education */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 mb-2 font-mono">
                    Education
                  </h2>

                  <div className="mb-3">
                    <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                      <span>National Engineering Diploma in Electrical &amp; Automation Engineering</span>
                      <span>2025 – Present</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] italic text-zinc-600 mb-1">
                      <span>École Nationale d’Ingénieurs de Gabès (ENIG)</span>
                      <span>Expected Graduation: June 2029</span>
                    </div>
                    <p className="text-xs text-zinc-700 pl-1">
                      • Core Coursework: Electrical Systems, Electronics, Automation &amp; Control, Industrial Systems, Signal Processing, Numerical Methods, Embedded Programming.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline text-xs font-bold text-zinc-900">
                      <span>Preparatory Engineering Cycle – Mathematics &amp; Physics (MP)</span>
                      <span>2023 – 2025</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] italic text-zinc-600 mb-1">
                      <span>Institut Préparatoire aux Études d’Ingénieurs de Gabès (IPEIG)</span>
                      <span>Gabès, Tunisia</span>
                    </div>
                  </div>
                </div>

                {/* Certifications & Leadership */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 mb-2 font-mono">
                    Certifications &amp; Leadership
                  </h2>
                  <ul className="text-xs text-zinc-700 space-y-1.5 pl-1">
                    <li>
                      • <strong className="text-zinc-900">Certification – Generative AI &amp; Workflow Automation (GoMyCode, 2026):</strong> Applied Generative AI, Power Automate, Zapier, and Claude Code for automated software development workflows.
                    </li>
                    <li>
                      • <strong className="text-zinc-900">Founder &amp; Coordinator – Casa della Musica, ENIG:</strong> Created and coordinated a university music club, organizing campus events and supporting student performances.
                    </li>
                    <li>
                      • <strong className="text-zinc-900">Head of Internal Affairs – Interact Tunis Paradise:</strong> Managed internal operations for youth-led community service, social impact, and charity projects.
                    </li>
                    <li>
                      • <strong className="text-zinc-900">Active Member – ENIG Robotics Club:</strong> Participated in technical robotics initiatives and technical workshops.
                    </li>
                  </ul>
                </div>

                {/* Languages */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 mb-2 font-mono">
                    Languages
                  </h2>
                  <p className="text-xs text-zinc-700 pl-1">
                    • <strong className="text-zinc-900">Arabic:</strong> Native · <strong className="text-zinc-900">English:</strong> Professional Working Proficiency (B2) · <strong className="text-zinc-900">French:</strong> Professional Working Proficiency (B2)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
