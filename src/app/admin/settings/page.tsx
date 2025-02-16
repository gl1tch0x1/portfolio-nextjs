'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileSettings } from '@/components/admin/ProfileSettings'
import { SecuritySettings } from '@/components/admin/SecuritySettings'
import { SiteSettings } from '@/components/admin/SiteSettings'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Site Settings</h1>
      <SiteSettings />
    </div>
  )
} 