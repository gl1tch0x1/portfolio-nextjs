'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image: string;
  published_at: string;
  author: string;
  tags: string[];
}

interface BlogFormProps {
  post?: BlogPost | null;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
}

export function BlogForm({ post, onClose, onSubmit }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        cover_image: formData.get('cover_image') as string,
        author: formData.get('author') as string,
        tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
        published_at: new Date().toISOString()
      };

      if (post?.id) {
        await supabase.from('blog_posts').update(data).eq('id', post.id);
        toast.success('Post updated successfully');
      } else {
        await supabase.from('blog_posts').insert(data);
        toast.success('Post created successfully');
      }
      
      onSubmit?.();
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{post ? 'Edit Post' : 'Add Post'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              name="title"
              defaultValue={post?.title}
              placeholder="Post Title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              name="content"
              defaultValue={post?.content}
              placeholder="Write your post content (Markdown supported)"
              className="min-h-[200px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image URL</label>
            <Input
              name="cover_image"
              defaultValue={post?.cover_image}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <Input
              name="author"
              defaultValue={post?.author}
              placeholder="Your Name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <Input
              name="tags"
              defaultValue={post?.tags?.join(', ')}
              placeholder="security, web, tutorial"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 