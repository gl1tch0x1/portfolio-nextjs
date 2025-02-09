import { motion } from 'framer-motion';
import { Terminal, Briefcase, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const experiences = [
  {
    title: 'Lead Security Engineer',
    company: 'CyberGuard Solutions',
    period: '2022 - Present',
    description: 'Leading security assessments and implementing zero-trust architecture for Fortune 500 clients.',
    achievements: [
      'Discovered and responsibly disclosed 15+ critical vulnerabilities',
      'Implemented AI-powered threat detection system',
      'Led a team of 5 security researchers'
    ]
  },
  {
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Industries',
    period: '2020 - 2022',
    description: 'Architected and developed secure enterprise applications using cutting-edge technologies.',
    achievements: [
      'Reduced system vulnerabilities by 75%',
      'Optimized application performance by 60%',
      'Mentored junior developers in secure coding practices'
    ]
  },
  {
    title: 'Security Researcher',
    company: 'DefCon Labs',
    period: '2018 - 2020',
    description: 'Conducted advanced security research and vulnerability assessments.',
    achievements: [
      'Published 3 major security research papers',
      'Developed custom security testing tools',
      'Regular speaker at security conferences'
    ]
  }
];

export function Experience() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <Terminal className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Experience Timeline</h2>
        <p className="text-muted-foreground font-mono">cat ~/career/timeline.log</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl mb-1">{exp.title}</CardTitle>
                    <CardDescription className="font-mono">
                      {exp.company} | {exp.period}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-primary/80">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (index * 0.1) + ((i + 1) * 0.1) }}
                      className="flex items-start gap-2 font-mono text-sm text-primary/70"
                    >
                      <Award className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}