"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchKidsGallery, upsertKidsGallery, deleteKidsGallery } from "@/lib/kidsService"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type KidsCTAContent = {
  title: string
  description: string
  primaryText: string
  primaryLink: string
  secondaryText?: string
  secondaryLink?: string
}

export default function AdminKidsPage() {
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const [activeTab, setActiveTab] = useState("transport")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const SECTIONS: { key: string; label: string }[] = [
    { key: "transport", label: "Transport" },
    { key: "sunday_devotion", label: "Sunday Devotion" },
    { key: "saturday_devotion", label: "Saturday Devotion" },
    { key: "discipleship_prayer", label: "Discipleship & Prayer" },
    { key: "praise_worship", label: "Praise & Worship" },
    { key: "kids_preaching", label: "Kids Preaching" },
    { key: "fun_games_sports", label: "Fun Games & Sports" },
    { key: "fun_tours_adventures", label: "Fun Tours & Adventures" },
  ]

  type SectionContent = {
    description: string
    sunday_pickup: string
    sunday_dropoff: string
    wednesday_time: string
    features: string[]
  }

  const defaultContent: SectionContent = {
    description: "",
    sunday_pickup: "",
    sunday_dropoff: "",
    wednesday_time: "",
    features: [],
  }

  const getDefaults = (sectionKey: string): { content: SectionContent; cta: KidsCTAContent; gallery: { section: string; image_url: string; caption?: string; order_index?: number }[] } => {
    switch (sectionKey) {
      case "transport":
        return {
          content: {
            description:
              "We provide safe and reliable transportation to ensure every child can join us for church activities",
            sunday_pickup: "8:30 AM",
            sunday_dropoff: "12:00 PM",
            wednesday_time: "6:00 PM",
            features: ["Safe & Secure", "On Time", "Wide Coverage"],
          },
          cta: {
            title: "Need Transport?",
            description:
              "Contact us to arrange transportation for your child. We're here to help make church accessible for your family.",
            primaryText: "Request Transport",
            primaryLink: "/contact",
            secondaryText: "View Routes",
            secondaryLink: "/kids#routes",
          },
          gallery: [
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
          ],
        }
      case "sunday_devotion":
        return {
          content: {
            description:
              "A special time for children to connect with God through stories, prayer, and meaningful activities",
            sunday_pickup: "10:00 AM",
            sunday_dropoff: "",
            wednesday_time: "",
            features: ["Bible Stories", "Prayer Time", "Group Discussion", "Memory Verses"],
          },
          cta: {
            title: "Join Our Sunday Devotion",
            description:
              "Every Sunday at 10:00 AM, we gather for a special time of learning and growing in faith together.",
            primaryText: "Join This Sunday",
            primaryLink: "/contact",
            secondaryText: "Learn More",
            secondaryLink: "/kids",
          },
          gallery: [
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
          ],
        }
      case "discipleship_prayer":
        return {
          content: {
            description:
              "Building deep spiritual foundations through prayer, mentorship, and meaningful relationships",
            sunday_pickup: "",
            sunday_dropoff: "",
            wednesday_time: "6:00 PM",
            features: ["Prayer Circles", "Bible Study", "Mentorship", "Heart Sharing"],
          },
          cta: {
            title: "Join Our Discipleship Program",
            description:
              "Every Wednesday at 6:00 PM, we gather for prayer, Bible study, and spiritual growth together.",
            primaryText: "Join Discipleship",
            primaryLink: "/contact",
            secondaryText: "Prayer Requests",
            secondaryLink: "/kids",
          },
          gallery: [
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
          ],
        }
      case "praise_worship":
        return {
          content: {
            description:
              "Celebrating God's love through music, song, and joyful worship together",
            sunday_pickup: "10:30 AM",
            sunday_dropoff: "",
            wednesday_time: "",
            features: ["Kids Choir", "Praise Team", "Dance Ministry", "Heart of Worship"],
          },
          cta: {
            title: "Join Our Worship Team",
            description:
              "Every Sunday at 10:30 AM, we gather for a time of joyful worship and praise together.",
            primaryText: "Join Worship",
            primaryLink: "/contact",
            secondaryText: "Learn Songs",
            secondaryLink: "/kids",
          },
          gallery: [
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
          ],
        }
      case "fun_games_sports":
        return {
          content: {
            description:
              "Learning and growing through play, sports, and fun activities that build character and friendships",
            sunday_pickup: "",
            sunday_dropoff: "",
            wednesday_time: "Saturday 2:00 PM",
            features: ["Fun Games", "Sports Activities", "Team Building", "Character Building"],
          },
          cta: {
            title: "Join Our Games & Sports",
            description:
              "Every Saturday at 2:00 PM, we have fun games and sports activities for all ages.",
            primaryText: "Join Games",
            primaryLink: "/contact",
            secondaryText: "View Schedule",
            secondaryLink: "/kids",
          },
          gallery: [
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
          ],
        }
      case "kids_preaching":
        return {
          content: {
            description: "Children sharing the Word in age-appropriate ways and learning to communicate truth.",
            sunday_pickup: "",
            sunday_dropoff: "",
            wednesday_time: "",
            features: ["Practice Sessions", "Short Messages", "Peer Feedback", "Confidence Building"],
          },
          cta: {
            title: "Join Kids Preaching",
            description: "Sign up to participate in kids preaching and develop communication skills.",
            primaryText: "Sign Up",
            primaryLink: "/contact",
            secondaryText: "Learn More",
            secondaryLink: "/kids",
          },
          gallery: [
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
          ],
        }
      case "saturday_devotion":
        return {
          content: {
            description: "Weekend devotion time focused on reflection, prayer, and community.",
            sunday_pickup: "",
            sunday_dropoff: "",
            wednesday_time: "Saturday",
            features: ["Quiet Time", "Group Sharing", "Prayer Walk", "Worship"],
          },
          cta: {
            title: "Join Saturday Devotion",
            description: "Connect with God and friends during our Saturday devotion.",
            primaryText: "Join",
            primaryLink: "/contact",
            secondaryText: "Schedule",
            secondaryLink: "/kids",
          },
          gallery: [{ section: sectionKey, image_url: "/placeholder.jpg" }],
        }
      case "fun_tours_adventures":
        return {
          content: {
            description: "Exciting outings and adventures that help kids explore, learn, and grow together.",
            sunday_pickup: "",
            sunday_dropoff: "",
            wednesday_time: "",
            features: ["Field Trips", "Nature Walks", "Museum Visits", "Camp Days"],
          },
          cta: {
            title: "Join Our Next Adventure",
            description: "Be part of our next fun tour or adventure!",
            primaryText: "Get Notified",
            primaryLink: "/contact",
            secondaryText: "View Trips",
            secondaryLink: "/kids",
          },
          gallery: [
            { section: sectionKey, image_url: "/placeholder.jpg" },
            { section: sectionKey, image_url: "/placeholder.jpg" },
          ],
        }
      default:
        return { content: { ...defaultContent }, cta: { title: "Get Involved", description: "", primaryText: "Contact Us", primaryLink: "/contact" }, gallery: [] }
    }
  }

  const [contentMap, setContentMap] = useState<Record<string, SectionContent>>({})
  const [ctaMap, setCtaMap] = useState<Record<string, KidsCTAContent>>({})
  const [galleryMap, setGalleryMap] = useState<Record<string, { id?: string; section: string; image_url: string; caption?: string; order_index?: number }[]>>({})
  const [newFeature, setNewFeature] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newImageCaption, setNewImageCaption] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        // Load only the active section initially for speed
        await loadSection(activeTab)
      } catch (err) {
        console.error(err)
        toast({ title: "Error", description: "Failed to load kids content", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [supabase, toast])

  const loadSection = async (sectionKey: string) => {
    try {
      // Content
      const { data: contentRow } = await supabase
        .from("home_content")
        .select("content")
        .eq("component_type", `kids_${sectionKey}`)
        .single()

      const defaults = getDefaults(sectionKey)
      const content: SectionContent = (contentRow?.content as SectionContent) || defaults.content
      setContentMap((prev) => ({ ...prev, [sectionKey]: content }))

      // CTA
      const { data: ctaRow } = await supabase
        .from("home_content")
        .select("content")
        .eq("component_type", `kids_${sectionKey}_cta`)
        .single()

      const cta: KidsCTAContent = (ctaRow?.content as KidsCTAContent) || defaults.cta
      setCtaMap((prev) => ({ ...prev, [sectionKey]: cta }))

      // Gallery
      const g = await fetchKidsGallery(sectionKey)
      setGalleryMap((prev) => ({ ...prev, [sectionKey]: (g && g.length > 0 ? g : defaults.gallery) }))
    } catch (err) {
      console.error("loadSection error", err)
    }
  }

  const saveSectionContent = async (sectionKey: string) => {
    try {
      setSaving(true)
      const content = contentMap[sectionKey] || { ...defaultContent }

      const { data: existing } = await supabase
        .from("home_content")
        .select("id")
        .eq("component_type", `kids_${sectionKey}`)
        .single()

      if (existing) {
        const { error } = await supabase
          .from("home_content")
          .update({ content, updated_at: new Date().toISOString() })
          .eq("component_type", `kids_${sectionKey}`)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("home_content")
          .insert({ component_type: `kids_${sectionKey}`, content, is_active: true })
        if (error) throw error
      }

      toast({ title: "Saved", description: "Section info updated" })
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to save section", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const addFeature = () => {
    if (!newFeature.trim()) return
    const key = activeTab
    const current = contentMap[key] || { ...defaultContent }
    setContentMap((prev) => ({ ...prev, [key]: { ...current, features: [...(current.features || []), newFeature.trim()] } }))
    setNewFeature("")
  }

  const removeFeature = (index: number) => {
    const key = activeTab
    const current = contentMap[key] || { ...defaultContent }
    setContentMap((prev) => ({ ...prev, [key]: { ...current, features: (current.features || []).filter((_, i) => i !== index) } }))
  }

  const addImage = () => {
    if (!newImageUrl.trim()) return
    const key = activeTab
    const prev = galleryMap[key] || []
    const updated = [
      ...prev,
      { section: key, image_url: newImageUrl.trim(), caption: newImageCaption.trim(), order_index: prev.length },
    ]
    console.log(`Adding image for ${key}:`, { prev: prev.length, updated: updated.length })
    setGalleryMap((m) => ({ ...m, [key]: updated }))
    setNewImageUrl("")
    setNewImageCaption("")
  }

  const removeImage = async (index: number, id?: string) => {
    try {
      if (id) await deleteKidsGallery(id)
      const key = activeTab
      setGalleryMap((prev) => ({ ...prev, [key]: (prev[key] || []).filter((_, i) => i !== index) }))
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to delete image", variant: "destructive" })
    }
  }

  const saveGallery = async () => {
    try {
      setSaving(true)
      const key = activeTab
      const list = galleryMap[key] || []
      const normalized = list.map((item, i) => ({ ...item, section: key, order_index: i }))
      await upsertKidsGallery(normalized)
      
      // Reload the gallery data to get the updated IDs from the database
      const updatedGallery = await fetchKidsGallery(key)
      setGalleryMap((prev) => ({ ...prev, [key]: updatedGallery || [] }))
      
      toast({ title: "Saved", description: "Gallery updated" })
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to save gallery", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const saveCTA = async () => {
    try {
      setSaving(true)
      const key = activeTab
      const cta = ctaMap[key]

      const { data: existing } = await supabase
        .from("home_content")
        .select("id")
        .eq("component_type", `kids_${key}_cta`)
        .single()

      if (existing) {
        const { error } = await supabase
          .from("home_content")
          .update({ content: cta, updated_at: new Date().toISOString() })
          .eq("component_type", `kids_${key}_cta`)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("home_content")
          .insert({ component_type: `kids_${key}_cta`, content: cta, is_active: true })
        if (error) throw error
      }

      toast({ title: "Saved", description: "CTA section updated" })
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to save CTA", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  // Lazy-load data when switching tabs
  useEffect(() => {
    if (!contentMap[activeTab] || !ctaMap[activeTab] || !galleryMap[activeTab]) {
      loadSection(activeTab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Kids Page Management</h1>
        <p className="text-gray-600">Edit transport info, schedules, images and CTA</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full">
          {SECTIONS.map((s) => (
            <TabsTrigger key={s.key} value={s.key}>{s.label}</TabsTrigger>
          ))}
        </TabsList>

        {SECTIONS.map((s) => {
          const content = contentMap[s.key] || { ...defaultContent }
          const cta = ctaMap[s.key] || {
            title: "Get Involved",
            description: "Reach out to participate or learn more about this activity.",
            primaryText: "Contact Us",
            primaryLink: "/contact",
          }
          const gallery = galleryMap[s.key] || []
          return (
            <TabsContent key={s.key} value={s.key} className="pt-6 space-y-6">
              {/* Long form: Description, Schedule, Features, Gallery, CTA */}
              <div>
                <Label>Intro Description</Label>
                <Textarea
                  value={content.description}
                  onChange={(e) => setContentMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || { ...defaultContent }), description: e.target.value } }))}
                  className="min-h-[120px]"
                  placeholder={s.key === "transport" ? "We provide safe and reliable transportation..." : "Describe this activity..."}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Sunday Pickup</Label>
                  <Input
                    value={content.sunday_pickup}
                    onChange={(e) => setContentMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || { ...defaultContent }), sunday_pickup: e.target.value } }))}
                    placeholder="8:30 AM"
                  />
                </div>
                <div>
                  <Label>Sunday Drop-off</Label>
                  <Input
                    value={content.sunday_dropoff}
                    onChange={(e) => setContentMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || { ...defaultContent }), sunday_dropoff: e.target.value } }))}
                    placeholder="12:00 PM"
                  />
                </div>
                <div>
                  <Label>Wednesday Time</Label>
                  <Input
                    value={content.wednesday_time}
                    onChange={(e) => setContentMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || { ...defaultContent }), wednesday_time: e.target.value } }))}
                    placeholder="6:00 PM"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add feature" />
                  <Button type="button" onClick={addFeature}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(content.features || []).map((f, i) => (
                    <Badge key={`${s.key}-f-${i}`} className="flex items-center gap-1">
                      {f}
                      <button onClick={() => removeFeature(i)} aria-label="remove">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label>Image URL</Label>
                  <Input value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="https://.../image.jpg" />
                </div>
                <div>
                  <Label>Caption (optional)</Label>
                  <Input value={newImageCaption} onChange={(e) => setNewImageCaption(e.target.value)} placeholder="Caption" />
                </div>
              </div>
              <Button type="button" onClick={addImage} className="w-full md:w-auto">
                <Plus className="w-4 h-4 mr-1" /> Add Image
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gallery.map((item, idx) => (
                  <Card key={item.id || `${s.key}-${idx}`}>
                    <CardContent className="p-3 space-y-2">
                      <img src={item.image_url} alt={item.caption || "gallery"} className="w-full h-40 object-cover rounded" />
                      {item.caption ? <p className="text-sm text-gray-600">{item.caption}</p> : null}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Order: {idx + 1}</span>
                        <Button variant="destructive" size="sm" onClick={() => removeImage(idx, item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>CTA Title</Label>
                  <Input value={cta.title} onChange={(e) => setCtaMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || {} as KidsCTAContent), title: e.target.value } }))} />
                </div>
                <div>
                  <Label>Primary Button Text</Label>
                  <Input value={cta.primaryText} onChange={(e) => setCtaMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || {} as KidsCTAContent), primaryText: e.target.value } }))} />
                </div>
                <div>
                  <Label>Primary Button Link</Label>
                  <Input value={cta.primaryLink} onChange={(e) => setCtaMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || {} as KidsCTAContent), primaryLink: e.target.value } }))} />
                </div>
                <div>
                  <Label>Secondary Button Text</Label>
                  <Input value={cta.secondaryText || ""} onChange={(e) => setCtaMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || {} as KidsCTAContent), secondaryText: e.target.value } }))} />
                </div>
                <div>
                  <Label>Secondary Button Link</Label>
                  <Input value={cta.secondaryLink || ""} onChange={(e) => setCtaMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || {} as KidsCTAContent), secondaryLink: e.target.value } }))} />
                </div>
              </div>
              <div>
                <Label>CTA Description</Label>
                <Textarea value={cta.description} onChange={(e) => setCtaMap((prev) => ({ ...prev, [s.key]: { ...(prev[s.key] || {} as KidsCTAContent), description: e.target.value } }))} className="min-h-[120px]" />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Button onClick={() => saveSectionContent(s.key)} disabled={saving} className="md:w-auto w-full">
                  {saving && activeTab === s.key ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Section Info
                </Button>
                <Button onClick={saveGallery} disabled={saving} className="md:w-auto w-full" variant="outline">
                  {saving && activeTab === s.key ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Images
                </Button>
                <Button onClick={saveCTA} disabled={saving} className="md:w-auto w-full" variant="secondary">
                  {saving && activeTab === s.key ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save CTA
                </Button>
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}


