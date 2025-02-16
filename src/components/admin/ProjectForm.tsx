'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        image_url: formData.get('image_url') as string,
        demo_url: formData.get('demo_url') as string,
        github_url: formData.get('github_url') as string,
        tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      };

      if (project?.id) {
        const { error } = await supabase
          .from('projects')
          .update(data)
          .eq('id', project.id);
        if (error) throw error;
        toast.success('Project updated successfully');
      } else {
        const { error } = await supabase.from('projects').insert(data);
        if (error) throw error;
        toast.success('Project created successfully');
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              name="title"
              defaultValue={project?.title}
              placeholder="Project Title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              defaultValue={project?.description}
              placeholder="Project Description"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              name="image_url"
              defaultValue={project?.image_url}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Demo URL</label>
            <Input
              name="demo_url"
              defaultValue={project?.demo_url}
              placeholder="https://demo.example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub URL</label>
            <Input
              name="github_url"
              defaultValue={project?.github_url}
              placeholder="https://github.com/username/repo"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <Input
              name="tags"
              defaultValue={project?.tags?.join(', ')}
              placeholder="react, typescript, tailwind"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 