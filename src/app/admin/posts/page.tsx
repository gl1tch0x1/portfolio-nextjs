'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BlogForm } from '@/components/admin/BlogForm'
import { BlogsTable } from '@/components/admin/BlogsTable'

export default function BlogPostsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </div>

      <BlogsTable />
      {showForm && (
        <BlogForm onClose={() => setShowForm(false)} />
      )}
    </div>
  )
} 