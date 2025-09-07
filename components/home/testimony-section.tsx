"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { fetchTestimonials } from "@/lib/homeService"

type T = { id?: string; name: string; role?: string; content: string; rating?: number; image_url?: string }

export default function TestimonySection() {
  const [items, setItems] = useState<T[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await fetchTestimonials()
      setItems(data)
    }
    load()
  }, [])
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our church family about how JSC Church has impacted their lives
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(items.length ? items : [
            { name: "Sarah Johnson", role: "Church Member", content: "JSC Church has been a blessing to my family.", rating: 5, image_url: "/placeholder-user.jpg" },
            { name: "Michael Chen", role: "Youth Leader", content: "The children's ministry here is amazing!", rating: 5, image_url: "/placeholder-user.jpg" },
            { name: "Grace Williams", role: "Volunteer", content: "Serving at JSC Church has been life-changing.", rating: 5, image_url: "/placeholder-user.jpg" },
            { name: "David Rodriguez", role: "New Member", content: "From the moment I walked in, I felt welcomed.", rating: 5, image_url: "/placeholder-user.jpg" },
          ]).map((testimony, index) => (
            <motion.div
              key={(testimony as any).id ?? index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-yellow-500 mr-2" />
                    <div className="flex">
                      {[...Array(testimony.rating ?? 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    "{testimony.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <img
                      src={testimony.image_url || "/placeholder-user.jpg"}
                      alt={testimony.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimony.name}</h4>
                      <p className="text-sm text-gray-500">{testimony.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Church Family</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience the love, community, and spiritual growth that our members are talking about. 
              Come and be part of something greater.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Visit This Sunday
              </button>
              <button className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
