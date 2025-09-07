"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Save, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchKidsGallery, upsertKidsGallery, deleteKidsGallery } from "@/lib/kidsService"

const sections = ["transport","devotion","discipleship","worship","preaching","games","tours"]

type Item = { id?: string; section: string; image_url: string; caption?: string; order_index?: number }

export default function KidsGalleryAdminPage() {
  const { toast } = useToast()
  const [section, setSection] = useState<string>("transport")
  const [items, setItems] = useState<Item[]>([])

  const load = async (s: string) => {
    const data = await fetchKidsGallery(s)
    setItems(data)
  }

  useEffect(() => {
    load(section)
  }, [section])

  const addNew = () => {
    setItems((prev) => [...prev, { section, image_url: "", caption: "", order_index: (prev.length || 0) + 1 }])
  }

  const save = async () => {
    try {
      await upsertKidsGallery(items.map(i => ({ id: i.id, section: i.section, image_url: i.image_url, caption: i.caption, order_index: i.order_index })))
      toast({ title: "Saved", description: "Gallery saved." })
      await load(section)
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" })
    }
  }

  const remove = async (id?: string, idx?: number) => {
    try {
      if (id) await deleteKidsGallery(id)
      else if (idx !== undefined) setItems((prev)=> prev.filter((_,i)=>i!==idx))
      await load(section)
      toast({ title: "Deleted", description: "Image removed." })
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Kids Gallery</h1>
        <div className="flex gap-2">
          <Button onClick={addNew} variant="outline"><Plus className="w-4 h-4 mr-2" /> Add Image</Button>
          <Button onClick={save} className="bg-yellow-600 hover:bg-yellow-700"><Save className="w-4 h-4 mr-2" /> Save</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Gallery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mr-3">Section</label>
            <select className="border rounded px-3 py-2" value={section} onChange={(e)=>setSection(e.target.value)}>
              {sections.map((s)=> (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>

          {items.map((it, idx) => (
            <div key={it.id ?? idx} className="grid grid-cols-12 gap-3 items-end border rounded-lg p-3">
              <div className="col-span-4">
                <label className="text-sm font-medium">Image URL</label>
                <Input value={it.image_url} onChange={(e)=>{
                  const v = e.target.value; setItems(prev=> prev.map((p,i)=> i===idx ? { ...p, image_url: v } : p))
                }} />
              </div>
              <div className="col-span-4">
                <label className="text-sm font-medium">Caption</label>
                <Input value={it.caption || ""} onChange={(e)=>{
                  const v = e.target.value; setItems(prev=> prev.map((p,i)=> i===idx ? { ...p, caption: v } : p))
                }} />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Order</label>
                <Input value={it.order_index ?? 0} onChange={(e)=>{
                  const v = Number(e.target.value) || 0; setItems(prev=> prev.map((p,i)=> i===idx ? { ...p, order_index: v } : p))
                }} />
              </div>
              <div className="col-span-2 flex justify-end">
                <Button variant="outline" className="text-red-600" onClick={()=>remove(it.id, idx)}>
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



