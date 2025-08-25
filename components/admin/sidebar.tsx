"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Home, FileText, Calendar, Users, MessageSquare, Settings, LogOut, Church, BookOpen, Heart } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Home",
    url: "/admin/home",
    icon: Home,
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
    title: "Blog Posts",
    url: "/admin/blog",
    icon: BookOpen,
  },
  {
    title: "Prayer Requests",
    url: "/admin/prayers",
    icon: Heart,
  },
  {
    title: "Messages",
    url: "/admin/messages",
    icon: MessageSquare,
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

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Church className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">JSC Admin</h2>
            <p className="text-sm text-gray-500">Content Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url || pathname === `${item.url}/`}>
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

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/logout">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
