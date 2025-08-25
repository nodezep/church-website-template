"use client"
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

// Define types that exactly match your database structure
type HeroContent = {
  slides: {
    image: string
    title: string
    subtitle: string
    cta: string
    link: string
  }[]
}

type ChildrenContent = {
  title: string
  description: string
  imageUrl: string
}

type ServicesContent = {
  services: {
    title: string
    time: string
    description: string
    icon: string
  }[]
}

export default function HomeEditor() {
  const [activeTab, setActiveTab] = useState("hero")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  // Initialize state with exact database structure
  const [heroContent, setHeroContent] = useState<HeroContent>({ slides: [] })
  const [childrenContent, setChildrenContent] = useState<ChildrenContent>({
    title: "",
    description: "",
    imageUrl: ""
  })
  const [servicesContent, setServicesContent] = useState<ServicesContent>({ services: [] })

  // Fetch all content from database
  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        setLoading(true)
        
        // Fetch hero content
        const { data: heroData } = await supabase
          .from('home_content')
          .select('content')
          .eq('component_type', 'hero')
          .single()
        
        if (heroData?.content) {
          setHeroContent(heroData.content as HeroContent)
        } else {
          // Initialize with one empty slide if no data exists
          setHeroContent({
            slides: [{
              image: "",
              title: "",
              subtitle: "",
              cta: "",
              link: ""
            }]
          })
        }

        // Fetch children content
        const { data: childrenData } = await supabase
          .from('home_content')
          .select('content')
          .eq('component_type', 'children')
          .single()
        
        setChildrenContent(childrenData?.content as ChildrenContent || {
          title: "",
          description: "",
          imageUrl: ""
        })

        // Fetch services content
        const { data: servicesData } = await supabase
          .from('home_content')
          .select('content')
          .eq('component_type', 'services')
          .single()
        
        if (servicesData?.content?.services) {
          setServicesContent(servicesData.content as ServicesContent)
        } else {
          // Initialize with one empty service if no data exists
          setServicesContent({
            services: [{
              title: "",
              time: "",
              description: "",
              icon: "Heart"
            }]
          })
        }

      } catch (error) {
        console.error('Error fetching content:', error)
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAllContent()
  }, [supabase, toast])

  // Save content to database (FIXED VERSION)
  const handleSave = async (componentType: string) => {
    try {
      setSaving(true)
      let content: any
      let successMessage = ""

      switch (componentType) {
        case 'hero':
          content = heroContent
          successMessage = "Hero section updated successfully"
          break
        case 'children':
          content = childrenContent
          successMessage = "Children's ministry content updated"
          break
        case 'services':
          content = servicesContent
          successMessage = "Services updated successfully"
          break
        default:
          throw new Error('Invalid component type')
      }

      // First check if the record exists
      const { data: existingRecord } = await supabase
        .from('home_content')
        .select('id')
        .eq('component_type', componentType)
        .single()

      if (existingRecord) {
        // Update existing record
        const { error } = await supabase
          .from('home_content')
          .update({ 
            content,
            updated_at: new Date().toISOString()
          })
          .eq('component_type', componentType)

        if (error) throw error
      } else {
        // Insert new record
        const { error } = await supabase
          .from('home_content')
          .insert({
            component_type: componentType,
            content,
            is_active: true
          })

        if (error) throw error
      }

      toast({
        title: "Success",
        description: successMessage,
      })
      
    } catch (error) {
      console.error(`Error saving ${componentType}:`, error)
      
      // FIXED: Proper error message handling
      let errorMessage = `Failed to save ${componentType} content`
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  // Hero slide management
  const addHeroSlide = () => {
    setHeroContent(prev => ({
      ...prev,
      slides: [
        ...prev.slides,
        {
          image: "",
          title: "",
          subtitle: "",
          cta: "",
          link: ""
        }
      ]
    }))
  }

  const removeHeroSlide = (index: number) => {
    setHeroContent(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index)
    }))
  }

  const updateHeroSlide = (index: number, field: keyof HeroContent['slides'][0], value: string) => {
    setHeroContent(prev => {
      const newSlides = [...prev.slides]
      newSlides[index] = { ...newSlides[index], [field]: value }
      return { ...prev, slides: newSlides }
    })
  }

  // Service management
  const addService = () => {
    setServicesContent(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          title: "",
          time: "",
          description: "",
          icon: "Heart"
        }
      ]
    }))
  }

  const removeService = (index: number) => {
    setServicesContent(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }))
  }

  const updateService = (index: number, field: keyof ServicesContent['services'][0], value: string) => {
    setServicesContent(prev => {
      const newServices = [...prev.services]
      newServices[index] = { ...newServices[index], [field]: value }
      return { ...prev, services: newServices }
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="children">Children's Ministry</TabsTrigger>
          <TabsTrigger value="services">Service Times</TabsTrigger>
        </TabsList>

        {/* Hero Editor */}
        <TabsContent value="hero" className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Hero Slides</h2>
            <Button onClick={addHeroSlide}>Add Slide</Button>
          </div>
          
          {heroContent.slides.map((slide, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4 relative bg-gray-50">
              <Button 
                variant="destructive" 
                size="sm" 
                className="absolute top-2 right-2"
                onClick={() => removeHeroSlide(index)}
              >
                Remove
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Image/Video URL</Label>
                  <Input
                    value={slide.image}
                    onChange={(e) => updateHeroSlide(index, 'image', e.target.value)}
                    placeholder="https://example.com/image.jpg or .mp4"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={slide.title}
                    onChange={(e) => updateHeroSlide(index, 'title', e.target.value)}
                    placeholder="Welcome to Our Church"
                  />
                </div>
              </div>
              
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={slide.subtitle}
                  onChange={(e) => updateHeroSlide(index, 'subtitle', e.target.value)}
                  placeholder="Join us for worship this Sunday"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={slide.cta}
                    onChange={(e) => updateHeroSlide(index, 'cta', e.target.value)}
                    placeholder="Learn More"
                  />
                </div>
                <div>
                  <Label>Button Link</Label>
                  <Input
                    value={slide.link}
                    onChange={(e) => updateHeroSlide(index, 'link', e.target.value)}
                    placeholder="/about"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={() => handleSave("hero")}
            disabled={saving}
            className="w-full md:w-auto"
          >
            {saving && activeTab === 'hero' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save Hero Section
          </Button>
        </TabsContent>

        {/* Children's Ministry Editor */}
        <TabsContent value="children" className="pt-6 space-y-6">
          <h2 className="text-2xl font-bold">Children's Ministry</h2>
          
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <Label>Title</Label>
              <Input
                value={childrenContent.title}
                onChange={(e) => setChildrenContent({...childrenContent, title: e.target.value})}
                placeholder="Children's Ministry"
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={childrenContent.description}
                onChange={(e) => setChildrenContent({...childrenContent, description: e.target.value})}
                rows={5}
                placeholder="We believe children are a gift from God..."
                className="min-h-[120px]"
              />
            </div>
            
            <div>
              <Label>Image URL</Label>
              <Input
                value={childrenContent.imageUrl}
                onChange={(e) => setChildrenContent({...childrenContent, imageUrl: e.target.value})}
                placeholder="https://example.com/children.jpg"
              />
            </div>
          </div>
          
          <Button 
            onClick={() => handleSave("children")}
            disabled={saving}
            className="w-full md:w-auto"
          >
            {saving && activeTab === 'children' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save Children's Ministry
          </Button>
        </TabsContent>

        {/* Services Editor */}
        <TabsContent value="services" className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Service Times</h2>
            <Button onClick={addService}>Add Service</Button>
          </div>
          
          {servicesContent.services.map((service, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4 relative bg-gray-50">
              <Button 
                variant="destructive" 
                size="sm" 
                className="absolute top-2 right-2"
                onClick={() => removeService(index)}
              >
                Remove
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Service Title</Label>
                  <Input
                    value={service.title}
                    onChange={(e) => updateService(index, 'title', e.target.value)}
                    placeholder="Sunday Worship"
                  />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input
                    value={service.time}
                    onChange={(e) => updateService(index, 'time', e.target.value)}
                    placeholder="9:00 AM"
                  />
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  placeholder="Join us for inspiring worship..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label>Icon</Label>
                <select
                  value={service.icon}
                  onChange={(e) => updateService(index, 'icon', e.target.value)}
                  className="w-full p-2 border rounded bg-white"
                >
                  <option value="Heart">Heart</option>
                  <option value="BookOpen">Book</option>
                  <option value="Users">Users</option>
                </select>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={() => handleSave("services")}
            disabled={saving}
            className="w-full md:w-auto"
          >
            {saving && activeTab === 'services' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save Service Times
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}