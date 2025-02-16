import { Terminal, Shield, Code, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlitchText } from './GlitchText';

const features = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Building with security as a foundation, not an afterthought'
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, efficient, and secure code'
  },
  {
    icon: Terminal,
    title: 'Automation',
    description: 'Creating tools and scripts for security automation'
  },
  {
    icon: Wifi,
    title: 'Network Security',
    description: 'Securing networks and infrastructure'
  }
];

export function HeroSection() {
  return (
    <section className="py-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          <span className="block">Security Engineer &</span>
          <span className="block text-primary">
            <GlitchText text="Ethical Hacker" />
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Specializing in application security, penetration testing, and secure development.
          Building tools and systems with security at their core.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg">View Projects</Button>
          <Button size="lg" variant="outline">Contact Me</Button>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(feature => (
          <div 
            key={feature.title}
            className="group p-6 bg-card text-card-foreground rounded-lg border transition-all duration-300 hover:border-primary"
          >
            <feature.icon className="w-12 h-12 text-primary mb-4 transition-transform group-hover:scale-110" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}