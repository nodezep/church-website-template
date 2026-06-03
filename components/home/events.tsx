import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { logError } from "@/lib/error-utils"

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
    logError("Failed to fetch events:", e)
    // Fallback to mock data if Supabase fails
    events = [
      {
        id: "mock-event-1",
        title: "Annual Youth Conference",
        date: "2026-08-15",
        time: "09:00 AM",
        location: "Church Main Hall",
        description:
          "Empowering the next generation with faith and purpose. Join us for inspiring speakers, workshops, and fellowship.",
        image_url: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "mock-event-2",
        title: "Community Outreach Day",
        date: "2026-09-01",
        time: "10:00 AM",
        location: "Local Park",
        description:
          "Serving our community with love and compassion. We'll be distributing food, clothes, and offering free health checks.",
        image_url: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "mock-event-3",
        title: "Women's Fellowship Brunch",
        date: "2026-09-20",
        time: "11:00 AM",
        location: "Church Annex Building",
        description:
          "A time of sisterhood, encouragement, and spiritual growth. Enjoy delicious food and uplifting conversations.",
        image_url: "/placeholder.svg?height=300&width=500",
      },
    ]
  }

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-150 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">
            What's Happening
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-neutral-900 dark:text-white mt-3">
            Upcoming Events
          </h2>
          <div className="h-[1px] w-20 bg-primary/45 mx-auto mt-4 mb-6" />
          <p className="text-lg text-neutral-600 dark:text-neutral-350 max-w-2xl mx-auto font-light">
            Stay connected and grow with our church family through our scheduled events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 bg-white dark:bg-neutral-950 flex flex-col group rounded-2xl">
              
              <div className="relative overflow-hidden h-52">
                {/* Modern Date Tag Overlay */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-tr from-primary to-amber-500 text-primary-foreground shadow-lg px-4 py-2 rounded-xl text-center">
                  <span className="block text-[10px] uppercase tracking-widest font-bold opacity-90">
                    {format(new Date(event.date), "MMM")}
                  </span>
                  <span className="block text-2xl font-bold font-serif leading-none mt-0.5">
                    {format(new Date(event.date), "dd")}
                  </span>
                </div>
                
                <img
                  src={event.image_url || "/placeholder.svg?height=300&width=500&query=event+image"}
                  alt={event.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent" />
              </div>

              <CardContent className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold font-serif text-neutral-900 dark:text-neutral-100 mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  
                  <CardDescription className="text-neutral-500 dark:text-neutral-400 space-y-2 mb-4 font-medium">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2.5 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2.5 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-600/90 text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 border-0">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

