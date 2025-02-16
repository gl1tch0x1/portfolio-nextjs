'use client'

import { useState, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { ContactSection } from '@/components/ContactSection';
import { SecBlogs } from '@/components/SecBlogs';
import { Experience } from '@/components/Experience';
import { Certifications } from '@/components/Certifications';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useTheme } from 'next-themes';

function App() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const isDarkMode = theme === 'dark';

  const handleSetDarkMode = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <Experience />;
      case 'projects':
        return <ProjectsGrid />;
      case 'skills':
        return <SkillsMatrix />;
      case 'secblogs':
        return <SecBlogs />;
      case 'certifications':
        return <Certifications />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-[#0a0a0a] ${isDarkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQgPSJNMzAgMzBtLTIgMGEyIDIgMCAxIDEgNCAwYTIgMiAwIDEgMSAtNCAwIiBmaWxsPSJyZ2JhKDAsMjU1LDAsMC4xKSIvPgo8L3N2Zz4=')] opacity-50 dark:opacity-30" />
      <div className="relative">
        <Suspense fallback={<LoadingScreen />}>
          <Navbar
            isDarkMode={isDarkMode}
            setIsDarkMode={handleSetDarkMode}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <main className="container mx-auto px-4 py-8">
            <div 
              key={activeSection}
              className="transition-all duration-300 ease-in-out"
            >
              {renderSection()}
            </div>
          </main>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
