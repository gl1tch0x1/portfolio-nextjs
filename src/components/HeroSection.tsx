import { motion } from 'framer-motion';
import { Terminal, Shield, Code, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlitchText } from './GlitchText';

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Terminal className="w-16 h-16 text-primary animate-pulse" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold mb-4 space-y-2">
            <GlitchText text="Hello, friend." className="mb-4" />
            <div className="text-sm text-primary font-mono">
              <span className="terminal-cursor">root@fsociety:~# </span>
              <span className="typing-animation">whoami</span>
            </div>
          </h1>
          
          <p className="text-xl text-primary/80 max-w-2xl mx-auto font-mono">
            {">"} Full Stack Developer & Cybersecurity Researcher
            <br />
            {">"} Breaking systems to build them stronger.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 mt-8">
          <Button className="group bg-primary/20 hover:bg-primary/30 text-primary border border-primary">
            <Code className="mr-2 h-4 w-4 group-hover:animate-spin" />
            ./view-projects.sh
          </Button>
          <Button variant="outline" className="group border-primary text-primary hover:bg-primary/20">
            <Shield className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            ./security-research.sh
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { icon: Code, label: 'Full Stack', value: '5+ years', cmd: 'experience.log' },
            { icon: Shield, label: 'Security', value: '50+ CVEs', cmd: 'vulnerabilities.db' },
            { icon: Wifi, label: 'Systems', value: '∞ hacked', cmd: 'pwned.txt' }
          ].map(({ icon: Icon, label, value, cmd }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-black/50 border border-primary/20 hover:border-primary/50 transition-colors"
            >
              <Icon className="w-8 h-8 mb-4 mx-auto text-primary" />
              <h3 className="font-mono text-primary mb-2">{label}</h3>
              <p className="text-primary/80 font-mono text-sm">cat {cmd}</p>
              <p className="text-primary mt-2">{value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}