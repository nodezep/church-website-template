import { supabase } from "./supabase"

export type KidsClass = {
  id?: string
  name: string
  age_range: string
  description: string
  capacity?: string
  features: string[]
  color?: string
  icon?: string
  order_index?: number
  active?: boolean
}

export async function fetchKidsClasses(): Promise<KidsClass[]> {
  const { data, error } = await supabase
    .from("kids_classes")
    .select("id,name,age_range,description,capacity,features,color,icon,order_index,active")
    .order("order_index", { ascending: true })

  if (error) {
    console.error("fetchKidsClasses error:", error)
    return []
  }
  return data ?? []
}

export async function upsertKidsClasses(classes: KidsClass[]) {
  const payload = classes.map((c) => ({
    id: c.id,
    name: c.name,
    age_range: c.age_range,
    description: c.description,
    capacity: c.capacity,
    features: c.features,
    color: c.color,
    icon: c.icon,
    order_index: c.order_index ?? 0,
    active: c.active ?? true,
  }))
  const { error } = await supabase.from("kids_classes").upsert(payload, { onConflict: "id" })
  if (error) throw error
}

export type KidsTransport = {
  id?: string
  description: string
  sunday_pickup?: string
  sunday_dropoff?: string
  wednesday_time?: string
  features: string[]
}

export async function fetchKidsTransport(): Promise<KidsTransport | null> {
  const { data, error } = await supabase
    .from("kids_transport")
    .select("id,description,sunday_pickup,sunday_dropoff,wednesday_time,features")
    .limit(1)
    .single()
  if (error) {
    if (error.code === "PGRST116") return null
    console.error("fetchKidsTransport error:", error)
    return null
  }
  return data
}

export async function upsertKidsTransport(transport: KidsTransport) {
  const { error } = await supabase.from("kids_transport").upsert(transport, { onConflict: "id" })
  if (error) throw error
}

export async function fetchKidsGallery(section: string) {
  const { data, error } = await supabase
    .from("kids_gallery")
    .select("id,section,image_url,caption,order_index")
    .eq("section", section)
    .order("order_index", { ascending: true })
  if (error) {
    console.error("fetchKidsGallery error:", error)
    return []
  }
  return data ?? []
}

export async function upsertKidsGallery(items: { id?: string; section: string; image_url: string; caption?: string; order_index?: number }[]) {
  const { error } = await supabase.from("kids_gallery").upsert(items, { onConflict: "id" })
  if (error) throw error
}

export async function deleteKidsGallery(id: string) {
  const { error } = await supabase.from("kids_gallery").delete().eq("id", id)
  if (error) throw error
}


