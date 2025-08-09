import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

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
      // PGRST116 means no rows found
      throw fetchError
    }
    latestSermon = data
  } catch (e) {
    error = e
    console.error("Failed to fetch latest sermon:", e)
  }

  if (error || !latestSermon) {
    // Fallback to mock data if Supabase fails or no sermons exist
    latestSermon = {
      id: "mock-sermon-1",
      title: "The Power of Faith",
      preacher: "Pastor John Doe",
      date: "2025-07-28T10:00:00Z",
      description:
        "A powerful message on how faith can move mountains and transform lives. Learn to trust in God's unwavering promises.",
      audio_url: "/placeholder.svg?height=100&width=100",
      video_url: "/placeholder.svg?height=100&width=100",
      thumbnail_url: "/placeholder.svg?height=400&width=600",
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Latest Sermon</h2>
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl rounded-lg">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={latestSermon.thumbnail_url || "/placeholder.svg?height=400&width=600&query=sermon+thumbnail"}
                alt={latestSermon.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover md:h-full"
              />
            </div>
            <CardContent className="md:w-1/2 p-8 flex flex-col justify-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">{latestSermon.title}</CardTitle>
              <CardDescription className="text-gray-600 mb-4">
                <p className="text-lg">Preacher: {latestSermon.preacher}</p>
                <p className="text-md">Date: {format(new Date(latestSermon.date), "MMMM dd, yyyy")}</p>
              </CardDescription>
              <p className="text-gray-700 mb-6 line-clamp-4">{latestSermon.description}</p>
              <CardFooter className="p-0 flex gap-4">
                {latestSermon.video_url && (
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/sermons/${latestSermon.id}`}>
                      <PlayCircle className="mr-2 h-5 w-5" /> Watch Sermon
                    </Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
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
