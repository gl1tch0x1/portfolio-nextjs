'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { BlogForm } from '@/components/admin/BlogForm';
import { toast } from 'sonner';

interface Blog {
  id: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
}

export function BlogsManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch blog posts');
      return;
    }
    setBlogs(data || []);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this blog post?');
    if (!confirmed) return;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete blog post');
      return;
    }

    toast.success('Blog post deleted successfully');
    fetchBlogs();
  };

  return (
    <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Blog Posts</h2>
        <button
          onClick={() => setIsAddingBlog(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          Add New Post
        </button>
      </div>

      {(isAddingBlog || editingBlog) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BlogForm
              blog={editingBlog}
              onClose={() => {
                setIsAddingBlog(false);
                setEditingBlog(null);
              }}
              onSubmit={fetchBlogs}
            />
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            className="border dark:border-gray-700 p-4 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="font-medium">{blog.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {blog.content.substring(0, 150)}...
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-500">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
              <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {blog.category}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditingBlog(blog)}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No blog posts found. Create your first post!
          </p>
        )}
      </div>
    </section>
  );
}
