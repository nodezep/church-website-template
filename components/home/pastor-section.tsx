"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchPastorProfile } from "@/lib/homeService"

export default function PastorSection() {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("Pastor")
  const [title, setTitle] = useState("Senior Pastor")
  const [bio, setBio] = useState("")
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined)
  const [years, setYears] = useState<number | undefined>(undefined)
  const [sermons, setSermons] = useState<number | undefined>(undefined)
  const [quote, setQuote] = useState<string | undefined>(undefined)

  useEffect(() => {
    const load = async () => {
      const profile = await fetchPastorProfile()
      if (profile) {
        setName(profile.name)
        setTitle(profile.title)
        setBio(profile.bio)
        setPhotoUrl(profile.photo_url)
        setYears(profile.years_service)
        setSermons(profile.sermons_count)
        setQuote(profile.quote)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Senior Pastor</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading our congregation with wisdom, compassion, and unwavering faith
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={photoUrl || "/placeholder-user.jpg"}
                alt={name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white p-4 rounded-full shadow-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{name}</h3>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                {title}
              </Badge>
            </div>

            {bio && (
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{bio}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">{years ?? "15+"}</div>
                <div className="text-sm text-gray-600">Years of Service</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">{sermons ?? "500+"}</div>
                <div className="text-sm text-gray-600">Sermons Preached</div>
              </div>
            </div>

            {quote && (
              <div className="pt-4">
                <blockquote className="text-lg italic text-gray-700 border-l-4 border-yellow-500 pl-6">
                  “{quote}”
                </blockquote>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
