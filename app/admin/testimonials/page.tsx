"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Save, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { fetchContactByEmail, Testimonial as BaseTestimonial } from "@/lib/homeService"

// Extend the Testimonial type to include created_at
interface Testimonial extends BaseTestimonial {
  created_at?: string;
}

interface ContactPreview {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function TestimonialsAdminPage() {
  const { toast } = useToast()
  const [list, setList] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Testimonial>({ name: "", content: "", role: "", rating: 5, email: "" })
  const [contactPreview, setContactPreview] = useState<ContactPreview | null>(null)

  const load = async () => {
    try {
       const { data, error } = await supabase
         .from("testimonials")
         .select("id,name,role,content,rating,image_url,created_at")
        .order("created_at", { ascending: false })
      
      if (error) {
        console.error("Failed to load testimonials:", error)
        throw new Error(error.message || "Failed to load testimonials")
      }
      setList(data || [])
    } catch (error: any) {
      console.error("Error loading testimonials:", error)
      setList([])
      toast({
        title: "Error",
        description: error.message || "Failed to load testimonials",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    const lookup = async () => {
      if (!editing.email) { setContactPreview(null); return }
      const contact = await fetchContactByEmail(editing.email)
      setContactPreview(contact)
      if (contact && (!editing.name || editing.name.trim() === "")) {
        setEditing({ ...editing, name: contact.name })
      }
    }
    lookup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing.email])

  const save = async () => {
    try {
      if (!editing.name || !editing.content) {
        toast({ title: "Missing fields", description: "Name and Content are required.", variant: "destructive" })
        return
      }

      // Create clean payload with proper null handling
       const payload = {
        name: editing.name,
        role: editing.role || null,
        content: editing.content,
         rating: editing.rating ?? 5,
         image_url: editing.image_url || null,
      }

      let result
      if (editing.id) {
        result = await supabase
          .from("testimonials")
          .update(payload)
          .eq("id", editing.id)
          .select("id")
          .maybeSingle()
      } else {
        result = await supabase
          .from("testimonials")
          .insert([payload])
          .select("id")
          .maybeSingle()
      }

      if (result.error) {
        console.error("Supabase save error:", {
          message: result.error.message,
          details: result.error.details,
          hint: result.error.hint,
          code: result.error.code
        })
        throw new Error(result.error.message || `Failed to ${editing.id ? 'update' : 'create'} testimonial`)
      }

      setEditing({ name: "", content: "", role: "", rating: 5, email: "" })
      setContactPreview(null)
      await load()
      toast({ title: "Saved", description: "Testimonial saved successfully." })
    } catch (e: any) {
      console.error("Save testimonial error:", e)
      toast({ 
        title: "Error", 
        description: e.message || "Failed to save testimonial", 
        variant: "destructive" 
      })
    }
  }

  const remove = async (id?: string) => {
    if (!id) return
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)
      if (error) {
        console.error("Supabase delete error:", error)
        throw new Error(error.message || "Failed to delete testimonial")
      }
      await load()
      toast({ title: "Deleted", description: "Testimonial removed successfully." })
    } catch (e: any) {
      console.error("Delete testimonial error:", e)
      toast({ 
        title: "Error", 
        description: e.message || "Failed to delete testimonial", 
        variant: "destructive" 
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create / Edit Testimonial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input 
                value={editing.name} 
                onChange={(e) => setEditing({ ...editing, name: e.target.value })} 
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Input 
                value={editing.role || ""} 
                onChange={(e) => setEditing({ ...editing, role: e.target.value })} 
                placeholder="e.g., Church Member, Volunteer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email (link to contact)</label>
              <Input 
                value={editing.email || ""} 
                onChange={(e) => setEditing({ ...editing, email: e.target.value })} 
                placeholder="person@example.com" 
                type="email"
              />
            </div>
            <div className="text-sm text-gray-600 flex items-end">
              {contactPreview ? (
                <div>
                  <div>Found contact: <span className="font-medium">{contactPreview.name}</span></div>
                  <div className="truncate max-w-[28rem]">Subject: {contactPreview.subject}</div>
                </div>
              ) : (
                <div>No contact found for this email</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input 
                value={editing.image_url || ""} 
                onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} 
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Rating (1-5)</label>
              <Input 
                type="number" 
                min="1" 
                max="5"
                value={editing.rating ?? 5} 
                onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) || 5 })} 
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Content *</label>
            <Textarea 
              rows={4} 
              value={editing.content} 
              onChange={(e) => setEditing({ ...editing, content: e.target.value })} 
              placeholder="Enter testimonial content..."
              required
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={save} className="bg-yellow-600 hover:bg-yellow-700">
              <Save className="w-4 h-4 mr-2" /> Save Testimonial
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { 
                setEditing({ name: "", content: "", role: "", rating: 5, email: "" }); 
                setContactPreview(null) 
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Testimonials ({list.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {list.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No testimonials found. Create your first testimonial above.
            </div>
          ) : (
            list.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-4 p-4 rounded-lg border">
                <div className="flex-1">
                  <div className="font-semibold">{t.name} {t.role && <span className="text-gray-500">({t.role})</span>}</div>
                   {/* email hidden until column exists in DB */}
                  <div className="text-sm text-gray-600">Rating: {t.rating ?? 5}/5</div>
                  <div className="mt-2 text-gray-700">{t.content}</div>
                  {t.image_url && (
                    <div className="mt-2 text-xs text-blue-500 truncate">
                      Image: {t.image_url}
                    </div>
                  )}
                  {t.created_at && (
                    <div className="mt-1 text-xs text-gray-400">
                      Created: {new Date(t.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditing(t)}>
                    Edit
                  </Button>
                  <Button variant="outline" className="text-red-600" onClick={() => remove(t.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}