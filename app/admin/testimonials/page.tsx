"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Save, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchTestimonials, upsertTestimonial, deleteTestimonial, Testimonial } from "@/lib/homeService"

export default function TestimonialsAdminPage() {
  const { toast } = useToast()
  const [list, setList] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Testimonial>({ name: "", content: "", role: "", rating: 5 })

  const load = async () => {
    const items = await fetchTestimonials()
    setList(items)
  }

  useEffect(() => {
    load()
  }, [])

  const save = async () => {
    try {
      await upsertTestimonial(editing)
      setEditing({ name: "", content: "", role: "", rating: 5 })
      await load()
      toast({ title: "Saved", description: "Testimonial saved." })
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" })
    }
  }

  const remove = async (id?: string) => {
    if (!id) return
    try {
      await deleteTestimonial(id)
      await load()
      toast({ title: "Deleted", description: "Testimonial removed." })
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create / Edit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={editing.name} onChange={(e)=>setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Input value={editing.role || ""} onChange={(e)=>setEditing({ ...editing, role: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input value={editing.image_url || ""} onChange={(e)=>setEditing({ ...editing, image_url: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Rating (1-5)</label>
              <Input value={editing.rating ?? 5} onChange={(e)=>setEditing({ ...editing, rating: Number(e.target.value) || 5 })} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea rows={4} value={editing.content} onChange={(e)=>setEditing({ ...editing, content: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button onClick={save} className="bg-yellow-600 hover:bg-yellow-700">
              <Save className="w-4 h-4 mr-2" /> Save Testimonial
            </Button>
            <Button variant="outline" onClick={()=>setEditing({ name: "", content: "", role: "", rating: 5 })}>Clear</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {list.map((t) => (
            <div key={t.id} className="flex items-start justify-between gap-4 p-4 rounded-lg border">
              <div>
                <div className="font-semibold">{t.name} <span className="text-gray-500">({t.role})</span></div>
                <div className="text-sm text-gray-600">Rating: {t.rating ?? 5}</div>
                <div className="mt-2 text-gray-700">{t.content}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={()=>setEditing(t)}>Edit</Button>
                <Button variant="outline" className="text-red-600" onClick={()=>remove(t.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}



