"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchPastorProfile, upsertPastorProfile, PastorProfile } from "@/lib/homeService"

export default function PastorAdminPage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<PastorProfile>({ name: "", title: "Senior Pastor", bio: "" })

  useEffect(() => {
    const load = async () => {
      const p = await fetchPastorProfile()
      if (p) setProfile(p)
    }
    load()
  }, [])

  const handleSave = async () => {
    try {
      await upsertPastorProfile(profile)
      toast({ title: "Saved", description: "Pastor profile saved." })
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pastor Profile</h1>
        <Button onClick={handleSave} className="bg-yellow-600 hover:bg-yellow-700">
          <Save className="w-4 h-4 mr-2" /> Save
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input value={profile.name} onChange={(e)=>setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input value={profile.title} onChange={(e)=>setProfile({ ...profile, title: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea rows={6} value={profile.bio} onChange={(e)=>setProfile({ ...profile, bio: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Photo URL</label>
              <Input value={profile.photo_url || ""} onChange={(e)=>setProfile({ ...profile, photo_url: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Years of Service</label>
              <Input value={profile.years_service ?? ""} onChange={(e)=>setProfile({ ...profile, years_service: Number(e.target.value) || 0 })} />
            </div>
            <div>
              <label className="text-sm font-medium">Sermons Count</label>
              <Input value={profile.sermons_count ?? ""} onChange={(e)=>setProfile({ ...profile, sermons_count: Number(e.target.value) || 0 })} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Quote</label>
            <Input value={profile.quote || ""} onChange={(e)=>setProfile({ ...profile, quote: e.target.value })} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


