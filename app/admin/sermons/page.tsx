"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { format } from "date-fns"

interface Sermon {
  id: string
  title: string
  date: string
  youtube_url: string
  youtube_id: string
  youtube_embed_url: string
  thumbnail_url: string
  featured: boolean
  created_at: string
}

export default function AdminSermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    youtube_url: "",
    title: "",
    date: "",
    thumbnail_url: "",
    featured: false,
    youtube_id: "",
    youtube_embed_url: ""
  })

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("date", { ascending: false })

      if (error) throw error
      setSermons(data || [])
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch sermons", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const extractYouTubeData = async (url: string) => {
    try {
      // Extract YouTube ID
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;

      if (!videoId) return null;

      // Fetch video metadata
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      const data = await response.json();

      return {
        youtube_id: videoId,
        youtube_embed_url: `https://www.youtube.com/embed/${videoId}`,
        title: data.title,
        thumbnail_url: data.thumbnail_url,
        date: new Date().toISOString().split('T')[0] // Current date
      };
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      return null;
    }
  }

  const handleYoutubeUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) return;

    const youtubeData = await extractYouTubeData(url);
    if (youtubeData) {
      setFormData({
        ...formData,
        youtube_url: url,
        ...youtubeData
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submissionData = {
        title: formData.title,
        date: formData.date,
        youtube_url: formData.youtube_url,
        youtube_id: formData.youtube_id,
        youtube_embed_url: formData.youtube_embed_url,
        thumbnail_url: formData.thumbnail_url,
        featured: formData.featured
      }

      if (editingSermon) {
        await supabase.from("sermons").update(submissionData).eq("id", editingSermon.id)
      } else {
        await supabase.from("sermons").insert([submissionData])
      }

      toast({ title: "Success", description: `Sermon ${editingSermon ? 'updated' : 'added'} successfully` })
      setIsDialogOpen(false)
      fetchSermons()
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Operation failed", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (sermon: Sermon) => {
    setEditingSermon(sermon)
    setFormData({
      youtube_url: sermon.youtube_url,
      title: sermon.title,
      date: sermon.date,
      thumbnail_url: sermon.thumbnail_url,
      featured: sermon.featured,
      youtube_id: sermon.youtube_id,
      youtube_embed_url: sermon.youtube_embed_url
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sermon?")) return
    try {
      await supabase.from("sermons").delete().eq("id", id)
      toast({ title: "Success", description: "Sermon deleted" })
      fetchSermons()
    } catch (error) {
      toast({ title: "Error", description: "Delete failed", variant: "destructive" })
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sermons</h1>
          <p className="text-gray-600">Auto-generated from YouTube</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSermon(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Sermon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSermon ? "Edit Sermon" : "Add Sermon"}</DialogTitle>
              <DialogDescription>Paste YouTube URL to auto-fill details</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>YouTube URL</Label>
                <Input
                  value={formData.youtube_url}
                  onChange={handleYoutubeUrlChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              {formData.thumbnail_url && (
                <div className="flex flex-col items-center">
                  <img 
                    src={formData.thumbnail_url} 
                    alt="YouTube thumbnail" 
                    className="h-48 rounded-md object-cover"
                  />
                  <p className="mt-2 text-sm text-center font-medium">{formData.title}</p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="featured">Featured Sermon</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Sermons</CardTitle>
          <CardDescription>Recently added sermons</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sermons.map((sermon) => (
                <TableRow key={sermon.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={sermon.thumbnail_url} 
                        alt="Thumbnail" 
                        className="h-10 w-16 rounded object-cover"
                      />
                      <span>{sermon.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(sermon.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    {sermon.featured && <Badge>Featured</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(sermon)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(sermon.id)}>
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