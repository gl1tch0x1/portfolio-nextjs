'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import type { BlogPost } from '@/types'

export function BlogsManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })

      if (error) {
        toast.error('Failed to fetch blog posts')
        return
      }
      setPosts(data || [])
      setLoading(false)
    }

    fetchPosts()
  }, [supabase])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Blog Posts Manager</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.content.substring(0, 150)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 