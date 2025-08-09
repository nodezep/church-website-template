"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

interface AboutPageData {
  id: string
  hero_title: string
  hero_description: string
  story_title: string
  story_content: string[]
  story_image_url: string
  values_title: string
  values_description: string
  mission_statement: string
  vision_statement: string
}

interface CoreValue {
  id: string
  title: string
  description: string
  icon_name: string
}

interface Leader {
  id: string
  name: string
  role: string
  description: string
  image_url: string
}

function AddCoreValueDialog({ onAdd }: { onAdd: (value: Omit<CoreValue, 'id'>) => void }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState({
    title: "",
    description: "",
    icon_name: "Heart"
  })

  const iconOptions = [
    { value: "Heart", label: "Heart" },
    { value: "Users", label: "Users" },
    { value: "BookOpen", label: "Book" },
    { value: "Globe", label: "Globe" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(value)
    setOpen(false)
    setValue({
      title: "",
      description: "",
      icon_name: "Heart"
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Value
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Core Value</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={value.title}
              onChange={(e) => setValue({ ...value, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={value.description}
              onChange={(e) => setValue({ ...value, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="icon">Icon</Label>
            <Select
              value={value.icon_name}
              onValueChange={(val) => setValue({ ...value, icon_name: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Value</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AddLeaderDialog({ onAdd }: { onAdd: (leader: Omit<Leader, 'id'>) => void }) {
  const [open, setOpen] = useState(false)
  const [leader, setLeader] = useState({
    name: "",
    role: "",
    description: "",
    image_url: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(leader)
    setOpen(false)
    setLeader({
      name: "",
      role: "",
      description: "",
      image_url: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Leader
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Leader</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={leader.name}
              onChange={(e) => setLeader({ ...leader, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={leader.role}
              onChange={(e) => setLeader({ ...leader, role: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={leader.description}
              onChange={(e) => setLeader({ ...leader, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={leader.image_url}
              onChange={(e) => setLeader({ ...leader, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Leader</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminAboutPage() {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null)
  const [coreValues, setCoreValues] = useState<CoreValue[]>([])
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      setLoading(true)
      
      // Fetch about page content
      const { data: aboutData } = await supabase
        .from('about_page')
        .select('*')
        .single()

      // Fetch core values
      const { data: valuesData } = await supabase
        .from('core_values')
        .select('*')
        .order('sort_order', { ascending: true })

      // Fetch leadership team
      const { data: leadersData } = await supabase
        .from('leadership_team')
        .select('*')
        .order('sort_order', { ascending: true })

      setAboutData(aboutData)
      setCoreValues(valuesData || [])
      setLeaders(leadersData || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch about page data",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAboutData = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!aboutData) return

      const { error } = await supabase
        .from('about_page')
        .upsert(aboutData)

      if (error) throw error

      toast({
        title: "Success",
        description: "About page content saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save about page content",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleAddCoreValue = async (value: Omit<CoreValue, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('core_values')
        .insert(value)
        .select()
        .single()

      if (error) throw error

      setCoreValues([...coreValues, data])
      toast({
        title: "Success",
        description: "Core value added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add core value",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleDeleteCoreValue = async (id: string) => {
    try {
      const { error } = await supabase
        .from('core_values')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCoreValues(coreValues.filter(v => v.id !== id))
      toast({
        title: "Success",
        description: "Core value deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete core value",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleAddLeader = async (leader: Omit<Leader, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('leadership_team')
        .insert(leader)
        .select()
        .single()

      if (error) throw error

      setLeaders([...leaders, data])
      toast({
        title: "Success",
        description: "Leader added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add leader",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleDeleteLeader = async (id: string) => {
    try {
      const { error } = await supabase
        .from('leadership_team')
        .delete()
        .eq('id', id)

      if (error) throw error

      setLeaders(leaders.filter(l => l.id !== id))
      toast({
        title: "Success",
        description: "Leader deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete leader",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading about page data...</div>
  }

  return (
    <div className="space-y-8">
      {/* About Page Content */}
      <Card>
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
          <CardDescription>Edit the main content of the about page</CardDescription>
        </CardHeader>
        <CardContent>
          {aboutData && (
            <form onSubmit={handleSaveAboutData} className="space-y-6">
              <div>
                <Label>Hero Section</Label>
                <div className="space-y-4 mt-2">
                  <Input
                    value={aboutData.hero_title}
                    onChange={(e) => setAboutData({...aboutData, hero_title: e.target.value})}
                    placeholder="Hero title"
                  />
                  <Textarea
                    value={aboutData.hero_description}
                    onChange={(e) => setAboutData({...aboutData, hero_description: e.target.value})}
                    placeholder="Hero description"
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <Label>Our Story Section</Label>
                <div className="space-y-4 mt-2">
                  <Input
                    value={aboutData.story_title}
                    onChange={(e) => setAboutData({...aboutData, story_title: e.target.value})}
                    placeholder="Story title"
                  />
                  <Textarea
                    value={aboutData.story_content.join('\n')}
                    onChange={(e) => setAboutData({
                      ...aboutData, 
                      story_content: e.target.value.split('\n').filter(p => p.trim())
                    })}
                    placeholder="Story paragraphs (one per line)"
                    rows={5}
                  />
                  <Input
                    value={aboutData.story_image_url || ''}
                    onChange={(e) => setAboutData({...aboutData, story_image_url: e.target.value})}
                    placeholder="Story image URL"
                  />
                </div>
              </div>

              <div>
                <Label>Values Section</Label>
                <div className="space-y-4 mt-2">
                  <Input
                    value={aboutData.values_title}
                    onChange={(e) => setAboutData({...aboutData, values_title: e.target.value})}
                    placeholder="Values title"
                  />
                  <Input
                    value={aboutData.values_description}
                    onChange={(e) => setAboutData({...aboutData, values_description: e.target.value})}
                    placeholder="Values description"
                  />
                </div>
              </div>

              <div>
                <Label>Mission & Vision</Label>
                <div className="space-y-4 mt-2">
                  <Textarea
                    value={aboutData.mission_statement}
                    onChange={(e) => setAboutData({...aboutData, mission_statement: e.target.value})}
                    placeholder="Mission statement"
                    rows={3}
                  />
                  <Textarea
                    value={aboutData.vision_statement}
                    onChange={(e) => setAboutData({...aboutData, vision_statement: e.target.value})}
                    placeholder="Vision statement"
                    rows={3}
                  />
                </div>
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Core Values */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Core Values</CardTitle>
              <CardDescription>Manage the core values displayed on the about page</CardDescription>
            </div>
            <AddCoreValueDialog onAdd={handleAddCoreValue} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coreValues.map((value) => (
                <TableRow key={value.id}>
                  <TableCell>{value.icon_name}</TableCell>
                  <TableCell>{value.title}</TableCell>
                  <TableCell>{value.description}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCoreValue(value.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Leadership Team */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Leadership Team</CardTitle>
              <CardDescription>Manage the leadership team displayed on the about page</CardDescription>
            </div>
            <AddLeaderDialog onAdd={handleAddLeader} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaders.map((leader) => (
                <TableRow key={leader.id}>
                  <TableCell>{leader.name}</TableCell>
                  <TableCell>{leader.role}</TableCell>
                  <TableCell>{leader.description}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteLeader(leader.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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