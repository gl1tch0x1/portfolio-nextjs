'use client'

import { useSupabaseQuery } from '@/hooks/use-supabase'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, Globe, Calendar, ArrowUpRight } from 'lucide-react'
import { Loading } from '@/components/ui/loading'

export function ProjectsGrid() {
  const { data: projects, loading, error, refetch } = useSupabaseQuery('projects', {
    select: 'id, title, description, image_url, demo_url, github_url, tags, created_at',
    order: { column: 'created_at', ascending: false }
  })

  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (error) {
    console.error('Projects fetch error:', error)
    return (
      <div className="w-full p-8 text-center">
        <p className="text-red-500 mb-4">Failed to load projects</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    )
  }

  if (!projects?.length) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-muted-foreground">No projects found</p>
        <Button onClick={refetch} variant="outline" className="mt-4">
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card 
          key={project.id} 
          className="flex flex-col transition-all duration-300 hover:shadow-lg"
        >
          <CardHeader>
            <CardTitle className="line-clamp-2">{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            {project.image_url && (
              <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg'
                  }}
                />
              </div>
            )}
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="px-2 py-1 text-xs capitalize"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(project.created_at).toLocaleDateString()}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            {project.github_url && (
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={project.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </Button>
            )}
            {project.demo_url && (
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={project.demo_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Demo
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}