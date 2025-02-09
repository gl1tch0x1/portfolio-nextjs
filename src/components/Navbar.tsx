import { Moon, Sun, Terminal, Wifi, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlitchText } from './GlitchText';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navbar({ isDarkMode, setIsDarkMode, activeSection, setActiveSection }: NavbarProps) {
  const navItems = [
    { text: 'About', icon: Briefcase, id: 'about' },
    { text: 'Projects', icon: Terminal, id: 'projects' },
    { text: 'Skills', icon: Terminal, id: 'skills' },
    { text: 'SecBlogs', icon: Wifi, id: 'secblogs' },
    { text: 'Certifications', icon: Award, id: 'certifications' },
    { text: 'Contact', icon: Terminal, id: 'contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setActiveSection('home')}
          >
            <Terminal className="w-6 h-6 text-primary animate-pulse" />
            <GlitchText text="fsociety.dev" className="text-xl font-bold" />
            <span className="text-primary text-xs animate-pulse">▮</span>
          </div>
          
          <div className="flex items-center space-x-6">
            {navItems.map(({ text, icon: Icon, id }) => (
              <div
                key={id}
                className={`group flex items-center space-x-1 cursor-pointer ${
                  activeSection === id ? 'text-primary' : ''
                }`}
                onClick={() => setActiveSection(id)}
              >
                <Icon className={`w-3 h-3 ${
                  activeSection === id ? 'text-primary' : 'text-primary opacity-0 group-hover:opacity-100'
                } transition-opacity`} />
                <GlitchText
                  text={text}
                  className={`text-sm hover:text-primary transition-colors ${
                    activeSection === id ? 'text-primary' : ''
                  }`}
                />
              </div>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-4 hover:bg-primary/20"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}