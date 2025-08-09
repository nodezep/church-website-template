"use client"

import { motion } from "framer-motion"
import { Heart, BookOpen, Users, Clock } from "lucide-react"

const services = [
  {
    title: "Sunday Worship",
    time: "9:00 AM",
    description: "Join us for inspiring worship, powerful messages, and heartfelt community.",
    icon: Heart,
  },
  {
    title: "Bible Study",
    time: "10:30 AM",
    description: "Dive deeper into God's Word with interactive study and discussion.",
    icon: BookOpen,
  },
  {
    title: "Evening Service",
    time: "7:00 PM",
    description: "A more intimate gathering for prayer, worship, and fellowship.",
    icon: Users,
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Times</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and spiritual growth throughout the week
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card bg-white p-8 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <div className="flex items-center justify-center text-blue-600 font-semibold mb-4">
                  <Clock className="w-5 h-5 mr-2" />
                  {service.time}
                </div>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
