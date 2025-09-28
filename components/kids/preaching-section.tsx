"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lightbulb, Users, Heart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchKidsSection } from "@/lib/kidsService"

const preachingFeatures = [
  {
    title: "Kid-Friendly Messages",
    description: "Bible messages told in ways that children can understand and relate to",
    icon: BookOpen,
    color: "from-blue-400 to-cyan-500"
  },
  {
    title: "Interactive Teaching",
    description: "Engaging lessons with questions, activities, and hands-on learning",
    icon: Lightbulb,
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Life Application",
    description: "Learning how to apply God's word to everyday life situations",
    icon: Users,
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Heart Transformation",
    description: "Messages that touch hearts and inspire children to love God more",
    icon: Heart,
    color: "from-pink-400 to-rose-500"
  }
]

const preachingImages = [
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg"
]

export default function PreachingSection() {
  const [content, setContent] = useState<{ description: string; features: string[] }>({ description: "", features: [] })
  const [cta, setCta] = useState<{ title: string; description: string; primaryText: string; primaryLink: string; secondaryText?: string; secondaryLink?: string }>({ title: "", description: "", primaryText: "", primaryLink: "" })
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const { content, cta, gallery } = await fetchKidsSection("kids_preaching")
      setContent({ description: content.description, features: content.features || [] })
      setCta(cta)
      setImages((gallery || []).map((g: any) => g.image_url))
    }
    load()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kids Preaching</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.description || "God's word shared in ways that inspire, teach, and transform young hearts"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Preaching Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">God's Word for Kids</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our children's preaching focuses on sharing God's truth in age-appropriate ways. 
                We use stories, illustrations, and interactive elements to help children understand and apply God's word.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">20</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">Interactive</div>
                  <div className="text-sm text-gray-600">Learning</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {(content.features && content.features.length ? content.features.map((f) => ({ title: f, description: "", icon: BookOpen, color: "from-blue-400 to-cyan-500" })) : preachingFeatures).map((feature: any, index: number) => (
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

          {/* Preaching Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              {(images.length ? images : preachingImages).map((image, index) => (
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
                    alt={`Preaching Moment ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-white/20 text-white border-white/30">
                      Kids Preaching
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{cta.title || "Join Our Kids Service"}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {cta.description || "Every Sunday at 11:00 AM, we have a special kids service with preaching designed just for children."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.primaryLink || "/contact"} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                {cta.primaryText || "Join Kids Service"}
              </Link>
              {cta.secondaryText ? (
                <Link href={cta.secondaryLink || "/kids"} className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
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
