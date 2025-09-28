"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, Users, Heart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchKidsSection } from "@/lib/kidsService"

const tourFeatures = [
  {
    title: "Educational Tours",
    description: "Visiting places that teach children about history, nature, and God's creation",
    icon: MapPin,
    color: "from-blue-400 to-cyan-500"
  },
  {
    title: "Photo Memories",
    description: "Capturing special moments and creating lasting memories together",
    icon: Camera,
    color: "from-purple-400 to-indigo-500"
  },
  {
    title: "Group Adventures",
    description: "Building friendships and creating bonds through shared experiences",
    icon: Users,
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Spiritual Growth",
    description: "Learning about God's world and growing in faith through exploration",
    icon: Heart,
    color: "from-pink-400 to-rose-500"
  }
]

const tourImages = [
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg"
]

export default function ToursSection() {
  const [content, setContent] = useState<{ description: string; features: string[] }>({ description: "", features: [] })
  const [cta, setCta] = useState<{ title: string; description: string; primaryText: string; primaryLink: string; secondaryText?: string; secondaryLink?: string }>({ title: "", description: "", primaryText: "", primaryLink: "" })
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const { content, cta, gallery } = await fetchKidsSection("fun_tours_adventures")
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fun Tours & Adventures</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.description || "Exploring God's world together through educational tours and exciting adventures"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Tours Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Adventure Awaits</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our tours and adventures take children on exciting journeys to learn about God's creation, 
                history, and the world around us. These experiences create lasting memories and deepen their faith.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">Monthly</div>
                  <div className="text-sm text-gray-600">Tours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">Safe</div>
                  <div className="text-sm text-gray-600">Adventures</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {(content.features && content.features.length ? content.features.map((f) => ({ title: f, description: "", icon: MapPin, color: "from-blue-400 to-cyan-500" })) : tourFeatures).map((feature: any, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tours Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              {(images.length ? images : tourImages).map((image, index) => (
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
                    alt={`Tour Adventure ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-white/20 text-white border-white/30">
                      Tours & Adventures
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{cta.title || "Join Our Next Adventure"}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {cta.description || "Stay tuned for our upcoming tours and adventures. We have exciting plans for the coming months!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.primaryLink || "/contact"} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                {cta.primaryText || "Join Next Tour"}
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
