import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Please check your .env.local file.")
  // Provide a fallback or throw an error if the app cannot function without Supabase
  // For now, we'll return a client that will likely fail, but won't crash the app immediately.
  // In a production app, you might want to handle this more gracefully (e.g., show an error page).
  throw new Error("Supabase environment variables are not set.")
}

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Sermon {
  id: string
  title: string
  speaker: string
  date: string
  duration: string
  series: string
  description: string
  audio_url?: string
  video_url?: string
  thumbnail_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
  image_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface JSCZone {
  id: string
  name: string
  description: string
  day: string
  time: string
  location: string
  leader: string
  focus: string
  image_url?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Ministry {
  id: string
  title: string
  description: string
  features: string[]
  image_url?: string
  icon: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export interface PrayerRequest {
  id: string
  name: string
  email?: string
  request: string
  anonymous: boolean
  urgent: boolean
  answered: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  author: string
  featured_image?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface ChurchSetting {
  id: string
  setting_key: string
  setting_value: string
  created_at: string
  updated_at: string
}
