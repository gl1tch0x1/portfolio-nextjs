import { motion } from 'framer-motion';
import { Terminal, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const certifications = [
  {
    title: 'Offensive Security Certified Professional (OSCP)',
    issuer: 'Offensive Security',
    date: '2023',
    description: 'Advanced penetration testing certification with hands-on exam.',
    skills: ['Network Penetration', 'Exploit Development', 'Privilege Escalation']
  },
  {
    title: 'Certified Information Systems Security Professional (CISSP)',
    issuer: 'ISC²',
    date: '2022',
    description: 'Comprehensive information security certification.',
    skills: ['Security Management', 'Network Security', 'Risk Management']
  },
  {
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: '2021',
    description: 'Professional certification in ethical hacking and countermeasures.',
    skills: ['Ethical Hacking', 'Security Assessment', 'Vulnerability Analysis']
  }
];

export function Certifications() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <Terminal className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Professional Certifications</h2>
        <p className="text-muted-foreground font-mono">ls -la ~/certifications/</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-primary" />
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                </div>
                <CardDescription className="font-mono">
                  {cert.issuer} | {cert.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-primary/80">{cert.description}</p>
                <div className="space-y-2">
                  {cert.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (index * 0.1) + ((i + 1) * 0.1) }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm font-mono text-primary/70">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}