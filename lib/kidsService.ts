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


// Kids Page: unified section content/cta/gallery loader (matches Admin panel model)

export type KidsSectionContent = {
  description: string
  sunday_pickup: string
  sunday_dropoff: string
  wednesday_time: string
  features: string[]
}

export type KidsCTAContent = {
  title: string
  description: string
  primaryText: string
  primaryLink: string
  secondaryText?: string
  secondaryLink?: string
}

export function getKidsDefaults(sectionKey: string): { content: KidsSectionContent; cta: KidsCTAContent; gallery: { section: string; image_url: string; caption?: string; order_index?: number }[] } {
  switch (sectionKey) {
    case "transport":
      return {
        content: {
          description:
            "We provide safe and reliable transportation to ensure every child can join us for church activities",
          sunday_pickup: "8:30 AM",
          sunday_dropoff: "12:00 PM",
          wednesday_time: "6:00 PM",
          features: ["Safe & Secure", "On Time", "Wide Coverage"],
        },
        cta: {
          title: "Need Transport?",
          description:
            "Contact us to arrange transportation for your child. We're here to help make church accessible for your family.",
          primaryText: "Request Transport",
          primaryLink: "/contact",
          secondaryText: "View Routes",
          secondaryLink: "/kids#routes",
        },
        gallery: [
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
        ],
      }
    case "sunday_devotion":
      return {
        content: {
          description:
            "A special time for children to connect with God through stories, prayer, and meaningful activities",
          sunday_pickup: "10:00 AM",
          sunday_dropoff: "",
          wednesday_time: "",
          features: ["Bible Stories", "Prayer Time", "Group Discussion", "Memory Verses"],
        },
        cta: {
          title: "Join Our Sunday Devotion",
          description:
            "Every Sunday at 10:00 AM, we gather for a special time of learning and growing in faith together.",
          primaryText: "Join This Sunday",
          primaryLink: "/contact",
          secondaryText: "Learn More",
          secondaryLink: "/kids",
        },
        gallery: [
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
        ],
      }
    case "discipleship_prayer":
      return {
        content: {
          description:
            "Building deep spiritual foundations through prayer, mentorship, and meaningful relationships",
          sunday_pickup: "",
          sunday_dropoff: "",
          wednesday_time: "6:00 PM",
          features: ["Prayer Circles", "Bible Study", "Mentorship", "Heart Sharing"],
        },
        cta: {
          title: "Join Our Discipleship Program",
          description:
            "Every Wednesday at 6:00 PM, we gather for prayer, Bible study, and spiritual growth together.",
          primaryText: "Join Discipleship",
          primaryLink: "/contact",
          secondaryText: "Prayer Requests",
          secondaryLink: "/kids",
        },
        gallery: [
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
        ],
      }
    case "praise_worship":
      return {
        content: {
          description:
            "Celebrating God's love through music, song, and joyful worship together",
          sunday_pickup: "10:30 AM",
          sunday_dropoff: "",
          wednesday_time: "",
          features: ["Kids Choir", "Praise Team", "Dance Ministry", "Heart of Worship"],
        },
        cta: {
          title: "Join Our Worship Team",
          description:
            "Every Sunday at 10:30 AM, we gather for a time of joyful worship and praise together.",
          primaryText: "Join Worship",
          primaryLink: "/contact",
          secondaryText: "Learn Songs",
          secondaryLink: "/kids",
        },
        gallery: [
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
        ],
      }
    case "fun_games_sports":
      return {
        content: {
          description:
            "Learning and growing through play, sports, and fun activities that build character and friendships",
          sunday_pickup: "",
          sunday_dropoff: "",
          wednesday_time: "Saturday 2:00 PM",
          features: ["Fun Games", "Sports Activities", "Team Building", "Character Building"],
        },
        cta: {
          title: "Join Our Games & Sports",
          description:
            "Every Saturday at 2:00 PM, we have fun games and sports activities for all ages.",
          primaryText: "Join Games",
          primaryLink: "/contact",
          secondaryText: "View Schedule",
          secondaryLink: "/kids",
        },
        gallery: [
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
        ],
      }
    case "kids_preaching":
      return {
        content: {
          description: "Children sharing the Word in age-appropriate ways and learning to communicate truth.",
          sunday_pickup: "",
          sunday_dropoff: "",
          wednesday_time: "",
          features: ["Practice Sessions", "Short Messages", "Peer Feedback", "Confidence Building"],
        },
        cta: {
          title: "Join Kids Preaching",
          description: "Sign up to participate in kids preaching and develop communication skills.",
          primaryText: "Sign Up",
          primaryLink: "/contact",
          secondaryText: "Learn More",
          secondaryLink: "/kids",
        },
        gallery: [
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
        ],
      }
    case "saturday_devotion":
      return {
        content: {
          description: "Weekend devotion time focused on reflection, prayer, and community.",
          sunday_pickup: "",
          sunday_dropoff: "",
          wednesday_time: "Saturday",
          features: ["Quiet Time", "Group Sharing", "Prayer Walk", "Worship"],
        },
        cta: {
          title: "Join Saturday Devotion",
          description: "Connect with God and friends during our Saturday devotion.",
          primaryText: "Join",
          primaryLink: "/contact",
          secondaryText: "Schedule",
          secondaryLink: "/kids",
        },
        gallery: [{ section: sectionKey, image_url: "/placeholder.jpg" }],
      }
    case "fun_tours_adventures":
      return {
        content: {
          description: "Exciting outings and adventures that help kids explore, learn, and grow together.",
          sunday_pickup: "",
          sunday_dropoff: "",
          wednesday_time: "",
          features: ["Field Trips", "Nature Walks", "Museum Visits", "Camp Days"],
        },
        cta: {
          title: "Join Our Next Adventure",
          description: "Be part of our next fun tour or adventure!",
          primaryText: "Get Notified",
          primaryLink: "/contact",
          secondaryText: "View Trips",
          secondaryLink: "/kids",
        },
        gallery: [
          { section: sectionKey, image_url: "/placeholder.jpg" },
          { section: sectionKey, image_url: "/placeholder.jpg" },
        ],
      }
    default:
      return {
        content: { description: "", sunday_pickup: "", sunday_dropoff: "", wednesday_time: "", features: [] },
        cta: { title: "Get Involved", description: "", primaryText: "Contact Us", primaryLink: "/contact" },
        gallery: [],
      }
  }
}

export async function fetchKidsSection(sectionKey: string) {
  const defaults = getKidsDefaults(sectionKey)

  // Content
  const { data: contentRow } = await supabase
    .from("home_content")
    .select("content")
    .eq("component_type", `kids_${sectionKey}`)
    .single()

  // CTA
  const { data: ctaRow } = await supabase
    .from("home_content")
    .select("content")
    .eq("component_type", `kids_${sectionKey}_cta`)
    .single()

  // Gallery
  const gallery = await fetchKidsGallery(sectionKey)

  return {
    content: (contentRow?.content as KidsSectionContent) || defaults.content,
    cta: (ctaRow?.content as KidsCTAContent) || defaults.cta,
    gallery: gallery && gallery.length > 0 ? gallery : defaults.gallery,
  }
}


