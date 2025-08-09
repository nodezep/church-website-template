"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { format } from "date-fns"

interface Sermon {
  id: string
  title: string
  date: string
  youtube_url: string
  youtube_embed_url: string
  thumbnail_url: string
  featured: boolean
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchSermons = async () => {
      const supabase = createClientComponentClient()
      try {
        const { data, error } = await supabase
          .from("sermons")
          .select("*")
          .order("date", { ascending: false })

        if (error) throw error
        setSermons(data || [])
      } catch (error) {
        console.error("Error fetching sermons:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSermons()
  }, [])

  const filteredSermons = sermons.filter(sermon => 
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Sermons</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Watch or listen to our latest messages
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="Search sermons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Sermons */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Sermons</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sermons
              .filter(sermon => sermon.featured)
              .map(sermon => (
                <a 
                  key={sermon.id}
                  href={sermon.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:shadow-lg transition-all hover:scale-[1.01]"
                >
                  <Card className="overflow-hidden h-full cursor-pointer">
                    <div className="relative">
                      <img
                        src={sermon.thumbnail_url}
                        alt={sermon.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                          <Play className="w-6 h-6 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                      {sermon.featured && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500">Featured</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{sermon.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {format(new Date(sermon.date), "MMMM d, yyyy")}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* All Sermons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">All Sermons</h2>
            <span className="text-gray-500">{filteredSermons.length} sermons</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map(sermon => (
              <a
                key={sermon.id}
                href={sermon.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:shadow-lg transition-all hover:scale-[1.01]"
              >
                <Card className="h-full cursor-pointer">
                  <div className="relative">
                    <img
                      src={sermon.thumbnail_url}
                      alt={sermon.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-t-lg">
                      <Button className="bg-white/20 hover:bg-white/30 text-white">
                        <Play className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{sermon.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {format(new Date(sermon.date), "MMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      <Play className="w-4 h-4 mr-1" />
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}