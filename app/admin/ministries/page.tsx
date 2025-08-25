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
  color: string
  active: boolean
  created_at: string
  // New fields
  hero_title: string
  hero_description: string
  story_title: string
  story_content: string[]
  story_image_url?: string
  leaders: Array<{
    name: string
    role: string
    description: string
    image_url: string
  }>
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
    color: "bg-blue-500",
    active: true,
    // New fields
    hero_title: "",
    hero_description: "",
    story_title: "",
    story_content: [] as string[],
    story_image_url: "",
    leaders: [] as Array<{
      name: string
      role: string
      description: string
      image_url: string
    }>
  })

  const [newFeature, setNewFeature] = useState("")
  const [newLeader, setNewLeader] = useState({
    name: "",
    role: "",
    description: "",
    image_url: ""
  })
  const [showLeaderForm, setShowLeaderForm] = useState(false)

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
      color: ministry.color,
      active: ministry.active,
      hero_title: ministry.hero_title,
      hero_description: ministry.hero_description,
      story_title: ministry.story_title,
      story_content: ministry.story_content,
      story_image_url: ministry.story_image_url || "",
      leaders: ministry.leaders || []
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

  const addLeader = () => {
    if (newLeader.name.trim() && newLeader.role.trim()) {
      setFormData({ 
        ...formData, 
        leaders: [...formData.leaders, { ...newLeader }] 
      })
      setNewLeader({
        name: "",
        role: "",
        description: "",
        image_url: ""
      })
      setShowLeaderForm(false)
    }
  }

  const removeLeader = (index: number) => {
    setFormData({ ...formData, leaders: formData.leaders.filter((_, i) => i !== index) })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      features: [],
      image_url: "",
      icon: "",
      color: "bg-blue-500",
      active: true,
      hero_title: "",
      hero_description: "",
      story_title: "",
      story_content: [],
      story_image_url: "",
      leaders: []
    })
    setNewFeature("")
    setNewLeader({
      name: "",
      role: "",
      description: "",
      image_url: ""
    })
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMinistry ? "Edit Ministry" : "Add New Ministry"}</DialogTitle>
              <DialogDescription>
                {editingMinistry ? "Update the ministry details below." : "Fill in the details for the new ministry."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="icon">Icon Name</Label>
                  <Input
                    id="icon"
                    placeholder="e.g., Users, Heart, Baby"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    required
                  />
                </div>
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
                  <Label htmlFor="color">Color Class</Label>
                  <Input
                    id="color"
                    placeholder="e.g., bg-blue-500"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
              </div>

              {/* Hero Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hero_title">Hero Title</Label>
                    <Input
                      id="hero_title"
                      value={formData.hero_title}
                      onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero_description">Hero Description</Label>
                    <Textarea
                      id="hero_description"
                      value={formData.hero_description}
                      onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Story Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Story Section</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="story_title">Story Title</Label>
                    <Input
                      id="story_title"
                      value={formData.story_title}
                      onChange={(e) => setFormData({ ...formData, story_title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="story_image_url">Story Image URL</Label>
                    <Input
                      id="story_image_url"
                      value={formData.story_image_url}
                      onChange={(e) => setFormData({ ...formData, story_image_url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="story_content">Story Content (one paragraph per line)</Label>
                  <Textarea
                    id="story_content"
                    value={formData.story_content.join('\n')}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      story_content: e.target.value.split('\n').filter(p => p.trim())
                    })}
                    rows={4}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
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

              {/* Leaders */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Ministry Leaders</h3>
                {!showLeaderForm ? (
                  <Button type="button" onClick={() => setShowLeaderForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Leader
                  </Button>
                ) : (
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={newLeader.name}
                          onChange={(e) => setNewLeader({...newLeader, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input
                          value={newLeader.role}
                          onChange={(e) => setNewLeader({...newLeader, role: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newLeader.description}
                        onChange={(e) => setNewLeader({...newLeader, description: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={newLeader.image_url}
                        onChange={(e) => setNewLeader({...newLeader, image_url: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" onClick={addLeader}>
                        Add Leader
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowLeaderForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {formData.leaders.map((leader, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{leader.name}</div>
                        <div className="text-sm text-gray-600">{leader.role}</div>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeLeader(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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