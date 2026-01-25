import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function getMinistryIds() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
  
  const { data: ministries } = await supabase
    .from("ministries")
    .select("id")
    .eq("active", true)

  return ministries?.map((ministry) => ({
    id: ministry.id,
  })) || []
}

export async function getMinistryData(id: string) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
  
  const { data: ministry } = await supabase
    .from("ministries")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .single()

  return ministry
}