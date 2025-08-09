import { supabase } from "./supabase"
import { redirect } from "next/navigation"

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  } catch (error: any) {
    return { data: null, error: { message: error.message || "An unexpected error occurred during sign-in." } }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error: any) {
    return { error: { message: error.message || "An unexpected error occurred during sign-out." } }
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    return { user, error }
  } catch (error: any) {
    return { user: null, error: { message: error.message || "An unexpected error occurred fetching user." } }
  }
}

export async function getSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    return { session, error }
  } catch (error: any) {
    return { session: null, error: { message: error.message || "An unexpected error occurred fetching session." } }
  }
}

export async function requireAuth() {
  const { session, error } = await getSession()

  if (error || !session) {
    redirect("/admin/login")
  }

  return session
}
