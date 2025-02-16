'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { ProjectsTable } from '@/components/admin/ProjectsTable'
import { ProjectsGrid } from '@/components/ProjectsGrid'

export default function AdminProjectsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <ProjectsGrid />
      {showForm && (
        <ProjectForm onClose={() => setShowForm(false)} />
      )}
    </div>
  )
} 