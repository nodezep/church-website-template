// lib/settingsService.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ChurchSettings {
  name: string
  tagline: string
  address: string
  phone: string
  email: string
  website: string
  description: string
  service_schedule: {
    sunday_morning: string
    wednesday_prayer: string
    friday_youth: string
    saturday_mens: string
  }
  social_media: {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
  }
  seo: {
    meta_title: string
    meta_description: string
    keywords: string
  }
}

// Get all settings from database
export async function getSettings(): Promise<ChurchSettings | null> {
  try {
    const { data, error } = await supabase
      .from('church_settings')
      .select('setting_key, setting_value')
    
    if (error) {
      console.error('Error fetching settings:', error)
      return null
    }
    
    if (!data || data.length === 0) {
      return null
    }
    
    // Convert the flat key-value pairs to structured object
    const settings: Partial<ChurchSettings> = {}
    
    data.forEach(item => {
      if (item.setting_key === 'church_info') {
        Object.assign(settings, JSON.parse(item.setting_value || '{}'))
      } else if (item.setting_key === 'service_schedule') {
        settings.service_schedule = JSON.parse(item.setting_value || '{}')
      } else if (item.setting_key === 'social_media') {
        settings.social_media = JSON.parse(item.setting_value || '{}')
      } else if (item.setting_key === 'seo') {
        settings.seo = JSON.parse(item.setting_value || '{}')
      }
    })
    
    return settings as ChurchSettings
  } catch (error) {
    console.error('Error in getSettings:', error)
    return null
  }
}

// Update settings in database
export async function updateSettings(key: string, value: any): Promise<boolean> {
  try {
    // Convert value to JSON string if it's an object
    const settingValue = typeof value === 'object' ? JSON.stringify(value) : value
    
    const { error } = await supabase
      .from('church_settings')
      .upsert(
        { 
          setting_key: key, 
          setting_value: settingValue,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'setting_key' }
      )
    
    if (error) {
      console.error('Error updating settings:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error in updateSettings:', error)
    return false
  }
}

