import { Terminal, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const certifications = [
  {
    title: 'OSCP',
    description: 'Offensive Security Certified Professional',
    icon: Terminal,
    date: '2023'
  },
  {
    title: 'CISSP',
    description: 'Certified Information Systems Security Professional',
    icon: Award,
    date: '2022'
  },
  {
    title: 'AWS Security',
    description: 'AWS Certified Security - Specialty',
    icon: CheckCircle,
    date: '2023'
  }
];

export function Certifications() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Certifications</h2>
        <p className="text-muted-foreground">Professional certifications and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map(cert => (
          <div key={cert.title} className="transition-all duration-300 ease-in-out">
            <Card>
              <CardHeader>
                <cert.icon className="w-8 h-8 mb-4 text-primary" />
                <CardTitle>{cert.title}</CardTitle>
                <CardDescription>{cert.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Achieved in {cert.date}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}