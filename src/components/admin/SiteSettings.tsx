'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ColorPicker } from '@/components/ui/color-picker'
import { Github, Twitter, Linkedin, Instagram, Globe } from 'lucide-react'

interface SiteSettings {
  site_name: string
  site_description: string
  contact_email: string
  maintenance_mode: boolean
  analytics_id: string
  theme: {
    primary_color: string
    secondary_color: string
    background_color: string
    text_color: string
  }
  social_links: {
    github: string
    twitter: string
    linkedin: string
    instagram: string
    website: string
  }
}

export function SiteSettings() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (error) throw error
      setSettings(data)
    } catch (error) {
      toast.error('Failed to fetch settings')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        site_name: formData.get('site_name'),
        site_description: formData.get('site_description'),
        contact_email: formData.get('contact_email'),
        maintenance_mode: formData.get('maintenance_mode') === 'on',
        analytics_id: formData.get('analytics_id'),
        theme: {
          primary_color: formData.get('primary_color'),
          secondary_color: formData.get('secondary_color'),
          background_color: formData.get('background_color'),
          text_color: formData.get('text_color'),
        },
        social_links: {
          github: formData.get('github'),
          twitter: formData.get('twitter'),
          linkedin: formData.get('linkedin'),
          instagram: formData.get('instagram'),
          website: formData.get('website'),
        }
      }

      const { error } = await supabase.from('site_settings').upsert(data)
      if (error) throw error
      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="theme">Theme</TabsTrigger>
        <TabsTrigger value="social">Social Links</TabsTrigger>
      </TabsList>

      <form onSubmit={handleSubmit}>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic site configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Site Name</Label>
                <Input
                  name="site_name"
                  defaultValue={settings?.site_name}
                  placeholder="My Portfolio"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Site Description</Label>
                <Textarea
                  name="site_description"
                  defaultValue={settings?.site_description}
                  placeholder="A brief description of your site"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input
                  name="contact_email"
                  type="email"
                  defaultValue={settings?.contact_email}
                  placeholder="contact@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Google Analytics ID</Label>
                <Input
                  name="analytics_id"
                  defaultValue={settings?.analytics_id}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  name="maintenance_mode"
                  id="maintenance_mode"
                  defaultChecked={settings?.maintenance_mode}
                />
                <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Customization</CardTitle>
              <CardDescription>Customize your site's appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <ColorPicker
                    name="primary_color"
                    defaultValue={settings?.theme.primary_color}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <ColorPicker
                    name="secondary_color"
                    defaultValue={settings?.theme.secondary_color}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <ColorPicker
                    name="background_color"
                    defaultValue={settings?.theme.background_color}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <ColorPicker
                    name="text_color"
                    defaultValue={settings?.theme.text_color}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </Label>
                <Input
                  name="github"
                  defaultValue={settings?.social_links.github}
                  placeholder="https://github.com/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> Twitter
                </Label>
                <Input
                  name="twitter"
                  defaultValue={settings?.social_links.twitter}
                  placeholder="https://twitter.com/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Label>
                <Input
                  name="linkedin"
                  defaultValue={settings?.social_links.linkedin}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </Label>
                <Input
                  name="instagram"
                  defaultValue={settings?.social_links.instagram}
                  placeholder="https://instagram.com/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Website
                </Label>
                <Input
                  name="website"
                  defaultValue={settings?.social_links.website}
                  placeholder="https://example.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </form>
    </Tabs>
  )
} 