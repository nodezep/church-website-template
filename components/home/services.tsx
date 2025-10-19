"use client"

import { motion } from "framer-motion"
import { Heart, BookOpen, Users, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { fetchHomeContent } from "@/lib/supabase-helpers"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

// Define the correct type for services content
interface Service {
  title: string
  time: string
  description: string
  icon: string
}

interface ServicesContent {
  services: Service[]
}

const defaultServices: Service[] = [
  {
    title: "Sunday Worship",
    time: "9:00 AM",
    description: "Join us for inspiring worship, powerful messages, and heartfelt community.",
    icon: "Heart"
  },
  {
    title: "Bible Study",
    time: "10:30 AM",
    description: "Dive deeper into God's Word with interactive study and discussion.",
    icon: "BookOpen"
  },
  {
    title: "Evening Service",
    time: "7:00 PM",
    description: "A more intimate gathering for prayer, worship, and fellowship.",
    icon: "Users"
  }
]

export default function Services() {
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [loading, setLoading] = useState(true)
  const [api, setApi] = useState<CarouselApi | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      const content = await fetchHomeContent("services") as ServicesContent | null
      if (content?.services && content.services.length > 0) {
        setServices(content.services)
      }
      setLoading(false)
    }

    fetchServices()
  }, [])

  // Autoplay: advance every 3 seconds
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      try {
        Promise.resolve(api?.scrollNext()).catch((err) => {
          console.warn("Services autoplay scrollNext error:", err)
        })
      } catch (e) {
        // ignore synchronous errors during teardown
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [api])

  if (loading) return <div className="py-20 bg-gray-50 animate-pulse"></div>

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Times</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and spiritual growth throughout the week
          </p>
        </div>

        <div className="relative">
          <Carousel className="w-full" opts={{ align: "start", loop: true }} setApi={setApi}>
            <CarouselContent>
              {services.map((service, index) => {
                let IconComponent = Heart // Default icon
                if (service.icon === "BookOpen") IconComponent = BookOpen
                if (service.icon === "Users") IconComponent = Users

                return (
                  <CarouselItem key={index} className="md:basis-1/3">
                    <motion.div
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
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

// end of file