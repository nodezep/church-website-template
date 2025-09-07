"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Users, MessageSquare, Eye } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface DashboardStats {
  sermons: number
  events: number
  zones: number
  messages: number
  prayers: number
  ministries: number
  blogPosts: number
  recentActivity: Array<{
    id: string
    type: string
    title: string
    date: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    sermons: 0,
    events: 0,
    zones: 0,
    messages: 0,
    prayers: 0,
    ministries: 0,
    blogPosts: 0,
    recentActivity: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Fetch counts from all tables
      const [sermonsRes, eventsRes, zonesRes, messagesRes, prayersRes, ministriesRes, blogPostsRes] = await Promise.all(
        [
          supabase.from("sermons").select("id", { count: "exact" }),
          supabase.from("events").select("id", { count: "exact" }),
          supabase.from("jsc_zones").select("id", { count: "exact" }),
          supabase.from("contact_messages").select("id", { count: "exact" }),
          supabase.from("prayer_requests").select("id", { count: "exact" }),
          supabase.from("ministries").select("id", { count: "exact" }),
          supabase.from("blog_posts").select("id", { count: "exact" }),
        ],
      )

      // Get recent activity
      const { data: recentSermons } = await supabase
        .from("sermons")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(3)

      const { data: recentEvents } = await supabase
        .from("events")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(3)

      const { data: recentMessages } = await supabase
        .from("contact_messages")
        .select("id, subject, created_at")
        .order("created_at", { ascending: false })
        .limit(2)

      const recentActivity = [
        ...(recentSermons?.map((s) => ({
          id: s.id,
          type: "sermon",
          title: s.title,
          date: s.created_at,
        })) || []),
        ...(recentEvents?.map((e) => ({
          id: e.id,
          type: "event",
          title: e.title,
          date: e.created_at,
        })) || []),
        ...(recentMessages?.map((m) => ({
          id: m.id,
          type: "message",
          title: m.subject,
          date: m.created_at,
        })) || []),
      ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 8)

      setStats({
        sermons: sermonsRes.count || 0,
        events: eventsRes.count || 0,
        zones: zonesRes.count || 0,
        messages: messagesRes.count || 0,
        prayers: prayersRes.count || 0,
        ministries: ministriesRes.count || 0,
        blogPosts: blogPostsRes.count || 0,
        recentActivity,
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: "Add New Sermon",
      description: "Upload a new sermon with audio/video",
      href: "/admin/sermons/new", 
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Create Event",
      description: "Schedule a new church event",
      href: "/admin/events", 
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Manage JSC Zones",
      description: "Add or edit life groups",
      href: "/admin/zones",
      icon: Users,
      color: "bg-yellow-500",
    },
    {
      title: "View Messages",
      description: "Check contact form submissions",
      href: "/admin/messages",
      icon: MessageSquare,
      color: "bg-orange-500",
    },
  ]

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to the JSC admin panel</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/" target="_blank" passHref legacyBehavior>
            <a className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              View Website
            </a>
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sermons</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sermons}</div>
            <p className="text-xs text-muted-foreground">Sermon library</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.events}</div>
            <p className="text-xs text-muted-foreground">Scheduled events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">JSC Zones</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.zones}</div>
            <p className="text-xs text-muted-foreground">Life groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messages}</div>
            <p className="text-xs text-muted-foreground">Contact submissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Fixed implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Card key={action.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <Link 
                href={action.href} 
                passHref 
                legacyBehavior
              >
                <a className="block p-6">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </a>
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest content updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "sermon"
                      ? "bg-blue-500"
                      : activity.type === "event"
                        ? "bg-green-500"
                        : "bg-orange-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">
                    {activity.type === "sermon" ? "Sermon" : activity.type === "event" ? "Event" : "Message"} •{" "}
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}