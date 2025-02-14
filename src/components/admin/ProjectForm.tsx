'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';

interface ProjectFormProps {
  project?: any;
  onClose: () => void;
  onSubmit: () => void;
}

export function ProjectForm({ project, onClose, onSubmit }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image_url: project?.image_url || '',
    github_url: project?.github_url || '',
    live_url: project?.live_url || '',
  });

  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = project
      ? await supabase
          .from('projects')
          .update(formData)
          .eq('id', project.id)
      : await supabase
          .from('projects')
          .insert([formData]);

    if (error) {
      toast.error('Failed to save project');
      return;
    }

    toast.success(`Project ${project ? 'updated' : 'created'} successfully`);
    onSubmit();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">GitHub URL</label>
        <input
          type="url"
          value={formData.github_url}
          onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Live URL</label>
        <input
          type="url"
          value={formData.live_url}
          onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {project ? 'Update' : 'Create'} Project
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
} 