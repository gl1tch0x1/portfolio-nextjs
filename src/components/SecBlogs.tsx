import { Terminal, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogs = [
  {
    title: 'Zero-Day Vulnerability in Popular IoT Devices',
    date: '2024-03-15',
    description: 'Analysis of a critical vulnerability affecting millions of IoT devices worldwide. Includes proof of concept and mitigation strategies.',
    tags: ['IoT Security', 'Zero-Day', 'Exploit Development'],
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: 'Advanced Web Application Penetration Testing Guide',
    date: '2024-03-01',
    description: 'Comprehensive guide to modern web application security testing, including new attack vectors and defense mechanisms.',
    tags: ['Web Security', 'Penetration Testing', 'OWASP'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: 'Reverse Engineering Modern Malware',
    date: '2024-02-15',
    description: 'Deep dive into analyzing sophisticated malware using advanced reverse engineering techniques and tools.',
    tags: ['Malware Analysis', 'Reverse Engineering', 'Threat Intel'],
    image: 'https://images.unsplash.com/photo-1526374870839-e155464bb9b2?auto=format&fit=crop&q=80&w=400'
  }
];

export function SecBlogs() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <Terminal className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Security Research & Blogs</h2>
        <p className="text-muted-foreground font-mono">cat /var/log/security/research/*.md</p>
      </div>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={blog.title}
            className="fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
              <div className="grid md:grid-cols-[2fr,3fr] gap-6">
                <div className="relative h-48 md:h-full">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-2 text-sm text-primary mb-2 font-mono">
                      <Calendar className="w-4 h-4" />
                      {blog.date}
                    </div>
                    <CardTitle className="mb-2 text-xl">{blog.title}</CardTitle>
                    <CardDescription className="font-mono">
                      {blog.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="group text-primary hover:text-primary hover:bg-primary/20"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}