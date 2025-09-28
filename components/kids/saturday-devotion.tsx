"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Heart, Users, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchKidsSection } from "@/lib/kidsService"

const devotionActivities = [
  {
    title: "Quiet Time",
    description: "Personal reflection and prayer time with God",
    icon: Heart,
    color: "from-purple-400 to-indigo-500"
  },
  {
    title: "Group Sharing",
    description: "Sharing experiences and encouraging one another",
    icon: Users,
    color: "from-blue-400 to-cyan-500"
  },
  {
    title: "Prayer Walk",
    description: "Walking and praying together in nature",
    icon: BookOpen,
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Worship",
    description: "Praising God through music and song",
    icon: Star,
    color: "from-yellow-400 to-orange-500"
  }
]

const devotionImages = [
  "/placeholder.jpg"
]

export default function SaturdayDevotion() {
  const [content, setContent] = useState<{ description: string; features: string[] }>({ description: "", features: [] })
  const [cta, setCta] = useState<{ title: string; description: string; primaryText: string; primaryLink: string; secondaryText?: string; secondaryLink?: string }>({ title: "", description: "", primaryText: "", primaryLink: "" })
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const { content, cta, gallery } = await fetchKidsSection("saturday_devotion")
      setContent({ description: content.description, features: content.features || [] })
      setCta(cta)
      setImages((gallery || []).map((g: any) => g.image_url))
    }
    load()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Saturday Devotion</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.description || "Weekend devotion time focused on reflection, prayer, and community"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Devotion Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Weekend Reflection</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our Saturday devotion provides a peaceful time for children to reflect on the week, 
                connect with God, and build deeper relationships with their peers through meaningful activities.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">Saturday</div>
                  <div className="text-sm text-gray-600">Morning</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">Relaxed</div>
                  <div className="text-sm text-gray-600">Pace</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {(content.features && content.features.length ? content.features.map((f) => ({ title: f, description: "", icon: Heart, color: "from-purple-400 to-indigo-500" })) : devotionActivities).map((activity: any, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${activity.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Devotion Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              {(images.length ? images : devotionImages).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Saturday Devotion ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-white/20 text-white border-white/30">
                      Saturday Devotion
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{cta.title || "Join Saturday Devotion"}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {cta.description || "Connect with God and friends during our Saturday devotion."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.primaryLink || "/contact"} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                {cta.primaryText || "Join"}
              </Link>
              {cta.secondaryText ? (
                <Link href={cta.secondaryLink || "/kids"} className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  {cta.secondaryText}
                </Link>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
