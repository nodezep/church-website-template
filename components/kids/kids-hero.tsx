"use client"

import { motion } from "framer-motion"
import { Heart, Users, Star, Sparkles } from "lucide-react"

export default function KidsHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Kids Ministry
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Where children discover God's love through fun, friendship, and faith-building adventures!
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-white mb-12">
            <motion.div 
              className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart className="w-6 h-6 mr-3" />
              <span className="font-semibold">Love & Care</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="w-6 h-6 mr-3" />
              <span className="font-semibold">Friendship</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Star className="w-6 h-6 mr-3" />
              <span className="font-semibold">Fun Learning</span>
            </motion.div>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button className="bg-white text-yellow-600 hover:bg-yellow-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Join Us This Sunday!
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-8 h-8 bg-white/30 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-white/30 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 left-1/4 animate-bounce" style={{ animationDelay: '2s' }}>
        <div className="w-4 h-4 bg-white/30 rounded-full"></div>
      </div>
    </section>
  )
}