"use client"

import { useState } from "react"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Car, 
  BookOpen, 
  Church, 
  Music, 
  Mic, 
  Gamepad2, 
  MapPin,
  Save,
  Edit,
  Trash2,
  Plus
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchKidsClasses, upsertKidsClasses, fetchKidsTransport, upsertKidsTransport, fetchKidsGallery, upsertKidsGallery, deleteKidsGallery } from "@/lib/kidsService"

export default function KidsAdminPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("classes")
  const [gallerySection, setGallerySection] = useState<string>("transport")
  const [galleryItems, setGalleryItems] = useState<any[]>([])

  // Sample data - in a real app, this would come from a database
  const [kidsClasses, setKidsClasses] = useState([
    {
      name: "Nazareth",
      age_range: "Ages 3-9",
      description: "Our youngest learners discover God's love through stories, songs, and creative activities.",
      capacity: "15-20 kids",
      features: ["Bible Stories", "Creative Crafts", "Fun Songs", "Play Time"]
    },
    {
      name: "Galilee", 
      age_range: "Ages 10-12",
      description: "Growing in faith through interactive lessons, games, and meaningful discussions.",
      capacity: "20-25 kids",
      features: ["Interactive Lessons", "Team Games", "Memory Verses", "Friendship Building"]
    },
    {
      name: "Jerusalem",
      age_range: "Ages 13-18", 
      description: "Teens explore deeper faith concepts and build lasting relationships with God and peers.",
      capacity: "25-30 teens",
      features: ["Deep Bible Study", "Leadership Skills", "Mission Projects", "Peer Mentoring"]
    }
  ])

  const [transportInfo, setTransportInfo] = useState({
    description: "We provide safe and reliable transportation to ensure every child can join us for church activities",
    sunday_pickup: "8:30 AM",
    sunday_dropoff: "12:00 PM", 
    wednesday_time: "6:00 PM",
    features: [
      "All vehicles are regularly inspected and drivers are background checked",
      "Reliable pickup and drop-off times to fit your family's schedule",
      "We serve multiple neighborhoods to make church accessible to all"
    ]
  })

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Kids page content has been saved successfully!",
    })
  }

  useEffect(() => {
    const load = async () => {
      const cls = await fetchKidsClasses()
      if (cls.length) setKidsClasses(cls as any)
      const tr = await fetchKidsTransport()
      if (tr) setTransportInfo(tr as any)
    }
    load()
  }, [])

  useEffect(() => {
    const loadGallery = async () => {
      const data = await fetchKidsGallery(gallerySection)
      setGalleryItems(data as any)
    }
    loadGallery()
  }, [gallerySection])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kids Page Management</h1>
          <p className="text-gray-600 mt-2">Manage all content for the kids ministry page</p>
        </div>
        <Button onClick={handleSave} className="bg-yellow-600 hover:bg-yellow-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="devotion">Devotion</TabsTrigger>
          <TabsTrigger value="discipleship">Discipleship</TabsTrigger>
          <TabsTrigger value="worship">Worship</TabsTrigger>
          <TabsTrigger value="preaching">Preaching</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        {/* Kids Classes Tab */}
        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Kids Classes Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {kidsClasses.map((classItem, index) => (
                <Card key={(classItem as any).id ?? `${classItem.name}-${index}`} className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium">Class Name</label>
                            <Input value={classItem.name} onChange={(e)=>{
                              const v = e.target.value; setKidsClasses((prev:any)=> prev.map((c:any,i:number)=> i===index ? { ...c, name: v } : c))
                            }} />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Age Range</label>
                            <Input value={(classItem as any).age_range ?? ''} onChange={(e)=>{
                              const v = e.target.value; setKidsClasses((prev:any)=> prev.map((c:any,i:number)=> i===index ? { ...c, age_range: v } : c))
                            }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-red-600" onClick={()=>{
                          setKidsClasses((prev:any)=> prev.filter((_:any,i:number)=> i!==index))
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea 
                      value={classItem.description}
                      onChange={(e)=>{
                        const v = e.target.value; setKidsClasses((prev:any)=> prev.map((c:any,i:number)=> i===index ? { ...c, description: v } : c))
                      }}
                      className="mb-4"
                      rows={3}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Capacity</label>
                        <Input value={classItem.capacity}
                          onChange={(e)=>{
                            const v = e.target.value; setKidsClasses((prev:any)=> prev.map((c:any,i:number)=> i===index ? { ...c, capacity: v } : c))
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Features (comma separated)</label>
                        <Input value={classItem.features.join(", ")}
                          onChange={(e)=>{
                            const v = e.target.value.split(',').map((s)=> s.trim()).filter(Boolean)
                            setKidsClasses((prev:any)=> prev.map((c:any,i:number)=> i===index ? { ...c, features: v } : c))
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-end">
                <Button onClick={async ()=>{ try { await upsertKidsClasses(kidsClasses as any); toast({title:"Saved", description:"Classes saved."}) } catch(e:any){ toast({title:"Error", description:e.message, variant:"destructive"}) } }} className="bg-yellow-600 hover:bg-yellow-700">
                  <Save className="w-4 h-4 mr-2" /> Save Classes
                </Button>
              </div>
              <Button variant="outline" className="w-full" onClick={()=>{
                setKidsClasses((prev:any)=> [...prev, { name: "New Class", age_range: "Ages 0-0", description: "", capacity: "", features: [] }])
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Class
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Kids Gallery Tab */}
        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mr-3">Section</label>
                <select className="border rounded px-3 py-2" value={gallerySection} onChange={(e)=>setGallerySection(e.target.value)}>
                  {["transport","devotion","discipleship","worship","preaching","games","tours"].map((s)=> (<option key={s} value={s}>{s}</option>))}
                </select>
                <Button variant="outline" className="ml-3" onClick={()=> setGalleryItems((prev:any)=> [...prev, { section: gallerySection, image_url: "", caption: "", order_index: (prev?.length||0)+1 }])}>Add Image</Button>
              </div>

              {galleryItems.map((it:any, idx:number)=> (
                <div key={it.id ?? idx} className="grid grid-cols-12 gap-3 items-end border rounded-lg p-3">
                  <div className="col-span-4">
                    <label className="text-sm font-medium">Image URL</label>
                    <Input value={it.image_url} onChange={(e)=>{
                      const v = e.target.value; setGalleryItems((prev:any)=> prev.map((p:any,i:number)=> i===idx ? { ...p, image_url: v } : p))
                    }} />
                  </div>
                  <div className="col-span-4">
                    <label className="text-sm font-medium">Caption</label>
                    <Input value={it.caption || ""} onChange={(e)=>{
                      const v = e.target.value; setGalleryItems((prev:any)=> prev.map((p:any,i:number)=> i===idx ? { ...p, caption: v } : p))
                    }} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Order</label>
                    <Input value={it.order_index ?? 0} onChange={(e)=>{
                      const v = Number(e.target.value) || 0; setGalleryItems((prev:any)=> prev.map((p:any,i:number)=> i===idx ? { ...p, order_index: v } : p))
                    }} />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button variant="outline" className="text-red-600" onClick={async ()=>{
                      if (it.id) {
                        try { await deleteKidsGallery(it.id) } catch {}
                      }
                      setGalleryItems((prev:any)=> prev.filter((_:any,i:number)=> i!==idx))
                    }}>Remove</Button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <Button onClick={async ()=>{
                  try { await upsertKidsGallery(galleryItems.map((g:any)=> ({ id: g.id, section: gallerySection, image_url: g.image_url, caption: g.caption, order_index: g.order_index })) as any); toast({title:"Saved", description:"Gallery saved."}) } catch(e:any){ toast({title:"Error", description:e.message, variant:"destructive"}) }
                }} className="bg-yellow-600 hover:bg-yellow-700">
                  <Save className="w-4 h-4 mr-2" /> Save Gallery
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transport Tab */}
        <TabsContent value="transport" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Transport Service Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Service Description</label>
                <Textarea 
                  value={transportInfo.description}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Sunday Pickup Time</label>
                  <Input value={transportInfo.sunday_pickup} onChange={(e)=> setTransportInfo((prev:any)=> ({ ...prev, sunday_pickup: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sunday Drop-off Time</label>
                  <Input value={transportInfo.sunday_dropoff} onChange={(e)=> setTransportInfo((prev:any)=> ({ ...prev, sunday_dropoff: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Wednesday Evening</label>
                  <Input value={transportInfo.wednesday_time} onChange={(e)=> setTransportInfo((prev:any)=> ({ ...prev, wednesday_time: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Service Features</label>
                {transportInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input value={feature} onChange={(e)=>{
                      const v = e.target.value
                      setTransportInfo((prev:any)=> ({ ...prev, features: prev.features.map((f:string,i:number)=> i===index ? v : f) }))
                    }} />
                    <Button variant="outline" size="sm" className="text-red-600" onClick={()=>{
                      setTransportInfo((prev:any)=> ({ ...prev, features: prev.features.filter((_:string,i:number)=> i!==index) }))
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2" onClick={()=> setTransportInfo((prev:any)=> ({ ...prev, features: [...prev.features, ""] }))}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>
              <div className="flex justify-end">
                <Button onClick={async ()=>{ try { await upsertKidsTransport(transportInfo as any); toast({title:"Saved", description:"Transport saved."}) } catch(e:any){ toast({title:"Error", description:e.message, variant:"destructive"}) } }} className="bg-yellow-600 hover:bg-yellow-700">
                  <Save className="w-4 h-4 mr-2" /> Save Transport
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs with similar structure */}
        <TabsContent value="devotion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Sunday Devotion Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage Sunday devotion content, activities, and schedules.</p>
              <div className="mt-4">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Devotion Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discipleship" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Church className="w-5 h-5 mr-2" />
                Discipleship & Prayer Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage discipleship programs, prayer circles, and mentorship activities.</p>
              <div className="mt-4">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Discipleship Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="worship" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Music className="w-5 h-5 mr-2" />
                Praise & Worship Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage worship teams, songs, and praise activities.</p>
              <div className="mt-4">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Worship Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preaching" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="w-5 h-5 mr-2" />
                Kids Preaching Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage kids preaching content, messages, and schedules.</p>
              <div className="mt-4">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Preaching Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Games & Sports Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage games, sports activities, and recreational programs.</p>
              <div className="mt-4">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Games Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Tours & Adventures Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage tours, adventures, and educational trips.</p>
              <div className="mt-4">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Tours Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
