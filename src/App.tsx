import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { GlitchText } from '@/components/GlitchText';
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

  // Convert theme to boolean for dark mode toggle
  const isDarkMode = theme === 'dark';

  // Toggle theme between dark and light mode
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
            setIsDarkMode={handleSetDarkMode} // Pass the new function to set theme
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <main className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </main>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
