"use client"

import { motion } from "framer-motion"
import { Users, Heart, Baby, Music, BookOpen, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import LogoLoader from "@/components/logo-loader"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface Ministry {
  id: string
  title: string
  description: string
  icon: string
  color: string
  features: string[]
  image_url?: string
  hero_title?: string
  hero_description?: string
  story_title?: string
  story_content?: string[]
  story_image_url?: string
  leaders?: Array<{
    name: string
    role: string
    description: string
    image_url?: string
  }>
}

// Map icon strings to actual components
const iconComponents: Record<string, React.ComponentType<any>> = {
  Users,
  Heart,
  Baby,
  Music,
  BookOpen,
  Globe
}

export default function MinistriesPage() {
  const [ministries, setMinistries] = useState<Ministry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMinistries = async () => {
      const supabase = createClientComponentClient()
      
      try {
        const { data, error: supabaseError } = await supabase
          .from("ministries")
          .select("*")
          .eq("active", true)
          .order("title", { ascending: true })

        if (supabaseError) throw supabaseError
        if (!data) throw new Error("No ministries found")

        setMinistries(data as Ministry[])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch ministries")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMinistries()
  }, [])

  if (loading) {
    return <LogoLoader fullScreen />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    )
  }

  if (ministries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No active ministries found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Ministries</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how you can grow in faith, serve others, and make a difference in our community through our
              various ministry opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => {
              const IconComponent = iconComponents[ministry.icon] || Users
              return (
                <motion.div
                  key={ministry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="ministry-card h-full hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={ministry.image_url || "/placeholder.svg"}
                        alt={ministry.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div
                        className={`absolute top-4 left-4 w-12 h-12 ${ministry.color || 'bg-blue-500'} rounded-full flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{ministry.title}</CardTitle>
                      <CardDescription className="text-gray-600">{ministry.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-6">
                        {ministry.features?.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="line-clamp-1">{feature}</span>
                          </div>
                        ))}
                        {ministry.features && ministry.features.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{ministry.features.length - 3} more features
                          </div>
                        )}
                      </div>
                      <Button asChild className="w-full bg-transparent" variant="outline">
                        <Link href={`/ministries/${ministry.id}`}>Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Involved?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Whether you're looking to serve, grow, or connect with others, there's a place for you in our ministry
              family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/jsc-zones">Join a JSC Zone</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}