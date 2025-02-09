import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const projects = [
  {
    title: 'Security Scanner',
    description: 'Automated vulnerability scanner with AI-powered analysis',
    tags: ['Python', 'Machine Learning', 'Security'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Blockchain Explorer',
    description: 'Real-time blockchain transaction analyzer and visualizer',
    tags: ['React', 'Web3', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=400',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Zero Trust Framework',
    description: 'Enterprise-grade zero trust security implementation',
    tags: ['Go', 'Kubernetes', 'Security'],
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=400',
    demoUrl: '#',
    githubUrl: '#'
  }
];

export function ProjectsGrid() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <p className="text-muted-foreground">Some of my recent work in security and development</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden border-neutral-200 dark:border-neutral-800">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="sm" variant="secondary" className="group">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                    <Button size="sm" variant="secondary" className="group">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}