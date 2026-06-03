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

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      try {
        Promise.resolve(api?.scrollNext()).catch((err) => {
          console.warn("Services autoplay scrollNext error:", err)
        })
      } catch (e) {
        // ignore
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [api])

  if (loading) return <div className="py-24 bg-neutral-950 animate-pulse flex items-center justify-center"><div className="text-primary tracking-widest text-sm uppercase">Loading services...</div></div>

  return (
    <section className="py-24 bg-neutral-900 border-y border-neutral-800 text-white relative overflow-hidden">
      <div className="absolute top-[-30%] left-[20%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-medium tracking-[0.25em] uppercase text-xs">
            Worship With Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mt-3 mb-4 text-white">
            Service Times
          </h2>
          <div className="h-[1px] w-20 bg-primary/45 mx-auto mb-6" />
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Join us for worship, fellowship, and spiritual growth throughout the week.
          </p>
        </div>

        <div className="relative px-6">
          <Carousel className="w-full" opts={{ align: "start", loop: true }} setApi={setApi}>
            <CarouselContent>
              {services.map((service, index) => {
                let IconComponent = Heart
                if (service.icon === "BookOpen") IconComponent = BookOpen
                if (service.icon === "Users") IconComponent = Users

                return (
                  <CarouselItem key={index} className="md:basis-1/3 p-4">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="group service-card bg-neutral-950/40 backdrop-blur-md p-8 rounded-2xl border border-neutral-800/80 hover:border-primary/50 transition-all duration-500 h-full flex flex-col items-center text-center relative overflow-hidden"
                    >
                      <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
                      
                      <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      
                      <h3 className="text-2xl font-bold font-serif text-neutral-100 mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      
                      <div className="inline-flex items-center bg-primary/10 text-primary border border-primary/20 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <Clock className="w-4 h-4 mr-2" />
                        {service.time}
                      </div>
                      
                      <p className="text-neutral-400 text-sm leading-relaxed font-light">
                        {service.description}
                      </p>
                    </motion.div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-8 border-neutral-800 bg-neutral-950 text-neutral-400 hover:bg-primary hover:text-white" />
            <CarouselNext className="-right-4 md:-right-8 border-neutral-800 bg-neutral-950 text-neutral-400 hover:bg-primary hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}


// end of file