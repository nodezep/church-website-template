"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, Users, Heart } from "lucide-react"

const gamesFeatures = [
  {
    title: "Fun Games",
    description: "Interactive games that teach biblical principles while having fun",
    icon: Gamepad2,
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Sports Activities",
    description: "Physical activities that promote teamwork and healthy competition",
    icon: Trophy,
    color: "from-blue-400 to-cyan-500"
  },
  {
    title: "Team Building",
    description: "Activities that help children work together and build friendships",
    icon: Users,
    color: "from-purple-400 to-indigo-500"
  },
  {
    title: "Character Building",
    description: "Games that teach important values like honesty, kindness, and perseverance",
    icon: Heart,
    color: "from-pink-400 to-rose-500"
  }
]

const gamesImages = [
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg"
]

export default function GamesSports() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fun Games & Sports</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learning and growing through play, sports, and fun activities that build character and friendships
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Games Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Play with Purpose</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our games and sports activities are designed to be fun while teaching important life lessons. 
                Children learn teamwork, sportsmanship, and Christian values through engaging activities.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">Weekly</div>
                  <div className="text-sm text-gray-600">Activities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">All Ages</div>
                  <div className="text-sm text-gray-600">Welcome</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {gamesFeatures.map((feature, index) => (
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

          {/* Games Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              {gamesImages.map((image, index) => (
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
                    alt={`Games Activity ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-white/20 text-white border-white/30">
                      Games & Sports
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
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Games & Sports</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every Saturday at 2:00 PM, we have fun games and sports activities for all ages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Join Games
              </button>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                View Schedule
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
