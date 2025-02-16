'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import type { Project } from '@/types'

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        toast.error('Failed to fetch projects')
        return
      }
      setProjects(data || [])
      setLoading(false)
    }

    fetchProjects()
  }, [supabase])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Projects Manager</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {projects.map(project => (
            <div key={project.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 