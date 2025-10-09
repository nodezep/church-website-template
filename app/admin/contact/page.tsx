"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ContactPageContent, fetchContactPage, upsertContactPage } from "@/lib/homeService"

export default function AdminContactPage() {
  const { toast } = useToast()
  const [content, setContent] = useState<ContactPageContent>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await fetchContactPage()
      setContent(
        data || {
          hero_title: "Contact Us",
          hero_description: "We'd love to hear from you! Reach out any time.",
          address_line1: "123 Divine Grace Avenue",
          address_line2: "Faith City, FC 12345",
          country: "United Kingdom",
          map_link: "https://www.google.com/maps/search/?api=1&query=Jerusalem+Spiritual+Centre",
          phone_general: "+44 20 1234 5678",
          phone_prayer: "+44 20 9876 5432",
          email_general: "info@jsc.org",
          email_prayer: "prayer@jsc.org",
          sunday_service: "Sunday Worship: 10:00 AM - 12:00 PM",
          wednesday_study: "Wednesday Bible Study: 7:00 PM - 8:30 PM",
          friday_prayer: "Friday Prayer Meeting: 7:00 PM - 8:00 PM",
          faqs: [
            { question: "What should I expect on my first visit?", answer: "A warm welcome, uplifting worship, and a relevant message from the Bible." },
          ],
        }
      )
      setLoading(false)
    }
    load()
  }, [])

  const save = async () => {
    try {
      await upsertContactPage({ ...content, id: content.id || undefined })
      // Reload content after save to get any DB defaults and updated_at
      const fresh = await fetchContactPage()
      if (fresh) setContent(fresh)
      toast({ title: "Saved", description: "Contact page content updated." })
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" })
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Contact Page</h1>

      <Card>
        <CardHeader>
          <CardTitle>Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={content.hero_title || ""} onChange={(e)=>setContent({ ...content, hero_title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input value={content.hero_description || ""} onChange={(e)=>setContent({ ...content, hero_description: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Address Line 1</label>
              <Input value={content.address_line1 || ""} onChange={(e)=>setContent({ ...content, address_line1: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Address Line 2</label>
              <Input value={content.address_line2 || ""} onChange={(e)=>setContent({ ...content, address_line2: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Country</label>
              <Input value={content.country || ""} onChange={(e)=>setContent({ ...content, country: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Map Link</label>
            <Input value={content.map_link || ""} onChange={(e)=>setContent({ ...content, map_link: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">General Phone</label>
              <Input value={content.phone_general || ""} onChange={(e)=>setContent({ ...content, phone_general: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Prayer Line</label>
              <Input value={content.phone_prayer || ""} onChange={(e)=>setContent({ ...content, phone_prayer: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">General Email</label>
              <Input value={content.email_general || ""} onChange={(e)=>setContent({ ...content, email_general: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Prayer Email</label>
              <Input value={content.email_prayer || ""} onChange={(e)=>setContent({ ...content, email_prayer: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Sunday Service</label>
              <Input value={content.sunday_service || ""} onChange={(e)=>setContent({ ...content, sunday_service: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Wednesday Study</label>
              <Input value={content.wednesday_study || ""} onChange={(e)=>setContent({ ...content, wednesday_study: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Friday Prayer</label>
              <Input value={content.friday_prayer || ""} onChange={(e)=>setContent({ ...content, friday_prayer: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={save}>Save Changes</Button>
      </div>
    </div>
  )
}


