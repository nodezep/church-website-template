// lib/supabase-helpers.ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function fetchHomeContent(componentType: string) {
  const supabase = createClientComponentClient()
  
  try {
    const { data, error } = await supabase
      .from("home_content")
      .select("content")
      .eq("component_type", componentType)
      .single()

    if (error) {
      console.error(`Error fetching ${componentType} content:`, error)
      return null
    }

    return data?.content || null
  } catch (error) {
    console.error(`Error in fetchHomeContent for ${componentType}:`, error)
    return null
  }
}