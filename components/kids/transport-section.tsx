"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Shield, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchKidsSection } from "@/lib/kidsService"

const transportFeatures = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All vehicles are regularly inspected and drivers are background checked"
  },
  {
    icon: Clock,
    title: "On Time",
    description: "Reliable pickup and drop-off times to fit your family's schedule"
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description: "We serve multiple neighborhoods to make church accessible to all"
  }
]

const transportImages = [
  "/placeholder.jpg",
  "/placeholder.jpg", 
  "/placeholder.jpg",
  "/placeholder.jpg"
]

export default function TransportSection() {
  const [content, setContent] = useState<{ description: string; sunday_pickup: string; sunday_dropoff: string; wednesday_time: string; features: string[] }>({ description: "", sunday_pickup: "", sunday_dropoff: "", wednesday_time: "", features: [] })
  const [cta, setCta] = useState<{ title: string; description: string; primaryText: string; primaryLink: string; secondaryText?: string; secondaryLink?: string }>({ title: "", description: "", primaryText: "", primaryLink: "" })
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const { content, cta, gallery } = await fetchKidsSection("transport")
      setContent({ 
        description: content.description, 
        sunday_pickup: content.sunday_pickup || "",
        sunday_dropoff: content.sunday_dropoff || "",
        wednesday_time: content.wednesday_time || "",
        features: content.features || [] 
      })
      setCta(cta)
      setImages((gallery || []).map((g: any) => g.image_url))
    }
    load()
  }, [])
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Safe Transport Service</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.description || "We provide safe and reliable transportation to ensure every child can join us for church activities"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Transport Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Church Transport</h3>
                <p className="text-gray-600">Making church accessible to all families</p>
              </div>
            </div>

            <div className="space-y-6">
              {(content.features && content.features.length ? content.features.map((f) => ({ title: f, description: "", icon: Shield, color: "from-blue-400 to-cyan-500" })) : transportFeatures).map((feature: any, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4">Transport Schedule</h4>
              <div className="space-y-3">
                {content.sunday_pickup && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sunday Morning Pickup</span>
                    <Badge className="bg-green-100 text-green-800">{content.sunday_pickup}</Badge>
                  </div>
                )}
                {content.sunday_dropoff && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sunday Service Drop-off</span>
                    <Badge className="bg-blue-100 text-blue-800">{content.sunday_dropoff}</Badge>
                  </div>
                )}
                {content.wednesday_time && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wednesday Evening</span>
                    <Badge className="bg-purple-100 text-purple-800">{content.wednesday_time}</Badge>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Transport Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {(images.length ? images : transportImages).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Transport ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{cta.title || "Need Transport?"}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {cta.description || "Contact us to arrange transportation for your child. We're here to help make church accessible for your family."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.primaryLink || "/contact"} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                {cta.primaryText || "Request Transport"}
              </Link>
              {cta.secondaryText ? (
                <Link href={cta.secondaryLink || "/kids#routes"} className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
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
