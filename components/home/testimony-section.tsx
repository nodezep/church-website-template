"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

type T = { id?: string; name: string; role?: string; content: string; rating?: number; image_url?: string }

const mockTestimonials: T[] = [
  {
    id: "mock-t-1",
    name: "Elizabeth Mercer",
    role: "Member since 2018",
    content: "Finding JSC was a turning point for my family. The sermon series are deeply rooted in Scripture, and the community has supported us through seasons of joy and trials alike.",
    rating: 5,
    image_url: "/placeholder-user.jpg"
  },
  {
    id: "mock-t-2",
    name: "Marcus Vance",
    role: "Youth Leader",
    content: "The leadership team really empowers members to serve and grow their gifts. JSC feels like home, and we're seeing lives changed every single week.",
    rating: 5,
    image_url: "/placeholder-user.jpg"
  },
  {
    id: "mock-t-3",
    name: "Sarah Jenkins",
    role: "Children's Volunteer",
    content: "Our kids absolutely love the Sunday school classes here. The environment is so positive, warm, and Christ-focused. We are truly blessed to be here.",
    rating: 5,
    image_url: "/placeholder-user.jpg"
  },
  {
    id: "mock-t-4",
    name: "David Kim",
    role: "Worship Leader",
    content: "The focus on prayer and genuine worship creates an atmosphere of peace and grace. JSC is not just a Sunday church; it's a supportive, active family.",
    rating: 5,
    image_url: "/placeholder-user.jpg"
  }
]

export default function TestimonySection() {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        const { data, error } = await supabase
          .from("testimonials")
          .select("id,name,role,content,rating,image_url")
          .order("created_at", { ascending: false })
        if (error || !data || data.length === 0) {
          setItems(mockTestimonials)
        } else {
          setItems(data)
        }
      } catch (e) {
        console.warn("Testimonials load exception, falling back", e)
        setItems(mockTestimonials)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="py-24 bg-neutral-50 dark:bg-neutral-900 animate-pulse flex items-center justify-center"><div className="text-primary tracking-widest text-sm uppercase">Loading reviews...</div></div>

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-150 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">
            Voices of Grace
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-neutral-900 dark:text-white mt-3">
            What Our Members Say
          </h2>
          <div className="h-[1px] w-20 bg-primary/45 mx-auto mt-4 mb-6" />
          <p className="text-lg text-neutral-600 dark:text-neutral-350 max-w-2xl mx-auto font-light">
            Hear from our church family about how JSC Church has impacted their lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((testimony, index) => (
            <motion.div
              key={testimony.id ?? index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 border border-neutral-100 dark:border-neutral-800 shadow-sm bg-white dark:bg-neutral-950 rounded-2xl flex flex-col justify-between overflow-hidden relative">
                <CardContent className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <Quote className="w-8 h-8 text-primary/10" />
                      <div className="flex">
                        {[...Array(testimony.rating ?? 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-primary fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 dark:text-neutral-350 mb-8 text-sm leading-relaxed font-light italic">
                      &ldquo;{testimony.content}&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex items-center pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <img
                      src={testimony.image_url || "/placeholder-user.jpg"}
                      alt={testimony.name}
                      className="w-10 h-10 rounded-full object-cover mr-3.5 border border-primary/20"
                    />
                    <div>
                      <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{testimony.name}</h4>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">{testimony.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

