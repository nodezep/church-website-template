"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import LogoLoader from "@/components/logo-loader"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
  image_url: string
  featured: boolean
  attendees: number
}

interface Category {
  id: string
  name: string
  color: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClientComponentClient()
      
      try {
        setLoading(true)
        setError(null)

        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true })

        if (eventsError) {
          throw new Error(`Failed to load events: ${eventsError.message}`)
        }

        if (!eventsData || eventsData.length === 0) {
          throw new Error("No upcoming events found in our database")
        }

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("event_categories")
          .select("*")

        if (categoriesError) {
          console.warn("Failed to load categories, using defaults:", categoriesError.message)
          // Continue with default categories even if this fails
        }

        // Set default categories
        const defaultCategories: Category[] = [
          { id: "all", name: "All Events", color: "bg-gray-500" },
          ...(categoriesData || []).map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            color: cat.color || "bg-gray-500"
          }))
        ]

        setEvents(eventsData as Event[])
        setCategories(defaultCategories)
        
      } catch (err) {
        console.error("Full error details:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred while loading events")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredEvents =
    selectedCategory === "all" ? events : events.filter((event) => event.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find((cat) => cat.id === category)
    return categoryObj?.color || "bg-gray-500"
  }

  if (loading) {
    return <LogoLoader fullScreen />
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="text-red-500 text-2xl font-bold mb-4">Error Loading Events</div>
        <div className="text-gray-600 mb-6 max-w-md">{error}</div>
        <div className="flex gap-4">
          <Button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="text-2xl font-bold mb-4">No Upcoming Events</div>
        <p className="text-gray-600 mb-6 max-w-md">
          There are currently no scheduled events. Please check back later or contact us for more information.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/contact">Contact Us</Link>
        </Button>
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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Upcoming Events</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for these special gatherings, worship services, and community activities that bring our church
              family together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? `${category.color} text-white` : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {selectedCategory === "all" && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {events
                .filter((event) => event.featured)
                .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative">
                        <img
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-64 object-cover"
                        />
                        <Badge className={`absolute top-4 right-4 ${getCategoryColor(event.category)} text-white`}>
                          {event.category}
                        </Badge>
                        <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">Featured</Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl">{event.title}</CardTitle>
                        <CardDescription className="text-gray-600">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 text-blue-500 mr-3" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5 text-blue-500 mr-3" />
                            {event.attendees} expected attendees
                          </div>
                        </div>
                        <Button className="w-full">Register Now</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "all"
                ? "All Events"
                : `${categories.find((cat) => cat.id === selectedCategory)?.name} Events`}
            </h2>
            <span className="text-gray-500">{filteredEvents.length} events</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={event.image_url || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className={`absolute top-4 right-4 ${getCategoryColor(event.category)} text-white`}>
                      {event.category}
                    </Badge>
                    {event.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">Featured</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Don't Miss Out!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Stay connected with our church family by joining our upcoming events. There's always something happening
              at JSC!
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Get Event Updates</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}