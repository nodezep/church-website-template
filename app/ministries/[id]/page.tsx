"use client"

import { motion } from "framer-motion"
import { Users, Heart, Baby, Music, BookOpen, Globe, ArrowRight, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import LogoLoader from "@/components/logo-loader"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { use } from "react"

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

export default function MinistryPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise
  const { id } = use(params)
  const [ministry, setMinistry] = useState<Ministry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMinistry = async () => {
      const supabase = createClientComponentClient()
      
      try {
        const { data, error: supabaseError } = await supabase
          .from("ministries")
          .select("*")
          .eq("id", id)
          .single()

        if (supabaseError) throw supabaseError
        if (!data) throw new Error("Ministry not found")

        setMinistry(data as Ministry)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch ministry")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMinistry()
    }
  }, [id])

  if (loading) {
    return <LogoLoader fullScreen />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
        <Button asChild className="ml-4">
          <Link href="/ministries">Back to Ministries</Link>
        </Button>
      </div>
    )
  }

  if (!ministry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ministry not found</div>
        <Button asChild className="ml-4">
          <Link href="/ministries">Back to Ministries</Link>
        </Button>
      </div>
    )
  }

  const IconComponent = iconComponents[ministry.icon] || Users

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
            <div className="flex justify-center mb-6">
              <div className={`w-16 h-16 ${ministry.color} rounded-full flex items-center justify-center`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {ministry.hero_title || ministry.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {ministry.hero_description || ministry.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      {ministry.story_title && ministry.story_content && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-8">{ministry.story_title}</h2>
                <div className="space-y-6">
                  {ministry.story_content.map((paragraph, index) => (
                    <p key={index} className="text-lg text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
              {ministry.story_image_url && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <img
                    src={ministry.story_image_url}
                    alt={ministry.story_title}
                    className="w-full h-96 object-cover rounded-lg shadow-xl"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the many ways you can get involved and grow with our ministry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministry.features?.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 ${ministry.color} rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      Our ministry provides this service to help you grow in your faith journey.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaders Section */}
      {ministry.leaders && ministry.leaders.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Leaders</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our dedicated team is here to serve and support you on your spiritual journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministry.leaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      {leader.image_url && (
                        <img
                          src={leader.image_url}
                          alt={leader.name}
                          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                        />
                      )}
                      <CardTitle className="text-xl mb-2">{leader.name}</CardTitle>
                      <CardDescription className="text-blue-600 font-semibold mb-4">
                        {leader.role}
                      </CardDescription>
                      <p className="text-gray-600 mb-4">{leader.description}</p>
                      <div className="flex justify-center space-x-4">
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Us?</h2>
            <p className="text-xl text-blue-100 mb-8">
              We'd love to have you be part of our ministry family. Get in touch to learn more about how you can get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/ministries">Explore Other Ministries</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}