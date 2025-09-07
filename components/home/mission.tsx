"use client"

import { motion } from "framer-motion"
import { Heart, Users, BookOpen } from "lucide-react"

export default function Mission() {
  return (
    <section className="py-20 hero-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
            To know Christ and make Him known through worship, fellowship, discipleship, and service to our community
            and the world.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-600">
            <div className="flex items-center">
              <Heart className="w-6 h-6 text-yellow-600 mr-2" />
              <span>Love</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 text-yellow-600 mr-2" />
              <span>Community</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-yellow-600 mr-2" />
              <span>Truth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
