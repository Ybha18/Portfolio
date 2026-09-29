import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Download,
  MapPin,
  Check,
  Copy,
  Send,
  MessageSquare,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { PROFILE, AGENCY_INTELLDEV } from '../data/portfolioData';
import { Reveal } from './Reveal';

interface ContactSectionProps {
  onOpenCvPreview: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCvPreview }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Quick message composer state
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [messageTopic, setMessageTopic] = useState('Engineering Internship');
  const [customNote, setCustomNote] = useState('');

  const handleCopy = (text: string, key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${messageTopic}] Inquiry from ${senderName || 'Recruiter/Client'}`);
    const body = encodeURIComponent(
      `Hello Yassine,\n\nMy name is ${senderName || '[Name]'} from ${senderOrg || '[Organization]'}.\n\nTopic: ${messageTopic}\n\nNote:\n${customNote || 'I reached out through YBHA.ino to discuss potential engineering opportunities or IntellDev digital services.'}\n\nBest regards,\n${senderName || ''}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden">
      {/* Background electric grid & blue degradation */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 65% at 50% 100%, oklch(75% 0.22 225 / 14%), oklch(55% 0.22 250 / 6%), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal">
              // Get In Touch · YBHA.ino
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Let's build something reliable.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
              Recruiting for engineering internships in embedded systems, IoT, industrial
              automation — or seeking dev &amp; marketing solutions with IntellDev? I'd love to hear from you.
            </p>
          </div>
        </Reveal>

        {/* Contact Cards Grid */}
        <Reveal delay={120}>
          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2 text-left">
            {/* Email Card */}
            <div className="relative group">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-signal/60 hover:panel-glow block h-full"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-signal/30 bg-signal/10 text-signal shadow-[0_0_12px_oklch(75%_0.22_225/20%)]">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0 pr-8">
                  <span className="block font-mono text-[10px] tracking-widest text-muted-foreground">
                    EMAIL
                  </span>
                  <span className="block truncate text-sm font-medium text-foreground group-hover:text-signal transition-colors">
                    {PROFILE.email}
                  </span>
                </span>
              </a>
              <button
                onClick={(e) => handleCopy(PROFILE.email, 'email', e)}
                title="Copy email address"
                className="absolute top-4 right-4 p-1.5 rounded-md bg-secondary/80 text-muted-foreground hover:text-signal border border-border/60 transition-colors"
              >
                {copiedKey === 'email' ? (
                  <Check className="h-3.5 w-3.5 text-signal" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="relative group">
              <a
                href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-signal/60 hover:panel-glow block h-full"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-signal/30 bg-signal/10 text-signal shadow-[0_0_12px_oklch(75%_0.22_225/20%)]">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="pr-8">
                  <span className="block font-mono text-[10px] tracking-widest text-muted-foreground">
                    PHONE
                  </span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-signal transition-colors">
                    {PROFILE.phone}
                  </span>
                </span>
              </a>
              <button
                onClick={(e) => handleCopy(PROFILE.phone, 'phone', e)}
                title="Copy phone number"
                className="absolute top-4 right-4 p-1.5 rounded-md bg-secondary/80 text-muted-foreground hover:text-signal border border-border/60 transition-colors"
              >
                {copiedKey === 'phone' ? (
                  <Check className="h-3.5 w-3.5 text-signal" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* GitHub Card */}
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-signal/60 hover:panel-glow text-left"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-signal/30 bg-signal/10 text-signal shadow-[0_0_12px_oklch(75%_0.22_225/20%)]">
                <Github className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-widest text-muted-foreground">
                  GITHUB
                </span>
                <span className="block text-sm font-medium text-foreground group-hover:text-signal transition-colors">
                  github.com/Ybha18
                </span>
              </span>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-signal/60 hover:panel-glow text-left"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-signal/30 bg-signal/10 text-signal shadow-[0_0_12px_oklch(75%_0.22_225/20%)]">
                <Linkedin className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-widest text-muted-foreground">
                  LINKEDIN
                </span>
                <span className="block text-sm font-medium text-foreground group-hover:text-signal transition-colors">
                  Connect on LinkedIn
                </span>
              </span>
            </a>
          </div>
        </Reveal>

        {/* Direct Dispatch Message Composer */}
        <Reveal delay={160}>
          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-border/80 bg-card/70 p-6 text-left panel-glow">
            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-signal font-semibold tracking-wide">
              <MessageSquare className="h-4 w-4" />
              <span>// Direct Dispatch Messenger</span>
            </div>

            <form onSubmit={handleSendDraft} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-muted-foreground block mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering Lead"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:border-signal"
                  />
                </div>
                <div>
                  <label className="text-muted-foreground block mb-1">Organization / Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Robotics & Automation Lab"
                    value={senderOrg}
                    onChange={(e) => setSenderOrg(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted-foreground block mb-1">Inquiry Topic</label>
                <select
                  value={messageTopic}
                  onChange={(e) => setMessageTopic(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:border-signal"
                >
                  <option value="Engineering Internship">Engineering Internship (Embedded / IoT / Automation)</option>
                  <option value="IntellDev Dev & Marketing Agency">IntellDev Agency (Dev, Automation &amp; Marketing Solutions)</option>
                  <option value="Industrial Energy & Automation">Industrial Energy Monitoring (EnerGuard Consultation)</option>
                  <option value="General Technical Exchange">General Technical Exchange / Academic Collab</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground block mb-1">Brief Details</label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding internship timeframe, project scope, or agency requirements..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:border-signal font-sans text-sm"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-signal text-background px-4 py-2 font-mono text-xs font-semibold hover:bg-signal-dim transition-all hover:scale-[1.01] shadow-[0_0_15px_oklch(75%_0.22_225/30%)]"
                >
                  <Send className="h-3.5 w-3.5" />
                  Launch Mail Client with Pre-filled Draft
                </button>
              </div>
            </form>
          </div>
        </Reveal>

        {/* Bottom CV download and location */}
        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PROFILE.cvUrl}
              download="Yassine_Bel_Hadj_Ali_CV.pdf"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_oklch(75%_0.22_225/50%)] hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>

            <button
              onClick={onOpenCvPreview}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-signal/50 hover:text-signal transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Preview Resume
            </button>

            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground px-3 py-2">
              <MapPin className="h-3.5 w-3.5 text-signal" />
              {PROFILE.location}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-8 bg-card/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 font-mono text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_oklch(75%_0.22_225)]" />
            <span className="font-bold text-foreground">YBHA.ino</span>
            <span>© {new Date().getFullYear()} {PROFILE.name.toUpperCase()}</span>
          </div>
          <span className="text-signal/90">
            // Embedded · IoT · Automation · Applied AI · IntellDev
          </span>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span>ENIG Class of 2029</span>
            <span>•</span>
            <a href="#top" className="hover:text-signal transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};
