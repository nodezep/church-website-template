"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

interface JSCZone {
  id: string
  name: string
  description: string
  day: string
  time: string
  location: string
  leader: string
  focus: string
  image_url?: string
  active: boolean
  created_at: string
}

export default function AdminZonesPage() {
  const [zones, setZones] = useState<JSCZone[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingZone, setEditingZone] = useState<JSCZone | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    day: "",
    time: "",
    location: "",
    leader: "",
    focus: "",
    image_url: "",
    active: true,
  })

  useEffect(() => {
    fetchZones()
  }, [])

  const fetchZones = async () => {
    try {
      const { data, error } = await supabase.from("jsc_zones").select("*").order("name", { ascending: true })

      if (error) throw error
      setZones(data || [])
    } catch (error) {
      console.error("Error fetching zones:", error)
      toast({
        title: "Error",
        description: "Failed to fetch JSC zones",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingZone) {
        const { error } = await supabase.from("jsc_zones").update(formData).eq("id", editingZone.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "JSC Zone updated successfully",
        })
      } else {
        const { error } = await supabase.from("jsc_zones").insert([formData])

        if (error) throw error

        toast({
          title: "Success",
          description: "JSC Zone created successfully",
        })
      }

      setIsDialogOpen(false)
      setEditingZone(null)
      resetForm()
      fetchZones()
    } catch (error) {
      console.error("Error saving zone:", error)
      toast({
        title: "Error",
        description: "Failed to save JSC zone",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (zone: JSCZone) => {
    setEditingZone(zone)
    setFormData({
      name: zone.name,
      description: zone.description,
      day: zone.day,
      time: zone.time,
      location: zone.location,
      leader: zone.leader,
      focus: zone.focus,
      image_url: zone.image_url || "",
      active: zone.active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this JSC zone?")) return

    try {
      const { error } = await supabase.from("jsc_zones").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "JSC Zone deleted successfully",
      })

      fetchZones()
    } catch (error) {
      console.error("Error deleting zone:", error)
      toast({
        title: "Error",
        description: "Failed to delete JSC zone",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      day: "",
      time: "",
      location: "",
      leader: "",
      focus: "",
      image_url: "",
      active: true,
    })
  }

  const openNewDialog = () => {
    resetForm()
    setEditingZone(null)
    setIsDialogOpen(true)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading JSC zones...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">JSC Zones Management</h1>
          <p className="text-gray-600">Manage your church life groups and small groups</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add JSC Zone
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingZone ? "Edit JSC Zone" : "Add New JSC Zone"}</DialogTitle>
              <DialogDescription>
                {editingZone ? "Update the zone details below." : "Fill in the details for the new JSC zone."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Zone Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day">Meeting Day</Label>
                  <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">Meeting Time</Label>
                  <Input
                    id="time"
                    placeholder="e.g., 7:00 PM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="leader">Leader</Label>
                  <Input
                    id="leader"
                    value={formData.leader}
                    onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="focus">Focus Areas</Label>
                <Input
                  id="focus"
                  placeholder="e.g., Career, Relationships, Purpose"
                  value={formData.focus}
                  onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <Label htmlFor="active">Active Zone</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingZone ? "Update" : "Create"} Zone</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All JSC Zones</CardTitle>
          <CardDescription>Manage your church life groups</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Leader</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Focus</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>{zone.leader}</TableCell>
                  <TableCell>
                    {zone.day}s at {zone.time}
                  </TableCell>
                  <TableCell>{zone.location}</TableCell>
                  <TableCell>{zone.focus}</TableCell>
                  <TableCell>
                    <Badge variant={zone.active ? "default" : "secondary"}>{zone.active ? "Active" : "Inactive"}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(zone)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(zone.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
