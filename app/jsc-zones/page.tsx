"use client"

import { motion } from "framer-motion"
import { Users, Clock, MapPin, User, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface JSCZone {
  id: string
  name: string
  description: string
  day: string
  time: string
  location: string
  leader: string
  focus: string
  image_url: string
  members: number
  color: string
}

export default function JSCZonesPage() {
  const [zones, setZones] = useState<JSCZone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchZones = async () => {
      const supabase = createClientComponentClient()
      
      try {
        const { data, error: supabaseError } = await supabase
          .from("jsc_zones")
          .select("*")
          .eq("active", true)
          .order("name", { ascending: true })

        if (supabaseError) throw supabaseError
        if (!data) throw new Error("No zones found")

        setZones(data as JSCZone[])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch zones")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchZones()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading zones...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    )
  }

  if (zones.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No active zones found</div>
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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">JSC Zones</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Life Groups designed to help you grow in faith, build meaningful relationships, and discover your purpose
              in community
            </p>
          </motion.div>
        </div>
      </section>

      {/* What are JSC Zones */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What are JSC Zones?</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              JSC Zones are small, intimate groups where members of our church family come together to study God's Word,
              pray for one another, and build lasting friendships. These groups meet regularly throughout the week in
              various locations, providing opportunities for deeper connection and spiritual growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">Build meaningful relationships with fellow believers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growth</h3>
                <p className="text-gray-600">Deepen your understanding of God's Word and faith</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support</h3>
                <p className="text-gray-600">Find encouragement and prayer support in life's journey</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JSC Zones Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Zone</h2>
            <p className="text-xl text-gray-600">Choose a group that fits your life stage and interests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zones.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={zone.image_url || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(zone.name)}`}
                      alt={zone.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className={`absolute top-4 right-4 ${zone.color || 'bg-blue-500'} text-white`}>
                      {zone.members || 0} members
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{zone.name}</CardTitle>
                    <CardDescription className="text-gray-600">{zone.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500 mr-2" />
                        {zone.day}s at {zone.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                        {zone.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 text-blue-500 mr-2" />
                        Led by {zone.leader}
                      </div>
                      {zone.focus && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Target className="w-4 h-4 text-blue-500 mr-2" />
                          Focus: {zone.focus}
                        </div>
                      )}
                    </div>
                    <Button className="w-full">Join This Zone</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Connect?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't see a zone that fits? We'd love to help you find the perfect group or even start a new one!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">Get Connected</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Start a New Zone</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}