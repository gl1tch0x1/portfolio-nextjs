'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ProjectForm } from './ProjectForm';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  tags: string[];
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch projects');
      return;
    }
    setProjects(data || []);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete project');
      return;
    }

    toast.success('Project deleted successfully');
    fetchProjects();
  };

  return (
    <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button
          onClick={() => setIsAddingProject(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          Add New Project
        </button>
      </div>

      {(isAddingProject || editingProject) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ProjectForm
              project={editingProject}
              onClose={() => {
                setIsAddingProject(false);
                setEditingProject(null);
              }}
              onSubmit={fetchProjects}
            />
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="border dark:border-gray-700 p-4 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {project.description.substring(0, 100)}...
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditingProject(project)}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No projects found. Add your first project!
          </p>
        )}
      </div>
    </section>
  );
} 