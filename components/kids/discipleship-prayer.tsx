"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Church, BookOpen, Users, Heart } from "lucide-react"

const discipleshipFeatures = [
  {
    title: "Prayer Circles",
    description: "Small groups where children learn to pray for each other and share their hearts with God",
    icon: Church,
    color: "from-purple-400 to-indigo-500"
  },
  {
    title: "Bible Study",
    description: "Age-appropriate Bible studies that help children understand God's word",
    icon: BookOpen,
    color: "from-blue-400 to-cyan-500"
  },
  {
    title: "Mentorship",
    description: "Older children mentor younger ones, building strong Christian relationships",
    icon: Users,
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Heart Sharing",
    description: "Safe spaces for children to share their joys, struggles, and prayer requests",
    icon: Heart,
    color: "from-pink-400 to-rose-500"
  }
]

const prayerImages = [
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg"
]

export default function DiscipleshipPrayer() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Discipleship & Prayer</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building deep spiritual foundations through prayer, mentorship, and meaningful relationships
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Discipleship Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Growing in Faith Together</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our discipleship program focuses on building strong spiritual foundations through prayer, 
                Bible study, and Christian mentorship. Children learn to support and encourage each other in their faith journey.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">Weekly</div>
                  <div className="text-sm text-gray-600">Meetings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">1:1</div>
                  <div className="text-sm text-gray-600">Mentorship</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {discipleshipFeatures.map((feature, index) => (
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

          {/* Prayer Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="space-y-4">
              {prayerImages.map((image, index) => (
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
                    alt={`Prayer Activity ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="bg-white/20 text-white border-white/30">
                      Prayer & Discipleship
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Discipleship Program</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every Wednesday at 6:00 PM, we gather for prayer, Bible study, and spiritual growth together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Join Discipleship
              </button>
              <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Prayer Requests
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}