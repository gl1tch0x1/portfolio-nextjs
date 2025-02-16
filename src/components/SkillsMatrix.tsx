import { Code, Database, Lock, Network, Server, Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const skills = [
  {
    category: 'Security',
    icon: Lock,
    items: [
      { name: 'Penetration Testing', level: 95 },
      { name: 'Malware Analysis', level: 88 },
      { name: 'Network Security', level: 92 }
    ]
  },
  {
    category: 'Development',
    icon: Code,
    items: [
      { name: 'Full Stack Development', level: 90 },
      { name: 'System Architecture', level: 85 },
      { name: 'API Design', level: 88 }
    ]
  },
  {
    category: 'Infrastructure',
    icon: Server,
    items: [
      { name: 'Cloud Architecture', level: 87 },
      { name: 'DevSecOps', level: 85 },
      { name: 'Container Orchestration', level: 82 }
    ]
  }
];

export function SkillsMatrix() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-muted-foreground">Technical proficiencies and core competencies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="fade-in"
            style={{ animationDelay: `${categoryIndex * 0.1}s` }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <category.icon className="w-5 h-5 text-primary" />
                  <CardTitle>{category.category}</CardTitle>
                </div>
                <CardDescription>
                  Core competencies in {category.category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.items.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="slide-up"
                      style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.1)}s` }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}