"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Edit, Trash2, X } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

interface Ministry {
  id: string
  title: string
  description: string
  features: string[]
  image_url?: string
  icon: string
  active: boolean
  created_at: string
}

export default function AdminMinistriesPage() {
  const [ministries, setMinistries] = useState<Ministry[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: [] as string[],
    image_url: "",
    icon: "",
    active: true,
  })

  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    fetchMinistries()
  }, [])

  const fetchMinistries = async () => {
    try {
      const { data, error } = await supabase.from("ministries").select("*").order("title", { ascending: true })

      if (error) throw error
      setMinistries(data || [])
    } catch (error) {
      console.error("Error fetching ministries:", error)
      toast({
        title: "Error",
        description: "Failed to fetch ministries",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingMinistry) {
        const { error } = await supabase.from("ministries").update(formData).eq("id", editingMinistry.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Ministry updated successfully",
        })
      } else {
        const { error } = await supabase.from("ministries").insert([formData])

        if (error) throw error

        toast({
          title: "Success",
          description: "Ministry created successfully",
        })
      }

      setIsDialogOpen(false)
      setEditingMinistry(null)
      resetForm()
      fetchMinistries()
    } catch (error) {
      console.error("Error saving ministry:", error)
      toast({
        title: "Error",
        description: "Failed to save ministry",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry)
    setFormData({
      title: ministry.title,
      description: ministry.description,
      features: ministry.features,
      image_url: ministry.image_url || "",
      icon: ministry.icon,
      active: ministry.active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ministry?")) return

    try {
      const { error } = await supabase.from("ministries").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Ministry deleted successfully",
      })

      fetchMinistries()
    } catch (error) {
      console.error("Error deleting ministry:", error)
      toast({
        title: "Error",
        description: "Failed to delete ministry",
        variant: "destructive",
      })
    }
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] })
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      features: [],
      image_url: "",
      icon: "",
      active: true,
    })
    setNewFeature("")
  }

  const openNewDialog = () => {
    resetForm()
    setEditingMinistry(null)
    setIsDialogOpen(true)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading ministries...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ministries Management</h1>
          <p className="text-gray-600">Manage your church ministries and programs</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Ministry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMinistry ? "Edit Ministry" : "Add New Ministry"}</DialogTitle>
              <DialogDescription>
                {editingMinistry ? "Update the ministry details below." : "Fill in the details for the new ministry."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Ministry Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

              <div>
                <Label htmlFor="icon">Icon Name (Lucide React)</Label>
                <Input
                  id="icon"
                  placeholder="e.g., Users, Heart, Baby, Music"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
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

              <div>
                <Label>Features</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <button type="button" onClick={() => removeFeature(index)} className="ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <Label htmlFor="active">Active Ministry</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingMinistry ? "Update" : "Create"} Ministry</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Ministries</CardTitle>
          <CardDescription>Manage your church ministries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ministries.map((ministry) => (
                <TableRow key={ministry.id}>
                  <TableCell className="font-medium">{ministry.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{ministry.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ministry.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {ministry.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{ministry.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{ministry.icon}</TableCell>
                  <TableCell>
                    <Badge variant={ministry.active ? "default" : "secondary"}>
                      {ministry.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(ministry)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(ministry.id)}>
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
