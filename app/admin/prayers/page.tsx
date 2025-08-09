"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Calendar, Eye, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

interface PrayerRequest {
  id: string
  name: string
  email?: string
  request: string
  anonymous: boolean
  urgent: boolean
  answered: boolean
  created_at: string
}

export default function AdminPrayersPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "urgent" | "answered" | "pending">("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchPrayers()
  }, [])

  const fetchPrayers = async () => {
    try {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setPrayers(data || [])
    } catch (error) {
      console.error("Error fetching prayer requests:", error)
      toast({
        title: "Error",
        description: "Failed to fetch prayer requests",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const markAsAnswered = async (id: string, answered: boolean) => {
    try {
      const { error } = await supabase.from("prayer_requests").update({ answered }).eq("id", id)

      if (error) throw error

      setPrayers(prayers.map((prayer) => (prayer.id === id ? { ...prayer, answered } : prayer)))

      toast({
        title: "Success",
        description: `Prayer request marked as ${answered ? "answered" : "pending"}`,
      })
    } catch (error) {
      console.error("Error updating prayer request:", error)
      toast({
        title: "Error",
        description: "Failed to update prayer request",
        variant: "destructive",
      })
    }
  }

  const deletePrayer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this prayer request?")) return

    try {
      const { error } = await supabase.from("prayer_requests").delete().eq("id", id)

      if (error) throw error

      setPrayers(prayers.filter((prayer) => prayer.id !== id))

      toast({
        title: "Success",
        description: "Prayer request deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting prayer request:", error)
      toast({
        title: "Error",
        description: "Failed to delete prayer request",
        variant: "destructive",
      })
    }
  }

  const filteredPrayers = prayers.filter((prayer) => {
    if (filter === "urgent") return prayer.urgent && !prayer.answered
    if (filter === "answered") return prayer.answered
    if (filter === "pending") return !prayer.answered
    return true
  })

  const urgentCount = prayers.filter((p) => p.urgent && !p.answered).length
  const answeredCount = prayers.filter((p) => p.answered).length
  const pendingCount = prayers.filter((p) => !p.answered).length

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading prayer requests...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prayer Requests</h1>
          <p className="text-gray-600">Manage prayer requests from your congregation</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{prayers.length} total</Badge>
          {urgentCount > 0 && <Badge variant="destructive">{urgentCount} urgent</Badge>}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All Requests ({prayers.length})
        </Button>
        <Button variant={filter === "urgent" ? "default" : "outline"} size="sm" onClick={() => setFilter("urgent")}>
          Urgent ({urgentCount})
        </Button>
        <Button variant={filter === "pending" ? "default" : "outline"} size="sm" onClick={() => setFilter("pending")}>
          Pending ({pendingCount})
        </Button>
        <Button variant={filter === "answered" ? "default" : "outline"} size="sm" onClick={() => setFilter("answered")}>
          Answered ({answeredCount})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prayer Requests</CardTitle>
          <CardDescription>Prayer requests submitted through your website</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Request</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrayers.map((prayer) => (
                <TableRow key={prayer.id}>
                  <TableCell>
                    {prayer.answered ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : prayer.urgent ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Heart className="w-4 h-4 text-blue-600" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {prayer.anonymous ? "Anonymous" : prayer.name}
                    {prayer.urgent && !prayer.answered && (
                      <Badge className="ml-2" variant="destructive">
                        Urgent
                      </Badge>
                    )}
                    {prayer.answered && (
                      <Badge className="ml-2" variant="default">
                        Answered
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{prayer.request}</TableCell>
                  <TableCell>
                    {prayer.urgent ? (
                      <Badge variant="destructive">Urgent</Badge>
                    ) : (
                      <Badge variant="secondary">Normal</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(prayer.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              Prayer Request from {prayer.anonymous ? "Anonymous" : prayer.name}
                            </DialogTitle>
                            <DialogDescription>
                              Submitted on {new Date(prayer.created_at).toLocaleDateString()} at{" "}
                              {new Date(prayer.created_at).toLocaleTimeString()}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-sm text-gray-700">Name</h4>
                                <p>{prayer.anonymous ? "Anonymous Request" : prayer.name}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-gray-700">Priority</h4>
                                <Badge variant={prayer.urgent ? "destructive" : "secondary"}>
                                  {prayer.urgent ? "Urgent" : "Normal"}
                                </Badge>
                              </div>
                            </div>
                            {prayer.email && !prayer.anonymous && (
                              <div>
                                <h4 className="font-semibold text-sm text-gray-700">Email</h4>
                                <p>{prayer.email}</p>
                              </div>
                            )}
                            <div>
                              <h4 className="font-semibold text-sm text-gray-700 mb-2">Prayer Request</h4>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="whitespace-pre-wrap">{prayer.request}</p>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              {!prayer.answered ? (
                                <Button onClick={() => markAsAnswered(prayer.id, true)}>Mark as Answered</Button>
                              ) : (
                                <Button variant="outline" onClick={() => markAsAnswered(prayer.id, false)}>
                                  Mark as Pending
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => deletePrayer(prayer.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPrayers.length === 0 && (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No prayer requests found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
