import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function getMinistryIds() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: ministries } = await supabase
    .from("ministries")
    .select("id")
    .eq("active", true)

  return ministries?.map((ministry) => ({
    id: ministry.id,
  })) || []
}

export async function getMinistryData(id: string) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: ministry } = await supabase
    .from("ministries")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .single()

  return ministry
}