import React, { useState, useEffect } from 'react';
import { Download, Terminal, Menu, X, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import { PROFILE, NAV_LINKS } from '../data/portfolioData';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCvPreview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenCvPreview }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/70 bg-background/90 backdrop-blur-md shadow-lg shadow-black/40'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand in UPPERCASE YBHA with .ino */}
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-base font-bold tracking-tight text-foreground transition-colors hover:text-signal"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-signal shadow-[0_0_10px_oklch(75%_0.22_225)] group-hover:scale-125 transition-transform" />
          <span className="tracking-wider">
            <span className="text-foreground">YBHA</span>
            <span className="text-signal">.ino</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded border border-signal/30 bg-signal/10 px-1.5 py-0.5 font-mono text-[10px] text-signal ml-1">
            <span className="signal-dot h-1.5 w-1.5 rounded-full bg-signal" />
            LIVE // ESP32
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-6 lg:gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-signal relative py-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Interactive Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            aria-label="Open Interactive CLI Terminal"
            title="Open Interactive Cyber Terminal [~]"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/80 px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-all hover:border-signal/60 hover:text-signal hover:shadow-[0_0_15px_oklch(75%_0.22_225/25%)]"
          >
            <Terminal className="h-3.5 w-3.5 text-signal" />
            <span className="hidden sm:inline">CLI</span>
            <kbd className="hidden lg:inline text-[9px] bg-secondary px-1 py-0.2 rounded border border-border">~</kbd>
          </button>

          {/* CV Button */}
          <div className="flex items-center">
            <a
              href={PROFILE.cvUrl}
              download="Yassine_Bel_Hadj_Ali_CV.pdf"
              className="inline-flex items-center gap-2 rounded-l-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_oklch(75%_0.22_225/50%)]"
            >
              <Download className="h-3.5 w-3.5" />
              CV
            </a>
            <button
              onClick={onOpenCvPreview}
              title="Preview CV modal"
              className="inline-flex items-center justify-center rounded-r-md bg-primary/90 px-2 py-1.5 text-xs font-semibold text-primary-foreground border-l border-primary-foreground/20 hover:bg-primary transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-card border border-border"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-lg px-6 py-4 transition-all">
          <div className="flex flex-col gap-3 font-mono text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-muted-foreground hover:text-signal transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-signal/70">→</span>
              </a>
            ))}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 text-signal">
                <Cpu className="h-3.5 w-3.5" /> ENIG '29 · IntellDev
              </span>
              <span>Tunisia (GMT+1)</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
