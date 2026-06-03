import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { PlayCircle, Calendar, User } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { logError } from "@/lib/error-utils"

interface Sermon {
  id: string
  title: string
  preacher: string
  date: string
  description: string
  audio_url?: string
  video_url?: string
  thumbnail_url?: string
}

export default async function SermonSection() {
  let latestSermon: Sermon | null = null
  let error: any = null

  try {
    const { data, error: fetchError } = await supabase
      .from("sermons")
      .select("*")
      .order("date", { ascending: false })
      .limit(1)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError
    }
    latestSermon = data
  } catch (e) {
    error = e
    logError("Failed to fetch latest sermon:", e)
  }

  if (error || !latestSermon) {
    latestSermon = {
      id: "mock-sermon-1",
      title: "The Power of Faith",
      preacher: "Pastor Johnathan Brooks",
      date: "2026-05-31T10:00:00Z",
      description:
        "A powerful message on how faith can move mountains and transform lives. Learn to trust in God's unwavering promises during seasons of transition.",
      audio_url: "/placeholder.svg?height=100&width=100",
      video_url: "/placeholder.svg?height=100&width=100",
      thumbnail_url: "/placeholder.svg?height=400&width=600",
    }
  }

  return (
    <section className="py-24 bg-white dark:bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">
            Spoken Word
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-neutral-900 dark:text-white mt-3">
            Latest Sermon
          </h2>
          <div className="h-[1px] w-20 bg-primary/45 mx-auto mt-4 mb-6" />
          <p className="text-lg text-neutral-600 dark:text-neutral-350 max-w-2xl mx-auto font-light">
            Watch or listen to our most recent message and find inspiration for your walk of faith.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-2xl rounded-2xl bg-white dark:bg-neutral-900 group hover:border-primary/30 transition-all duration-500">
          <div className="md:flex">
            
            {/* Cinematic Widescreen Media Thumbnail */}
            <div className="md:w-1/2 relative overflow-hidden h-64 md:h-auto min-h-[320px] bg-neutral-950">
              <img
                src={latestSermon.thumbnail_url || "/placeholder.svg?height=400&width=600&query=sermon+thumbnail"}
                alt={latestSermon.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/20 group-hover:bg-neutral-950/40 transition-colors duration-500">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 shadow-primary/20">
                  <PlayCircle className="h-10 w-10 fill-current text-primary-foreground" />
                </div>
              </div>
            </div>

            <CardContent className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              
              <div className="space-y-4 mb-6">
                <span className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-primary">
                  Featured Message
                </span>
                
                <CardTitle className="text-2xl md:text-3xl font-bold font-serif text-neutral-900 dark:text-neutral-100 leading-tight">
                  {latestSermon.title}
                </CardTitle>
                
                <CardDescription className="text-neutral-500 dark:text-neutral-400 space-y-1 text-sm font-medium">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary/70" />
                    <span>{latestSermon.preacher}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                    <span>{format(new Date(latestSermon.date), "MMMM dd, yyyy")}</span>
                  </div>
                </CardDescription>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light leading-relaxed mb-8 line-clamp-4">
                {latestSermon.description}
              </p>

              <CardFooter className="p-0 flex flex-wrap gap-4">
                {latestSermon.video_url && (
                  <Button asChild className="bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-600/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 border-0 cursor-pointer">
                    <Link href={`/sermons/${latestSermon.id}`}>
                      <PlayCircle className="mr-2 h-5 w-5" /> Watch Sermon
                    </Link>
                  </Button>
                )}
                <Button variant="outline" asChild className="border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-55 dark:hover:bg-neutral-800 rounded-full px-6 py-2.5 transition-all duration-300 font-semibold cursor-pointer">
                  <Link href="/sermons">View All Sermons</Link>
                </Button>
              </CardFooter>
              
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}

