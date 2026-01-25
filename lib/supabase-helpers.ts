// lib/supabase-helpers.ts
import { createBrowserClient } from "@supabase/ssr"

export async function fetchHomeContent(componentType: string) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
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