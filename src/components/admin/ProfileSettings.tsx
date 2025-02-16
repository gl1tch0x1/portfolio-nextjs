'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ProfileSettings() {
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.get('full_name'),
          bio: formData.get('bio'),
          website: formData.get('website'),
          github: formData.get('github'),
          twitter: formData.get('twitter'),
        })
        .eq('id', (await supabase.auth.getUser()).data.user?.id)

      if (error) throw error
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input name="full_name" placeholder="John Doe" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea name="bio" placeholder="Tell us about yourself" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input name="website" type="url" placeholder="https://example.com" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub</label>
            <Input name="github" placeholder="github_username" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Twitter</label>
            <Input name="twitter" placeholder="twitter_username" />
          </div>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 