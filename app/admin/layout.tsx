"use client"

import { SidebarHeader } from "@/components/ui/sidebar"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  Heart,
  BookOpen,
  Settings,
  LogOut,
  Church,
} from "lucide-react"
import Link from "next/link"
import { signOut } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Home",
    url: "/admin/home",
    icon: LayoutDashboard,
  },
  {
    title: "Sermons",
    url: "/admin/sermons",
    icon: FileText,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: Calendar,
  },
  {
    title: "JSC Zones",
    url: "/admin/zones",
    icon: Users,
  },
  {
    title: "Ministries",
    url: "/admin/ministries",
    icon: Church,
  },
  {
    title: "Messages",
    url: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Prayer Requests",
    url: "/admin/prayers",
    icon: Heart,
  },
  {
    title: "Blog Posts",
    url: "/admin/blog",
    icon: BookOpen,
  },
  {
  title: "About Page",
  url: "/admin/about",
  icon: BookOpen,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

function AdminSidebar() {
  const pathname = usePathname()
  const { toast } = useToast()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      // Redirect to login page after successful sign out
      window.location.href = "/admin/login"
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Church className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">JSC Admin</h2>
            <p className="text-sm text-gray-500">Content Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          if (pathname !== "/admin/login") {
            router.push("/admin/login")
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setIsAuthenticated(false)
        if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setIsAuthenticated(false)
        if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      } else {
        setIsAuthenticated(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [router, pathname])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show login page if not authenticated and not already on login page
  if (!isAuthenticated && pathname !== "/admin/login") {
    return null // Or a simple loading spinner, as the redirect will happen
  }

  // Show login page without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Show admin layout with sidebar for authenticated users
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="border-b bg-white px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
