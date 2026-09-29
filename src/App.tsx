import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { AgencySection } from './components/AgencySection';
import { ProjectModal } from './components/ProjectModal';
import { SkillsMatrix } from './components/SkillsMatrix';
import { TrackRecord } from './components/TrackRecord';
import { ContactSection } from './components/ContactSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { CvModal } from './components/CvModal';
import { Project } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Global hotkey listener for terminal `~` key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
        }
      } else if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setSelectedProject(null);
        setIsCvOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      id="top"
      className="min-h-screen bg-background text-foreground antialiased selection:bg-signal/25 selection:text-signal"
    >
      {/* Navigation with YBHA.ino */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCvPreview={() => setIsCvOpen(true)}
      />

      {/* Hero Header with uppercase YBHA.ino & Electric Blue Degradation */}
      <Hero onOpenCvPreview={() => setIsCvOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Selected Engineering Projects (EnerGuard & FloodGuard AI) */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* IntellDev Dev & Marketing Agency Section */}
        <AgencySection />

        {/* Technical Skills Matrix */}
        <SkillsMatrix />

        {/* Experience, Education & Leadership Track Record */}
        <TrackRecord />
      </main>

      {/* Contact Section & Footer */}
      <ContactSection onOpenCvPreview={() => setIsCvOpen(true)} />

      {/* Interactive Project Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Cyber CLI Terminal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenCv={() => {
          setIsTerminalOpen(false);
          setIsCvOpen(true);
        }}
      />

      {/* CV PDF Preview Modal */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </div>
  );
}
