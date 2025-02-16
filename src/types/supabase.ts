export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          demo_url: string
          github_url: string
          tags: string[]
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      blog_posts: {
        Row: {
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
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      profiles: {
        Row: {
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
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      site_settings: {
        Row: {
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
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 