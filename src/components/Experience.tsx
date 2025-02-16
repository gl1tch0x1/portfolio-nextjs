import { Terminal, Briefcase, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const experiences = [
  {
    title: 'Senior Security Engineer',
    company: 'CyberGuard Solutions',
    period: '2021 - Present',
    description: 'Leading security architecture and incident response',
    achievements: [
      'Implemented zero-trust architecture',
      'Reduced incident response time by 60%',
      'Led team of 5 security analysts'
    ]
  },
  {
    title: 'Security Consultant',
    company: 'SecureNet',
    period: '2019 - 2021',
    description: 'Security assessments and penetration testing',
    achievements: [
      'Conducted 50+ security assessments',
      'Developed automated testing tools',
      'Created security training program'
    ]
  },
  {
    title: 'Security Analyst',
    company: 'DefendCorp',
    period: '2017 - 2019',
    description: 'Security monitoring and incident response',
    achievements: [
      'Managed SIEM implementation',
      'Handled 100+ security incidents',
      'Improved detection capabilities'
    ]
  }
];

export function Experience() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
        <p className="text-muted-foreground">My journey in cybersecurity</p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {experiences.map(exp => (
          <div key={exp.title} className="transition-all duration-300 ease-in-out">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>{exp.title}</CardTitle>
                    <CardDescription>{exp.company} | {exp.period}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map(achievement => (
                    <li key={achievement} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}