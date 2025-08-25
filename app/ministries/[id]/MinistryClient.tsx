"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Users, Heart, Baby, Music, BookOpen, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Ministry {
  id: string
  title: string
  description: string
  icon: string
  color: string
  features: string[]
  image_url: string
}

const iconComponents: Record<string, React.ComponentType<any>> = {
  Users,
  Heart,
  Baby,
  Music,
  BookOpen,
  Globe
}

interface MinistryClientProps {
  ministry: Ministry
}

export default function MinistryClient({ ministry }: MinistryClientProps) {
  const IconComponent = iconComponents[ministry.icon] || Users

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/ministries">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ministries
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={ministry.image_url || "/placeholder.svg"}
              alt={ministry.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className={`w-16 h-16 ${ministry.color || 'bg-blue-500'} rounded-full flex items-center justify-center mb-4`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{ministry.title}</h1>
              <p className="text-xl text-white/90">{ministry.description}</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ministry.features?.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start p-4 bg-white rounded-lg shadow-sm border"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 ${ministry.color || 'bg-blue-500'} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p className="text-gray-600 mb-8">
              Ready to join us? Get in touch to learn more about how you can be part of this ministry.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}