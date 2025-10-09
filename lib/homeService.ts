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
  email?: string
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("id,name,role,content,rating,image_url,email,created_at")
    .order("created_at", { ascending: false })
  if (error) {
    // PGRST116 = No rows found; treat as empty without logging an error
    if ((error as any).code === "PGRST116") return []
    // Log a compact message to avoid Next.js noisy overlay
    console.warn(`fetchTestimonials: failed to load testimonials (${(error as any).code || 'unknown'})`)
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

export async function fetchContactByEmail(email: string) {
  if (!email) return null
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id,name,email,subject,message,created_at")
    .ilike("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) {
    console.error("fetchContactByEmail error:", error)
    return null
  }
  return data
}

// Contact page content service
export type ContactPageContent = {
  id?: string
  hero_title?: string
  hero_description?: string
  address_line1?: string
  address_line2?: string
  country?: string
  map_link?: string
  phone_general?: string
  phone_prayer?: string
  email_general?: string
  email_prayer?: string
  sunday_service?: string
  wednesday_study?: string
  friday_prayer?: string
  faqs?: { question: string; answer: string }[]
}

export async function fetchContactPage(): Promise<ContactPageContent | null> {
  const { data, error } = await supabase
    .from("contact_page")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) {
    console.warn("fetchContactPage: fallback to null due to error")
    return null
  }
  return data
}

export async function upsertContactPage(content: ContactPageContent) {
  const { error } = await supabase.from("contact_page").upsert(content, { onConflict: "id" })
  if (error) throw error
}


