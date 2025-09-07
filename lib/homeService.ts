import { supabase } from "./supabase"

export type PastorProfile = {
  id?: string
  name: string
  title: string
  bio: string
  photo_url?: string
  years_service?: number
  sermons_count?: number
  quote?: string
}

export async function fetchPastorProfile(): Promise<PastorProfile | null> {
  const { data, error } = await supabase
    .from("pastor_profile")
    .select("id,name,title,bio,photo_url,years_service,sermons_count,quote")
    .limit(1)
    .single()
  if (error) {
    if (error.code === "PGRST116") return null
    console.error("fetchPastorProfile error:", error)
    return null
  }
  return data
}

export async function upsertPastorProfile(profile: PastorProfile) {
  const { error } = await supabase.from("pastor_profile").upsert(profile, { onConflict: "id" })
  if (error) throw error
}

export type Testimonial = {
  id?: string
  name: string
  role?: string
  content: string
  rating?: number
  image_url?: string
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("id,name,role,content,rating,image_url,created_at")
    .order("created_at", { ascending: false })
  if (error) {
    console.error("fetchTestimonials error:", error)
    return []
  }
  return data ?? []
}

export async function upsertTestimonial(testimonial: Testimonial) {
  const { error } = await supabase.from("testimonials").upsert(testimonial, { onConflict: "id" })
  if (error) throw error
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from("testimonials").delete().eq("id", id)
  if (error) throw error
}


