import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  image_url?: string
}

export default async function EventsSection() {
  let events: Event[] = []
  let error: any = null

  try {
    const { data, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true })
      .limit(3)

    if (fetchError) {
      throw fetchError
    }
    events = data || []
  } catch (e) {
    error = e
    console.error("Failed to fetch events:", e)
    // Fallback to mock data if Supabase fails
    events = [
      {
        id: "mock-event-1",
        title: "Annual Youth Conference",
        date: "2025-08-15",
        time: "09:00 AM",
        location: "Church Main Hall",
        description:
          "Empowering the next generation with faith and purpose. Join us for inspiring speakers, workshops, and fellowship.",
        image_url: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "mock-event-2",
        title: "Community Outreach Day",
        date: "2025-09-01",
        time: "10:00 AM",
        location: "Local Park",
        description:
          "Serving our community with love and compassion. We'll be distributing food, clothes, and offering free health checks.",
        image_url: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "mock-event-3",
        title: "Women's Fellowship Brunch",
        date: "2025-09-20",
        time: "11:00 AM",
        location: "Church Annex Building",
        description:
          "A time of sisterhood, encouragement, and spiritual growth. Enjoy delicious food and uplifting conversations.",
        image_url: "/placeholder.svg?height=300&width=500",
      },
    ]
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={event.image_url || "/placeholder.svg?height=300&width=500&query=event+image"}
                alt={event.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{event.title}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {format(new Date(event.date), "MMMM dd, yyyy")} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </CardDescription>
                <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
