// app/admin/settings/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Save, Upload, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getSettings, updateSettings } from "@/lib/settingsService"

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const { toast } = useToast()

  const [churchInfo, setChurchInfo] = useState({
    name: "",
    tagline: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
  })

  const [serviceSchedule, setServiceSchedule] = useState({
    sunday_morning: "",
    wednesday_prayer: "",
    friday_youth: "",
    saturday_mens: "",
  })

  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  })

  const [seoSettings, setSeoSettings] = useState({
    meta_title: "",
    meta_description: "",
    keywords: "",
  })

  // Load settings from database on component mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getSettings()
        if (settings) {
          setChurchInfo({
            name: settings.name || "",
            tagline: settings.tagline || "",
            address: settings.address || "",
            phone: settings.phone || "",
            email: settings.email || "",
            website: settings.website || "",
            description: settings.description || "",
          })
          
          if (settings.service_schedule) {
            setServiceSchedule(settings.service_schedule)
          }
          
          if (settings.social_media) {
            setSocialMedia(settings.social_media)
          }
          
          if (settings.seo) {
            setSeoSettings(settings.seo)
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
        toast({
          title: "Error",
          description: "Failed to load settings",
          variant: "destructive",
        })
      } finally {
        setInitializing(false)
      }
    }
    
    loadSettings()
  }, [toast])

  const handleSaveChurchInfo = async () => {
    setLoading(true)
    try {
      const success = await updateSettings("church_info", churchInfo)
      
      if (success) {
        toast({
          title: "Success",
          description: "Church information updated successfully",
        })
      } else {
        throw new Error("Failed to update church information")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update church information",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveServiceSchedule = async () => {
    setLoading(true)
    try {
      const success = await updateSettings("service_schedule", serviceSchedule)
      
      if (success) {
        toast({
          title: "Success",
          description: "Service schedule updated successfully",
        })
      } else {
        throw new Error("Failed to update service schedule")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service schedule",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSocialMedia = async () => {
    setLoading(true)
    try {
      const success = await updateSettings("social_media", socialMedia)
      
      if (success) {
        toast({
          title: "Success",
          description: "Social media links updated successfully",
        })
      } else {
        throw new Error("Failed to update social media links")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update social media links",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSEO = async () => {
    setLoading(true)
    try {
      const success = await updateSettings("seo", seoSettings)
      
      if (success) {
        toast({
          title: "Success",
          description: "SEO settings updated successfully",
        })
      } else {
        throw new Error("Failed to update SEO settings")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update SEO settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (initializing) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your website settings and configuration</p>
      </div>

      {/* Church Information */}
      <Card>
        <CardHeader>
          <CardTitle>Church Information</CardTitle>
          <CardDescription>Basic information about your church</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="church_name">Church Name</Label>
              <Input
                id="church_name"
                value={churchInfo.name}
                onChange={(e) => setChurchInfo({ ...churchInfo, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={churchInfo.tagline}
                onChange={(e) => setChurchInfo({ ...churchInfo, tagline: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={churchInfo.address}
              onChange={(e) => setChurchInfo({ ...churchInfo, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={churchInfo.phone}
                onChange={(e) => setChurchInfo({ ...churchInfo, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={churchInfo.email}
                onChange={(e) => setChurchInfo({ ...churchInfo, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={churchInfo.website}
                onChange={(e) => setChurchInfo({ ...churchInfo, website: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={churchInfo.description}
              onChange={(e) => setChurchInfo({ ...churchInfo, description: e.target.value })}
              rows={3}
            />
          </div>

          <Button onClick={handleSaveChurchInfo} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save Church Information
          </Button>
        </CardContent>
      </Card>

      {/* Service Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Service Schedule</CardTitle>
          <CardDescription>Configure your regular service times</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sunday_morning">Sunday Morning Worship</Label>
              <Input
                id="sunday_morning"
                value={serviceSchedule.sunday_morning}
                onChange={(e) => setServiceSchedule({ ...serviceSchedule, sunday_morning: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="wednesday_prayer">Wednesday Prayer Meeting</Label>
              <Input
                id="wednesday_prayer"
                value={serviceSchedule.wednesday_prayer}
                onChange={(e) => setServiceSchedule({ ...serviceSchedule, wednesday_prayer: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="friday_youth">Friday Youth Service</Label>
              <Input
                id="friday_youth"
                value={serviceSchedule.friday_youth}
                onChange={(e) => setServiceSchedule({ ...serviceSchedule, friday_youth: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="saturday_mens">Saturday Men's Breakfast</Label>
              <Input
                id="saturday_mens"
                value={serviceSchedule.saturday_mens}
                onChange={(e) => setServiceSchedule({ ...serviceSchedule, saturday_mens: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleSaveServiceSchedule} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save Service Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Configure your social media links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                type="url"
                value={socialMedia.facebook}
                onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                placeholder="https://facebook.com/yourchurch"
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                type="url"
                value={socialMedia.twitter}
                onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                placeholder="https://twitter.com/yourchurch"
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                type="url"
                value={socialMedia.instagram}
                onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                placeholder="https://instagram.com/yourchurch"
              />
            </div>
            <div>
              <Label htmlFor="youtube">YouTube URL</Label>
              <Input
                id="youtube"
                type="url"
                value={socialMedia.youtube}
                onChange={(e) => setSocialMedia({ ...socialMedia, youtube: e.target.value })}
                placeholder="https://youtube.com/yourchurch"
              />
            </div>
          </div>

          <Button onClick={handleSaveSocialMedia} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save Social Media Links
          </Button>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Configure search engine optimization settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input
              id="meta_title"
              value={seoSettings.meta_title}
              onChange={(e) => setSeoSettings({ ...seoSettings, meta_title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              value={seoSettings.meta_description}
              onChange={(e) => setSeoSettings({ ...seoSettings, meta_description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              value={seoSettings.keywords}
              onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
            />
          </div>

          <Button onClick={handleSaveSEO} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save SEO Settings
          </Button>
        </CardContent>
      </Card>

      {/* Backup & Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle>Backup & Maintenance</CardTitle>
          <CardDescription>Database backup and maintenance tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
          </div>

          <Separator />

          <div className="text-sm text-gray-600">
            <p>
              <strong>Last Backup:</strong> March 15, 2024 at 2:30 PM
            </p>
            <p>
              <strong>Database Size:</strong> 45.2 MB
            </p>
            <p>
              <strong>Total Records:</strong> 1,247
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}