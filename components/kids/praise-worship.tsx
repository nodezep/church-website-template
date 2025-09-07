"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Mic, Users, Heart } from "lucide-react"

const worshipFeatures = [
  {
    title: "Kids Choir",
    description: "Children learn to worship God through joyful singing and music",
    icon: Music,
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Praise Team",
    description: "Older children lead worship and help others connect with God through music",
    icon: Mic,
    color: "from-red-400 to-pink-500"
  },
  {
    title: "Dance Ministry",
    description: "Expressing worship through movement and joyful dance",
    icon: Users,
    color: "from-purple-400 to-indigo-500"
  },
  {
    title: "Heart of Worship",
    description: "Learning that worship is about loving God with all our heart",
    icon: Heart,
    color: "from-green-400 to-emerald-500"
  }
]

const worshipImages = [
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg"
]

export default function PraiseWorship() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Praise & Worship</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating God's love through music, song, and joyful worship together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Worship Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Worship with Joy</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our children learn to worship God with their whole hearts through music, song, and dance. 
                We believe worship should be joyful, engaging, and meaningful for every child.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">Every Sunday</div>
                  <div className="text-sm text-gray-600">Worship Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">All Ages</div>
                  <div className="text-sm text-gray-600">Welcome</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {worshipFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start p-4 bg-gray-50 rounded-xl"
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

          {/* Worship Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              {worshipImages.map((image, index) => (
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
                    alt={`Worship Activity ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-white/20 text-white border-white/30">
                      Praise & Worship
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
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Worship Team</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every Sunday at 10:30 AM, we gather for a time of joyful worship and praise together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Join Worship
              </button>
              <button className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn Songs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
