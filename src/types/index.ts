export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  demo_url: string
  github_url: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  cover_image: string
  author: string
  tags: string[]
  published_at: string
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: string
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
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  role: 'admin' | 'user'
  full_name: string | null
  bio: string | null
  website: string | null
  github: string | null
  twitter: string | null
  created_at: string
  updated_at: string
} 